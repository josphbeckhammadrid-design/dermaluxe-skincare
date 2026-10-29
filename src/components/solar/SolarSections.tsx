import { useEffect, useState } from "react";
import {
  Check,
  X,
  Star,
  Sun,
  Moon,
  DoorOpen,
  Armchair,
  Flower2,
  Car,
  BrickWall,
  Footprints,
  Zap,
  Plug,
  MoonStar,
  ScanLine,
  Power,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSolarCart } from "./cart";
import { formatMXN } from "@/lib/product";
import { SOLAR_SPECS, SOLAR_REVIEWS, SOLAR_FAQS } from "@/lib/solar";
import heroImg from "@/assets/solar-hero.jpg";
import nightImg from "@/assets/solar-night.jpg";
import sunImg from "@/assets/solar-sun.jpg";
import remoteImg from "@/assets/solar-remote.jpg";

function Eyebrow({ n, t }: { n: string; t: string }) {
  return (
    <p className="label-lab flex items-center gap-3 text-circuit">
      <span className="rounded border border-circuit/40 px-1.5 py-0.5">{n}</span> {t}
    </p>
  );
}

export function TechTicker() {
  const items = ["9 LED COB", "Carga solar", "Sensor PIR 120°", "IP66", "Control remoto", "Sin cables", "Cero recibo de luz"];
  const all = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y bg-card py-4">
      <div className="flex w-max animate-marquee gap-10">
        {all.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-semibold text-muted-foreground">
            {t} <Zap className="size-4 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Problem() {
  const pains = [
    { i: Zap, t: "El foco del patio se queda prendido toda la noche y lo pagas en tu recibo, mes tras mes." },
    { i: Plug, t: "Poner una luz nueva significa tirar cable, pagar instalación y hacer obra." },
    { i: MoonStar, t: "O la apagas para no gastar… y te toca llegar a oscuras." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow n="01" t="El problema" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Tu recibo de luz no debería subir por alumbrar el patio.</h2>
          <ul className="mt-8 space-y-4">
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
        <div className="overflow-hidden rounded-xl border bg-card shadow-panel">
          <div className="grid grid-cols-2 border-b">
            <div className="flex items-center gap-2 border-r p-4">
              <Sun className="size-4 text-primary" />
              <span className="font-display font-semibold">Lámpara solar</span>
            </div>
            <div className="flex items-center gap-2 p-4 text-muted-foreground">
              <Plug className="size-4" />
              <span className="font-display font-semibold">Foco con cable</span>
            </div>
          </div>
          {[
            ["No usa la luz de tu casa", "Consume cada noche"],
            ["Se enciende sola al pasar", "Lo prendes y apagas tú"],
            ["Sin cables ni obra", "Necesita instalación"],
            ["Control remoto incluido", "Sin control"],
          ].map(([a, b]) => (
            <div key={a} className="grid grid-cols-2 border-b last:border-b-0">
              <p className="flex items-center gap-2 border-r p-4 text-sm">
                <Check className="size-4 shrink-0 text-primary" /> {a}
              </p>
              <p className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
                <X className="size-4 shrink-0 text-destructive" /> {b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Mode = "sensor" | "on" | "off" | "2h" | "4h";
const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "on", label: "ON", hint: "Encendida toda la noche" },
  { id: "off", label: "OFF", hint: "Apagada" },
  { id: "2h", label: "2H", hint: "Se apaga sola en 2 horas" },
  { id: "4h", label: "4H", hint: "Se apaga sola en 4 horas" },
  { id: "sensor", label: "SENSOR", hint: "Se prende al detectar movimiento" },
];
const SENSOR_SECONDS = 12;

export function MotionDemo() {
  const [mode, setMode] = useState<Mode>("sensor");
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const lit = mode === "on" || mode === "2h" || mode === "4h" || (mode === "sensor" && left > 0);
  const trigger = () => {
    if (mode === "sensor") setLeft(SENSOR_SECONDS);
  };
  const choose = (m: Mode) => {
    setMode(m);
    setLeft(0);
  };

  const status =
    mode === "sensor"
      ? left > 0
        ? `Movimiento detectado · se apaga en 00:${String(left).padStart(2, "0")}`
        : "Vigilando · esperando movimiento"
      : MODES.find((m) => m.id === mode)!.hint;

  return (
    <section id="demo" className="relative border-y bg-night py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <Eyebrow n="02" t="Pruébala aquí" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Pasa frente al sensor y mira cómo se enciende.</h2>
          <p className="mt-4 text-muted-foreground">
            Mueve el cursor sobre la foto (o toca el botón) para simular que llegas a casa. Usa el control para
            probar cada modo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div
            className="group relative cursor-crosshair overflow-hidden rounded-xl border shadow-panel"
            onPointerMove={() => mode === "sensor" && left < SENSOR_SECONDS - 1 && trigger()}
            onClick={trigger}
          >
            <img
              src={nightImg}
              alt="Cochera iluminada por la lámpara solar"
              width={1600}
              height={1000}
              loading="lazy"
              className={`aspect-[16/10] w-full object-cover transition-[filter] duration-700 ${lit ? "" : "brightness-[.2] saturate-[.4]"}`}
            />
            {mode === "sensor" && !lit && <div className="pointer-events-none absolute inset-0 animate-sweep bg-sensor-cone" />}
            {mode === "sensor" && !lit && (
              <div className="pointer-events-none absolute inset-x-0 h-1/3 animate-scan bg-scanline" />
            )}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border bg-background/80 px-3 py-2 backdrop-blur">
              <span className={`size-2 rounded-full ${lit ? "bg-primary shadow-glow" : "animate-pulse bg-circuit"}`} />
              <span className="label-lab">{status}</span>
            </div>
            <div className="absolute bottom-4 right-4 hidden rounded-md border bg-background/80 px-3 py-2 text-right backdrop-blur sm:block">
              <p className="label-lab text-muted-foreground">Sensor PIR</p>
              <p className="font-display font-semibold">120° · 3 a 5 m</p>
            </div>
          </div>

          {/* Remote */}
          <div className="mx-auto w-full max-w-[280px] rounded-[2rem] border bg-card p-6 shadow-panel">
            <p className="label-lab text-center text-muted-foreground">Control remoto</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {MODES.slice(0, 2).map((m) => (
                <RemoteKey key={m.id} m={m} active={mode === m.id} onClick={() => choose(m.id)} danger={m.id === "off"} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {MODES.slice(2, 4).map((m) => (
                <RemoteKey key={m.id} m={m} active={mode === m.id} onClick={() => choose(m.id)} />
              ))}
            </div>
            <div className="mt-3">
              <RemoteKey m={MODES[4]!} active={mode === "sensor"} onClick={() => choose("sensor")} />
            </div>
            <Button variant="tech" className="mt-5 w-full" disabled={mode !== "sensor"} onClick={trigger}>
              <ScanLine /> Simular movimiento
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RemoteKey({
  m,
  active,
  onClick,
  danger,
}: {
  m: { id: Mode; label: string };
  active: boolean;
  onClick: () => void;
  danger?: boolean;
}) {
  const Icon = m.id === "on" || m.id === "off" ? Power : m.id === "sensor" ? ScanLine : Timer;
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-full border text-sm font-semibold transition ${
        active
          ? danger
            ? "border-destructive bg-destructive text-destructive-foreground"
            : "border-primary bg-primary text-primary-foreground shadow-glow"
          : "bg-secondary text-secondary-foreground hover:border-circuit/60"
      }`}
    >
      <Icon className="size-4" /> {m.label}
    </button>
  );
}

const HOTSPOTS = [
  { x: 24, y: 26, t: "9 paneles LED COB", d: "Luz amplia y pareja que cubre toda la cochera o el patio." },
  { x: 23, y: 55, t: "Sensor de movimiento", d: "Detecta a 120° y de 3 a 5 metros. Se prende sola al pasar." },
  { x: 72, y: 26, t: "Panel solar trasero", d: "Se carga con el sol de 6 a 8 horas. Cero gasto de luz." },
  { x: 60, y: 76, t: "Soporte orientable", d: "Gíralo para apuntar la luz justo donde la necesitas." },
  { x: 88, y: 78, t: "Control remoto", d: "Prende, apaga, 2H, 4H o modo sensor desde lejos." },
];

export function Specs() {
  const [active, setActive] = useState(0);
  return (
    <section id="specs" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <Eyebrow n="03" t="Ficha técnica" />
        <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Así viene y así funciona.</h2>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative overflow-hidden rounded-xl border bg-card shadow-panel">
          <img src={heroImg} alt="Partes de la lámpara solar" loading="lazy" className="aspect-square w-full object-cover" />
          {HOTSPOTS.map((h, i) => (
            <button
              key={h.t}
              onClick={() => setActive(i)}
              aria-label={h.t}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className={`absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold transition ${
                i === active
                  ? "scale-110 border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-circuit bg-background/80 text-circuit hover:scale-110"
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

        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <p className="font-display font-semibold">Especificaciones</p>
            <p className="label-lab text-muted-foreground">Ref. SLR-9COB</p>
          </div>
          <dl>
            {SOLAR_SPECS.map((s) => (
              <div key={s.k} className="grid grid-cols-[120px_1fr] border-b px-5 py-3.5 text-sm last:border-b-0 sm:grid-cols-[150px_1fr]">
                <dt className="label-lab self-center text-muted-foreground">{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function DayNight() {
  return (
    <section className="border-y bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <Eyebrow n="04" t="Ciclo de 24 horas" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">De día se carga. De noche te cuida.</h2>
        </div>
        <div className="mt-8">
          <div className="h-2 rounded-full bg-day-cycle" />
          <div className="label-lab mt-2 flex justify-between text-muted-foreground">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { img: sunImg, i: Sun, h: "Día · 6 a 8 h", t: "El panel solar trasero guarda la energía del sol en su batería. No tienes que hacer nada." },
            { img: nightImg, i: Moon, h: "Noche · +6 h", t: "Al oscurecer se activa. Con el sensor se prende al pasar y ahorra batería el resto del tiempo." },
          ].map(({ img, i: I, h, t }) => (
            <article key={h} className="group overflow-hidden rounded-xl border bg-background">
              <div className="overflow-hidden">
                <img src={img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 font-display text-xl font-semibold">
                  <I className="size-5 text-primary" /> {h}
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

export function Uses() {
  const uses = [
    { i: DoorOpen, t: "Entrada", d: "Para ver la cerradura al llegar de noche." },
    { i: Armchair, t: "Patio", d: "Luz donde no llega el cable." },
    { i: Flower2, t: "Jardín", d: "Ilumina caminos y plantas." },
    { i: Car, t: "Cochera", d: "Se enciende sola al entrar con el carro." },
    { i: BrickWall, t: "Bardas", d: "Con soporte orientable para apuntar la luz." },
    { i: Footprints, t: "Pasillos", d: "Sin instalación eléctrica." },
  ];
  return (
    <section id="usos" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="text-center">
        <div className="flex justify-center">
          <Eyebrow n="05" t="Dónde usarla" />
        </div>
        <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Una luz para cada rincón oscuro.</h2>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-3">
        {uses.map(({ i: I, t, d }) => (
          <div key={t} className="group bg-card p-6 transition hover:bg-accent sm:p-8">
            <I className="size-7 text-circuit transition group-hover:text-primary" />
            <p className="mt-4 font-display text-xl font-semibold">{t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowTo() {
  const steps = [
    { t: "Carga", d: "Déjala al sol de 6 a 8 horas antes del primer uso." },
    { t: "Instala", d: "Atornilla el soporte en la pared y ajusta el ángulo." },
    { t: "Listo", d: "Se prende sola con el movimiento. Con el control eliges el modo." },
  ];
  return (
    <section className="px-5 pb-20 lg:pb-28">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-xl border bg-card lg:grid-cols-2">
        <img src={remoteImg} alt="Control remoto de la lámpara solar" loading="lazy" className="h-full max-h-[560px] w-full object-cover" />
        <div className="p-8 sm:p-12">
          <Eyebrow n="06" t="Así de fácil" />
          <h2 className="mt-4 text-4xl leading-[1.05]">Lista en 10 minutos, sin electricista.</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-primary/50 font-display text-lg font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">{s.t}</p>
                  <p className="text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  const rows: [string, boolean, boolean, boolean][] = [
    ["Sin recibo de luz", true, false, true],
    ["Sin cables", true, false, true],
    ["Se enciende sola", true, false, false],
    ["Control remoto", true, false, false],
    ["Ilumina de noche", true, true, false],
  ];
  const Mark = ({ ok }: { ok: boolean }) =>
    ok ? <Check className="mx-auto size-5 text-primary" /> : <X className="mx-auto size-5 text-muted-foreground/50" />;
  return (
    <section className="border-y bg-night py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <div className="flex justify-center">
            <Eyebrow n="07" t="Comparativa" />
          </div>
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">¿Foco con cable o lámpara solar?</h2>
        </div>
        <div className="mt-10 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-normal text-muted-foreground" />
                <th className="bg-primary/10 p-4 font-display text-base font-semibold text-primary">Lámpara solar</th>
                <th className="p-4 font-display text-base font-semibold text-muted-foreground">Luz con cable</th>
                <th className="p-4 font-display text-base font-semibold text-muted-foreground">Sin luz</th>
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

export function Reviews() {
  return (
    <section id="opiniones" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow n="08" t="Opiniones" />
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Casas que ya no llegan a oscuras.</h2>
        </div>
        <div className="flex items-center gap-4 rounded-lg border bg-card px-5 py-4">
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
        {SOLAR_REVIEWS.map((r) => (
          <article key={r.name} className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < r.stars ? "fill-current" : "opacity-30"}`} />
                ))}
              </div>
              <span className="label-lab rounded border px-2 py-1 text-circuit">{r.place}</span>
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

export function Faq() {
  return (
    <section id="preguntas" className="mx-auto max-w-3xl px-5 pb-20 lg:pb-28">
      <div className="text-center">
        <div className="flex justify-center">
          <Eyebrow n="09" t="Preguntas frecuentes" />
        </div>
        <h2 className="mt-4 text-4xl leading-[1.05]">Resolvemos tus dudas</h2>
      </div>
      <Accordion type="single" collapsible className="mt-10">
        {SOLAR_FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`f${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCta() {
  const { selected, add } = useSolarCart();
  return (
    <section className="px-5 pb-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border">
        <img src={nightImg} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20" />
        <div className="relative max-w-xl p-8 sm:p-14">
          <p className="label-lab text-primary">Precio especial de lanzamiento</p>
          <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Ilumina tu casa sin pagar luz.</h2>
          <p className="mt-4 text-muted-foreground">
            1 pieza {formatMXN(699)} · 5 piezas {formatMXN(1599)}. Envío gratis y pago contra entrega.
          </p>
          <Button variant="glow" size="xl" className="mt-8" onClick={() => add(selected)}>
            Compra ahora, paga al recibir
          </Button>
        </div>
      </div>
    </section>
  );
}

export function SolarFooter() {
  return (
    <footer className="border-t bg-night">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground md:flex-row">
        <p className="font-display text-lg font-semibold tracking-[0.18em] text-foreground">SOLARA</p>
        <p>Envío gratis a todo México · Pago contra entrega</p>
        <p>© {new Date().getFullYear()} SOLARA</p>
      </div>
    </footer>
  );
}

export function SolarStickyBar() {
  const { selected, add } = useSolarCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{selected.label} · Envío gratis</p>
          <p className="font-semibold">
            {formatMXN(selected.price)}{" "}
            <span className="text-xs font-normal text-muted-foreground line-through">{formatMXN(selected.compareAt)}</span>
          </p>
        </div>
        <Button variant="glow" size="lg" onClick={() => add(selected)}>Agregar</Button>
      </div>
    </div>
  );
}
