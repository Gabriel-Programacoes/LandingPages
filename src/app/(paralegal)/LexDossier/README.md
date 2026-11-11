<div align="center">

# ⚖️ LEXDOSSIER

### Helena Prado · Inteligência Paralegal, Diligência Probatória & Operações Societárias

[![Route](https://img.shields.io/badge/ROTA-%2FLexDossier-1b365d?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/LexDossier)
[![Category](https://img.shields.io/badge/CATEGORIA-PARALEGAL%20OPS-100d08?style=for-the-badge)](#)
[![Direction](https://img.shields.io/badge/AVANT--GARDE---WILD-a82a1e?style=for-the-badge)](#)
[![Theme](https://img.shields.io/badge/POLARITY-LIGHT%20FIRST%20OKLCH-f6f3ec?style=for-the-badge)](#)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/LexDossier) ·
[**Voltar ao Hub ↗**](https://landingpages-hub.vercel.app) ·
[**README principal**](../../../../README.md)

</div>

---

## ◈ Conceito

Criada sob a diretriz **`--wild`** da skill `avant-garde-frontend`, a **LexDossier** rompe integralmente com o arquétipo genérico de SaaS e templates escuros de tecnologia. A interface materializa um **Caderno de Diligência Notarial & Autos Físicos Folheáveis** aberto sobre uma mesa de escritório iluminada por luz natural.

O projeto atua como portfólio executivo e máquina de alta conversão para bancas de advocacia (terceirização sênior em retainer mensal), departamentos jurídicos (saneamento de M&A e Data Room) e recrutadores do setor jurídico.

| | |
|---|---|
| **Categoria** | LegalTech / Operações Societárias & Paralegal Sênior |
| **Objetivo** | Conversão em assinatura B2B mensal (Retainer) e diligências avulsas sob demanda |
| **Rota** | `/LexDossier` |
| **Grupo** | `(paralegal)` |

---

## ✦ Experiência e Inovações (`--wild`)

<table>
<tr>
<td><strong>📜 Asymmetric Split Dossier</strong><br/>Coluna esquerda fixa com ficha catalográfica, índice remissivo vivo e selo vetorial rotativo; coluna direita rolável como lauda ativa numerada (01 a 45).</td>
<td><strong>☀️ Light-First Papel Algodão</strong><br/>Padrão em tons quentes de papel arquival 120g (<code>oklch(96.5% 0.009 84.6)</code>), tinta ferrogálica preta (18.6:1 AAA) e grifos em amarelo cartório.</td>
</tr>
<tr>
<td><strong>🎛 Seletor Físico de Persona</strong><br/>Três chaves de indexação (Bancas de Advocacia, Jurídico M&A e Recrutadores) que adaptam o parecer executivo, KPIs e CTAs em tempo real.</td>
<td><strong>⚖️ Simulador Duplo de Contratação</strong><br/>Alternância entre células de assinatura mensal B2B (com horas jurídicas liberadas) e calculadora somável de atos avulsos.</td>
</tr>
<tr>
<td><strong>🗂 Caderno de Provas & Cronologia</strong><br/>Dossiês expansíveis com linha do tempo de execução hora a hora (Hora 00h → Hora 14h → Deferimento).</td>
<td><strong>✍ Termo de Despacho com Carimbo</strong><br/>Minuta oficial que gera número de protocolo único e exibe animação física de carimbo com despacho para WhatsApp ou e-mail.</td>
</tr>
</table>

---

## 🎨 Sistema Visual & Tipografia

| Elemento | Especificação |
|---|---|
| **Tipografia** | Instrument Serif (Titulares monumentais e itálico de cartório), Plus Jakarta Sans (Texto de parecer e leitura) e JetBrains Mono (Numeração de lauda, metadados e protocols) |
| **Cores (OKLCH)** | Papel Algodão (`oklch(96.5% 0.009 84.6)`), Tinta Ferrogálica (`oklch(16% 0.012 84.6)`), Amarelo Cartório (`oklch(91% 0.092 86)`), Vermelhão Lacre (`oklch(48% 0.185 27.5)`) |
| **Anti-Slop** | Zero pílulas arredondadas (`anti-slop-pill-badge`); metadados exclusivamente como marginalia tipográfica nua em monospace ou carimbos de cantos vivos |
| **Mobile-First** | Barra inferior tátil de despacho para recrutadores, índice gaveta rápido e total ergonomia em telas de 375px a 430px |

---

## 🧩 Arquitetura

```text
src/app/(paralegal)/
├── layout.tsx                         # Instrument Serif + Jakarta + Mono + SEO Schema
└── LexDossier/
    ├── page.tsx                       # Rota com JSON-LD LegalService
    ├── REBUILD_SPEC.md                # Especificação técnica do modelo avant-garde
    └── README.md                      # Esta documentação

src/components/lex-dossier/
├── LexDossierPage.tsx                 # Split Dossier de 6 folhas (FL. 01 a FL. 06)
└── lex-dossier.css                    # Tokens de chancelaria e lauda notarial
```

---

## ⚙ Stack Tecnológico

`Next.js 16` · `React 19` · `Tailwind CSS 4` · `Framer Motion 12` · `OKLCH Perceptual Palette` · `Phosphor Icons`

---

<div align="center">

[← Voltar ao Hub de Projetos](https://landingpages-hub.vercel.app)

</div>
