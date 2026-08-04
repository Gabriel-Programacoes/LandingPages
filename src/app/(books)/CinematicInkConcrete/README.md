<div align="center">

# 📚 CINEMATIC INK & CONCRETE

### Independent bookstore · archival editorial

[![Route](https://img.shields.io/badge/ROTA-%2FCinematicInkConcrete-d9531e?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/CinematicInkConcrete)
[![Category](https://img.shields.io/badge/CATEGORIA-BOOKSTORE-27231f?style=for-the-badge)](#)
[![Motion](https://img.shields.io/badge/MOTION-FRAMER-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/CinematicInkConcrete) ·
[**Voltar ao Hub ↗**](https://landingpages-hub.vercel.app) ·
[**README principal**](../../../../README.md)

</div>

---

## ◈ Conceito

Uma livraria independente imaginária inspirada em arquivos, concreto, cinema e
design editorial. A interface trata os livros como objetos táteis, com lombadas,
arraste horizontal e foco contextual.

| | |
|---|---|
| **Categoria** | Bookstore / Editorial |
| **Objetivo** | Criar um storefront cultural memorável |
| **Rota** | `/CinematicInkConcrete` |
| **Grupo** | `(books)` |

## ✦ Experiência

<table>
<tr><td><strong>🎬 Hero</strong><br/>Manifesto tipográfico e atmosfera de arquivo.</td><td><strong>↔ Featured Spines</strong><br/>Trilho arrastável de lombadas.</td></tr>
<tr><td><strong>◐ Cursor</strong><br/>Indicador contextual acompanha o ponteiro.</td><td><strong>▣ Book Detail</strong><br/>Painel animado do título selecionado.</td></tr>
</table>

Os livros usam um conjunto fallback local e podem ser reorganizados no estado do
componente. O limite do trilho é recalculado conforme o espaço disponível.

## 🎨 Sistema visual

| Elemento | Escolha |
|---|---|
| **Tipografia** | DM Serif Display + Space Mono |
| **Paleta** | Carvão, papel envelhecido, concreto e laranja queimado |
| **Composição** | Tipografia pesada, linhas editoriais e grandes margens |
| **Motion** | Drag, cursor contextual e painel com AnimatePresence |

## 🧩 Arquitetura

```text
src/app/(books)/
├── layout.tsx                         # DM Serif Display + Space Mono
└── CinematicInkConcrete/
    ├── page.tsx
    └── README.md

src/components/cinematic-ink/
└── CinematicInkPage.tsx
```

## ⚙ Stack

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Framer Motion`

## 🗺 Narrativa da página

```text
/CinematicInkConcrete
├── Hero / Manifesto
├── Featured Spines
├── Curated Dissonance
├── Editorial Statement
└── Selected Book Detail
```

## ♿ Interação

- o painel ativo é anunciado pela hierarquia visual;
- o trilho considera larguras responsivas;
- o cursor personalizado é apenas um reforço visual;
- interações de arraste devem receber alternativa completa por teclado em uma
  evolução voltada à produção.

## ⚠ Escopo atual

O catálogo é demonstrativo e não possui carrinho, checkout, estoque ou backend.
Capas, títulos e chamadas compõem uma experiência editorial conceitual.

---

<div align="center">

**Cinematic Ink & Concrete** · parte do [Landing Page Hub](../../../../README.md)

</div>
