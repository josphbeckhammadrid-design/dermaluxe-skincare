import { createFileRoute } from "@tanstack/react-router";
import { SolarCartProvider } from "@/components/solar/cart";
import { SolarAnnouncement, SolarHeader } from "@/components/solar/SolarHeader";
import { SolarBuyBox } from "@/components/solar/SolarBuyBox";
import {
  TechTicker,
  Problem,
  MotionDemo,
  Specs,
  DayNight,
  Uses,
  HowTo,
  Compare,
  Reviews,
  Faq,
  FinalCta,
  SolarFooter,
  SolarStickyBar,
} from "@/components/solar/SolarSections";

export const Route = createFileRoute("/lampara-solar")({
  head: () => ({
    meta: [
      { title: "Lámpara Solar LED 9 COB con Sensor de Movimiento · Sin pagar luz" },
      {
        name: "description",
        content:
          "Lámpara solar de 9 paneles LED COB con sensor de movimiento 120° y control remoto. Sin cables, envío gratis y pago contra entrega en todo México.",
      },
      { property: "og:title", content: "Lámpara Solar LED 9 COB · Ilumina tu casa con el sol" },
      {
        property: "og:description",
        content: "Se carga con el sol y se enciende sola al detectar movimiento. Desde $699, envío gratis y paga al recibir.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: SolarPage,
});

function SolarPage() {
  return (
    <SolarCartProvider>
      <div className="theme-solar min-h-screen">
        <SolarAnnouncement />
        <SolarHeader />
        <main className="pb-20 lg:pb-0">
          <SolarBuyBox />
          <TechTicker />
          <Problem />
          <MotionDemo />
          <Specs />
          <DayNight />
          <Uses />
          <HowTo />
          <Compare />
          <Reviews />
          <Faq />
          <FinalCta />
        </main>
        <SolarFooter />
        <SolarStickyBar />
      </div>
    </SolarCartProvider>
  );
}
