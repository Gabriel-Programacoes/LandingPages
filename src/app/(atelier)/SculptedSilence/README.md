<div align="center">

# 🧵 SCULPTED SILENCE

### Digital atelier · quiet luxury · editorial motion

[![Route](https://img.shields.io/badge/ROTA-%2FSculptedSilence-9a948c?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/SculptedSilence)
[![Category](https://img.shields.io/badge/CATEGORIA-ATELIER-242220?style=for-the-badge)](#)
[![Motion](https://img.shields.io/badge/MOTION-FRAMER-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/SculptedSilence) ·
[**Voltar ao Hub ↗**](https://landingpages-hub.vercel.app) ·
[**README principal**](../../../../README.md)

</div>

---

## ◈ Conceito

Sculpted Silence traduz uma maison de moda imaginária para a web. A experiência
prioriza fotografia, silêncio visual, assimetria e ritmo editorial em vez de
elementos tradicionais de e-commerce.

| | |
|---|---|
| **Categoria** | Fashion / Editorial |
| **Objetivo** | Demonstrar direção de arte e composição premium |
| **Rota** | `/SculptedSilence` |
| **Grupo** | `(atelier)` |

## ✦ Experiência

<table>
<tr><td><strong>🎞 Opening</strong><br/>Hero fotográfico com revelação cinematográfica.</td><td><strong>⌁ House Codes</strong><br/>Manifesto visual e princípios da marca.</td></tr>
<tr><td><strong>↔ Drag Rail</strong><br/>Editorial horizontal com limite responsivo.</td><td><strong>◉ Viewing</strong><br/>CTA final para apresentação privada.</td></tr>
</table>

O componente calcula o limite de arraste a partir das dimensões reais do trilho e
da viewport. Há também um controle conceitual de som mantido em estado local.

## 🎨 Direção visual

| Elemento | Escolha |
|---|---|
| **Tipografia** | Bodoni Moda + Manrope |
| **Paleta** | Preto, marfim, cinzas quentes e tons de pedra |
| **Composição** | Assimetrias, recortes amplos e espaço negativo |
| **Motion** | Entradas lentas, parallax e drag editorial |

## 🖼 Assets

As imagens ficam em `public/sculpted-silence/`. O acervo inclui hero portraits,
macro de tecidos, cenas externas e estudos de movimento.

## 🧩 Arquitetura

```text
src/app/(atelier)/
├── layout.tsx                         # Bodoni Moda + Manrope
└── SculptedSilence/
    ├── page.tsx
    └── README.md

src/components/sculpted-silence/
└── SculptedSilencePage.tsx
```

## ⚙ Stack

`Next.js` · `React` · `Tailwind CSS` · `Framer Motion` · `next/font`

## 🗺 Narrativa da página

```text
/SculptedSilence
├── Opening / Hero
├── House Codes
├── Brand Statement
├── Draggable Editorial Rail
├── Craft & Material Studies
└── Private Viewing CTA
```

## ♿ Considerações

- imagens decorativas e editoriais precisam manter textos alternativos adequados;
- o drag deve continuar utilizável em telas pequenas;
- o contraste acompanha a alternância entre fundos claros e escuros;
- motion deve respeitar preferências do usuário em evoluções futuras.

## ⚠ Escopo atual

É uma experiência conceitual de marca. O controle de som não reproduz áudio e o
pedido de visualização privada não está conectado a um serviço de agendamento.

---

<div align="center">

**Sculpted Silence** · parte do [Landing Page Hub](../../../../README.md)

</div>
