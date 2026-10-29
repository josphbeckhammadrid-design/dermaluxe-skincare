import { createContext, useContext, useState, type ReactNode } from "react";
import { SOLAR_BUNDLES, type SolarBundle } from "@/lib/solar";

type SolarCartCtx = {
  item: SolarBundle | null;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (b: SolarBundle) => void;
  clear: () => void;
  selected: SolarBundle;
  select: (b: SolarBundle) => void;
};

const Ctx = createContext<SolarCartCtx | null>(null);

export function SolarCartProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<SolarBundle | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, select] = useState<SolarBundle>(SOLAR_BUNDLES.find((b) => b.popular) ?? SOLAR_BUNDLES[0]!);
  return (
    <Ctx.Provider
      value={{
        item,
        open,
        setOpen,
        selected,
        select,
        add: (b) => {
          setItem(b);
          setOpen(true);
        },
        clear: () => setItem(null),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useSolarCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSolarCart must be used inside SolarCartProvider");
  return c;
}
