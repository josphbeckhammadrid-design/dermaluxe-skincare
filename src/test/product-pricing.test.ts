import { describe, expect, it } from "vitest";
import { BUNDLES, bundleSavings } from "@/lib/product";

const byQty = (q: number) => BUNDLES.find((b) => b.qty === q)!;

describe("Paquetes de pads", () => {
  it("1 frasco cuesta $699 (antes $899)", () => {
    expect(byQty(1).price).toBe(699);
    expect(byQty(1).compareAt).toBe(899);
  });

  it("2 frascos cuestan $899 y ahorras $499", () => {
    expect(byQty(2).price).toBe(899);
    expect(bundleSavings(byQty(2))).toBe(499);
  });

  it("3 frascos cuestan $1,199 y ahorras $898", () => {
    expect(byQty(3).price).toBe(1199);
    expect(bundleSavings(byQty(3))).toBe(898);
  });

  it("envío gratis solo desde 2 frascos", () => {
    expect(byQty(1).freeShipping).toBe(false);
    expect(byQty(2).freeShipping).toBe(true);
    expect(byQty(3).freeShipping).toBe(true);
  });
});
