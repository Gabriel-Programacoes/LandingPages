<div align="center">

# 🟢 SPECTRAL CORE

### Reactive WebGL artifact · orbital inspection

[![Route](https://img.shields.io/badge/ROTA-%2FSpectralCore-d7ff3f?style=for-the-badge&logo=next.js)](https://landingpages-hub.vercel.app/SpectralCore)
[![WebGL](https://img.shields.io/badge/WEBGL-THREE.JS-111?style=for-the-badge&logo=threedotjs)](https://threejs.org)
[![R3F](https://img.shields.io/badge/RENDERER-R3F-d7ff3f?style=for-the-badge)](https://r3f.docs.pmnd.rs)

[**Abrir experiência ↗**](https://landingpages-hub.vercel.app/SpectralCore) ·
[**Voltar ao Hub**](../../../../../README.md)

</div>

---

## ◈ Conceito

Spectral Core é uma landing page de uma única cena, construída em torno de um
artefato tridimensional reativo. Interface e objeto compartilham a mesma atmosfera:
preto profundo, luz espectral e dados técnicos mínimos.

| | |
|---|---|
| **Categoria** | Interactive / 3D |
| **Objetivo** | Demonstrar WebGL integrado a uma narrativa de produto |
| **Rota** | `/SpectralCore` |
| **Renderização** | React Three Fiber |

## ✦ Interações

<table>
<tr><td><strong>◎ Orbit</strong><br/>Inspeção limitada por OrbitControls.</td><td><strong>◉ Hover</strong><br/>O material reage à presença do cursor.</td></tr>
<tr><td><strong>⚡ Charge</strong><br/>Clique alterna o estado energético.</td><td><strong>✺ Post FX</strong><br/>Bloom, aberração cromática e vinheta.</td></tr>
</table>

`useFrame` atualiza rotação, escala e propriedades dos materiais a cada frame. Os
estados de hover e clique alteram a resposta visual do núcleo sem sair da cena.

## 🎨 Cena

```text
Canvas
├── Perspective Camera
├── Ambient + Directional + Point Lights
├── Environment
├── Floating Spectral Core
├── Sparkles
├── OrbitControls
└── EffectComposer
    ├── Bloom
    ├── Chromatic Aberration
    └── Vignette
```

O canvas limita o `devicePixelRatio` entre `1` e `1.8`, equilibrando nitidez e
custo de renderização. A cena é envolvida por `Suspense`.

## 🧩 Arquitetura

```text
src/app/(immersive)/SpectralCore/
├── page.tsx
└── README.md

src/components/spectral-core/
└── SpectralCorePage.tsx
```

## ⚙ Stack

| Tecnologia | Papel |
|---|---|
| Three.js | Geometria, materiais, cores e math |
| React Three Fiber | Renderer declarativo e frame loop |
| Drei | Câmera, ambiente, float, sparkles e controles |
| React Three Postprocessing | Composição dos efeitos |
| Postprocessing | Blend functions |

## 🗺 Estrutura da página

A experiência ocupa uma viewport: o `Canvas` permanece no fundo, enquanto uma
camada HTML sem captura de ponteiro apresenta título, telemetria, instruções e
estado do sistema.

## ♿ Performance e fallback

- DPR limitado para conter o custo em telas densas;
- antialiasing habilitado;
- cena carregada com `Suspense`;
- controles restringem distância e ângulos;
- uma versão de produção deve oferecer fallback para WebGL indisponível e respeitar
  `prefers-reduced-motion`.

## ⚠ Escopo atual

O artefato e sua telemetria são conceituais. O botão de armamento controla apenas
o estado visual e não se conecta a hardware ou serviço externo.

---

<div align="center">

**Spectral Core** · parte do [Landing Page Hub](../../../../../README.md)

</div>
