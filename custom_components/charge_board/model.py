"""Charging session data model (pure, no Home Assistant imports)."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field, fields


@dataclass
class TariffSlice:
    kwh: float = 0.0
    cost: float | None = None


@dataclass
class CurvePoint:
    t: float  # Unix seconds, start of the averaging window
    w: float  # mean power over the window
    off_peak: bool | None = None  # tariff at the window start; None = unknown
    day: str | None = None  # day type at the window start (e.g. Tempo colour); None = unknown


@dataclass
class Session:
    id: str
    charger_id: str
    vehicle_id: str | None = None
    plugged_at: float | None = None
    charge_start: float | None = None
    charge_end: float | None = None
    unplugged_at: float | None = None
    charging_s: float = 0.0
    energy_kwh: float = 0.0
    cost: float | None = None
    off_peak: TariffSlice = field(default_factory=TariffSlice)
    peak: TariffSlice = field(default_factory=TariffSlice)
    by_price: dict[str, TariffSlice] = field(default_factory=dict)  # "0.1356" or "none"
    bands: dict[str, TariffSlice] = field(default_factory=dict)  # band_key -> slice
    has_off_peak_source: bool = False
    soc_start: float | None = None
    soc_end: float | None = None
    odometer_start: float | None = None  # km
    odometer_end: float | None = None
    fuel_price: float | None = None  # per litre, at the close (fuel comparison)
    fuel_l100: float | None = None  # the vehicle's reference consumption at the close
    curve: list[CurvePoint] = field(default_factory=list)
    estimated: bool = False
    edited: bool = False
    open: bool = False

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, d: dict) -> Session:
        d = _known(cls, d)
        for k in ("off_peak", "peak"):
            if k in d:
                d[k] = TariffSlice(**_known(TariffSlice, d[k]))
        for k in ("by_price", "bands"):
            if k in d:
                d[k] = {b: TariffSlice(**_known(TariffSlice, v)) for b, v in d[k].items()}
        if "curve" in d:
            d["curve"] = [CurvePoint(**_known(CurvePoint, p)) for p in d["curve"]]
        s = cls(**d)
        if "bands" not in d:
            # Stored before bands: seed them so energy added later (merge, a charge resumed
            # after the upgrade's restart) never leaves this energy out of the bands.
            s.bands = legacy_bands(s)
        return s


def band_key(day: str | None, off_peak: bool | None) -> str:
    """Tariff band: day type (e.g. Tempo colour) x off-peak / peak, each part optional."""
    return f"{day or ''}|{'hc' if off_peak else 'hp' if off_peak is False else ''}"


def legacy_bands(s: Session) -> dict[str, TariffSlice]:
    """Bands of a session recorded without them: its off-peak / peak slices, or its whole
    energy without an off-peak source."""
    if s.energy_kwh <= 0:
        return {}
    if not s.has_off_peak_source:
        return {band_key(None, None): TariffSlice(s.energy_kwh, s.cost)}
    return {
        band_key(None, flag): TariffSlice(part.kwh, part.cost)
        for flag, part in ((True, s.off_peak), (False, s.peak))
        if part.kwh > 0
    }


def _known(cls: type, d: dict) -> dict:
    """Drop keys the dataclass does not know (saved by a newer version)."""
    names = {f.name for f in fields(cls)}
    return {k: v for k, v in d.items() if k in names}
