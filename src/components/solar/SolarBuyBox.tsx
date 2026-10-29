import { useState } from "react";
import { Star, Truck, Banknote, MessageCircle, Sun, Moon, ScanLine, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSolarCart } from "./cart";
import { formatMXN } from "@/lib/product";
import { SOLAR_BUNDLES, solarSavings, solarDiscountPercent, pricePerPiece } from "@/lib/solar";
import heroImg from "@/assets/solar-hero.jpg";
import nightImg from "@/assets/solar-night.jpg";
import sunImg from "@/assets/solar-sun.jpg";
import remoteImg from "@/assets/solar-remote.jpg";

const GALLERY = [
  { src: heroImg, alt: "Lámpara solar LED 9 paneles COB, frente, reverso y control remoto" },
  { src: nightImg, alt: "Lámpara solar iluminando una cochera de noche" },
  { src: sunImg, alt: "Panel solar trasero cargándose con el sol" },
  { src: remoteImg, alt: "Control remoto encendiendo la lámpara solar" },
];

const KPIS = [
  { i: Sun, v: "6–8 h", l: "Carga solar" },
  { i: Moon, v: "+6 h", l: "Luz de noche" },
  { i: ScanLine, v: "120°", l: "Sensor 3–5 m" },
  { i: CloudRain, v: "IP66", l: "Resiste lluvia" },
];

export function SolarBuyBox() {
  const [active, setActive] = useState(0);
  const { selected, select, add } = useSolarCart();

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-night">
      <div className="absolute inset-0 bg-tech-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-xl border bg-card shadow-panel">
            <img
              src={GALLERY[active]!.src}
              alt={GALLERY[active]!.alt}
              width={1280}
              height={1280}
              className="aspect-square w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <span className="label-lab rounded bg-background/80 px-3 py-1.5 text-circuit backdrop-blur">
                ● Tecnología solar
              </span>
              <span className="label-lab rounded bg-primary px-3 py-1.5 font-semibold text-primary-foreground">
                −{solarDiscountPercent(SOLAR_BUNDLES[0]!)}% lanzamiento
              </span>
            </div>
            <div className="absolute bottom-4 right-4 rounded-md border bg-background/80 px-3 py-2 text-right backdrop-blur">
              <p className="label-lab text-muted-foreground">Modelo SLR-9COB</p>
              <p className="font-display text-lg font-semibold leading-tight">9 LED COB · PIR 120°</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
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
        <div className="animate-rise">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9</span>
            <span className="text-muted-foreground">· Recomendada para iluminación exterior</span>
          </div>

          <p className="label-lab mt-5 text-circuit">Lámpara solar LED · 9 paneles COB · Sensor de movimiento</p>
          <h1 className="mt-3 text-4xl leading-[1.02] sm:text-5xl">
            Ilumina tu casa con el sol, <span className="text-primary text-glow">sin pagar luz.</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Se carga sola de día y se enciende sola de noche cuando detecta movimiento. Sin cables, sin
            electricista y sin subir tu recibo.
          </p>

          <div className="mt-6 grid grid-cols-4 overflow-hidden rounded-lg border bg-card">
            {KPIS.map(({ i: I, v, l }, idx) => (
              <div key={l} className={`px-2 py-3 text-center ${idx ? "border-l" : ""}`}>
                <I className="mx-auto size-4 text-circuit" />
                <p className="mt-1.5 font-display text-xl font-semibold leading-none">{v}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>

          {/* Bundles */}
          <div className="mt-8">
            <div className="flex items-end justify-between">
              <p className="label-lab">Ahorra con tu paquete</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 animate-pulse rounded-full bg-primary" /> 35 personas viendo ahora
              </p>
            </div>
            <div className="mt-3 space-y-3" role="radiogroup" aria-label="Paquetes">
              {SOLAR_BUNDLES.map((b) => {
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
                    <div className="flex-1">
                      <p className="font-semibold">{b.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.note} · {formatMXN(pricePerPiece(b))} c/u · Envío gratis
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-semibold">{formatMXN(b.price)}</p>
                      <p className="text-xs text-muted-foreground line-through">{formatMXN(b.compareAt)}</p>
                      {b.qty > 1 && <p className="text-xs font-medium text-circuit">Ahorras {formatMXN(solarSavings(b))}</p>}
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

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { i: Truck, t: "Envío gratis", s: "A todo México" },
              { i: Banknote, t: "Pago contra entrega", s: "Pagas al recibir" },
              { i: MessageCircle, t: "Atención por WhatsApp", s: "Confirmamos tu pedido" },
            ].map(({ i: I, t, s }) => (
              <div key={t} className="flex flex-col items-center gap-1 rounded-md border bg-card px-2 py-3">
                <I className="size-4 text-primary" />
                <span className="font-medium">{t}</span>
                <span className="text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-circuit/40 bg-card p-5">
            <p className="label-lab text-circuit">En la caja</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {["Lámpara solar 9 COB", "Control remoto", "Soporte orientable", "Tornillos de montaje"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
