import { Check, X, Droplets, Leaf, FlaskConical, Microscope, Star, BadgeCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart";
import { FAQS, REVIEWS, formatMXN } from "@/lib/product";
import ingredientsImg from "@/assets/ingredients.jpg";
import ritualImg from "@/assets/ritual.jpg";
import padImg from "@/assets/pad-macro.jpg";
import openImg from "@/assets/kormesic-open.jpg";

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="label-lab flex items-center gap-3 text-primary">
      <span className="rounded border border-primary/30 px-1.5 py-0.5">{n}</span>
      {children}
    </p>
  );
}

export function IngredientTicker() {
  const items = ["Ácido salicílico 2%", "Ácido glicólico 30%", "Sin enjuague", "1 pad · 1 minuto", "Ácido hialurónico", "Centella y avena", "Piel grasa y mixta"];
  const all = [...items, ...items];
  return (
    <div className="overflow-hidden border-y bg-card py-4">
      <div className="flex w-max animate-marquee gap-10">
        {all.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl text-ink">
            {t} <span className="text-mint-strong">✚</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Problem() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow n="01">El diagnóstico</Eyebrow>
          <h2 className="mt-4 text-5xl leading-[1] text-ink sm:text-6xl">El jabón no llega al fondo del poro.</h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            La limpieza normal no disuelve la grasa atrapada. Por eso la piel se ve opaca, con textura y brotes que
            regresan una y otra vez.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              ["Poros obstruidos", "La grasa se oxida y forma puntos negros."],
              ["Brillo a media tarde", "Exceso de sebo que el agua no quita."],
              ["Textura irregular", "Células muertas que apagan la luz de tu piel."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-4 border-b pb-4">
                <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-serum-soft text-serum">
                  <X className="size-3.5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <img src={padImg} alt="Pad exfoliante humedecido" loading="lazy" width={1280} height={1280} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-clinical" />
          <div className="absolute -bottom-6 -left-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border shadow-soft sm:-left-8">
            {[
              ["50", "Pads por frasco"],
              ["+3.4k", "Clientas felices"],
            ].map(([n, l]) => (
              <div key={l} className="bg-card px-6 py-4">
                <p className="font-display text-4xl leading-none text-primary">{n}</p>
                <p className="label-lab mt-1 text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Formula() {
  const actives = [
    { pct: "2%", name: "Ácido Salicílico", tag: "BHA", icon: FlaskConical, d: "Entra al poro, disuelve grasa y sebo, y controla los brotes desde la raíz." },
    { pct: "30%", name: "Ácido Glicólico", tag: "AHA", icon: Microscope, d: "Renueva la capa superficial, suaviza la textura y revela piel luminosa." },
    { pct: "+", name: "Ácido Hialurónico", tag: "Hidratante", icon: Droplets, d: "Retiene agua en la piel para que la exfoliación no la reseque." },
    { pct: "+", name: "Centella y Avena", tag: "Calmante", icon: Leaf, d: "Ayudan a calmar el enrojecimiento y a cuidar la barrera de la piel." },
  ];
  return (
    <section id="formula" className="bg-gradient-ink py-20 text-ink-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="label-lab text-mint-strong">02 · Ficha técnica</p>
            <h2 className="mt-4 text-5xl leading-[1] sm:text-6xl">Exfoliación química, no de spa.</h2>
          </div>
          <p className="max-w-lg opacity-75">
            El dúo de las rutinas K-beauty: BHA que limpia el poro por dentro y AHA que renueva la superficie. Más
            activos calmantes para que tu piel no sufra. Todo en un pad.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-foreground/15 bg-ink-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {actives.map(({ pct, name, tag, icon: I, d }) => (
            <div key={name} className="bg-ink p-6 transition hover:bg-primary">
              <div className="flex items-start justify-between">
                <span className="font-display text-6xl leading-none text-mint-strong">{pct}</span>
                <I className="size-5 opacity-60" />
              </div>
              <p className="label-lab mt-6 opacity-60">{tag}</p>
              <h3 className="mt-1 text-2xl">{name}</h3>
              <p className="mt-3 text-sm opacity-75">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <img src={ingredientsImg} alt="Ingredientes: centella, avena y ácido hialurónico" loading="lazy" width={1600} height={1104} className="h-full w-full rounded-2xl object-cover" />
          <dl className="rounded-2xl border border-ink-foreground/15 p-6 font-mono text-sm">
            <p className="label-lab mb-4 text-mint-strong">Especificaciones</p>
            {[
              ["Contenido", "50 pads pre-humedecidos"],
              ["Tipo de piel", "Grasa, mixta, con granitos"],
              ["Frecuencia", "2–3 noches por semana"],
              ["Aplicación", "Sin enjuague · 1 minuto"],
              ["Duración", "≈ 4 a 6 semanas por frasco"],
              ["Origen", "Fórmula K-beauty"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-ink-foreground/10 py-2.5 last:border-0">
                <dt className="opacity-60">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function HowTo() {
  const steps = [
    { n: "01", t: "Limpia", d: "Lava tu rostro y sécalo bien. De preferencia en la noche." },
    { n: "02", t: "Pasa el pad", d: "Desliza un pad por todo el rostro, evitando el contorno de ojos." },
    { n: "03", t: "Hidrata", d: "Sin enjuagar. Aplica tu crema y en la mañana, protector solar." },
  ];
  return (
    <section id="uso" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <img src={ritualImg} alt="Mujer aplicando el pad en su rostro" loading="lazy" width={1280} height={1600} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-clinical" />
        <div>
          <Eyebrow n="03">Modo de uso</Eyebrow>
          <h2 className="mt-4 text-5xl leading-[1] text-ink sm:text-6xl">Tu ritual de noche, en 1 minuto.</h2>
          <div className="mt-10 space-y-3">
            {steps.map((s) => (
              <div key={s.n} className="group flex gap-5 rounded-xl border bg-card p-5 transition hover:border-primary/40 hover:shadow-soft">
                <span className="font-display text-5xl leading-none text-mint-strong">{s.n}</span>
                <div>
                  <h3 className="text-2xl text-ink">{s.t}</h3>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-lg bg-serum-soft p-4 text-sm text-ink">
            <strong>Importante:</strong> es un exfoliante fuerte. Si tu piel es muy sensible o usas retinol, empieza 1
            vez por semana y consulta a tu dermatólogo.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Results() {
  const metrics = [
    { k: "Textura", a: 7, b: 2 },
    { k: "Brillo", a: 8, b: 4 },
    { k: "Puntos negros", a: 8, b: 3 },
  ];
  const cases = [
    { name: "Victoria", age: "29 años · Guadalajara", issue: "Poros congestionados", q: "A la semana ya no sentía la nariz rasposa.", first: "Día 4", full: "Día 32" },
    { name: "Camila", age: "26 años · CDMX", issue: "Brotes frecuentes", q: "A las tres semanas dejaron de salirme granitos.", first: "Día 9", full: "Día 58" },
    { name: "Sara", age: "34 años · Monterrey", issue: "Piel apagada", q: "Ahora mi piel se ve como descansada.", first: "Día 2", full: "Día 25" },
  ];
  return (
    <section id="resultados" className="border-y bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow n="04">Resultados</Eyebrow>
            <h2 className="mt-4 text-5xl leading-[1] text-ink sm:text-6xl">Piel más limpia en días, no en meses.</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Seguimiento de 14 días de Alejandra (Puerto Morelos), calificando su piel del 1 al 10 usando los pads 2–3
              noches por semana.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-clinical">
            <div className="flex items-center justify-between">
              <p className="label-lab text-ink">Reporte · Día 0 → Día 14</p>
              <span className="label-lab rounded-full bg-mint px-2 py-1 text-primary">Menos es mejor</span>
            </div>
            <div className="mt-6 space-y-5">
              {metrics.map((m) => (
                <div key={m.k}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-ink">{m.k}</span>
                    <span className="font-mono text-muted-foreground">
                      {m.a} → <strong className="text-primary">{m.b}</strong>
                    </span>
                  </div>
                  <div className="relative mt-2 h-2.5 rounded-full bg-muted">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-serum/30" style={{ width: `${m.a * 10}%` }} />
                    <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${m.b * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t pt-4 font-display text-xl italic text-ink">
              "A los tres días ya se sentía lisa. A las dos semanas, la nariz cambió."
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.name} className="rounded-2xl border bg-card p-6">
              <p className="label-lab text-serum">{c.issue}</p>
              <h3 className="mt-2 text-3xl text-ink">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.age}</p>
              <p className="mt-4 text-sm text-ink">"{c.q}"</p>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border text-center">
                <div className="bg-mint p-3">
                  <p className="font-display text-2xl text-primary">{c.first}</p>
                  <p className="label-lab text-[10px] text-muted-foreground">Primer cambio</p>
                </div>
                <div className="bg-mint p-3">
                  <p className="font-display text-2xl text-primary">{c.full}</p>
                  <p className="label-lab text-[10px] text-muted-foreground">Cambio completo</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Casos individuales con fotos y autorreporte. No es un estudio clínico. Los resultados varían según cada piel.
        </p>
      </div>
    </section>
  );
}

export function Compare() {
  const rows = [
    ["Destapa el poro por dentro", true, false, false],
    ["Controla la grasa", true, false, false],
    ["No raspa ni irrita la piel", true, true, false],
    ["Empareja el tono", true, false, false],
    ["Listo en 1 minuto", true, true, false],
  ] as const;
  return (
    <section className="mx-auto max-w-5xl px-5 py-20 lg:py-28">
      <div className="text-center">
        <p className="label-lab text-primary">05 · Comparativa</p>
        <h2 className="mt-4 text-5xl leading-[1] text-ink sm:text-6xl">¿Por qué un pad y no un exfoliante de granitos?</h2>
      </div>
      <div className="mt-12 overflow-hidden rounded-2xl border bg-card">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b bg-muted text-center text-xs sm:text-sm">
          <div className="p-4 text-left label-lab text-muted-foreground">Beneficio</div>
          <div className="bg-primary p-4 font-semibold text-primary-foreground">KORMESIC Pads</div>
          <div className="p-4 text-muted-foreground">Jabón facial</div>
          <div className="p-4 text-muted-foreground">Exfoliante con granitos</div>
        </div>
        {rows.map(([label, a, b, c]) => (
          <div key={label} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b text-center text-sm last:border-0">
            <div className="p-4 text-left text-ink">{label}</div>
            {[a, b, c].map((v, i) => (
              <div key={i} className={`flex items-center justify-center p-4 ${i === 0 ? "bg-mint" : ""}`}>
                {v ? <Check className="size-5 text-primary" /> : <X className="size-4 text-muted-foreground/60" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  const dist = [91, 7, 2, 0, 0];
  return (
    <section id="resenas" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow n="06">Reseñas</Eyebrow>
            <h2 className="mt-4 text-5xl leading-[1] text-ink">+3,400 pieles renovadas</h2>
            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-7xl leading-none text-primary">4.9</span>
              <div className="pb-2">
                <div className="flex text-serum">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">3,427 reseñas verificadas</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {dist.map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="w-6 font-mono text-muted-foreground">{5 - i}★</span>
                  <div className="h-1.5 flex-1 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${p}%` }} />
                  </div>
                  <span className="w-8 text-right font-mono text-muted-foreground">{p}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="columns-1 gap-4 sm:columns-2">
            {REVIEWS.map((r) => (
              <article key={r.name} className="mb-4 break-inside-avoid rounded-2xl border bg-background p-6">
                <div className="flex items-center justify-between">
                  <div className="flex text-serum">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-3.5 ${i < r.stars ? "fill-current" : "opacity-30"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{r.when}</span>
                </div>
                <p className="mt-4 text-ink">"{r.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-mint font-display text-lg text-primary">
                    {r.name[0]}
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold text-ink">{r.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      {r.city} · <BadgeCheck className="size-3 text-primary" /> Compra verificada · {r.skin}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="preguntas" className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
      <div className="text-center">
        <p className="label-lab text-primary">07 · Preguntas frecuentes</p>
        <h2 className="mt-4 text-5xl leading-[1] text-ink">Resolvemos tus dudas</h2>
      </div>
      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`f${i}`}>
            <AccordionTrigger className="text-left text-base font-medium text-ink">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCta() {
  const { selected, add } = useCart();
  return (
    <section className="px-5 pb-20">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-gradient-ink text-ink-foreground lg:grid-cols-2">
        <div className="relative z-10 p-8 sm:p-14">
          <p className="label-lab text-mint-strong">Precio especial de lanzamiento</p>
          <h2 className="mt-4 text-5xl leading-[1] sm:text-6xl">Empieza hoy. Paga cuando llegue.</h2>
          <p className="mt-4 max-w-md opacity-75">
            Envío express a todo México, 3 regalos incluidos y 60 días de garantía.
          </p>
          <Button variant="serum" size="xl" className="mt-8" onClick={() => add(selected)}>
            Quiero mi piel nueva · {formatMXN(selected.price)}
          </Button>
        </div>
        <img src={openImg} alt="Frasco KORMESIC abierto" loading="lazy" width={1280} height={1280} className="h-full max-h-[480px] w-full object-cover" />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-xl tracking-[0.2em] text-ink">KORMESIC</span>
        <p className="max-w-xl text-xs">
          Este producto es un cosmético y no sustituye la consulta con un dermatólogo. Haz una prueba en una zona
          pequeña antes del primer uso. Usa protector solar diariamente.
        </p>
        <p className="text-xs">© {new Date().getFullYear()} · Envíos a todo México</p>
      </div>
    </footer>
  );
}

export function StickyBar() {
  const { selected, add } = useCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{selected.label}</p>
          <p className="font-semibold text-ink">{formatMXN(selected.price)} <span className="text-xs font-normal text-muted-foreground line-through">{formatMXN(selected.compareAt)}</span></p>
        </div>
        <Button variant="clinical" size="lg" onClick={() => add(selected)}>Agregar al carrito</Button>
      </div>
    </div>
  );
}
