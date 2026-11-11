import type { Metadata } from "next";
import LexDossierPage from "@/components/lex-dossier/LexDossierPage";

export const metadata: Metadata = {
  title: "Helena Prado • Inteligência Paralegal & Operações Societárias | Retainer Jurídico",
  description:
    "Portfólio & Soluções Paralegais Estratégicas para escritórios de advocacia e empresas: Atos na JUCESP, Due Diligence para M&A, varreduras patrimoniais e retainer por assinatura.",
  alternates: {
    canonical: "/LexDossier",
  },
};

export default function LexDossierRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Helena Prado",
        jobTitle: "Senior Paralegal & Estrategista em Operações Societárias",
        description:
          "Especialista em inteligência paralegal, diligências societárias em juntas comerciais, due diligence imobiliária e societária para M&A e retenção mensal de escritórios.",
        url: "https://landing-page-hub.vercel.app/LexDossier",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
      {
        "@type": "ProfessionalService",
        name: "Helena Prado • Operações Paralegais",
        telephone: "+5511987654321",
        priceRange: "$$$",
        currenciesAccepted: "BRL",
        paymentAccepted: "Pix, Transferência Bancária, Faturamento Mensal",
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços Paralegais & Planos de Retainer",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Due Diligence Societária & M&A",
                description:
                  "Auditoria profunda de certidões cíveis, trabalhistas, fiscais e cartorárias em todas as comarcas da federação com relatório estruturado.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Operações Societárias Express (JUCESP & RFB)",
                description:
                  "Abertura, alteração, consolidação contratual, transformação societária e baixa de CNPJ com acompanhamento diário até o deferimento.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Retainer Paralegal Mensal para Escritórios",
                description:
                  "Assinatura mensal para bancas jurídicas e departamentos internos: franquia de horas para diligências, certidões e gestão cartorária sem encargos CLT.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LexDossierPage />
    </>
  );
}
