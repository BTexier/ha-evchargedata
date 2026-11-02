# Tranches tarifaires Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Record each session's energy and cost per tariff band (day type × HC/HP) and stack the monthly cost bars by band, with the Tempo colours.

**Architecture:** A band is a string key `"<day>|<hc|hp|>"`, cumulated in a new `Session.bands` next to the existing `off_peak` / `peak` / `by_price`. The day type comes from an optional global option entity read in each `Sample`. Stats derive bands for sessions recorded before this version from their HC/HP slices. The panel draws whatever bands the month rows carry.

**Tech Stack:** Python (HA custom integration, pytest-homeassistant-custom-component), TypeScript + Lit panel (vitest), esbuild bundle (`frontend/build.mjs` → `custom_components/charge_board/frontend/charge-board-panel.js`).

**Spec:** `docs/superpowers/specs/2026-11-02-tranches-tarifaires-design.md`

## Global Constraints

- Band key: `f"{day or ''}|{'hc' if off_peak else 'hp' if off_peak is False else ''}"`; `day` is the entity state as read (case kept), `None` when absent / unavailable / unknown.
- Colours (case-insensitive day match): bleu/blue HC `#88c2e3` HP `#1999e2`; blanc/white HC `#8f8f8f` HP `#e0e0e0`; rouge/red HC `#e38888` HP `#e42323`.
- Stack order, bottom to top: bleu, blanc, rouge, then unknown days alphabetically, then no day; inside a day: hc, hp, none.
- No day type: HC `var(--info-color, #3b82f6)`, HP `var(--warning-color, #f59e0b)` (unchanged look); key `"|"` (Base) `var(--primary-color, #03a9f4)`.
- Never infer a band from a price. `off_peak` / `peak` / `by_price` keep their current rules.
- Option key `day_type_entity` (global, in the options flow, after `off_peak_entity`); service field `default_day_type`.
- Version `0.6.0` in `manifest.json`. Tests: `.venv/bin/python -m pytest -q -p no:logging` (HA 2026.2) and `.venv314/bin/python -m pytest -q -p no:logging` (HA 2026.10; the 3 `test_recorder.py` setup errors are a known harness issue). Panel: `cd frontend && npm test && npm run build`.

## Review Focus

- Day-type entity unavailable during part of a charge → that part lands in `"|hc"` / `"|hp"`, the rest in `"Bleu|hc"`; totals unchanged (Task 1 test).
- Sessions stored before 0.6.0 (no `bands`, curve points without `day`) load and still show in the bars (Task 1 `from_dict` test, Task 5 legacy test).
- `default_day_type` on a session without an off-peak source → single `"Bleu|"` band (Task 4 test).
- Another Tempo integration publishing `BLUE` / `WHITE` / `RED` gets the same colours (Task 6 test).
- A rebuild run twice with different `default_day_type` changes nothing the second time (Task 4 test).

---

### Task 1: Bands in the model and the tracker

**Files:**
- Modify: `custom_components/charge_board/model.py`, `custom_components/charge_board/tracker.py`
- Test: `tests/test_model.py`, `tests/test_tracker.py`

**Interfaces:**
- Produces: `band_key(day: str | None, off_peak: bool | None) -> str` (model.py); `Session.bands: dict[str, TariffSlice]` (default empty, loaded by `from_dict` like `by_price`); `CurvePoint.day: str | None = None`; `Sample.day_type: str | None = None`.

- [ ] **Step 1: Failing tests**

```python
# tests/test_model.py
def test_band_key():
    assert band_key("Bleu", True) == "Bleu|hc"
    assert band_key("Rouge", False) == "Rouge|hp"
    assert band_key(None, True) == "|hc"
    assert band_key(None, None) == "|"

def test_old_session_without_bands_loads():
    d = sess_dict()  # an existing helper/fixture dict, without "bands"; curve points without "day"
    s = Session.from_dict(d)
    assert s.bands == {} and all(p.day is None for p in s.curve)
    assert Session.from_dict(s.to_dict()) == s

# tests/test_tracker.py
def test_bands_follow_day_type_and_off_peak():
    # night() samples with day_type="Bleu" until at(6,0,1) then "Blanc"; unavailable (None) 23:00-23:30
    done = run(make_tracker(), at(21, 55), at(8, 0, 1), night_with_day)
    s = done[0]
    assert set(s.bands) == {"Bleu|hc", "|hc", "Blanc|hp"}
    assert sum(b.kwh for b in s.bands.values()) == pytest.approx(s.energy_kwh)
    assert sum(b.cost for b in s.bands.values()) == pytest.approx(s.cost)
    assert s.curve[0].day == "Bleu"
```

