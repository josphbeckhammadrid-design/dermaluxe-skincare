import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/components/product/cart";
import { AnnouncementBar, SiteHeader } from "@/components/product/SiteHeader";
import { BuyBox } from "@/components/product/BuyBox";
import {
  IngredientTicker,
  Problem,
  Formula,
  HowTo,
  Results,
  Compare,
  Reviews,
  Faq,
  FinalCta,
  SiteFooter,
  StickyBar,
} from "@/components/product/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KORMESIC Acid Peel Pads · Ácido Salicílico 2% + Glicólico 30%" },
      {
        name: "description",
        content:
          "Pads exfoliantes coreanos para poros limpios, menos grasa y piel luminosa. Pago contra entrega y envío a todo México.",
      },
      { property: "og:title", content: "KORMESIC Acid Peel Pads · Piel limpia y luminosa" },
      {
        property: "og:description",
        content: "Exfoliación química coreana en un pad: BHA 2% + AHA 30%. Paga al recibir, garantía de 60 días.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <AnnouncementBar />
      <SiteHeader />
      <main className="pb-20 lg:pb-0">
        <BuyBox />
        <IngredientTicker />
        <Problem />
        <Formula />
        <HowTo />
        <Results />
        <Compare />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyBar />
    </CartProvider>
  );
}
