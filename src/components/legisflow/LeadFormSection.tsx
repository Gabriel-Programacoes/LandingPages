"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLeadForm, type FormState } from "@/app/(compliance)/LegisFlow/actions";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const initial: FormState = { success: false, message: "", errors: {} };

// ─── Field component ───────────────────────────────────────

function Field({
  label,
  name,
  type = "text",
  placeholder,
  errors,
  colSpan,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  errors?: string[];
  colSpan?: string;
}) {
  const hasError = errors && errors.length > 0;

  return (
    <div className={`flex flex-col gap-1.5 ${colSpan ?? ""}`}>
      <label className="font-terminal text-[10px] tracking-[0.25em] uppercase text-off-white/50">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`
          bg-transparent border-2 font-terminal text-sm text-off-white
          placeholder:text-off-white/25 px-4 py-4
          focus:outline-none transition-colors duration-150
          ${hasError ? "border-red-500" : "border-off-white/25 focus:border-verde"}
        `}
      />
      {hasError && (
        <span className="font-terminal text-[10px] text-red-400 tracking-wide">
          ✗ {errors![0]}
        </span>
      )}
    </div>
  );
}

// ─── Submit button — reads pending state from context ──────

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        font-ui font-bold text-xs tracking-[0.22em] uppercase
        bg-verde text-off-white px-12 py-5 border-2 border-verde
        shadow-[4px_4px_0px_0px_#F5F2EC]
        hover:shadow-[7px_7px_0px_0px_#F5F2EC]
        hover:-translate-x-0.5 hover:-translate-y-0.5
        transition-all duration-150 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        w-full md:w-auto
      "
    >
      {pending ? "PROCESSANDO..." : "CONFIRMAR SOLICITAÇÃO →"}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────

export default function LeadFormSection() {
  const [state, formAction] = useActionState(submitLeadForm, initial);

  return (
    <section id="agendar" className="bg-ink px-6 md:px-14 py-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 border-b border-off-white/15 pb-10"
        >
          <p className="font-terminal text-xs text-verde tracking-[0.28em] mb-5 flex items-center gap-1">
            $ legisflow --schedule-demo --priority=high
            <motion.span
              className="inline-block w-2 h-4 bg-verde align-middle"
              animate={{ opacity: [1, 1, 0, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear", times: [0, 0.49, 0.5, 0.99, 1] }}
            />
          </p>
          <h2
            className="font-headline uppercase leading-none text-off-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            AGENDE SUA
            <br />
            <span className="text-verde">DEMONSTRAÇÃO</span>
          </h2>
          <p className="font-ui text-sm text-off-white/45 mt-5 max-w-lg leading-relaxed">
            Nossa equipe entra em contato em até 24 horas úteis para apresentar
            como o LegisFlow pode ser configurado para o perfil da sua operação.
          </p>
        </motion.div>

        {/* Success state */}
        {state.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="border-2 border-verde p-10"
          >
            <p className="font-terminal text-xs text-verde tracking-[0.28em] mb-3">
              ✓ STATUS: SOLICITAÇÃO CONFIRMADA
            </p>
            <p className="font-headline text-2xl md:text-3xl text-off-white uppercase leading-snug">
              {state.message}
            </p>
          </motion.div>
        ) : (
          /* Form */
          <motion.form
            action={formAction}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Nome Completo"
                name="name"
                placeholder="_ nome completo"
                errors={state.errors?.name}
              />
              <Field
                label="Empresa / Escritório"
                name="company"
                placeholder="_ razão social"
                errors={state.errors?.company}
              />
              <Field
                label="E-mail Corporativo"
                name="email"
                type="email"
                placeholder="_ email@empresa.com.br"
                errors={state.errors?.email}
              />
              <Field
                label="Telefone / WhatsApp"
                name="phone"
                type="tel"
                placeholder="_ (11) 9 0000-0000"
                errors={state.errors?.phone}
              />
            </div>

            <Field
              label="Quantidade de CNPJs Gerenciados (opcional)"
              name="cnpjs"
              placeholder="_ ex: 45 CNPJs"
            />

            {/* Error message global */}
            {state.message && !state.success && (
              <div className="border border-red-500/50 px-4 py-3">
                <span className="font-terminal text-xs text-red-400 tracking-wide">
                  ✗ {state.message}
                </span>
              </div>
            )}

            <div className="flex items-center gap-6 mt-2 flex-wrap">
              <SubmitButton />
              <p className="font-ui text-xs text-off-white/30 tracking-wide">
                Sem compromisso. Sem cartão de crédito.
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

