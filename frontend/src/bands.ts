// Tariff bands "<day>|<hc|hp|>" (see band_key in model.py): colours, order, labels.

const DAYS: Record<string, { hc: string; hp: string; rank: number }> = {
  bleu: { hc: "#88c2e3", hp: "#1999e2", rank: 0 },
  blanc: { hc: "#8f8f8f", hp: "#e0e0e0", rank: 1 },
  rouge: { hc: "#e38888", hp: "#e42323", rank: 2 },
};
const ALIASES: Record<string, string> = { blue: "bleu", white: "blanc", red: "rouge" };

const split = (key: string) => {
  const i = key.lastIndexOf("|");
  return { day: key.slice(0, i), part: key.slice(i + 1) };
};
const known = (day: string) => DAYS[ALIASES[day.toLowerCase()] ?? day.toLowerCase()];

/** Stable hue of a day type the panel does not know (e.g. a Zen Flex or EJP day). */
function hue(day: string): number {
  let h = 0;
  for (const c of day) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

export function bandColor(key: string): string {
  const { day, part } = split(key);
  if (!day) {
    if (part === "hc") return "var(--info-color, #3b82f6)";
    if (part === "hp") return "var(--warning-color, #f59e0b)";
    return "var(--primary-color, #03a9f4)";
  }
  const k = known(day);
  if (k) return part === "hc" ? k.hc : k.hp;
  return `hsl(${hue(day)} 60% ${part === "hc" ? 70 : 42}%)`;
}

/** Bottom to top: bleu, blanc, rouge, other days alphabetically, no day; hc, hp, none. */
export function bandOrder(keys: string[]): string[] {
  const rank = (key: string): [number, string, number] => {
    const { day, part } = split(key);
    const k = day ? known(day) : undefined;
    return [k ? k.rank : day ? 3 : 4, day, part === "hc" ? 0 : part === "hp" ? 1 : 2];
  };
  return [...keys].sort((a, b) => {
    const [ra, da, pa] = rank(a);
    const [rb, db, pb] = rank(b);
    return ra - rb || da.localeCompare(db) || pa - pb;
  });
}

export function bandLabel(key: string, t: (k: "off_peak_slice" | "peak_slice" | "base") => string): string {
  const { day, part } = split(key);
  if (!day) return t(part === "hc" ? "off_peak_slice" : part === "hp" ? "peak_slice" : "base");
  return part ? `${day} ${part.toUpperCase()}` : day;
}
