import type { Metadata } from "next";
import AvantGardeHero from "@/components/creative-engineering/AvantGardeHero";

export const metadata: Metadata = {
  title: "Avant-Garde Architecture — Creative Engineering Portfolio",
  description:
    "Experimental digital machine: uncompromised typography, procedural WebGL noise distortion, and physical inertia scroll.",
};

export default function AvantGardeRoute() {
  return <AvantGardeHero />;
}
