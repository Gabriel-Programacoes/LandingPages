<div align="center">

# 💪 DENSIFY

### Fitness planning para rotinas impossíveis

[![Route](https://img.shields.io/badge/ROTA-%2FDensify-6aabf0?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/Densify)
[![Category](https://img.shields.io/badge/CATEGORIA-FITNESS-efad94?style=for-the-badge)](#)
[![UI](https://img.shields.io/badge/UI-LIQUID_GLASS-dcecff?style=for-the-badge)](#)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/Densify) ·
[**Voltar ao Hub**](../../../../../README.md)

</div>

---

## ◈ Visão do produto

| | |
|---|---|
| **Proposta** | Planejamento fitness de alta densidade |
| **Público** | Pessoas com pouco tempo e foco em hipertrofia |
| **Objetivo da página** | Conduzir da descoberta à simulação e ao download |
| **Rota** | `/Densify` |
| **Grupo** | `(fitness)` |

Densify troca a estética agressiva de academias por uma interface clara, suave e
orientada a produto. Gradientes pastel e superfícies translúcidas reduzem a carga
visual enquanto os controles mantêm a experiência funcional.

## ✦ Experiência

<table>
<tr><td><strong>🌅 Hero</strong><br/>Proposta de valor, métricas e CTA.</td><td><strong>🧭 Navbar</strong><br/>Estado no scroll e menu responsivo.</td></tr>
<tr><td><strong>🧮 Calculadora</strong><br/>Fluxo multipasso com resultado personalizado.</td><td><strong>🎠 Benefícios</strong><br/>Carrossel horizontal navegável.</td></tr>
<tr><td><strong>💬 Prova social</strong><br/>Cards de depoimentos e métricas.</td><td><strong>📲 Conversão</strong><br/>CTAs para plataformas mobile.</td></tr>
</table>

### Calculadora

O fluxo mantém localmente etapa, objetivo, perfil, dieta, disponibilidade e
resultado. `AnimatePresence` coordena as transições, enquanto os cálculos derivados
são memorizados no cliente. A simulação é demonstrativa e não substitui orientação
profissional.

## 🎨 Sistema visual

| Elemento | Direção |
|---|---|
| **Paleta** | Azul céu, pêssego, lavanda e branco translúcido |
| **Tipografia** | Nunito para display e Archivo para UI |
| **Material** | Glassmorphism com blur, borda e refração |
| **Motion** | Parallax, springs, stagger e transições de etapa |

O layout do grupo fitness registra filtros SVG animados com `feTurbulence` e
`feDisplacementMap`. Há variações para superfícies grandes e controles pequenos,
preservando a legibilidade do texto.

## 🧩 Componentes

```text
src/components/densify/
├── Navbar.tsx
├── HeroSection.tsx
├── BenefitsCarousel.tsx
├── CalculatorSection.tsx
├── TestimonialsSection.tsx
├── CTASection.tsx
└── Footer.tsx
```

Os componentes abaixo da dobra são carregados dinamicamente pela página, reduzindo
o JavaScript necessário no carregamento inicial.

## ⚙ Stack

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Framer Motion` ·
`Phosphor Icons` · `Radix UI` · `Simple Icons`

## 🗺 Estrutura da página

```text
/Densify
├── Navbar
├── Hero
├── Benefits Carousel
├── Calculator
├── Testimonials
├── Download CTA
└── Footer
```

## ♿ Responsividade e interação

- navegação mobile dedicada;
- controles com rótulos e estados visíveis;
- movimentos baseados principalmente em `transform` e `opacity`;
- seções extensas marcadas para renderização diferida;
- interface adaptada para toque e teclado conforme o controle.

## ◇ Rota relacionada

[`/comparison`](https://landingpages-hub.vercel.app/comparison) apresenta uma
comparação visual dos tratamentos Liquid Glass disponíveis no grupo fitness.

## ⚠ Escopo atual

- experiência conceitual, sem autenticação ou conta de usuário;
- resultados da calculadora não são persistidos;
- botões de loja funcionam como CTAs de demonstração;
- conteúdo fitness deve ser validado antes de eventual uso comercial.

---

<div align="center">

**Densify** · parte do [Landing Page Hub](../../../../../README.md)

</div>
