import type { Metadata } from "next";
import { Bebas_Neue, Archivo, Space_Mono } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LegisFlow — Automação e Compliance Paralegal",
  description:
    "Gestão automatizada de licenças, certidões e obrigações ambientais para escritórios de contabilidade e departamentos paralegais.",
};

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bebasNeue.variable} ${archivo.variable} ${spaceMono.variable}`}
    >
      {children}
    </div>
  );
}

