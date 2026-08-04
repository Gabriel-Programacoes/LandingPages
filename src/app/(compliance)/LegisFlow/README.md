<div align="center">

# ⚖️ LEGISFLOW

### Automação e compliance paralegal

[![Route](https://img.shields.io/badge/ROTA-%2FLegisFlow-4ade80?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/LegisFlow)
[![Category](https://img.shields.io/badge/CATEGORIA-B2B_COMPLIANCE-111?style=for-the-badge)](#)
[![Validation](https://img.shields.io/badge/VALIDAÇÃO-ZOD-3E67B1?style=for-the-badge&logo=zod)](https://zod.dev)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/LegisFlow) ·
[**Voltar ao Hub ↗**](https://landingpages-hub.vercel.app) ·
[**README principal**](../../../../README.md)

</div>

---

## ◈ Visão do produto

| | |
|---|---|
| **Proposta** | Centralizar obrigações paralegais e ambientais |
| **Público** | Escritórios contábeis e departamentos paralegais |
| **Conversão** | Agendamento de demonstração |
| **Rota** | `/LegisFlow` |
| **Grupo** | `(compliance)` |

LegisFlow é uma landing page B2B conceitual que apresenta monitoramento de
obrigações, organização documental e leitura operacional de conformidade.

## ✦ Experiência

<table>
<tr><td><strong>📣 Hero</strong><br/>Headline monumental e métricas animadas.</td><td><strong>↔ Marquee</strong><br/>Faixa contínua de contexto de mercado.</td></tr>
<tr><td><strong>▦ Bento</strong><br/>Módulos de integração, alertas e status.</td><td><strong>✍ Formulário</strong><br/>Validação no servidor e retorno por campo.</td></tr>
</table>

## 🎨 Sistema visual

| Elemento | Direção |
|---|---|
| **Paleta** | Off-white documental, carvão e verde utilitário |
| **Tipografia** | Bebas Neue, Archivo e Space Mono |
| **Geometria** | Linhas rígidas, pouca curvatura e sombras duras |
| **Motion** | Revelações precisas, contadores e marquee linear |

A direção de arte usa brutalismo corporativo moderado: estrutura forte e contraste
alto, equilibrados por espaço negativo e hierarquia legível.

## 🧩 Componentes

```text
src/app/(compliance)/LegisFlow/
├── page.tsx
└── actions.ts

src/components/legisflow/
├── HeroSection.tsx
├── MarqueeSection.tsx
├── BentoSection.tsx
└── LeadFormSection.tsx
```

`BentoSection` e `LeadFormSection` são carregados dinamicamente por estarem abaixo
da dobra.

## ↯ Pipeline do formulário

```text
LeadFormSection
    ↓ useActionState
submitLeadForm (Server Action)
    ↓
Zod safeParse
    ├── inválido → erros agrupados por campo
    └── válido   → confirmação demonstrativa
```

Campos atuais: nome, empresa, e-mail, telefone e CNPJ opcional. O estado de envio
é exposto por `useFormStatus`.

## ⚙ Stack

`Next.js Server Actions` · `React useActionState` · `Zod` · `Tailwind CSS` ·
`Framer Motion` · `TypeScript`

## 🗺 Estrutura da página

```text
/LegisFlow
├── Hero
├── Marquee
├── Feature Bento
├── Lead Form
└── Footer
```

## 🔐 Estado e segurança

A validação atual ocorre no servidor, mas o projeto é uma demonstração. Antes de
produção, o fluxo precisa de:

- persistência em banco ou integração com CRM;
- rate limiting, proteção antispam e auditoria;
- política de privacidade e base legal para tratamento de dados;
- envio transacional e observabilidade;
- remoção ou proteção adequada dos logs de dados recebidos.

## ⚠ Escopo atual

O envio simula latência, registra o conteúdo no servidor e retorna sucesso. Não há
banco de dados, e-mail, CRM ou agendamento real. A página não deve ser tratada como
um sistema jurídico operacional.

---

<div align="center">

**LegisFlow** · parte do [Landing Page Hub](../../../../README.md)

</div>
