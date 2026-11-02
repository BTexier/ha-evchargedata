import { LitElement, css, html, nothing, svg, type PropertyValues } from "lit";
import { getOverview, getStats, type HomeAssistant, type Overview, type Stats, type StatsRow } from "./api";
import { bandColor, bandLabel, bandOrder } from "./bands";
import { barsFor } from "./chart";
import { DASH, formatCost, formatDelta, formatEnergy, formatPercent, monthOf } from "./format";
import { errorKey, langOf, localeOf, t, type Key } from "./i18n";
import { cardStyles } from "./styles";

const BAR_HEIGHT = 110;

/** Statistics tab: what charging costs per month, off-peak share, per 100 km and vs petrol. */
export class ChargeBoardStats extends LitElement {
  static properties = {
    hass: { attribute: false },
    version: { type: Number },
    _stats: { state: true },
    _overview: { state: true },
    _error: { state: true },
    _vehicle: { state: true },
    _year: { state: true },
  };

  hass!: HomeAssistant;
  version = 0;
  private _stats?: Stats;
  private _overview?: Overview;
  private _error?: Key;
  private _vehicle?: string; // "" = all vehicles; the first vehicle by default
  private _year = new Date().getFullYear();
  private _req = 0;

  protected updated(changed: PropertyValues) {
    if (["version", "_vehicle", "_year"].some((k) => changed.has(k)) && this.hass) this._fetch();
  }

  private async _fetch() {
    const req = ++this._req;
    try {
      const overview = this._overview ?? (await getOverview(this.hass));
      if (this._vehicle === undefined) this._vehicle = overview.vehicles[0]?.id ?? "";
      const stats = await getStats(this.hass, this._year, this._vehicle || undefined);
      if (req !== this._req) return;
      this._overview = overview;
      this._stats = stats;
      this._error = undefined;
    } catch (err) {
      if (req === this._req) this._error = errorKey(err);
    }
  }

  private _t(key: Key, vars?: Record<string, string>) {
    return t(langOf(this.hass), key, vars);
  }

  private _monthName(month: string, style: "long" | "short" = "long") {
    return new Date(`${month}-15T12:00:00Z`).toLocaleString(localeOf(this.hass), {
      month: style,
      ...(style === "long" && { year: "numeric" }),
      timeZone: "UTC",
    });
  }

  render() {
    if (this._error && !this._stats) return html`<p class="message">${this._t(this._error)}</p>`;
    if (!this._stats || !this._overview) return html`<p class="message">${this._t("loading")}</p>`;
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
    return html`
      <div class="filters">
        <select @change=${(e: Event) => (this._vehicle = (e.target as HTMLSelectElement).value)}>
          ${this._overview.vehicles.map(
            (v) => html`<option value=${v.id} ?selected=${v.id === this._vehicle}>${v.name}</option>`,
          )}
          <option value="" ?selected=${this._vehicle === ""}>${this._t("all_vehicles")}</option>
        </select>
        <select
          aria-label=${this._t("year")}
          @change=${(e: Event) => (this._year = Number((e.target as HTMLSelectElement).value))}
        >
          ${years.map((y) => html`<option value=${y} ?selected=${y === this._year}>${y}</option>`)}
        </select>
      </div>
      ${this._error ? html`<p class="error">${this._t(this._error)}</p>` : nothing} ${this._rolling()} ${this._head()} ${this._bars()}
      ${this._table()}
      <div class="note">${this._t("km_note")}<br />${this._t("stats_settings_note")}</div>
    `;
  }

  /** The last 30 days (whatever the year shown) against the 30 before. */
  private _rolling() {
    const { current, previous } = this._stats!.rolling;
    return this._figures(this._t("last_30_days"), current, previous, "vs_prev_30");
  }

  /** The current month (this year) or the year's total, with the five figures. */
  private _head() {
    const { rows, total } = this._stats!;
    const now = monthOf(Date.now() / 1000, this.hass.config.time_zone);
    const i = rows.findIndex((r) => r.month === now);
    const title =
      i >= 0
        ? this._t("current_month", { month: this._monthName(now) })
        : this._t("total_year", { year: String(this._year) });
    return this._figures(title, i >= 0 ? rows[i] : total, i > 0 ? rows[i - 1] : null, "vs_prev");
  }

