import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({ variable: "--font-lex-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-page-hub.vercel.app"),
  title: {
    default: "Helena Prado • Inteligência Paralegal & Operações Societárias",
    template: "%s | Helena Prado Paralegal",
  },
  description:
    "Suporte paralegal de alta precisão para escritórios e departamentos jurídicos: Due Diligence documental, atos na JUCESP, pesquisas patrimoniais e planos de retainer mensal.",
  keywords: [
    "paralegal são paulo",
    "operações societárias jucesp",
    "due diligence documental",
    "retainer paralegal para escritórios",
    "diligências cartorárias e judiciais",
    "pesquisa patrimonial",
    "compliance societário",
  ],
  authors: [{ name: "Helena Prado" }],
  openGraph: {
    title: "Helena Prado • Inteligência Paralegal & Dossiês Societários",
    description:
      "Acelerando escritórios e departamentos jurídicos com zero atrito operacional, atos societários tempestivos e due diligence minuciosa.",
    url: "https://landing-page-hub.vercel.app/LexDossier",
    siteName: "Helena Prado Paralegal",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helena Prado • Operações Paralegais Estratégicas",
    description:
      "Atos societários na JUCESP, due diligence e retainer mensal para bancas jurídicas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ParalegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${instrument.variable} ${plusJakarta.variable} ${mono.variable} antialiased`}
    >
      {children}
    </div>
  );
}