- [ ] **Step 2: Run** `.venv/bin/python -m pytest -q -p no:logging tests/test_model.py tests/test_tracker.py` → FAIL (`band_key` undefined).
- [ ] **Step 3: Implement.** `band_key` per Global Constraints. `_credit(sess, kwh, price, off_peak, day)` adds to `sess.bands[band_key(day, off_peak)]` with the same `kwh` / `cost` as the other slices; callers pass the day of the same sample whose `off_peak` they use (`a.day_type` falling back to `b.day_type`, `b.day_type` on a restart gap). New curve points take `a.day_type`. `day_type` is not part of `_absorb` / persisted tracker state.
- [ ] **Step 4: Run** both test files → PASS; full suite → PASS.
- [ ] **Step 5: Commit** `feat: record each session's energy and cost per tariff band`

### Task 2: Day-type option read by the hub

**Files:**
- Modify: `custom_components/charge_board/config_flow.py:77` (after `off_peak_entity`), `hub.py` (`sample_for`, `_watched_entities`), `strings.json`, `translations/en.json`, `translations/fr.json`
- Test: `tests/test_hub.py`, `tests/test_config_flow.py`

**Interfaces:**
- Consumes: `Sample.day_type` (Task 1).
- Produces: option `day_type_entity` (entity selector, domains `sensor`, `select`, `input_select`); `Hub._day_type(get: StateGetter | None = None) -> str | None` returning the state string or `None` (via `self._state`).

- [ ] **Step 1: Failing tests**

```python
# tests/test_hub.py
async def test_session_bands_use_the_day_type_entity(hass, freezer):
    # entry options: off_peak_entity binary_sensor.hc (on), day_type_entity sensor.tempo ("Bleu")
    # charge 15 min, then sensor.tempo -> "Rouge" and binary_sensor.hc -> off, 15 min, unplug
    s = entry.runtime_data.store.sessions[0]
    assert set(s.bands) == {"Bleu|hc", "Rouge|hp"}

# tests/test_config_flow.py
async def test_options_accept_a_day_type_entity(hass): ...  # saved options contain day_type_entity
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** `sample_for` sets `day_type=self._day_type(get)`; `_watched_entities` adds the option's entity (so the rebuild reads its history). Labels: FR « Type de jour (ex. couleur Tempo) », description « Facultatif. Entité dont l'état est le type de jour du contrat (Tempo : sensor.rte_tempo_couleur_actuelle). Découpe les coûts par tranche dans les statistiques. » ; EN « Day type (e.g. Tempo colour) », « Optional. Entity whose state is the contract's day type (Tempo: the current colour sensor). Splits costs by band in the statistics. »
- [ ] **Step 4: Run** → PASS (both venvs).
- [ ] **Step 5: Commit** `feat: day type option (e.g. Tempo colour)`

### Task 3: Merge and split keep the bands

**Files:**
- Modify: `custom_components/charge_board/corrections.py`
- Test: `tests/test_corrections.py`

**Interfaces:**
- Consumes: `Session.bands`, `CurvePoint.day`, `band_key` (Task 1).

- [ ] **Step 1: Failing tests**

```python
def test_merge_adds_bands_key_by_key():  # {"Bleu|hc": 2 kWh} + {"Bleu|hc": 1, "Blanc|hp": 1} -> 3 / 1, costs summed
def test_split_follows_the_curve_days():  # curve: 1 h Bleu HC then 1 h Blanc HP, split in between
    # left.bands == {"Bleu|hc": ...} only, right.bands == {"Blanc|hp": ...} only; kWh and cost sums preserved
