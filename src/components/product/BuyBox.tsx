import { useState } from "react";
import { Check, Star, Truck, Banknote, ShieldCheck, Gift, Users, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart";
import { BUNDLES, bundleSavings, bundleDiscountPercent, formatMXN, pricePerPad } from "@/lib/product";
import heroImg from "@/assets/kormesic-hero.jpg";
import openImg from "@/assets/kormesic-open.jpg";
import realImg from "@/assets/kormesic-real.jpg.asset.json";
import padImg from "@/assets/pad-macro.jpg";
import ritualImg from "@/assets/ritual.jpg";

const GALLERY = [
  { src: heroImg, alt: "Frasco KORMESIC Acid peel pads en laboratorio" },
  { src: openImg, alt: "Frasco abierto con pads exfoliantes" },
  { src: realImg.url, alt: "Foto real del producto KORMESIC" },
  { src: padImg, alt: "Pad exfoliante humedecido de cerca" },
  { src: ritualImg, alt: "Mujer aplicando el pad en su mejilla" },
];

const TIMELINE = [
  { t: "Esta noche", d: "La piel se siente lisa al tacto" },
  { t: "7 a 14 días", d: "Menos brillo y puntos negros, textura más pareja" },
  { t: "6 a 8 semanas", d: "Tono más uniforme y marcas superficiales menos visibles" },
];

export function BuyBox() {
  const [active, setActive] = useState(0);
  const { selected, select, add } = useCart();

  return (
    <section id="top" className="relative bg-gradient-lab">
      <div className="absolute inset-0 bg-lab-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-14">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-clinical">
            <img
              src={GALLERY[active]!.src}
              alt={GALLERY[active]!.alt}
              width={1280}
              height={1280}
              className="aspect-square w-full object-cover"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <span className="label-lab rounded-full bg-card/90 px-3 py-1.5 text-primary backdrop-blur">Fórmula clínica</span>
              <span className="label-lab rounded-full bg-serum px-3 py-1.5 text-serum-foreground">−{bundleDiscountPercent(BUNDLES[0]!)}% lanzamiento</span>
            </div>
            <div className="absolute bottom-4 right-4 rounded-xl border bg-card/90 p-3 text-right backdrop-blur">
              <p className="label-lab text-muted-foreground">Ref. KRM-50</p>
              <p className="font-display text-2xl leading-none text-ink">BHA 2% · AHA 30%</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`overflow-hidden rounded-lg border-2 transition ${i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <img src={g.src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy panel */}
        <div className="animate-rise">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex text-serum">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="font-medium">4.9</span>
            <span className="text-muted-foreground">· 3,427 reseñas verificadas</span>
          </div>

          <p className="label-lab mt-5 text-primary">KORMESIC · Acid peel pads · 50 pads</p>
          <h1 className="mt-2 text-5xl leading-[0.95] text-ink sm:text-6xl">
            Poros limpios y piel de <em className="text-primary">porcelana</em>, en un solo pad.
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Exfoliación química coreana con ácido salicílico 2% y glicólico 30%. Destapa poros, controla la grasa y
            empareja el tono mientras duermes.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {["Puntos negros", "Exceso de grasa", "Granitos", "Textura"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-2">
                <Check className="size-3.5 text-mint-strong" /> {t}
              </span>
            ))}
          </div>

          {/* Bundles */}
          <div className="mt-8">
            <div className="flex items-end justify-between">
              <p className="label-lab text-ink">Elige tu tratamiento</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 animate-pulse-dot rounded-full bg-mint-strong" /> 33 personas viendo ahora
              </p>
            </div>
            <div className="mt-3 space-y-3" role="radiogroup">
              {BUNDLES.map((b) => {
                const on = selected.id === b.id;
                return (
                  <button
                    key={b.id}
                    role="radio"
                    aria-checked={on}
                    onClick={() => select(b)}
                    className={`relative flex w-full items-center gap-4 rounded-xl border-2 bg-card p-4 text-left transition ${on ? "border-primary shadow-clinical" : "border-border hover:border-primary/40"}`}
                  >
                    {b.popular && (
                      <span className="label-lab absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-1 text-primary-foreground">
                        Más elegido
                      </span>
                    )}
                    <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-primary bg-primary" : "border-input"}`}>
                      {on && <span className="size-2 rounded-full bg-primary-foreground" />}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-ink">{b.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.note} · {formatMXN(pricePerPad(b))} por pad
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-ink">{formatMXN(b.price)}</p>
                      <p className="text-xs text-muted-foreground line-through">{formatMXN(b.compareAt)}</p>
                      {b.qty > 1 && <p className="text-xs font-medium text-serum">Ahorras {formatMXN(bundleSavings(b))}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button variant="clinical" size="xl" className="mt-5 w-full" onClick={() => add(selected)}>
            Agregar al carrito · {formatMXN(selected.price)}
          </Button>
          <p className="mt-2 text-center text-sm text-muted-foreground">Compra ahora, paga en casa</p>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { i: Banknote, t: "Pago contra entrega" },
              { i: Truck, t: "Entrega 1–3 días" },
              { i: ShieldCheck, t: "Datos protegidos" },
            ].map(({ i: I, t }) => (
              <div key={t} className="flex flex-col items-center gap-1.5 rounded-lg bg-mint px-2 py-3 text-accent-foreground">
                <I className="size-4" /> {t}
              </div>
            ))}
          </div>

          {/* Gifts */}
          <div className="mt-6 rounded-xl border border-dashed border-primary/30 bg-card p-5">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <Gift className="size-4 text-serum" /> 3 regalos incluidos en tu pedido
            </p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {[
                { i: Users, t: "Grupo con dermatólogos", s: "Consejos diarios · 45 días", v: 499 },
                { i: Truck, t: "Envío express", s: "A todo México · 1 a 3 días", v: 149 },
                { i: Sparkles, t: "Descuento de bienvenida", s: "En tu primera compra", v: 100 },
              ].map(({ i: I, t, s, v }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-md bg-mint text-primary">
                    <I className="size-4" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                  <span className="text-xs text-muted-foreground line-through">{formatMXN(v)}</span>
                  <span className="text-xs font-semibold text-primary">Gratis</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantee */}
          <div className="mt-4 flex items-center gap-4 rounded-xl bg-gradient-ink p-5 text-ink-foreground">
            <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-full border border-mint-strong/50">
              <span className="font-display text-2xl leading-none">60</span>
              <span className="label-lab text-[9px]">días</span>
            </div>
            <p className="text-sm">
              <strong>Si no ves cambios en tu rostro, te devolvemos tu dinero.</strong> Sin preguntas. Tienes 60 días
              para probarlo con calma.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <p className="label-lab flex items-center gap-2 text-ink">
              <Clock className="size-3.5" /> Qué vas a notar y cuándo
            </p>
            <ol className="mt-3 border-l-2 border-mint-strong/40 pl-5">
              {TIMELINE.map((s, i) => (
                <li key={s.t} className="relative pb-4 last:pb-0">
                  <span className="absolute -left-[27px] top-0.5 flex size-3 items-center justify-center rounded-full bg-mint-strong ring-4 ring-background" />
                  <p className="text-sm font-semibold text-ink">
                    <span className="label-lab mr-2 text-muted-foreground">0{i + 1}</span>
                    {s.t}
                  </p>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">Usándolos 2–3 noches por semana, con protector solar en la mañana.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
