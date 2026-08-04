import type { Metadata } from "next";
import { NexaContact } from "@/components/nexa/NexaShell";
export const metadata: Metadata = { title: "Contato | Nexa", description: "Converse com um especialista Nexa e descubra como simplificar sua operação." };
export default function Page() { return <NexaContact/>; }
