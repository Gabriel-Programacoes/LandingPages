<div align="center">

# 📐 DRAFTED OBSIDIAN

### Engineering portfolio · systems interface

[![Route](https://img.shields.io/badge/ROTA-%2FDraftedObsidian-ff3b00?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/DraftedObsidian)
[![Category](https://img.shields.io/badge/CATEGORIA-SYSTEMS-171717?style=for-the-badge)](#)
[![Motion](https://img.shields.io/badge/MOTION-FRAMER-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/DraftedObsidian) ·
[**Voltar ao Hub**](../../../../../README.md)

</div>

---

## ◈ Conceito

Drafted Obsidian apresenta trabalho de engenharia como um sistema técnico: módulos
densos, coordenadas, especificações e linguagem de terminal substituem o portfólio
convencional.

| | |
|---|---|
| **Categoria** | Engineering / Portfolio |
| **Objetivo** | Comunicar precisão, método e repertório técnico |
| **Rota** | `/DraftedObsidian` |
| **Grupo** | `(engineering)` |

## ✦ Experiência

<table>
<tr><td><strong>⌖ Reactive Grid</strong><br/>Máscara radial acompanha o cursor.</td><td><strong>◷ UTC Clock</strong><br/>Horário atualizado na interface.</td></tr>
<tr><td><strong>▤ Project Stack</strong><br/>Projetos alternáveis por estado.</td><td><strong>⌘ Terminal CTA</strong><br/>Comando de contato editável.</td></tr>
</table>

## 🎨 Sistema visual

| Elemento | Escolha |
|---|---|
| **Tipografia** | Space Grotesk + Chivo Mono |
| **Paleta** | Obsidiana, cinza técnico, branco e laranja de alerta |
| **Layout** | Grades, divisórias e módulos de especificação |
| **Motion** | Scanner, marquee e resposta direta ao cursor |

A grade de fundo ganha visibilidade dentro de uma máscara radial posicionada pelas
coordenadas do mouse. Isso transforma o cursor em ferramenta de inspeção.

## 🧩 Arquitetura

```text
src/app/(engineering)/
├── layout.tsx                         # Space Grotesk + Chivo Mono
└── DraftedObsidian/
    ├── page.tsx
    └── README.md

src/components/drafted-obsidian/
└── DraftedObsidianPage.tsx
```

## ⚙ Estado e interação

O componente mantém quatro estados principais:

- posição do cursor para a máscara da grade;
- relógio UTC;
- projeto aberto no painel;
- texto do comando no terminal de contato.

## ⚙ Stack

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Framer Motion`

## 🗺 Narrativa da página

```text
/DraftedObsidian
├── System Hero
├── Capability / Specification Grid
├── Infinite Technology Track
├── Project Modules
└── Terminal Contact
```

## ⚠ Escopo atual

O terminal é uma interação visual: ele não executa comandos nem envia mensagens.
Os projetos e métricas são conteúdo de apresentação, não dados carregados de uma
API ou CMS.

---

<div align="center">

**Drafted Obsidian** · parte do [Landing Page Hub](../../../../../README.md)

</div>
