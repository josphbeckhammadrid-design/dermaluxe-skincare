import { ShoppingCart, Truck, Banknote, Sun, MessageCircle, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSolarCart } from "./cart";
import { formatMXN } from "@/lib/product";
import { solarSavings } from "@/lib/solar";
import heroImg from "@/assets/solar-hero.jpg";

const ANNOUNCE = [
  { icon: Truck, t: "Envío gratis a todo México" },
  { icon: Banknote, t: "Pago contra entrega" },
  { icon: Sun, t: "Se carga con el sol · cero recibo de luz" },
  { icon: MessageCircle, t: "Te confirmamos tu pedido por WhatsApp" },
];

export function SolarAnnouncement() {
  const items = [...ANNOUNCE, ...ANNOUNCE];
  return (
    <div className="overflow-hidden bg-primary text-primary-foreground">
      <div className="flex w-max animate-marquee gap-8 py-2.5 sm:gap-12">
        {items.map(({ icon: Icon, t }, i) => (
          <span key={i} className="label-lab flex items-center gap-2 whitespace-nowrap text-xs font-semibold sm:text-[0.6875rem]">
            <Icon className="size-3.5 shrink-0" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SolarHeader() {
  const { item, open, setOpen, clear } = useSolarCart();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-glow">
            <Zap className="size-4" />
          </span>
          <span className="font-display text-xl font-semibold tracking-[0.18em]">SOLARA</span>
          <span className="label-lab hidden text-muted-foreground sm:inline">· Iluminación solar</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#demo" className="hover:text-primary">Pruébala</a>
          <a href="#specs" className="hover:text-primary">Ficha técnica</a>
          <a href="#usos" className="hover:text-primary">Dónde usarla</a>
          <a href="#opiniones" className="hover:text-primary">Opiniones</a>
          <a href="#preguntas" className="hover:text-primary">Preguntas</a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir carrito"
          className="relative flex size-10 items-center justify-center rounded-md border bg-card text-primary transition hover:border-primary/60"
        >
          <ShoppingCart className="size-4" />
          {item && (
            <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {item.qty}
            </span>
          )}
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="theme-solar flex w-full flex-col border-border sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl font-semibold text-foreground">Tu pedido</SheetTitle>
          </SheetHeader>
          {item ? (
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex gap-4 rounded-lg border bg-card p-3">
                <img src={heroImg} alt="Lámpara solar LED 9 COB" className="size-20 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="font-medium">Lámpara solar LED 9 COB con sensor</p>
                  <p className="text-sm text-muted-foreground">{item.label} · {item.note}</p>
                  <p className="mt-1 font-semibold text-primary">{formatMXN(item.price)}</p>
                </div>
                <button onClick={clear} aria-label="Quitar" className="self-start text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="space-y-2 rounded-lg border bg-muted p-4 text-sm">
                <Row l="Precio normal" r={formatMXN(item.compareAt)} />
                <Row l="Descuento del paquete" r={`− ${formatMXN(solarSavings(item))}`} accent />
                <Row l="Envío" r="Gratis" />
                <div className="my-2 border-t" />
                <Row l="Total a pagar al recibir" r={formatMXN(item.price)} strong />
              </div>
              <div className="mt-auto space-y-3 pb-2">
                <Button
                  variant="glow"
                  size="xl"
                  className="w-full"
                  onClick={() => toast.success("¡Gracias! Te escribimos por WhatsApp para confirmar tu pedido.")}
                >
                  Pedir y pagar al recibir
                </Button>
                <p className="text-center text-xs text-muted-foreground">Pagas en efectivo cuando llegue a tu puerta</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <Sun className="size-10 text-primary" />
              <p className="font-display text-xl font-semibold">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground">Elige cuántas lámparas necesitas para tu casa.</p>
              <Button variant="tech" onClick={() => setOpen(false)}>Ver paquetes</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}

function Row({ l, r, strong, accent }: { l: string; r: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-base font-semibold" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{l}</span>
      <span className={accent ? "font-medium text-primary" : ""}>{r}</span>
    </div>
  );
}
