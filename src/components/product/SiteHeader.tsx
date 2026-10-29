import { ShoppingBag, ShieldCheck, Truck, Banknote, FlaskConical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart";
import { formatMXN, bundleSavings } from "@/lib/product";
import productHero from "@/assets/kormesic-hero.jpg";

const ANNOUNCE = [
  { icon: Truck, t: "Envío express gratis desde 2 frascos" },
  { icon: Banknote, t: "Pago contra entrega en todo México" },
  { icon: ShieldCheck, t: "Garantía de 60 días o te devolvemos tu dinero" },
  { icon: FlaskConical, t: "Fórmula probada dermatológicamente" },
];

export function AnnouncementBar() {
  const items = [...ANNOUNCE, ...ANNOUNCE];
  return (
    <div className="overflow-hidden bg-ink text-ink-foreground">
      <div className="flex w-max animate-marquee gap-12 py-2.5">
        {items.map(({ icon: Icon, t }, i) => (
          <span key={i} className="label-lab flex items-center gap-2 whitespace-nowrap">
            <Icon className="size-3.5 text-mint-strong" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { item, open, setOpen, clear } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-[0.2em] text-ink">KORMESIC</span>
          <span className="label-lab hidden text-muted-foreground sm:inline">Clinical Skincare</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#formula" className="hover:text-primary">Fórmula</a>
          <a href="#resultados" className="hover:text-primary">Resultados</a>
          <a href="#uso" className="hover:text-primary">Modo de uso</a>
          <a href="#resenas" className="hover:text-primary">Reseñas</a>
          <a href="#preguntas" className="hover:text-primary">Preguntas</a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir carrito"
          className="relative flex size-10 items-center justify-center rounded-full border bg-card text-primary transition hover:bg-mint"
        >
          <ShoppingBag className="size-4" />
          {item && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-serum text-[10px] font-semibold text-serum-foreground">
              {item.qty}
            </span>
          )}
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-3xl font-normal">Tu tratamiento</SheetTitle>
          </SheetHeader>
          {item ? (
            <div className="flex flex-1 flex-col gap-6 px-4">
              <div className="flex gap-4 rounded-xl border bg-card p-3">
                <img src={productHero} alt="KORMESIC Acid peel pads" className="size-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">Pads Exfoliantes BHA 2% · AHA 30%</p>
                  <p className="text-sm text-muted-foreground">{item.label} · {item.note}</p>
                  <p className="mt-1 font-semibold text-primary">{formatMXN(item.price)}</p>
                </div>
                <button onClick={clear} aria-label="Quitar" className="self-start text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="space-y-2 rounded-xl bg-mint p-4 text-sm">
                <Row l="Subtotal" r={formatMXN(item.compareAt)} />
                <Row l="Ahorro del paquete" r={`− ${formatMXN(bundleSavings(item))}`} accent />
                <Row l="Envío express" r={item.freeShipping ? "Gratis" : formatMXN(149)} />
                <div className="my-2 border-t border-primary/15" />
                <Row l="Total a pagar al recibir" r={formatMXN(item.price + (item.freeShipping ? 0 : 149))} strong />
              </div>
              <div className="mt-auto space-y-3 pb-6">
                <Button
                  variant="clinical"
                  size="xl"
                  className="w-full"
                  onClick={() => toast.success("¡Gracias! Te contactaremos para confirmar tu pedido.")}
                >
                  Pedir y pagar al recibir
                </Button>
                <p className="text-center text-xs text-muted-foreground">Pagas en efectivo cuando llegue a tu puerta · 1–3 días</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <FlaskConical className="size-10 text-mint-strong" />
              <p className="font-display text-2xl">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground">Elige tu paquete para empezar tu tratamiento.</p>
              <Button variant="lab" onClick={() => setOpen(false)}>Ver paquetes</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}

function Row({ l, r, strong, accent }: { l: string; r: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-base font-semibold text-ink" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{l}</span>
      <span className={accent ? "font-medium text-serum" : ""}>{r}</span>
    </div>
  );
}
