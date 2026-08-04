import { Manrope, Newsreader } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-nexa-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-nexa-display",
  display: "swap",
});

export default function NexaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`nexa-soft ${manrope.variable} ${newsreader.variable}`}>{children}</div>;
}
