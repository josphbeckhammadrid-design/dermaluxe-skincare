import { ShoppingCart, Truck, Banknote, Sun, MessageCircle, Trash2, Lightbulb, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEmergCart } from "./cart";
import { formatMXN } from "@/lib/product";
import { emergSavings } from "@/lib/emergencia";
import heroImg from "@/assets/emerg-hero.jpg";

const ANNOUNCE = [
  { icon: Truck, t: "Envío gratis a todo México" },
  { icon: Banknote, t: "Paga al recibir en tu casa" },
  { icon: Sun, t: "Carga solar y USB · lista para cualquier apagón" },
  { icon: ShieldCheck, t: "Garantía de satisfacción" },
  { icon: MessageCircle, t: "Te confirmamos tu pedido por WhatsApp" },
];

export function EmergAnnouncement() {
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

export function EmergHeader() {
  const { item, open, setOpen, clear } = useEmergCart();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-glow">
            <Lightbulb className="size-4" />
          </span>
          <span className="truncate font-display text-xl font-semibold uppercase tracking-[0.14em]">Lumiguard</span>
          <span className="label-lab hidden text-muted-foreground sm:inline">· Luz de respaldo</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#modos" className="hover:text-primary">5 modos</a>
          <a href="#specs" className="hover:text-primary">Ficha técnica</a>
          <a href="#energia" className="hover:text-primary">Carga</a>
          <a href="#opiniones" className="hover:text-primary">Opiniones</a>
          <a href="#preguntas" className="hover:text-primary">Preguntas</a>
        </nav>
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir pedido"
          className="relative flex size-10 shrink-0 items-center justify-center rounded-md border bg-card text-primary transition hover:border-primary/60"
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
        <SheetContent className="theme-emergencia flex w-full flex-col border-border sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl font-semibold uppercase text-foreground">Tu pedido</SheetTitle>
          </SheetHeader>
          {item ? (
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex gap-4 rounded-lg border bg-card p-3">
                <img src={heroImg} alt="Luz LED de emergencia" className="size-20 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">Luz LED de emergencia · 5 modos</p>
                  <p className="text-sm text-muted-foreground">{item.label} · {item.note}</p>
                  <p className="mt-1 font-semibold text-primary">{formatMXN(item.price)}</p>
                </div>
                <button onClick={clear} aria-label="Quitar" className="self-start text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="space-y-2 rounded-lg border bg-muted p-4 text-sm">
                <Row l="Precio normal" r={formatMXN(item.compareAt)} />
                <Row l="Descuento del paquete" r={`− ${formatMXN(emergSavings(item))}`} accent />
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
              <Lightbulb className="size-10 text-primary" />
              <p className="font-display text-xl font-semibold uppercase">Tu pedido está vacío</p>
              <p className="text-sm text-muted-foreground">Elige cuántos reflectores necesitas para tu casa.</p>
              <Button variant="glow" onClick={() => setOpen(false)}>Ver paquetes</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}

function Row({ l, r, strong, accent }: { l: string; r: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 ${strong ? "text-base font-semibold" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{l}</span>
      <span className={accent ? "font-medium text-primary" : ""}>{r}</span>
    </div>
  );
}
