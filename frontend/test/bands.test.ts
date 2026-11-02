import { describe, expect, it } from "vitest";
import { bandColor, bandLabel, bandOrder } from "../src/bands";

describe("tariff bands", () => {
  it("uses the Tempo colours whatever the integration's spelling", () => {
    expect(bandColor("Bleu|hc")).toBe("#88c2e3");
    expect(bandColor("BLUE|hp")).toBe("#1999e2");
    expect(bandColor("Blanc|hc")).toBe("#8f8f8f");
    expect(bandColor("Blanc|hp")).toBe("#e0e0e0");
    expect(bandColor("red|hc")).toBe("#e38888");
    expect(bandColor("Rouge|hp")).toBe("#e42323");
  });
  it("keeps the current colours without a day type", () => {
    expect(bandColor("|hc")).toBe("var(--info-color, #3b82f6)");
    expect(bandColor("|hp")).toBe("var(--warning-color, #f59e0b)");
    expect(bandColor("|")).toBe("var(--primary-color, #03a9f4)");
  });
  it("gives an unknown day a stable hue, darker for peak", () => {
    expect(bandColor("Sobriété|hp")).toBe(bandColor("Sobriété|hp"));
    expect(bandColor("Sobriété|hp")).toMatch(/^hsl\(\d+ 60% 42%\)$/);
    expect(bandColor("Sobriété|hc")).toMatch(/^hsl\(\d+ 60% 70%\)$/);
  });
  it("orders bands bleu, blanc, rouge, unknown days, no day; hc before hp", () => {
    expect(bandOrder(["|hp", "Rouge|hp", "Zen|hc", "Bleu|hp", "Bleu|hc", "Blanc|hc", "Abc|hp"])).toEqual([
      "Bleu|hc",
      "Bleu|hp",
      "Blanc|hc",
      "Rouge|hp",
      "Abc|hp",
      "Zen|hc",
      "|hp",
    ]);
  });
  it("labels bands", () => {
    const t = (k: string) => ({ off_peak_slice: "Heures creuses", peak_slice: "Heures pleines", base: "Base" })[k]!;
    expect(bandLabel("Bleu|hc", t)).toBe("Bleu HC");
    expect(bandLabel("Rouge|hp", t)).toBe("Rouge HP");
    expect(bandLabel("Zen|", t)).toBe("Zen");
    expect(bandLabel("|hc", t)).toBe("Heures creuses");
    expect(bandLabel("|hp", t)).toBe("Heures pleines");
    expect(bandLabel("|", t)).toBe("Base");
  });
});
