"""Merge sessions rebuilt from Home Assistant's history with the recorded ones (pure)."""

from __future__ import annotations

from collections.abc import Callable

from .const import CURVE_WINDOW_MAX_S
from .model import Session, TariffSlice, band_key

# A rebuilt session replaces recorded ones only if it holds clearly more energy.
REPLACE_MARGIN_KWH = 0.1


def _span(s: Session) -> tuple[float, float]:
    start = s.charge_start or s.plugged_at or 0.0
    return start, s.unplugged_at or s.charge_end or start


def _overlap(a: Session, b: Session) -> bool:
    (a0, a1), (b0, b1) = _span(a), _span(b)
    return a0 <= b1 and b0 <= a1


def merge_rebuilt(
    recorded: list[Session], rebuilt: list[Session], busy_from: float | None = None
) -> tuple[list[str], list[Session]]:
    """Ids of recorded sessions to remove and rebuilt sessions to add.

    A rebuilt session is added where nothing was recorded, and replaces the recorded sessions
    it overlaps only if it holds clearly more energy (e.g. recording started mid-charge) and none of
    them was corrected by hand. Rebuilt sessions reaching the live tracker's open session
    (`busy_from`) are skipped.
    """
    removed: list[str] = []
    added: list[Session] = []
    for r in rebuilt:
        if busy_from is not None and _span(r)[1] >= busy_from:
            continue
        hits = [s for s in recorded if _overlap(r, s)]
        if not hits:
            added.append(r)
        elif (
            not any(s.edited for s in hits)
            and r.energy_kwh > sum(s.energy_kwh for s in hits) + REPLACE_MARGIN_KWH
        ):
            removed += [s.id for s in hits]
            added.append(r)
    return removed, added


def enrich(
    recorded: list[Session],
    rebuilt: list[Session],
    fuel_price: float | None,
    fuel_l100: dict[str | None, float | None],
) -> list[Session]:
    """Fill what a recorded session lacks, in place; return the sessions changed.

    The odometer comes from the rebuilt session it overlaps (read in the history); the petrol
    price is today's and the reference consumption the vehicle's current one.
    ponytail: no petrol price history exists, so past sessions get today's price.
    """
    changed = []
    for s in recorded:
        before = (s.odometer_start, s.odometer_end, s.fuel_price, s.fuel_l100)
        if s.odometer_start is None:
            twin = next(
                (r for r in rebuilt if _overlap(r, s) and r.odometer_start is not None), None
            )
            if twin is not None:
                s.odometer_start, s.odometer_end = twin.odometer_start, twin.odometer_end
        if s.fuel_price is None:
            s.fuel_price = fuel_price
        if s.fuel_l100 is None:
            s.fuel_l100 = fuel_l100.get(s.vehicle_id)
        if (s.odometer_start, s.odometer_end, s.fuel_price, s.fuel_l100) != before:
            changed.append(s)
    return changed


def _has_day(s: Session) -> bool:
    return any(not k.startswith("|") for k in s.bands)


def _parts(s: Session) -> dict[bool | None, TariffSlice]:
    """The session's off-peak / peak slices, or its whole energy without an off-peak source."""
    if s.has_off_peak_source:
        return {True: s.off_peak, False: s.peak}
    return {None: TariffSlice(s.energy_kwh, s.cost)}


def assign_day_types(s: Session, day_at: Callable[[float], str | None]) -> bool:
    """Give a session without day types its bands from the day type at each curve point
    (energy-weighted, within its off-peak / peak part); totals unchanged. True when changed."""
    if _has_day(s):
        return False
    days = [day_at(p.t) for p in s.curve]
    if all(d is None for d in days):
        return False
    weights: dict[tuple[bool | None, str | None], float] = {}
    for i, p in enumerate(s.curve):
        end = s.curve[i + 1].t if i + 1 < len(s.curve) else (s.charge_end or p.t)
        e = p.w * max(min(end, p.t + CURVE_WINDOW_MAX_S) - p.t, 0) / 3.6e6
        flag = p.off_peak if s.has_off_peak_source else None
        weights[(flag, days[i])] = weights.get((flag, days[i]), 0.0) + e
    bands: dict[str, TariffSlice] = {}
    for flag, part in _parts(s).items():
        mine = {d: w for (f, d), w in weights.items() if f == flag and w > 0}
        total = sum(mine.values())
        for day, w in mine.items() if total > 0 else [(None, 1.0)]:
            r = w / total if total > 0 else 1.0
            if part.kwh * r > 0:
                cost = None if part.cost is None else part.cost * r
                bands[band_key(day, flag)] = TariffSlice(part.kwh * r, cost)
    s.bands = bands
    for p, day in zip(s.curve, days, strict=True):
        if p.day is None:
            p.day = day
    return True


def apply_default_day(s: Session, day: str) -> bool:
    """Sessions still without a day type get `day` for all their energy (idempotent)."""
    if _has_day(s):
        return False
    s.bands = {
        band_key(day, flag): TariffSlice(part.kwh, part.cost)
        for flag, part in _parts(s).items()
        if part.kwh > 0
    }
    for p in s.curve:
        if p.day is None:
            p.day = day
    return True
