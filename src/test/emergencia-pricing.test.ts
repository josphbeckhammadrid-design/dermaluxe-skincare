import { describe, expect, it } from "vitest";
import { EMERG_BUNDLES, EMERG_FREE_SHIPPING, emergSavings } from "@/lib/emergencia";

const byQty = (q: number) => EMERG_BUNDLES.find((b) => b.qty === q)!;

describe("Paquetes de luz LED de emergencia", () => {
  it("1 reflector cuesta $799 (antes $1,399)", () => {
    expect(byQty(1).price).toBe(799);
    expect(byQty(1).compareAt).toBe(1399);
  });

  it("2 reflectores cuestan $1,098 y es el más comprado", () => {
    expect(byQty(2).price).toBe(1098);
    expect(byQty(2).popular).toBe(true);
  });

  it("3 reflectores cuestan $1,497 y ahorras $2,700", () => {
    expect(byQty(3).price).toBe(1497);
    expect(emergSavings(byQty(3))).toBe(2700);
  });

  it("envío gratis en todos los paquetes", () => {
    expect(EMERG_FREE_SHIPPING).toBe(true);
  });
});
