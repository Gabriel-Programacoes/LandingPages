<div align="center">

# 🍑 NEXA

### Clareza operacional para crescer com leveza

[![Route](https://img.shields.io/badge/ROTA-%2FNexa-632f58?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/Nexa)
[![Category](https://img.shields.io/badge/CATEGORIA-B2B_SAAS-f2b8a2?style=for-the-badge)](#)
[![UI](https://img.shields.io/badge/UI-SOFT_EDITORIAL-f2f7f7?style=for-the-badge)](#)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/Nexa) ·
[**Abrir contato ↗**](https://landingpages-hub.vercel.app/Nexa/contato) ·
[**Voltar ao Hub ↗**](https://landingpages-hub.vercel.app) ·
[**README principal**](../../../../README.md)

</div>

---

## ◈ Visão do produto

| | |
|---|---|
| **Proposta** | Unificar dados, pessoas e processos operacionais |
| **Público** | Times B2B de operações, receita e sucesso do cliente |
| **Conversão** | Teste do produto ou conversa com especialista |
| **Rotas** | `/Nexa` e `/Nexa/contato` |
| **Grupo** | `(saas)` |

Nexa é uma landing page SaaS conceitual com jornada comercial completa. A página
principal apresenta a proposta, prova social, benefícios, módulos de produto,
depoimentos, preços e FAQ. A rota interna de contato coleta o contexto do lead e
abre uma conversa estruturada no WhatsApp.

## ✦ Experiência

<table>
<tr><td><strong>🌤 Hero</strong><br/>Headline editorial, CTAs e dashboard demonstrativo.</td><td><strong>◎ Prova social</strong><br/>Marquee contínuo com marcas fictícias.</td></tr>
<tr><td><strong>✦ Benefícios</strong><br/>Quatro cards com microinterações específicas.</td><td><strong>◫ Plataforma</strong><br/>Cinco módulos alternados de produto.</td></tr>
<tr><td><strong>❝ Depoimentos</strong><br/>Relatos e papéis de clientes conceituais.</td><td><strong>◌ Planos</strong><br/>Três níveis comerciais com destaque para Scale.</td></tr>
<tr><td><strong>＋ FAQ</strong><br/>Acordeão semântico baseado em `details`.</td><td><strong>↗ Contato</strong><br/>Formulário com transferência para WhatsApp.</td></tr>
</table>

## 🎨 Sistema visual

| Elemento | Direção |
|---|---|
| **Paleta** | Ameixa `#632f58`, pêssego `#f2b8a2` e gelo `#f2f7f7` |
| **Tipografia** | Newsreader para display e Manrope para interface |
| **Geometria** | Superfícies arredondadas, formas orgânicas e sombras difusas |
| **Motion** | Entradas suaves, reveal no scroll e microinterações táteis |

A direção evita o padrão SaaS escuro e brutalista. O gelo funciona como base
luminosa, a ameixa organiza hierarquia e conversão, e o pêssego adiciona calor aos
pontos de energia. Uma névoa lavanda conecta os módulos sem criar uma quarta cor
dominante.

As fontes usam `next/font`, são auto-hospedadas no build e não geram requisições
ao Google durante a navegação.

## 🧩 Arquitetura

```text
src/app/(saas)/Nexa/
├── layout.tsx                 # Newsreader e Manrope
├── page.tsx                   # Landing e metadata principal
├── README.md
└── contato/
    └── page.tsx               # Contato e metadata específica

src/components/nexa/
└── NexaShell.tsx              # Landing, contato e componentes compartilhados
```

O catálogo do Hub é atualizado em `src/lib/projects.ts`. Os estilos ficam
escopados por `.nexa-soft` em `src/app/globals.css` para não alterar as demais
experiências.

## 🗺 Estrutura das páginas

```text
/Nexa
├── Header responsivo
├── Hero + Product Dashboard
├── Customer Logo Marquee
├── Benefits
├── Product Modules × 5
├── Testimonials
├── Pricing
├── FAQ
├── Final CTA
└── Footer

/Nexa/contato
├── Header
├── Contexto comercial
├── Formulário
└── Footer
```

## ↗ Integração com WhatsApp

O formulário é validado inicialmente pelos atributos HTML nativos. No envio, os
campos são codificados e transformados em uma mensagem pré-preenchida para
`wa.me`.

Configure o número público no ambiente:

```env
NEXT_PUBLIC_NEXA_WHATSAPP=5511999999999
```

Use apenas dígitos, incluindo código do país e DDD. O fallback presente no código
é demonstrativo e deve ser substituído antes de publicar um projeto real.

```text
Formulário
    ↓ validação nativa
FormData
    ↓ encodeURIComponent
Mensagem estruturada
    ↓ window.open
WhatsApp / wa.me
```

Não há persistência, CRM, envio de e-mail ou Server Action nesse fluxo.

## ✦ Interação e movimento

- entrada coreografada da navegação, headline, CTAs e dashboard;
- um único `IntersectionObserver` para todos os reveals no scroll;
- cards, planos e depoimentos com elevação e luz no hover;
- módulos com profundidade e painel interno flutuante;
- CTAs com brilho deslizante e deslocamento da seta;
- formas orgânicas animadas apenas com `transform`;
- fallback completo para `prefers-reduced-motion`.

O observer deixa de acompanhar cada elemento após a primeira entrada na tela,
reduzindo trabalho contínuo no cliente.

## 🔎 SEO, responsividade e performance

- metadata estática por rota usando a API do Next.js;
- título, descrição, keywords e Open Graph na landing;
- HTML pré-renderizado estaticamente;
- tipografia auto-hospedada e com `display: swap`;
- efeitos visuais baseados principalmente em CSS;
- navegação mobile dedicada;
- preview do produto recomposto no mobile, sem sidebar ou perspectiva 3D;
- métricas do dashboard em grade `2 + 1` e gráfico contido no viewport;
- breakpoints específicos em `800px`, `600px` e `390px`;
- campos com 16px em telas pequenas para evitar zoom automático no Safari;
- estados de hover neutralizados em dispositivos exclusivamente touch;
- formulário com `autocomplete`, tipos e campos obrigatórios;
- componentes sem imagens pesadas acima da dobra;
- suporte a redução de movimento.

## ⚙ Stack

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS 4` ·
`Phosphor Icons` · `IntersectionObserver` · `next/font`

## ⚠ Escopo atual

- produto, métricas, clientes e depoimentos são conceituais;
- os links institucionais do footer ainda são demonstrativos;
- o formulário não armazena dados e depende da abertura do WhatsApp;
- não há autenticação, conta, billing ou aplicação SaaS funcional;
- políticas de privacidade e consentimento devem ser implementadas antes de uso
  comercial.

---

<div align="center">

**Nexa** · parte do [Landing Page Hub](../../../../README.md)

</div>