def test_split_without_curve_days_is_pro_rata_per_off_peak_part():
    # legacy curve (day None): each band scaled by the left share of its HC (or HP) part, as off_peak/peak
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** Merge: sum like `by_price`. Split: if every curve point carries a `day`, the left share of a band is the left share of the curve energy of the points with that `(day, off_peak)`; otherwise use the left share already computed for its HC/HP part (`f_off` / `f_peak`; the `"…|"` bands use the overall share). Both sides keep the session's kWh / cost totals within 1e-9.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `feat: merge and split keep tariff bands`

### Task 4: Rebuild fills the day type; `default_day_type`

**Files:**
- Modify: `custom_components/charge_board/rebuild.py`, `hub.py:315-371` (`async_rebuild_history`), `__init__.py:46-57`, `services.yaml`, `strings.json`, `translations/*.json` (service field)
- Test: `tests/test_rebuild.py`, `tests/test_recorder.py`

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces: `assign_day_types(s: Session, day_at: Callable[[float], str | None]) -> bool` and `apply_default_day(s: Session, day: str) -> bool` in rebuild.py (True when changed); `Hub.async_rebuild_history(start: datetime | None = None, default_day_type: str | None = None) -> dict[str, int]`.

- [ ] **Step 1: Failing tests**

```python
# tests/test_rebuild.py
def test_assign_day_types_splits_by_curve_and_keeps_totals():
    # session with off_peak/peak slices, no bands, curve 1 h HC at Bleu then 1 h HP at Blanc
    assert assign_day_types(s, day_at) is True
    assert set(s.bands) == {"Bleu|hc", "Blanc|hp"}
    # sum of each HC/HP part equals the session's off_peak / peak slice (kWh and cost)

def test_assign_day_types_leaves_sessions_with_a_day_band():  # returns False, bands unchanged
def test_default_day_converts_off_peak_and_peak():  # {"Bleu|hc": off_peak, "Bleu|hp": peak}
def test_default_day_without_off_peak_source_is_one_band():  # has_off_peak_source False -> {"Bleu|": total}
def test_default_day_is_idempotent():  # second call with "Rouge" returns False, bands still Bleu

# tests/test_recorder.py
async def test_rebuild_fills_day_types_then_default(...):
    # recorded session inside the history window (sensor.tempo history "Bleu"), an older one outside,
    # one edited: call with default_day_type="Bleu" -> all three have only "Bleu|…" bands,
    # energy_kwh / cost unchanged, response "completed" counts them
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.**
  - `assign_day_types`: no-op if any band has a day or if `day_at` gives `None` for every curve point. Otherwise weight each curve point by its energy (`w` × its window, capped like `chart.ts` `windowEnd` / `CURVE_WINDOW_MAX_S`), group by `(day_at(p.t), p.off_peak)`, and split each HC/HP slice of the session (`off_peak`, `peak`, or the whole session when `has_off_peak_source` is False) by those weights; set `p.day` on the points.
  - `apply_default_day`: only when no band has a day; rebuild `bands` from `off_peak` / `peak` (or the total as `f"{day}|"`); set `p.day` where `None`.
  - Hub: after `merge_rebuilt` / `enrich`, for every recorded session still kept (**including `edited`**) call `assign_day_types` with a day getter over the history (same `at(t)` used for samples), then `apply_default_day` when `default_day_type` is given; changed sessions count in `completed` and are saved.
  - Service schema `vol.Optional("default_day_type"): cv.string`; services.yaml text field; FR « Type de jour par défaut — appliqué aux sessions qui n'en ont toujours pas après lecture de l'historique (ex. Bleu). Une session qui a déjà un type de jour n'est jamais modifiée. »
- [ ] **Step 4: Run** → PASS with `.venv` (recorder tests run there).
- [ ] **Step 5: Commit** `feat: rebuild fills each session's day type, default_day_type for older ones`

### Task 5: Monthly band costs

**Files:**
- Modify: `custom_components/charge_board/stats.py`
- Test: `tests/test_stats.py` (and `tests/test_websocket.py` if the stats command shapes rows)

