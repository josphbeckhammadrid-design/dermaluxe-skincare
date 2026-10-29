import { createFileRoute } from "@tanstack/react-router";
import { EmergCartProvider } from "@/components/emergencia/cart";
import { EmergAnnouncement, EmergHeader } from "@/components/emergencia/EmergHeader";
import { EmergBuyBox } from "@/components/emergencia/EmergBuyBox";
import {
  EmergTicker,
  EmergProblem,
  ModesDemo,
  EmergSpecs,
  EmergEnergy,
  EmergUses,
  EmergCompare,
  EmergReviews,
  EmergFaq,
  EmergFinalCta,
  EmergFooter,
  EmergStickyBar,
} from "@/components/emergencia/EmergSections";

export const Route = createFileRoute("/luz-emergencia")({
  head: () => ({
    meta: [
      { title: "Luz LED de Emergencia 5 Modos · Solar, USB y Powerbank" },
      {
        name: "description",
        content:
          "Reflector LED de emergencia con 5 modos de luz, carga solar y USB, powerbank para tu celular, IP66 y antigolpes. Envío gratis y pago contra entrega en México.",
      },
      { property: "og:title", content: "Luz LED de Emergencia · Nunca más a oscuras" },
      {
        property: "og:description",
        content: "Luz potente en cualquier apagón, se carga con el sol y carga tu celular. Desde $799, envío gratis y paga al recibir.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Oswald:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: EmergenciaPage,
});

function EmergenciaPage() {
  return (
    <EmergCartProvider>
      <div className="theme-emergencia min-h-screen">
        <EmergAnnouncement />
        <EmergHeader />
        <main className="pb-20 lg:pb-0">
          <EmergBuyBox />
          <EmergTicker />
          <EmergProblem />
          <ModesDemo />
          <EmergSpecs />
          <EmergEnergy />
          <EmergUses />
          <EmergCompare />
          <EmergReviews />
          <EmergFaq />
          <EmergFinalCta />
        </main>
        <EmergFooter />
        <EmergStickyBar />
      </div>
    </EmergCartProvider>
  );
}
