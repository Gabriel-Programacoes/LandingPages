import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";

const cinzel = Cinzel({
  variable: "--font-valmont-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-valmont-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-page-hub.vercel.app"),
  title: {
    default: "Valmont Barbearia & Clube Privado | Alta Barbearia e Assinatura",
    template: "%s | Valmont Barbearia",
  },
  description:
    "Alta barbearia em São Paulo: corte milimétrico na tesoura e navalha, barboterapia com toalha quente e clube de assinatura exclusivo para cavalheiros exigentes.",
  keywords: [
    "barbearia premium são paulo",
    "clube de assinatura barbearia",
    "barbearia jardins",
    "corte de cabelo masculino",
    "barboterapia toalha quente",
    "plano mensal barbearia",
    "agendamento barbearia",
  ],
  authors: [{ name: "Valmont Barber Club" }],
  openGraph: {
    title: "Valmont Barbearia & Clube Privado | Alta Barbearia",
    description:
      "Cortes de precisão, barboterapia ancestral e clube de assinatura mensal. Reserve seu horário no lounge mais exclusivo de São Paulo.",
    url: "https://landing-page-hub.vercel.app/Valmont",
    siteName: "Valmont Barbearia & Clube",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valmont Barbearia & Clube Privado",
    description:
      "A excelência do corte clássico e moderno com clube de assinatura mensal.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BarbeariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cinzel.variable} ${plusJakarta.variable} font-sans antialiased`}
    >
      {children}
    </div>
  );
}
