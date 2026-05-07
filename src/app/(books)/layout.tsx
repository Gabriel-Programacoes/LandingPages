import { DM_Serif_Display, Space_Mono } from "next/font/google";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono-books",
  subsets: ["latin"],
  display: "swap",
});

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${dmSerif.variable} ${spaceMono.variable}`}>{children}</div>;
}