**Interfaces:**
- Produces: month rows and the total row gain `"band_cost": dict[str, float]` (priced sessions only); `session_bands(s: Session) -> dict[str, TariffSlice]` (stats.py).

- [ ] **Step 1: Failing tests**

```python
def test_month_band_costs_sum_to_the_month_cost():  # two Tempo sessions -> band_cost by key, sum == cost
def test_legacy_session_bands_come_from_off_peak_and_peak():
    # session.bands == {} with has_off_peak_source True -> {"|hc": off_peak.cost, "|hp": peak.cost}; False -> {"|": cost}
def test_unpriced_sessions_add_no_band_cost():
def test_total_row_sums_band_costs():
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** `session_bands` (the session's `bands`, else derived as in the legacy test) and `band_cost` in `_row` / `total_row`. Leave `off_peak_cost` / `peak_cost` as they are.
- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `feat: monthly cost per tariff band`

### Task 6: Panel bars and legend by band; docs; 0.6.0

**Files:**
- Create: `frontend/src/bands.ts`, `frontend/test/bands.test.ts`
- Modify: `frontend/src/api.ts:120-125` (`band_cost: Record<string, number>`), `frontend/src/chart.ts` (`barsFor`), `frontend/src/stats.ts:131-200` (`_bars`, styles), `frontend/src/i18n.ts`, `frontend/test/chart.test.ts`, `README.md` (EN + FR), `custom_components/charge_board/manifest.json` (`0.6.0`), built `custom_components/charge_board/frontend/charge-board-panel.js`

**Interfaces:**
- Consumes: `band_cost` (Task 5).
- Produces: `bandColor(key: string): string`, `bandOrder(keys: string[]): string[]`, `bandLabel(key: string, t: (k: string) => string): string` in bands.ts; `barsFor(rows: { band_cost: Record<string, number> }[], height: number): { x: number; w: number; parts: { key: string; y: number; h: number }[] }[]`.

- [ ] **Step 1: Failing tests**

```ts
// bands.test.ts
expect(bandColor("Bleu|hc")).toBe("#88c2e3");
expect(bandColor("BLUE|hp")).toBe("#1999e2");
expect(bandColor("Blanc|hp")).toBe("#e0e0e0");
expect(bandColor("red|hc")).toBe("#e38888");
expect(bandColor("|hc")).toBe("var(--info-color, #3b82f6)");
expect(bandColor("|")).toBe("var(--primary-color, #03a9f4)");
expect(bandColor("Sobriété|hp")).toBe(bandColor("Sobriété|hp")); // stable, an hsl() string
expect(bandOrder(["|hp", "Rouge|hp", "Zen|hc", "Bleu|hp", "Bleu|hc", "Blanc|hc"]))
  .toEqual(["Bleu|hc", "Bleu|hp", "Blanc|hc", "Rouge|hp", "Zen|hc", "|hp"]);
expect(bandLabel("Bleu|hc", t)).toBe("Bleu HC"); // "|hc" -> t("off_peak_slice"), "|hp" -> t("peak_slice"), "|" -> t("base")
// chart.test.ts: barsFor stacks parts in bandOrder, tallest bar = full height, empty band_cost -> no parts
```

- [ ] **Step 2: Run** `cd frontend && npm test` → FAIL.
- [ ] **Step 3: Implement.** Unknown day: hue from a string hash, HP `hsl(h 60% 42%)`, HC `hsl(h 60% 70%)`. `_bars` draws one `<rect>` per part with `fill` = `bandColor`; the legend lists `bandOrder` of the keys present in the displayed rows, a swatch with a `1px` `var(--divider-color)` outline (so `#e0e0e0` stays visible on a light background). i18n `base`: « Base » / "Base". README: the option, the bands and colours in Statistics, `default_day_type` (EN + FR). Bump `0.6.0`, `npm run build`.
- [ ] **Step 4: Run** `npm test && npm run build`, then both Python venvs → PASS; `ruff check . && ruff format --check .`.
- [ ] **Step 5: Commit** `feat: monthly bars stacked by tariff band with Tempo colours; 0.6.0`
