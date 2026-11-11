import type { Metadata } from "next";
import ValmontBarberPage from "@/components/valmont-barber/ValmontBarberPage";

export const metadata: Metadata = {
  title: "Valmont Barbearia & Clube Privado | Alta Barbearia e Assinatura",
  description:
    "Corte na tesoura e navalha de alta precisão, barboterapia com toalha quente, lounge single-malt e clube de assinatura exclusivo para homens exigentes.",
  alternates: {
    canonical: "/Valmont",
  },
};

export default function ValmontRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "Valmont Barbearia & Clube Privado",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200",
    description:
      "Atelier de alta barbearia, rituais clássicos na navalha, barboterapia e clube de assinatura masculina com lounge bar.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Oscar Freire, 1120 - Jardins",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01426-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5629,
      longitude: -46.6687,
    },
    url: "https://landing-page-hub.vercel.app/Valmont",
    telephone: "+5511998765432",
    priceRange: "$$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Credit Card, Debit Card, Pix, Cash",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços e Clube de Assinatura Valmont",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corte Valmont Signature",
            description: "Corte milimétrico na tesoura e navalha com visagismo facial e lavagem especial.",
          },
          price: "120.00",
          priceCurrency: "BRL",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Barboterapia Imperial com Toalha Quente",
            description: "Esfoliação facial, óleos botânicos, toalha quente aromatizada e lâmina japonesa.",
          },
          price: "95.00",
          priceCurrency: "BRL",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Clube Valmont Gentleman (Assinatura)",
            description: "Cortes e barboterapias ilimitadas no mês, lounge whisky liberado e prioridade de agenda.",
          },
          price: "219.00",
          priceCurrency: "BRL",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ValmontBarberPage />
    </>
  );
}