  /** The five figures of a period; the cost compared with `prev` when it has one. */
  private _figures(title: string, row: StatsRow, prev: StatsRow | null, vs: Key) {
    const { currency } = this._stats!;
    const locale = localeOf(this.hass);
    const delta =
      prev && prev.cost && row.cost != null ? html`<small class="delta ${row.cost <= prev.cost ? "good" : "bad"}"
          >${formatDelta(row.cost / prev.cost - 1, locale)} ${this._t(vs)}</small
        >` : nothing;
    const fig = (value: unknown, label: string, sub: unknown = nothing, cls = "") =>
      html`<div class="fig"><b class=${cls}>${value}</b><span>${label}</span>${sub}</div>`;
    const petrolRef =
      row.fuel_l100 != null && row.fuel_price != null
        ? html`<small
            >${this._t("petrol_ref", {
              l100: row.fuel_l100.toLocaleString(locale, { maximumFractionDigits: 1 }),
              price: formatCost(row.fuel_price, currency, locale),
            })}</small
          >`
        : nothing;
    const savings = row.savings == null ? DASH : formatCost(-row.savings, currency, locale);
    return html`<div class="card">
      <div class="label">${title}</div>
      <div class="figs">
        ${fig(formatCost(row.cost, currency, locale), this._t("cost"), delta)}
        ${fig(formatEnergy(row.energy_kwh, locale), this._t("sessions_n", { n: String(row.sessions) }))}
        ${fig(row.off_peak_share == null ? DASH : formatPercent(row.off_peak_share, locale), this._t("off_peak_label"))}
        ${fig(
          formatCost(row.cost_per_100km, currency, locale),
          this._t("per_100km"),
          row.km == null ? nothing : html`<small>${this._t("km_n", { km: Math.round(row.km).toLocaleString(locale) })}</small>`,
        )}
        ${fig(savings, this._t("vs_petrol"), petrolRef, row.savings != null && row.savings > 0 ? "good" : "")}
      </div>
    </div>`;
  }

  private _bars() {
    const rows = this._stats!.rows;
    const bars = barsFor(rows, BAR_HEIGHT);
    const present = bandOrder([...new Set(bars.flatMap((b) => b.parts.map((p) => p.key)))]);
    return html`<div class="card">
      <div class="label">
        ${this._t("cost_by_month")}
        <span class="legend">
          ${present.map(
            (k) => html`<span><i style="background:${bandColor(k)}"></i>${bandLabel(k, (key) => this._t(key))}</span>`,
          )}
        </span>
      </div>
      <svg viewBox="0 0 100 ${BAR_HEIGHT}" preserveAspectRatio="none" class="bars" role="img">
        ${bars.map((b) =>
          b.parts.map(
            (p) => svg`<rect x=${b.x} width=${b.w} y=${p.y} height=${p.h} style="fill:${bandColor(p.key)}"></rect>`,
          ),
        )}
      </svg>
      <div class="months">${rows.map((r) => html`<span>${this._monthName(r.month!, "short")}</span>`)}</div>
    </div>`;
  }

  private _table() {
    const { rows, total, currency } = this._stats!;
    const locale = localeOf(this.hass);
    const now = monthOf(Date.now() / 1000, this.hass.config.time_zone);
    const shown = rows.filter((r) => r.month! <= now && (r.sessions || r.km != null));
    const kwh = (v: number) => v.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const line = (r: StatsRow, name: string, cls = "") => html`<tr class=${cls}>
      <td>${name}</td>
      <td>${r.sessions}</td>
      <td>${kwh(r.energy_kwh)}</td>
      <td><b>${formatCost(r.cost, currency, locale)}</b></td>
      <td>${r.off_peak_share == null ? DASH : formatPercent(r.off_peak_share, locale)}</td>
      <td>
        ${r.km == null ? DASH : Math.round(r.km).toLocaleString(locale)}${r.km_partial ? " *" : ""}
      </td>
      <td>${r.cost_per_100km == null ? DASH : formatCost(r.cost_per_100km, currency, locale)}</td>
      <td class=${r.savings != null && r.savings > 0 ? "good" : ""}>
        ${r.savings == null ? DASH : formatCost(-r.savings, currency, locale)}
      </td>
    </tr>`;
    const cols: Key[] = ["col_month", "col_sessions", "col_kwh", "col_cost", "col_hc", "col_km", "col_per_100", "col_vs_petrol"];
    return html`<div class="scroll">
      <table>
        <thead>
          <tr>${cols.map((c) => html`<th>${this._t(c)}</th>`)}</tr>
        </thead>
        <tbody>
          ${shown.reverse().map((r) => line(r, this._monthName(r.month!)))}
          ${line(total, this._t("total_year", { year: String(this._year) }), "total")}
        </tbody>
      </table>
    </div>`;
  }

  static styles = [
    cardStyles,
    css`
      .bars {
        width: 100%;
        height: ${BAR_HEIGHT}px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .legend {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 4px 12px;
        margin-left: 8px;
      }
      .legend i {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 4px;
        border-radius: 2px;
        outline: 1px solid var(--divider-color, #e0e0e0);
        vertical-align: -1px;
      }
      .months {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        text-align: center;
        font-size: 0.75em;
        color: var(--secondary-text-color);
      }
      tr.total {
        font-weight: 600;
      }
    `,
  ];
}

customElements.define("charge-board-stats", ChargeBoardStats);
