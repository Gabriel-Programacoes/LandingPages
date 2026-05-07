import { Bodoni_Moda, Manrope } from "next/font/google";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope-atelier",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export default function AtelierLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${bodoni.variable} ${manrope.variable}`}>{children}</div>;
}

