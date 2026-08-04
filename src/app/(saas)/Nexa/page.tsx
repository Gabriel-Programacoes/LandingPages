import type { Metadata } from "next";
import { NexaLanding } from "@/components/nexa/NexaShell";

export const metadata: Metadata = { title: "Nexa — Clareza para crescer", description: "Conecte dados, pessoas e processos em uma plataforma criada para transformar complexidade em crescimento previsível.", keywords: ["gestão operacional", "automação", "business intelligence", "SaaS B2B"], openGraph: { title: "Nexa — Faça sua operação avançar como uma só", description: "O sistema operacional do seu crescimento.", type: "website", locale: "pt_BR" } };
export default function Page() { return <NexaLanding/>; }
