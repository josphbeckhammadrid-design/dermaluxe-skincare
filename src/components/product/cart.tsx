import { createContext, useContext, useState, type ReactNode } from "react";
import { BUNDLES, type Bundle } from "@/lib/product";

type CartCtx = {
  item: Bundle | null;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (b: Bundle) => void;
  clear: () => void;
  selected: Bundle;
  select: (b: Bundle) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<Bundle | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, select] = useState<Bundle>(BUNDLES[1]);
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

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
