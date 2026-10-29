import { useState } from "react";
import { Star, Truck, Banknote, MessageCircle, Sun, Usb, Smartphone, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmergCart } from "./cart";
import { formatMXN } from "@/lib/product";
import { EMERG_BUNDLES, emergSavings, emergDiscountPercent, emergPricePerPiece } from "@/lib/emergencia";
import heroImg from "@/assets/emerg-hero.jpg";
import blackoutImg from "@/assets/emerg-blackout.jpg";
import powerImg from "@/assets/emerg-powerbank.jpg";
import outdoorImg from "@/assets/emerg-outdoor.jpg";
import sosImg from "@/assets/emerg-sos.jpg";

const GALLERY = [
  { src: heroImg, alt: "Luz LED de emergencia naranja con 4 paneles encendidos" },
  { src: blackoutImg, alt: "Familia iluminada por la luz de emergencia durante un apagón" },
  { src: powerImg, alt: "Luz de emergencia cargando un celular por USB" },
  { src: outdoorImg, alt: "Luz de emergencia bajo la lluvia en un campamento" },
  { src: sosImg, alt: "Modo emergencia con destellos rojo y azul en carretera" },
];

const KPIS = [
  { i: Sun, v: "2", l: "Formas de carga" },
  { i: Smartphone, v: "USB", l: "Carga tu celular" },
  { i: Droplets, v: "IP66", l: "Lluvia y golpes" },
  { i: Usb, v: "5", l: "Modos de luz" },
];

export function EmergBuyBox() {
  const [active, setActive] = useState(0);
  const { selected, select, add } = useEmergCart();

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-night">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-14">
        {/* Gallery */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-xl border bg-card shadow-panel">
            <img
              src={GALLERY[active]!.src}
              alt={GALLERY[active]!.alt}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
              <span className="label-lab rounded bg-primary px-3 py-1.5 font-semibold text-primary-foreground">
                −{emergDiscountPercent(EMERG_BUNDLES[0]!)}% hoy
              </span>
              <span className="label-lab rounded bg-background/80 px-3 py-1.5 text-circuit backdrop-blur">
                ● Lista para cualquier apagón
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-2 bg-hazard opacity-90" />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`overflow-hidden rounded-md border-2 transition ${i === active ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={g.src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy panel */}
        <div className="min-w-0 animate-rise">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9</span>
            <span className="text-muted-foreground">· Más de 10,000 familias protegidas</span>
          </div>

          <p className="label-lab mt-5 text-primary">Luz LED de emergencia · 5 modos · Solar + USB</p>
          <h1 className="mt-3 text-4xl leading-[1.02] sm:text-6xl">
            Que el próximo apagón <span className="text-primary text-glow">no te deje a oscuras.</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Luz potente al instante, se carga con el sol o por USB y además carga tu celular. Para tu casa, tu carro y
            cualquier imprevisto.
          </p>

          <div className="mt-6 grid grid-cols-4 overflow-hidden rounded-lg border bg-card">
            {KPIS.map(({ i: I, v, l }, idx) => (
              <div key={l} className={`min-w-0 px-1.5 py-3 text-center ${idx ? "border-l" : ""}`}>
                <I className="mx-auto size-4 text-primary" />
                <p className="mt-1.5 font-display text-xl font-semibold leading-none">{v}</p>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>

          {/* Bundles */}
          <div className="mt-8">
            <div className="flex items-end justify-between gap-3">
              <p className="label-lab">Elige tu paquete</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 animate-pulse rounded-full bg-primary" /> 41 personas viendo ahora
              </p>
            </div>
            <div className="mt-3 space-y-3" role="radiogroup" aria-label="Paquetes">
              {EMERG_BUNDLES.map((b) => {
                const on = selected.id === b.id;
                return (
                  <button
                    key={b.id}
                    role="radio"
                    aria-checked={on}
                    onClick={() => select(b)}
                    className={`relative flex w-full items-center gap-4 rounded-lg border-2 bg-card p-4 text-left transition ${on ? "border-primary shadow-glow" : "border-border hover:border-primary/40"}`}
                  >
                    {b.popular && (
                      <span className="label-lab absolute -top-2.5 right-4 rounded bg-primary px-2.5 py-1 font-semibold text-primary-foreground">
                        Más comprado
                      </span>
                    )}
                    <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-primary" : "border-input"}`}>
                      {on && <span className="size-2.5 rounded-full bg-primary" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{b.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.note} · {formatMXN(emergPricePerPiece(b))} c/u · Envío gratis
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-xl font-semibold">{formatMXN(b.price)}</p>
                      <p className="text-xs text-muted-foreground line-through">{formatMXN(b.compareAt)}</p>
                      <p className="text-xs font-medium text-primary">Ahorras {formatMXN(emergSavings(b))}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button variant="glow" size="xl" className="mt-5 h-auto w-full flex-col gap-0.5 py-3" onClick={() => add(selected)}>
            <span>Compra ahora, paga al recibir</span>
            <span className="text-sm font-medium opacity-80">{formatMXN(selected.price)} · Pago contra entrega</span>
          </Button>
          <ol className="mt-3 grid gap-2 rounded-lg border border-border/60 bg-card/40 p-3 text-sm">
            {[
              ["Confirma tu pedido", "Te llamamos o escribimos por WhatsApp para confirmar tus datos."],
              ["Recibe en 1–3 días", "Te la llevamos hasta la puerta de tu casa."],
              ["Paga al recibir", "Pagas en efectivo hasta que tienes tu luz en tus manos."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                <span className="min-w-0">
                  <span className="font-semibold text-foreground">{t}.</span>{" "}
                  <span className="text-muted-foreground">{d}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { i: Truck, t: "Envío gratis", s: "A todo México" },
              { i: Banknote, t: "Pago contra entrega", s: "Pagas al recibir" },
              { i: MessageCircle, t: "Atención por WhatsApp", s: "Confirmamos tu pedido" },
            ].map(({ i: I, t, s }) => (
              <div key={t} className={`flex flex-col items-center gap-1 rounded-md border px-2 py-3 ${I === MessageCircle ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
                <I className={`size-4 ${I === MessageCircle ? "" : "text-primary"}`} />
                <span className="font-medium">{t}</span>
                <span className={I === MessageCircle ? "opacity-80" : "text-muted-foreground"}>{s}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-primary/40 bg-card p-5">
            <p className="label-lab text-primary">En la caja</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {["Reflector LED solar", "Cable USB", "Soporte ajustable 180°", "Manual de uso"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
