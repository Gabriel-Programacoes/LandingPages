<div align="center">

# 💈 VALMONT BARBER CLUB

### Alta Barbearia · Confraria Privada · Clube de Assinatura

[![Route](https://img.shields.io/badge/ROTA-%2FValmont-c8963e?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/Valmont)
[![Category](https://img.shields.io/badge/CATEGORIA-LUXURY%20GROOMING-1a1816?style=for-the-badge)](#)
[![Theme](https://img.shields.io/badge/THEME-DUAL%20LIGHT%2FDARK-c8963e?style=for-the-badge)](#)
[![Motion](https://img.shields.io/badge/MOTION-FRAMER-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/Valmont) ·
[**Voltar ao Hub ↗**](https://landingpages-hub.vercel.app) ·
[**README principal**](../../../../README.md)

</div>

---

## ◈ Conceito

Localizada nos Jardins, São Paulo, a **Valmont Barbearia & Clube Privado** transcende a barbearia tradicional: é um refúgio de desaceleração onde precisão cirúrgica de corte e navalha encontra a hospitalidade de uma confraria de cavalheiros.

A landing page foi desenvolvida para operar com **dupla conversão**:
1. Atração e agendamento imediato de novos clientes para serviços de assinatura e rituais avulsos;
2. Conversão recorrente para os três níveis do Clube de Assinatura Valmont com calculadora de economia em tempo real.

| | |
|---|---|
| **Categoria** | Luxury Grooming / Confraria Masculina |
| **Objetivo** | Alta conversão de novos clientes e assinantes de planos recorrentes |
| **Rota** | `/Valmont` |
| **Grupo** | `(barbearia)` |

---

## ✦ Experiência e Interações

<table>
<tr>
<td><strong>🌓 Dual-Theme Perceptual</strong><br/>Alternância instantânea entre modo claro (linho marfim) e noturno (carvão obsidiana) com persistência em <code>localStorage</code>.</td>
<td><strong>🧮 Simulador de Clube</strong><br/>Régua interativa de visitas mensais com comparativo dinâmico de custo avulso versus economia no plano.</td>
</tr>
<tr>
<td><strong>✂ Catálogo de Rituais</strong><br/>Filtros por categoria (Cabelo, Barba, Experiência) com comanda animada via Framer Motion.</td>
<td><strong>💬 WhatsApp Direct Handoff</strong><br/>Geração de comanda pré-formatada com profissional, ritual, data e modalidade de atendimento.</td>
</tr>
</table>

---

## 🎨 Sistema Visual

| Elemento | Especificação |
|---|---|
| **Tipografia** | Cinzel (Display romano entalhado) + Plus Jakarta Sans (Corpo e UI contemporânea) |
| **Paleta** | Ouro âmbar (`#c8963e`), carvão profundo (`#110f0d`), linho cru (`#f6f3eb`) e couro quente |
| **Composição** | Capítulos numerados `[ 01 — ATELIER ]`, fotografia contextual editorial e contrastes finos |
| **SEO & Schema** | Metadados completos com OpenGraph, Twitter Cards e JSON-LD estruturado (`BarberShop`) |

---

## 🧩 Arquitetura

```text
src/app/(barbearia)/
├── layout.tsx                         # Cinzel + Plus Jakarta Sans + SEO Metadata
└── Valmont/
    ├── page.tsx                       # Rota com JSON-LD BarberShop
    ├── REBUILD_SPEC.md                # Especificação técnica de reconstrução
    └── README.md                      # Esta documentação

src/components/valmont-barber/
├── ValmontBarberPage.tsx              # Componente principal client-side
└── valmont.css                        # Tokens de tema claro/escuro e estilos dedicados
```

---

## ⚙ Stack Tecnológico

`Next.js 16` · `React 19` · `Tailwind CSS 4` · `Framer Motion 12` · `Phosphor Icons` · `Schema.org JSON-LD`

---

<div align="center">

[← Voltar ao Hub de Projetos](https://landingpages-hub.vercel.app)

</div>
