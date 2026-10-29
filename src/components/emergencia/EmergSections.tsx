import { useEffect, useState } from "react";
import {
  Check,
  X,
  Star,
  Sun,
  Usb,
  Smartphone,
  Home,
  Car,
  Tent,
  Wrench,
  CloudLightning,
  Flame,
  BatteryLow,
  PhoneOff,
  Lightbulb,
  Power,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEmergCart } from "./cart";
import { formatMXN } from "@/lib/product";
import { EMERG_SPECS, EMERG_REVIEWS, EMERG_FAQS, EMERG_BUNDLES, EMERG_MODES } from "@/lib/emergencia";
import heroImg from "@/assets/emerg-hero.jpg";
import blackoutImg from "@/assets/emerg-blackout.jpg";
import powerImg from "@/assets/emerg-powerbank.jpg";
import outdoorImg from "@/assets/emerg-outdoor.jpg";
import sosImg from "@/assets/emerg-sos.jpg";

function Eyebrow({ n, t }: { n: string; t: string }) {
  return (
    <p className="label-lab flex items-center gap-3 text-primary">
      <span className="rounded bg-primary px-1.5 py-0.5 font-semibold text-primary-foreground">{n}</span> {t}
    </p>
  );
}

export function EmergTicker() {
  const items = ["5 modos de luz", "Carga solar", "Carga USB", "Powerbank", "IP66", "Antigolpes", "Soporte 180°", "Nunca más a oscuras"];
  const all = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-primary py-3 text-primary-foreground sm:py-4">
      <div className="flex w-max animate-marquee gap-6 sm:gap-10">
        {all.map((t, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap font-display text-lg font-semibold uppercase leading-none sm:gap-10 sm:text-2xl">
            {t} <Lightbulb className="size-4 shrink-0 sm:size-5" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function EmergProblem() {
  const pains = [
    { i: CloudLightning, t: "Se va la luz por una tormenta y la casa queda completamente a oscuras." },
    { i: Flame, t: "Las velas son peligrosas con niños y casi no alumbran." },
    { i: BatteryLow, t: "La linterna del celular gasta tu batería justo cuando más la necesitas." },
    { i: PhoneOff, t: "Sin luz no puedes cargar tu celular y te quedas incomunicado." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <Eyebrow n="01" t="Antes" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Un apagón no avisa. Tú sí puedes estar listo.</h2>
          <ul className="mt-8 space-y-3">
            {pains.map(({ i: I, t }) => (
              <li key={t} className="flex gap-4 rounded-lg border bg-card p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-destructive/15 text-destructive">
                  <I className="size-5" />
                </span>
                <p className="text-muted-foreground">{t}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-w-0 overflow-hidden rounded-xl border shadow-panel">
          <img src={blackoutImg} alt="Familia iluminada por la luz de emergencia en un apagón" loading="lazy" className="aspect-square w-full object-cover" />
          <div className="absolute inset-x-4 bottom-4 rounded-md border bg-background/85 p-4 backdrop-blur">
            <p className="label-lab text-primary">Después</p>
            <p className="mt-1 font-display text-xl font-semibold uppercase">Luz potente, celular cargado y tranquilidad.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ModesDemo() {
  const [mode, setMode] = useState<(typeof EMERG_MODES)[number]["id"] | "off">("blanco");
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (mode !== "sos") return;
    const t = setInterval(() => setFlip((f) => !f), 450);
    return () => clearInterval(t);
  }, [mode]);

  const current = EMERG_MODES.find((m) => m.id === mode);
  const tone = mode === "sos" ? (flip ? "var(--siren)" : "var(--destructive)") : current?.tone;

  return (
    <section id="modos" className="relative border-y bg-night py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <Eyebrow n="02" t="Pruébala aquí" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">5 modos de luz para cada momento.</h2>
          <p className="mt-4 text-muted-foreground">Toca cada botón y mira cómo cambia la luz.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="relative min-w-0 overflow-hidden rounded-xl border shadow-panel">
            <img
              src={heroImg}
              alt="Luz LED de emergencia mostrando el modo seleccionado"
              loading="lazy"
              className={`aspect-[4/3] w-full object-cover transition-[filter] duration-500 ${mode === "off" ? "brightness-[.25] saturate-[.3]" : ""}`}
            />
            {tone && (
              <div
                className="pointer-events-none absolute inset-0 mix-blend-multiply transition-colors duration-300"
                style={{
                  backgroundColor: tone,
                  opacity: mode === "blanco" ? 0 : 0.9,
                  maskImage: "radial-gradient(ellipse 34% 46% at 45% 42%, black 75%, transparent 100%)",
                }}
              />
            )}
            {tone && (
              <div
                className="pointer-events-none absolute inset-0 transition-colors duration-300"
                style={{ background: `radial-gradient(ellipse 45% 45% at 45% 45%, color-mix(in oklab, ${tone} 35%, transparent), transparent 70%)` }}
              />
            )}
            <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-md border bg-background/85 px-3 py-2 backdrop-blur">
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: tone ?? "var(--muted-foreground)" }} />
              <span className="label-lab truncate">{current ? `Modo ${current.label}` : "Apagada"}</span>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border bg-card p-5 shadow-panel">
            <p className="label-lab text-muted-foreground">Elige un modo</p>
            <div className="mt-4 grid gap-2">
              {EMERG_MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  aria-pressed={mode === m.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${mode === m.id ? "border-primary bg-primary/10" : "hover:border-primary/40"}`}
                >
                  <span className="size-4 shrink-0 rounded-full border" style={{ backgroundColor: m.tone }} />
                  <span className="min-w-0">
                    <span className="block font-semibold">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">{m.hint}</span>
                  </span>
                </button>
              ))}
              <button
                onClick={() => setMode("off")}
                aria-pressed={mode === "off"}
                className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-semibold transition ${mode === "off" ? "border-destructive bg-destructive text-destructive-foreground" : "hover:border-destructive/60"}`}
              >
                <Power className="size-4" /> Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HOTSPOTS = [
  { x: 33, y: 33, t: "4 paneles LED", d: "Luz de alta potencia que alumbra un cuarto completo." },
  { x: 86, y: 44, t: "Soporte ajustable 180°", d: "Párala en la mesa o el piso y apunta la luz donde la necesitas." },
  { x: 74, y: 70, t: "Carcasa antigolpes IP66", d: "Esquinas reforzadas que la protegen de caídas, lluvia y polvo." },
];

export function EmergSpecs() {
  const [active, setActive] = useState(0);
  return (
    <section id="specs" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <Eyebrow n="03" t="Ficha técnica" />
        <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Hecha para aguantar lo que venga.</h2>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-w-0 overflow-hidden rounded-xl border bg-card shadow-panel">
          <img src={heroImg} alt="Partes de la luz de emergencia" loading="lazy" className="aspect-square w-full object-cover" />
          {HOTSPOTS.map((h, i) => (
            <button
              key={h.t}
              onClick={() => setActive(i)}
              aria-label={h.t}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className={`absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold transition ${
                i === active
                  ? "scale-110 border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-foreground bg-background/80 text-foreground hover:scale-110"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <div className="absolute inset-x-4 bottom-4 rounded-md border bg-background/90 p-4 backdrop-blur">
            <p className="label-lab text-primary">
              0{active + 1} · {HOTSPOTS[active]!.t}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{HOTSPOTS[active]!.d}</p>
          </div>
        </div>

        <div className="min-w-0 rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <p className="font-display font-semibold uppercase">Especificaciones</p>
            <div className="flex items-end gap-1" aria-label="Indicador de batería de 4 niveles">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className="w-2 rounded-sm bg-primary" style={{ height: `${n * 4 + 4}px` }} />
              ))}
            </div>
          </div>
          <dl>
            {EMERG_SPECS.map((s) => (
              <div key={s.k} className="grid grid-cols-[110px_1fr] gap-3 border-b px-5 py-3.5 text-sm last:border-b-0 sm:grid-cols-[150px_1fr]">
                <dt className="label-lab self-center text-muted-foreground">{s.k}</dt>
                <dd className="min-w-0">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function EmergEnergy() {
  const cards = [
    { img: outdoorImg, i: Sun, h: "Carga solar", t: "Déjala donde le dé el sol y se carga sola. Perfecta para afuera o en la ventana." },
    { img: heroImg, i: Usb, h: "Carga por USB", t: "¿Día nublado? Conéctala con su cable USB y queda lista." },
    { img: powerImg, i: Smartphone, h: "Carga tu celular", t: "Funciona como powerbank: conecta tu celular y sigue comunicado aunque no haya luz." },
  ];
  return (
    <section id="energia" className="border-y bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <Eyebrow n="04" t="Energía" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Dos formas de cargarla. Una para cargar tu celular.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map(({ img, i: I, h, t }) => (
            <article key={h} className="group overflow-hidden rounded-xl border bg-background">
              <div className="overflow-hidden">
                <img src={img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 font-display text-xl font-semibold uppercase">
                  <I className="size-5 shrink-0 text-primary" /> {h}
                </p>
                <p className="mt-2 text-muted-foreground">{t}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmergUses() {
  const uses = [
    { i: Home, t: "Apagones", d: "Ilumina tu sala o recámara al instante." },
    { i: Car, t: "Carretera", d: "Modo emergencia para que te vean." },
    { i: Tent, t: "Campamento", d: "Aguanta lluvia y golpes." },
    { i: Wrench, t: "Taller", d: "Luz fuerte para trabajar sin cables." },
    { i: CloudLightning, t: "Tormentas", d: "Lista cuando más la necesitas." },
    { i: ShieldCheck, t: "Seguridad", d: "Cuelga del gancho y alumbra la entrada." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative min-w-0 overflow-hidden rounded-xl border shadow-panel">
          <img src={sosImg} alt="Modo emergencia rojo y azul en carretera" loading="lazy" className="aspect-square w-full object-cover" />
          <div className="absolute inset-x-0 top-0 h-2 bg-hazard" />
        </div>
        <div className="min-w-0">
          <Eyebrow n="05" t="Dónde usarla" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">En casa, en el carro o en el campo.</h2>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border">
            {uses.map(({ i: I, t, d }) => (
              <div key={t} className="group min-w-0 bg-card p-5 transition hover:bg-accent sm:p-6">
                <I className="size-6 text-primary" />
                <p className="mt-3 font-display text-lg font-semibold uppercase">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmergCompare() {
  const rows: [string, boolean, boolean, boolean][] = [
    ["Luz potente para todo un cuarto", true, false, false],
    ["Segura con niños", true, false, true],
    ["Carga tu celular", true, false, false],
    ["Se carga con el sol", true, false, false],
    ["Resiste lluvia y golpes", true, false, false],
    ["Modo de emergencia", true, false, false],
  ];
  const Mark = ({ ok }: { ok: boolean }) =>
    ok ? <Check className="mx-auto size-5 text-primary" /> : <X className="mx-auto size-5 text-muted-foreground/50" />;
  return (
    <section className="border-y bg-night py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <div className="flex justify-center">
            <Eyebrow n="06" t="Comparativa" />
          </div>
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">¿Velas, linterna o luz de emergencia?</h2>
        </div>
        <div className="mt-10 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-normal text-muted-foreground" />
                <th className="bg-primary/10 p-4 font-display text-base font-semibold uppercase text-primary">Lumiguard</th>
                <th className="p-4 font-display text-base font-semibold uppercase text-muted-foreground">Velas</th>
                <th className="p-4 font-display text-base font-semibold uppercase text-muted-foreground">Linterna</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([l, a, b, c]) => (
                <tr key={l} className="border-b last:border-b-0">
                  <td className="p-4">{l}</td>
                  <td className="bg-primary/10 p-4"><Mark ok={a} /></td>
                  <td className="p-4"><Mark ok={b} /></td>
                  <td className="p-4"><Mark ok={c} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function EmergReviews() {
  return (
    <section id="opiniones" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="min-w-0">
          <Eyebrow n="07" t="Opiniones" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Familias que ya no se quedan a oscuras.</h2>
        </div>
        <div className="flex shrink-0 items-center gap-4 rounded-lg border bg-card px-5 py-4">
          <p className="font-display text-4xl font-semibold text-primary">4.9</p>
          <div>
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Calificación de clientes</p>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {EMERG_REVIEWS.map((r) => (
          <article key={r.name} className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < r.stars ? "fill-current" : "opacity-30"}`} />
                ))}
              </div>
              <span className="label-lab rounded border px-2 py-1 text-primary">{r.place}</span>
            </div>
            <p className="mt-4">“{r.text}”</p>
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{r.name}</span> · {r.city} · {r.when} · Compra verificada
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EmergFaq() {
  return (
    <section id="preguntas" className="mx-auto max-w-3xl px-5 pb-20 lg:pb-28">
      <div className="text-center">
        <div className="flex justify-center">
          <Eyebrow n="08" t="Preguntas frecuentes" />
        </div>
        <h2 className="mt-4 text-4xl leading-[1.05]">Resolvemos tus dudas</h2>
      </div>
      <Accordion type="single" collapsible className="mt-10">
        {EMERG_FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`f${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function EmergFinalCta() {
  const { selected, add } = useEmergCart();
  const first = EMERG_BUNDLES[0]!;
  const last = EMERG_BUNDLES[EMERG_BUNDLES.length - 1]!;
  return (
    <section className="px-5 pb-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border">
        <img src={blackoutImg} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20" />
        <div className="relative max-w-xl p-8 sm:p-14">
          <p className="label-lab text-primary">Precio especial por tiempo limitado</p>
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">¡Nunca más a oscuras!</h2>
          <p className="mt-4 text-muted-foreground">
            {first.label} {formatMXN(first.price)} · {last.label} {formatMXN(last.price)}. Envío gratis y pago contra entrega.
          </p>
          <Button variant="glow" size="xl" className="mt-8 h-auto py-3" onClick={() => add(selected)}>
            Compra ahora, paga al recibir
          </Button>
        </div>
      </div>
    </section>
  );
}

export function EmergFooter() {
  return (
    <footer className="border-t bg-night">
      <div className="h-1.5 bg-hazard" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-center text-sm text-muted-foreground md:flex-row">
        <p className="font-display text-lg font-semibold uppercase tracking-[0.14em] text-foreground">Lumiguard</p>
        <p>Envío gratis a todo México · Pago contra entrega</p>
        <p>© {new Date().getFullYear()} Lumiguard</p>
      </div>
    </footer>
  );
}

export function EmergStickyBar() {
  const { selected, add } = useEmergCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted-foreground">{selected.label} · Envío gratis</p>
          <p className="font-semibold">
            {formatMXN(selected.price)}{" "}
            <span className="text-xs font-normal text-muted-foreground line-through">{formatMXN(selected.compareAt)}</span>
          </p>
        </div>
        <Button variant="glow" size="lg" className="shrink-0" onClick={() => add(selected)}>Comprar</Button>
      </div>
    </div>
  );
}
