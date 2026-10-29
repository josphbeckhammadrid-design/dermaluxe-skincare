import { createContext, useContext, useState, type ReactNode } from "react";
import { EMERG_BUNDLES, type EmergBundle } from "@/lib/emergencia";

type EmergCartCtx = {
  item: EmergBundle | null;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (b: EmergBundle) => void;
  clear: () => void;
  selected: EmergBundle;
  select: (b: EmergBundle) => void;
};

const Ctx = createContext<EmergCartCtx | null>(null);

export function EmergCartProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<EmergBundle | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, select] = useState<EmergBundle>(EMERG_BUNDLES.find((b) => b.popular) ?? EMERG_BUNDLES[0]!);
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

export function useEmergCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useEmergCart must be used inside EmergCartProvider");
  return c;
}
