import { DM_Serif_Display, Space_Grotesk } from "next/font/google";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export default function AvantGardeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${dmSerif.variable} ${spaceGrotesk.variable}`}>
      {children}
    </div>
  );
}
