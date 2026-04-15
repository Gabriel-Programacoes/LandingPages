"use server";

import { z } from "zod";

// ─── Schema ────────────────────────────────────────────────
const demoSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  company: z.string().min(2, "Empresa deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(10, "Telefone inválido — mínimo 10 dígitos")
    .regex(/[\d\s()\-+]+/, "Formato de telefone inválido"),
  cnpjs: z.string().optional(),
});

// ─── Types ─────────────────────────────────────────────────
export type FormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<string, string[]>>;
};

// ─── Action ────────────────────────────────────────────────
export async function submitLeadForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    cnpjs: formData.get("cnpjs") as string | undefined,
  };

  const result = demoSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Partial<Record<string, string[]>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (field) {
        fieldErrors[field] = fieldErrors[field] ?? [];
        (fieldErrors[field] as string[]).push(issue.message);
      }
    }
    return {
      success: false,
      message: "Corrija os campos abaixo antes de enviar.",
      errors: fieldErrors,
    };
  }

  // Em produção: salvar em DB, enviar email, integrar CRM...
  // Simulação de latência de processamento
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log("[LegisFlow Lead]", result.data);

  return {
    success: true,
    message:
      "DEMONSTRAÇÃO AGENDADA. NOSSA EQUIPE ENTRARÁ EM CONTATO EM ATÉ 24 HORAS ÚTEIS.",
  };
}

