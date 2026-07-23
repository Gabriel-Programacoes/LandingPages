<div align="center">

# Landing Page Hub

Uma coleção de experiências digitais desenvolvidas com Next.js, reunidas em um
Hub interativo com identidade, componentes e estilos isolados por projeto.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Online-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://landingpages-hub.vercel.app)

**[Acessar o projeto](https://landingpages-hub.vercel.app)**

</div>

## Sobre o projeto

O Landing Page Hub funciona como portfólio e laboratório de interfaces. A página
inicial organiza seis projetos com propostas visuais diferentes e permite explorar
o trabalho por capacidade técnica, como Motion, WebGL, UI de produto, Editorial,
formulários e Server Actions.

O Hub atual inclui:

- filtros por capacidade;
- previews animados específicos para cada projeto;
- informações de objetivo, atuação, resultado e tecnologias;
- estudos de caso resumidos;
- indicadores de complexidade em UI, motion, 3D e backend;
- navegação rápida entre experiências pelo `MiniHubMenu`;
- Vercel Analytics no layout raiz.

## Projetos disponíveis

| Projeto | Categoria | Destaques | Rota |
|---|---|---|---|
| **Sculpted Silence** | Fashion / Editorial | Composição editorial, direção de arte e motion contido | [`/SculptedSilence`](https://landingpages-hub.vercel.app/SculptedSilence) |
| **Spectral Core** | Interactive / 3D | Three.js, React Three Fiber, controles orbitais e bloom | [`/SpectralCore`](https://landingpages-hub.vercel.app/SpectralCore) |
| **Drafted Obsidian** | Engineering / Portfolio | Interface técnica, estética brutalista e motion | [`/DraftedObsidian`](https://landingpages-hub.vercel.app/DraftedObsidian) |
| **LegisFlow** | Legal Compliance | Formulário, Server Action, Zod e UI B2B | [`/LegisFlow`](https://landingpages-hub.vercel.app/LegisFlow) |
| **Cinematic Ink & Concrete** | Bookstore / Editorial | Tipografia editorial, composição e interações táteis | [`/CinematicInkConcrete`](https://landingpages-hub.vercel.app/CinematicInkConcrete) |
| **Densify** | Fitness & Nutrition | UI de produto, calculadora, Radix Slider e Liquid Glass | [`/Densify`](https://landingpages-hub.vercel.app/Densify) |

O Densify também possui uma rota complementar para comparação do efeito visual:
[`/comparison`](https://landingpages-hub.vercel.app/comparison).

## Tecnologias

### Base

- Next.js 16.2 com App Router;
- React 19.2;
- TypeScript 5;
- Tailwind CSS 4;
- Framer Motion 12.

### 3D e WebGL

- Three.js;
- React Three Fiber;
- Drei;
- React Three Postprocessing;
- Postprocessing.

### Interface e validação

- Radix UI Slider e Progress;
- Phosphor Icons e Simple Icons;
- Zod;
- Vercel Analytics.

## Arquitetura

```text
landing-page-hub/
├── public/
│   └── sculpted-silence/             # Imagens editoriais
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Entrada do Hub
│   │   ├── layout.tsx                # Layout raiz, fontes e Analytics
│   │   ├── globals.css
│   │   ├── (atelier)/
│   │   ├── (books)/
│   │   ├── (compliance)/
│   │   ├── (engineering)/
│   │   ├── (fitness)/
│   │   └── (immersive)/
│   ├── components/
│   │   ├── hub/                      # Galeria e previews do Hub
│   │   ├── cinematic-ink/
│   │   ├── densify/
│   │   ├── drafted-obsidian/
│   │   ├── legisflow/
│   │   ├── sculpted-silence/
│   │   └── spectral-core/
│   └── lib/
│       ├── projects.ts               # Catálogo e metadados dos projetos
│       └── profile.ts                # Informações de perfil
├── next.config.ts
├── vercel.json
└── package.json
```

Os grupos de rota do Next.js mantêm cada domínio organizado sem adicionar o nome
do grupo à URL. Cada experiência pode ter layout, fontes e composição próprios.

O catálogo do Hub é centralizado em `src/lib/projects.ts`. Ele contém rotas,
descrições, tecnologias, capacidades, previews, estudos de caso e níveis de
complexidade usados pela galeria interativa.

## Executando localmente

### Requisitos

- Node.js 20 ou superior;
- npm 10 ou superior.

### Instalação

```bash
git clone <url-do-repositorio>
cd landing-page-hub
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Executa o build de produção |
| `npm run lint` | Analisa o código com ESLint |

## Adicionando uma landing page

1. Crie a rota em um grupo de domínio dentro de `src/app`.
2. Coloque os componentes específicos em `src/components/<projeto>`.
3. Adicione assets estáticos em `public/<projeto>`, quando necessário.
4. Registre o projeto no array `PROJECTS`, em `src/lib/projects.ts`.
5. Caso deseje acesso direto pelo menu flutuante, inclua a rota em
   `src/components/MiniHubMenu.tsx`.
6. Execute `npm run lint` e `npm run build` antes de publicar.

Um registro do Hub deve informar, entre outros campos, o slug, a categoria, a
paleta de destaque, as tecnologias, as capacidades, o tipo de preview e os dados
do estudo de caso.

## LegisFlow: estado da integração

O formulário do LegisFlow usa uma Server Action e valida os dados com Zod,
retornando erros por campo para a interface. Atualmente, o envio é demonstrativo:
os dados são registrados no servidor e a latência é simulada, mas não há banco de
dados, disparo de e-mail ou integração com CRM.

Antes de usar esse fluxo em produção, implemente persistência segura, proteção
contra abuso, observabilidade e tratamento adequado de dados pessoais.

## Build e deploy

O projeto utiliza `output: "standalone"` e cabeçalhos de segurança definidos em
`next.config.ts`. O arquivo `vercel.json` configura instalação, desenvolvimento e
build para a Vercel.

```bash
npm run lint
npm run build
```

Deploy atual: **[landingpages-hub.vercel.app](https://landingpages-hub.vercel.app)**

---

<div align="center">

Desenvolvido por **Gabriel**

</div>
