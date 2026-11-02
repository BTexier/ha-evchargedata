import pytest

from custom_components.charge_board.model import CurvePoint, Session, TariffSlice
from custom_components.charge_board.rebuild import (
    apply_default_day,
    assign_day_types,
    merge_rebuilt,
)


def sess(sid, start, end, kwh, edited=False):
    return Session(
        id=sid,
        charger_id="c",
        charge_start=start,
        charge_end=end,
        unplugged_at=end,
        energy_kwh=kwh,
        edited=edited,
    )


def test_new_sessions_are_added():
    removed, added = merge_rebuilt([sess("a", 0, 10, 5)], [sess("r", 20, 30, 4)])
    assert removed == [] and [s.id for s in added] == ["r"]


def test_a_more_complete_rebuild_replaces_a_partial_session():
    removed, added = merge_rebuilt([sess("a", 5, 10, 15.5)], [sess("r", 0, 10, 17.95)])
    assert removed == ["a"] and [s.id for s in added] == ["r"]


def test_a_less_complete_rebuild_keeps_the_recorded_session():
    removed, added = merge_rebuilt([sess("a", 0, 10, 15.5)], [sess("r", 2, 10, 12.0)])
    assert removed == [] and added == []


def test_an_edited_session_is_never_replaced():
    removed, added = merge_rebuilt([sess("a", 5, 10, 1.0, edited=True)], [sess("r", 0, 10, 17.95)])
    assert removed == [] and added == []


def test_the_open_session_window_is_left_alone():
    _removed, added = merge_rebuilt([], [sess("r", 0, 10, 3)], busy_from=8)
    assert added == []


def test_a_rounding_difference_does_not_replace_a_recorded_session():
    removed, added = merge_rebuilt([sess("a", 0, 10, 15.50)], [sess("r", 0, 10, 15.55)])
    assert removed == [] and added == []


def test_enrich_fills_odometer_and_fuel_without_touching_the_rest():
    from custom_components.charge_board.rebuild import enrich

    recorded = sess("a", 0, 10, 9.8)
    rebuilt = sess("r", 0, 10, 9.75)
    rebuilt.odometer_start, rebuilt.odometer_end = 560.0, 577.0
    changed = enrich([recorded], [rebuilt], fuel_price=2.089, fuel_l100={None: 5.7})
    assert changed == [recorded]
    assert (recorded.odometer_start, recorded.odometer_end) == (560.0, 577.0)
    assert (recorded.fuel_price, recorded.fuel_l100) == (2.089, 5.7)
    assert recorded.energy_kwh == 9.8
    assert enrich([recorded], [rebuilt], fuel_price=1.5, fuel_l100={None: 6}) == []


H = 3600


def night(bands=None, source=True):
    """1 h HC then 1 h HP at 3 kW, no day type recorded."""
    return Session(
        id="n",
        charger_id="c",
        charge_start=0,
        charge_end=2 * H,
        energy_kwh=6.0,
        cost=0.9,
        off_peak=TariffSlice(3.0, 0.3),
        peak=TariffSlice(3.0, 0.6),
        bands=bands
        if bands is not None
        else {"|hc": TariffSlice(3.0, 0.3), "|hp": TariffSlice(3.0, 0.6)},
        has_off_peak_source=source,
        curve=[CurvePoint(t, 3000, t < H) for t in range(0, 2 * H, 300)],
    )


def colours(t):
    return "Bleu" if t < H else "Blanc"


def test_assign_day_types_splits_by_curve_and_keeps_totals():
    s = night()
    assert assign_day_types(s, colours) is True
    assert set(s.bands) == {"Bleu|hc", "Blanc|hp"}
    assert (s.bands["Bleu|hc"].kwh, s.bands["Bleu|hc"].cost) == pytest.approx((3.0, 0.3))
    assert (s.bands["Blanc|hp"].kwh, s.bands["Blanc|hp"].cost) == pytest.approx((3.0, 0.6))
    assert s.curve[0].day == "Bleu" and s.curve[-1].day == "Blanc"


def test_assign_day_types_without_bands_uses_off_peak_and_peak():
    s = night(bands={})  # recorded before 0.6.0
    assert assign_day_types(s, colours) is True
    assert sum(b.kwh for b in s.bands.values()) == pytest.approx(6.0)
    assert sum(b.cost for b in s.bands.values()) == pytest.approx(0.9)


def test_assign_day_types_leaves_sessions_with_a_day_band():
    s = night(bands={"Bleu|hc": TariffSlice(6.0, 0.9)})
    assert assign_day_types(s, colours) is False
    assert set(s.bands) == {"Bleu|hc"}


def test_assign_day_types_without_history_changes_nothing():
    s = night()
    assert assign_day_types(s, lambda t: None) is False
    assert set(s.bands) == {"|hc", "|hp"}


def test_default_day_converts_off_peak_and_peak():
    s = night(bands={})
    assert apply_default_day(s, "Bleu") is True
    assert s.bands == {"Bleu|hc": TariffSlice(3.0, 0.3), "Bleu|hp": TariffSlice(3.0, 0.6)}
    assert all(p.day == "Bleu" for p in s.curve)


def test_default_day_without_off_peak_source_is_one_band():
    s = night(bands={}, source=False)
    assert apply_default_day(s, "Bleu") is True
    assert s.bands == {"Bleu|": TariffSlice(6.0, 0.9)}


def test_default_day_is_idempotent():
    s = night()
    apply_default_day(s, "Bleu")
    assert apply_default_day(s, "Rouge") is False
    assert set(s.bands) == {"Bleu|hc", "Bleu|hp"}
