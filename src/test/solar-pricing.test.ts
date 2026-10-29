import { describe, expect, it } from "vitest";
import { SOLAR_BUNDLES, SOLAR_FREE_SHIPPING, solarSavings } from "@/lib/solar";

const byQty = (q: number) => SOLAR_BUNDLES.find((b) => b.qty === q)!;

describe("Paquetes de lámpara solar", () => {
  it("1 pieza cuesta $699 (antes $899)", () => {
    expect(byQty(1).price).toBe(699);
    expect(byQty(1).compareAt).toBe(899);
  });

  it("2 piezas cuestan $979 y ahorras $419", () => {
    expect(byQty(2).price).toBe(979);
    expect(solarSavings(byQty(2))).toBe(419);
  });

  it("3 piezas cuestan $1,299 y ahorras $798", () => {
    expect(byQty(3).price).toBe(1299);
    expect(solarSavings(byQty(3))).toBe(798);
  });

  it("5 piezas cuestan $1,599, ahorras $1,896 y es el más comprado", () => {
    expect(byQty(5).price).toBe(1599);
    expect(solarSavings(byQty(5))).toBe(1896);
    expect(byQty(5).popular).toBe(true);
  });

  it("envío gratis en todos los paquetes", () => {
    expect(SOLAR_FREE_SHIPPING).toBe(true);
  });
});
