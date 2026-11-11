# Especificação de Reconstrução Avant-Garde (`--wild`): LexDossier

> **Documento Técnico de Arquitetura Visual, Coreografia e Engenharia**  
> **Projeto**: `LexDossier` — Helena Prado | Inteligência Paralegal, Diligência Probatória & Operações Societárias  
> **Rota Alvo**: `src/app/(paralegal)/LexDossier/page.tsx` + `src/components/lex-dossier/`  
> **Diretriz Primária**: Skill `avant-garde-frontend` em modo **`--wild`**, **Light Mode como padrão absoluto** (Papel Algodão Notarial & Vermelhão de Chancelaria), **100% Mobile-First para Recrutadores e Sócios de Bancas**, zero estética de "AI Slop" ou brutalismo escuro genérico.

---

## 1. Diagnóstico Post-Mortem: Por que a versão atual falhou

A implementação atual em `src/components/lex-dossier/LexDossierPage.tsx` violou as regras estruturais da skill `avant-garde-frontend` (`SKILL.md` Seções 1, 2, 3.3, 3.4, 3.7 e 6.0):

1. **Violação da Lei de Diversidade Estrutural (Seção 3.7 — Anti-Monocultura)**:
   - A página repetiu exatamente o esqueleto vertical de template SaaS usado em outras LPs: `[Navbar Sticky] -> [Hero] -> [Grid de 4 Cards Iguais] -> [Grid de 3 Cards de Preço] -> [Cards de Cases] -> [Bio] -> [FAQ Accordion] -> [Footer]`.
   - A Seção 3.7 proíbe repetir o fluxo vertical de marketing quando o domínio pede uma experiência editorial ou documental.

2. **Ignorou o Modo `--wild` e o Sorteio de Constraints (Seção 3.3 e 3.4)**:
   - O comando `constraints.mjs` foi executado sem a flag `--wild`.
   - O resultado foi uma interface conservadora de "caixas escuras com bordas de 1px", sem nenhuma quebra de convenção digna de Awwwards / FWA.

3. **Polaridade Errada — Brutalismo Escuro Genérico (Seção 1 e 2.1)**:
   - O projeto abriu em `#080a0f` (fundo preto-azulado de SaaS de tecnologia/cripto).
   - O universo paralegal, notarial e de inteligência societária vive da **materialidade do papel timbrado, luz natural de escritório de arquitetura, tinta ferrogálica, carimbos secos de chancelaria e fitas de processo físico**. O tema claro (**High-Key Archival Daylight**) deve ser a identidade principal e estado padrão (`defaultTheme = 'light'`).

4. **Sopa de Badges / Pílulas de IA (`anti-slop-pill-badge` — Seção 2)**:
   - Dezenas de tags em formato pílula/cápsula (`rounded-full`, `rounded-lg`, `SLA 100%`, `Mais Escolhido por Bancas Médias`, `Certificado Digital ICP-Brasil A3`) que denunciam imediatamente template gerado por IA.
   - Regra da skill: **Zero pílulas decorativas**. Metadados devem aparecer como **marginalia tipográfica nua** (`11px`, monospace, `tabular-nums`, separados por barras `/` ou colchetes `[01]`, ou carimbos secos de 1px sem `border-radius`).

5. **Falha no Auditor Automático (`audit-ui.mjs`)**:
   - `[WARN] (unrefined-glassmorphism)`: Uso de `backdrop-blur-md` sem refração óptica.
   - `[WARN] (oklch-tokens)`: Nenhum token de cor em espaço perceptual `oklch()` foi definido.
   - `[WARN] (reduced-motion)`: Animações sem guarda de `prefers-reduced-motion`.

---

## 2. Constraints Sorteadas em Modo `--wild` (Obrigatórias)

Executando `node scripts/constraints.mjs 2 --wild`, as duas restrições sorteadas que **devem governar toda a reconstrução** são:

```text
1. [color] Invert expectations: dark text on a saturated, bright background everywhere.
2. [layout] The layout imitates a physical object (ticket, newspaper, dossier, scoreboard, label).
```

### Como traduzir essas 2 constraints com excelência (sem brutalismo feio):

1. **Objeto Físico (`[layout] Imitates a physical object`)**:
   - A página **NÃO é um site institucional**. Ela é um **Caderno de Diligência & Autos de Processo Físico Folheável ("O Caderno de Chancelaria")** combinado com o **Arquétipo #2 da Skill (`Asymmetric Split Dossier`)**.
   - A interface imita uma **pasta de arquivo jurídico de linho cru aberta sobre uma mesa iluminada**, com:
     - **Abas indexadoras laterais/superiores cortadas a laser** (`FL. 01 — ÍNDICE`, `FL. 02 — PROVAS & ATOS`, `FL. 03 — RETAINER & CÁLCULO`, `FL. 04 — CURRÍCULO & CREDENCIAIS`).
     - **Numeração de folhas de autos no canto superior direito** (`AUTOS Nº 2026.049-SP • FLS. 001–018`), que avança dinamicamente conforme o scroll (`FL. 001`, `FL. 004`, `FL. 012`...) usando interpolação numérica `requestAnimationFrame`.
     - **Margem esquerda de numeração de linha jurídica** (papel almaço/lauda tabelionada: `01, 02, 03... 25` em `10px` monospace sutil na lateral do documento).
     - **Carimbo de protocolo vetorial (SVG Stamp)** que gira lentamente com o scroll e "chancela" as seções com animação de traço (`stroke-dashoffset`).

2. **Cor Invertida & Vibrante (`[color] Dark text on a saturated, bright background`)**:
   - Em vez de um site branco estéril (`#ffffff`) ou preto depressivo (`#080a0f`), o plano de fundo padrão é um **Papel Algodão Creme Quente Luminoso (`oklch(96.5% 0.012 84.6)`)** que, nos momentos de destaque editorial (Hero Banner de Abertura, Seção de Cálculo de Retainer e Manifesto de Conversão), se alterna com blocos de **Amarelo Índia /Ocre Iluminado de Marca-Texto Arquival (`oklch(91.5% 0.085 88)`)** e **Vermelhão Lacre de Chancelaria (`oklch(52% 0.195 28)`)** com tipografia em **Tinta Ferrogálica Preta (`oklch(16% 0.012 84.6)`)** de altíssimo contraste (WCAG `16.93:1`, APCA `Lc 99.7`).

---

## 3. Direção de Arte & Sistema de Cores Perceptual (`OKLCH`)

### 3.1. Paleta Verificada via `palette.mjs`

Defina estes tokens CSS no container raiz do componente (ou em variáveis de escopo) para garantir fidelidade perceptual:

```css
/* ==========================================================================
   MODO CLARO (DEFAULT ABSOLUTO — "ATELIER NOTARIAL DE LUZ NATURAL")
   ========================================================================== */
.lex-theme-light {
  /* Superfícies de Papel Algodão & Linho Tabelionato */
  --surface-sunken: oklch(93.0% 0.014 84.6);       /* #eae5dc — Linho de capa de autos */
  --surface-canvas: oklch(96.5% 0.009 84.6);       /* #f6f3ec — Papel algodão 120g (Fundo principal) */
  --surface-panel: oklch(98.5% 0.005 84.6);        /* #fcfbf7 — Lauda de petição / folha ativa */
  --surface-raised: oklch(100.0% 0.000 84.6);      /* #ffffff — Ficha técnica destacada */
  
  /* Superfície Saturada Luminosa (Constraint --wild [color]) */
  --surface-highlight-amber: oklch(91.0% 0.092 86.0); /* Amarelo Cartório / Iluminura de Autos */
  --surface-stamp-tint: oklch(94.5% 0.025 28.0);      /* Fundo sutil de lacre notarial */

  /* Linhas de Pauta & Fios de Corte (Hairlines) */
  --border-subtle: oklch(86.5% 0.014 84.6);        /* Fio de pauta interna */
  --border-strong: oklch(24.0% 0.015 84.6);        /* Fio editorial principal (tinta seca) */

  /* Tipografia em Tinta Ferrogálica (18.6:1 AAA / Lc 103) */
  --text-primary: oklch(16.0% 0.012 84.6);         /* #100d08 — Tinta preta ferrogálica */
  --text-secondary: oklch(38.0% 0.015 84.6);       /* #47433b — Grafite de anotação (8.8:1 AAA) */
  --text-tertiary: oklch(54.0% 0.012 84.6);        /* #736f67 — Numeração de lauda / marginalia */

  /* Acentos de Chancelaria (Zero Gradiente Neon) */
  --accent-vermilion: oklch(48.0% 0.185 27.5);     /* #a82a1e — Lacre Vermelhão (6.46:1 AA / Lc 77.6) */
  --accent-ultramarine: oklch(32.0% 0.095 255.0);  /* #1b365d — Azul Caneta Tinteiro (11.25:1 AAA / Lc 92.3) */
  --accent-emerald-seal: oklch(42.0% 0.095 160.0); /* Verde Certidão Positiva / Deferido */
}

/* ==========================================================================
   MODO ESCURO (SECUNDÁRIO / OPCIONAL — "GABINETE NOTURNO DE AUDITORIA")
   ========================================================================== */
.lex-theme-dark {
  --surface-sunken: oklch(13.0% 0.010 75.0);       /* #0b0a08 — Ébano quente (nunca azul-tech) */
  --surface-canvas: oklch(16.5% 0.012 75.0);       /* #12100d — Couro de escrivaninha escuro */
  --surface-panel: oklch(20.5% 0.014 75.0);        /* #1a1713 — Folha de microfilmagem */
  --surface-raised: oklch(24.0% 0.016 75.0);       /* #231f1a — Ficha elevada */
  --surface-highlight-amber: oklch(28.0% 0.055 78.0);
  --surface-stamp-tint: oklch(22.0% 0.045 28.0);

  --border-subtle: oklch(28.0% 0.014 75.0);
  --border-strong: oklch(78.0% 0.025 80.0);

  --text-primary: oklch(95.0% 0.008 84.6);
  --text-secondary: oklch(76.0% 0.012 84.6);
  --text-tertiary: oklch(58.0% 0.012 84.6);

  --accent-vermilion: oklch(68.0% 0.175 28.0);
  --accent-ultramarine: oklch(74.0% 0.110 250.0);
  --accent-emerald-seal: oklch(72.0% 0.120 160.0);
}
```

---

## 4. Tipografia & Hierarquia de Lauda Editorial

A combinação de fontes em `src/app/(paralegal)/layout.tsx` (`Instrument Serif`, `Plus Jakarta Sans`, `JetBrains Mono`) é excelente, mas foi subutilizada na versão anterior. Use-a com **contraste extremo de escala** (Seção 3.5 da skill):

1. **Manchetes de Autos (`--font-instrument`)**:
   - Escala fluida dramática: `clamp(3.25rem, 8.5vw, 7.75rem)`, `line-height: 0.92`, `letter-spacing: -0.03em`.
   - Misture romano com palavras-chave em *itálico editorial* (ex.: *"Precisão Probatória & Arquitetura Societária"* onde *Probatória* e *Societária* estão em itálico com sublinhado fino de 1px ou grifo amarelo-cartório `--surface-highlight-amber`).
2. **Marginalia Técnica e Numeração de Autos (`--font-mono`)**:
   - `11px` (`0.6875rem`), `uppercase`, `letter-spacing: 0.14em`, `font-variant-numeric: tabular-nums`.
   - Usado para: números de folha (`FL. 001/008`), códigos de junta comercial (`NIRE 35.300.xxx`), protocolos (`PROT-8841-BR`), SLAs e carimbos.
3. **Corpo de Petição e Parecer (`--font-jakarta`)**:
   - Medida de leitura rigorosa: `55ch` a `68ch` máximo.
   - Parágrafos iniciais de seção com **Capitular (Drop Cap)** em `Instrument Serif` ocupando 3 linhas, ou recuo clássico de primeira linha (`text-indent: 2.5em`), típico de peças jurídicas de alta corte.

---

## 5. Arquitetura Estrutural: O Arquétipo "Asymmetric Split Dossier" (Desktop + Mobile 100%)

Em vez de empilhar seções centralizadas de 1200px, toda a página é construída como um **Fólio Físico Tabelionado** com moldura visível:

### 5.1. Anatomia em Desktop (`lg:grid-cols-12`)

```text
+-----------------------------------------------------------------------------------+
| CABEÇALHO DE AUTOS (44px fixo):                                                   |
| [AUTOS: HP-2026/SP]   [FL. ATUAL: 001/006]   [ABAS: 01.ÍNDICE 02.PROVAS 03.SLA...] |
|                                                    [TEMA: LUZ DO DIA] [DESPACHAR] |
+---------------------------+-------------------------------------------------------+
| COLUNA ESQUERDA FIXA      | COLUNA DIREITA ROLÁVEL (8 Colunas — A Lauda Ativa)    |
| (4 Colunas — Sticky)      | Margeada à esquerda por régua numerada (01..40)       |
|                           |                                                       |
| • Ficha Catalográfica de  | [FL. 01] CAPA DO DOSSIÊ (Hero Editorial Assimétrico)  |
|   Helena Prado            |  - Título colossal em Instrument Serif                |
| • Retrato Editorial com   |  - Retrato secundário / Documento chancelado          |
|   moldura de arquivo e    |  - Seletor Interativo de Demanda Imediata             |
|   legenda de autenticidade|                                                       |
| • "Índice Remissivo Vivo" | [FL. 02] AUDITORIA DE CAPACIDADE & IMPACTO            |
|   (muda conforme a folha  |  - Ledger Horizontal de Métricas com contadores rAF   |
|   visível na direita)     |  - Sem cards soltos: linhas de balanço patrimonial    |
| • Selo Rotativo SVG de    |                                                       |
|   Chancelaria             | [FL. 03] ANEXO I — MATRIZ DE OPERAÇÕES PARALEGAIS     |
| • Botão Direto de         |  - Lista interativa estilo "Índice de Autos":         |
|   Protocolo Urgente       |    Ao passar o mouse ou tocar, abre a "Peça Técnica"  |
|   (WhatsApp / Agendamento)|    com checklist real de entregáveis, órgãos e prazos |
|                           |                                                       |
|                           | [FL. 04] ANEXO II — SIMULADOR DE RETAINER & AVULSO    |
|                           |  - Calculadora interativa real (Volume de atos/mês +  |
|                           |    Complexidade societária = Economia vs. Advogado Jr)|
|                           |  - Alternância entre "Diligência Avulsa" e "Retainer" |
|                           |                                                       |
|                           | [FL. 05] ANEXO III — CADERNO DE PROVAS (CASES REAIS)  |
|                           |  - Dossiês expansíveis com linha do tempo processual  |
|                           |    real (Hora 00h -> Hora 14h -> Hora 38h: Deferido)  |
|                           |                                                       |
|                           | [FL. 06] TERMO DE ENCERRAMENTO & DESPACHO DIRETO      |
|                           |  - Formulário estilo "Termo de Abertura de Demanda"   |
|                           |    onde o recrutador/sócio preenche como uma petição  |
+---------------------------+-------------------------------------------------------+
```

### 5.2. Prioridade Absoluta Mobile (`< 1024px` — Ergonomia para Recrutadores no Celular)

Muitos sócios de escritórios e recrutadores jurídicos abrirão este link pelo WhatsApp ou LinkedIn no celular. A versão mobile **não pode ser um aperto da versão desktop**, nem esconder informações críticas:

1. **Cabeçalho Compacto de Fólio (`top-0 z-40`)**:
   - Mostra apenas: `HELENA PRADO • FL. 01/06`, botão de alternância de tema (`Sol/Lua` de 40x40px) e botão rápido `DESPACHAR`.
2. **Ficha de Identificação Rápida para Recrutadores no Topo Mobile**:
   - Logo abaixo da manchete principal no mobile, um bloco compacto tipo **"Carteira de Identificação Profissional / Ficha de Credenciais"** com foto editorial em proporção 4:5, cidade (`São Paulo • Atuação Nacional`), disponibilidade (`Disponível para Retainer B2B & Projetos / Contratação Sênior`) e link de download/visualização rápida do CV/Credenciais.
3. **Abas de Fólio Deslizantes com Snap (`overflow-x-auto snap-x`)**:
   - Na seção de Operações (`FL. 03`) e Cases (`FL. 05`), use abas táteis estilo fichas de fichário com área mínima de toque de `48px` de altura.
4. **Barra Inferior Tátil de Conversão Mobile (`Fixed Bottom Dossier Bar`)**:
   - No mobile, uma barra inferior de `56px` estilo instrumento físico com dois gatilhos claros:
     - Esquerda: `Ver Índice (FL. 01–06)` (abre um gaveteiro/sheet limpo com salto rápido para qualquer folha).
     - Direita (Destaque Vermelhão/Tinta): `Iniciar Diligência / Contato` (abre o modal/folha de despacho rápido para WhatsApp ou E-mail já parametrizado).
5. **Proibição de Overflow Horizontal**:
   - Todo container deve respeitar `overflow-x-clip`, tipografia com `clamp()` calibrado para `375px` de largura (iPhone SE / Mini) até `430px` (Pro Max), sem palavras quebrando o layout.

---

## 6. Especificação Folha a Folha (Conteúdo, Interatividade e Conversão)

### Folha 01 (`FL. 01`): Capa dos Autos & Manifesto de Precisão
- **Visual**:
  - Linha superior de protocolo: `REPÚBLICA FEDERATIVA DO BRASIL • COMARCA DE SÃO PAULO • DOSSIÊ TÉCNICO Nº 2026/HP`.
  - Manchete monumental em `Instrument Serif`:
    > *"Onde a tese jurídica encontra a **execução probatória** implacável."*
  - O trecho *"execução probatória"* recebe destaque estilo marca-texto de cartório (`--surface-highlight-amber`) que se desenha da esquerda para a direita ao carregar (`scaleX(0 -> 1)`).
- **Elemento Físico Interativo ("Seletor de Natureza da Demanda")**:
  - Logo na dobra inicial, o visitante pode clicar em 3 chaves físicas de indexação que adaptam o destaque da capa em tempo real:
    1. `[A] Para Bancas de Advocacia (Terceirização de Paralegal Sênior / Retainer)`
    2. `[B] Para Departamentos Jurídicos & Fundos (M&A, Data Room & Societário)`
    3. `[C] Para Recrutadores & Headhunters (Histórico Executivo & Credenciais)`
  - Ao alternar entre `[A]`, `[B]` e `[C]`, o resumo executivo da capa, os KPIs em destaque e o CTA principal se ajustam instantaneamente com transição `AnimatePresence` para falar diretamente com aquela persona.

### Folha 02 (`FL. 02`): Balanço de Auditoria & Indicadores Operacionais
- **Visual**: Uma tabela contábil/notarial de linhas finas (`1px solid var(--border-strong)`), sem cards arredondados.
- **Métricas com Interpolação `requestAnimationFrame`**:
  - `1.420+` — Atos societários, distrato, SPEs e alterações arquivados sem exigência (JUCESP / JUCERJA / JUCEMG).
  - `99,8%` — Índice de tempestividade em cumprimentos críticos e protocolos interjurisdicionais.
  - `14h` — Tempo médio de montagem e saneamento de Data Room para auditoria de M&A.
  - `R$ 480M+` — Valor agregado de operações imobiliárias e societárias instruídas documentalmente.
- Cada linha da tabela possui uma coluna de `"PROVA / METODOLOGIA"` que, ao receber hover ou clique, revela uma nota marginal explicando como esse indicador é garantido na prática.

### Folha 03 (`FL. 03`): Anexo I — Catálogo de Operações & Engenharia Paralegal
- **Substitui o grid genérico de 4 cards** por um **Inspecionador de Procedimentos em Duas Colunas (ou Acordeão Tabelionado no Mobile)**:
  - **Procedimento 01/04 — Governança Societária & Juntas Comerciais**:
    - *Escopo*: Constituição de Holdings, SPEs, Acordos de Quotistas, Transformações de Tipo Jurídico, DREI, Receita Federal (CNPJ/QSA) e BACEN (RDE-IED).
    - *Entregável Físico/Digital*: Quadro Societário Organograma + Livro de Registro + Certidões consolidadas.
  - **Procedimento 02/04 — Due Diligence Imobiliária, Notarial & Registral**:
    - *Escopo*: Cadeia dominial vintenária, retificação de área, usucapião extrajudicial, ITBI/ITCMD, escrituras complexas e desmembramentos em Cartórios de Notas e RIs.
    - *Entregável Físico/Digital*: Matriz de Risco Registral classificada por semáforo probatório (Impeditivo / Saneável / Regular).
  - **Procedimento 03/04 — Gestão de Contencioso Estratégico & Peticionamento**:
    - *Escopo*: Protocolo e auditoria em PJe, e-SAJ, Projudi, Eproc e SEI; preparo de guias recursais, cartas precatórias, levantamento de alvarás e cálculo de tempestividade.
    - *Entregável Físico/Digital*: Relatório Diário de Publicações Auditadas + Comprovantes de Protocolo Indexados.
  - **Procedimento 04/04 — Saneamento de Data Room & Compliance Regulatório**:
    - *Escopo*: Organização lógica para rodadas de investimento, fusões e aquisições (M&A), controle de procurações públicas/particulares, certidões federais/estaduais/trabalhistas e LGPD documental.
    - *Entregável Físico/Digital*: Data Room Virtual (VDR) 100% indexado em padrão internacional (ISO/IEC) com índice remissivo clicável.

### Folha 04 (`FL. 04`): Anexo II — Simulador Interativo de Retainer vs. Demanda Avulsa (Alta Conversão)
- **Por que converte mais que 3 cards estáticos de preço**:
  - Sócios de escritórios querem entender o **ROI imediato** de contratar uma Paralegal Sênior em assinatura recorrente versus alocar um advogado júnior/pleno caro em tarefas burocráticas ou pagar despachantes avulsos.
- **Mecanismo Interativo (2-em-1)**:
  1. **Seletor de Modalidade (Chave Seletora Mecânica)**:
     - `MODO 01: PLANO DE ASSINATURA RECORRENTE (RETAINER B2B)`
     - `MODO 02: DILIGÊNCIA PONTUAL / PROJETO FECHADO (ON-DEMAND)`
  2. **Simulador de Volume Mensal (Slider / Botões de Volume)**:
     - O cliente seleciona o porte da operação:
       - **Célula Essencial (`R$ 2.800/mês`)** — Até 25 atos/diligências mensais, ideal para bancas boutique (economia estimada de ~45h/mês de sócios/advogados).
       - **Célula Corporativa (`R$ 4.900/mês`)** — Até 60 atos mensais + Gestão integral de Juntas Comerciais e Certidões + SLA prioritário de 4h (economia estimada de ~95h/mês).
       - **Célula Dedicated Desk (`R$ 8.200/mês`)** — Alocação dedicada para M&A, Imobiliário ou Contencioso de Alto Volume + Reunião semanal de pauta.
     - No modo **Diligência Avulsa (`A partir de R$ 650/ato`)**, exibe uma tabela de honorários tabelados por tipo de ato (Ex.: *Dossiê de Due Diligence de Imóvel Urbano*, *Alteração Contratual Complexa em Junta Comercial*, *Saneamento Express de Data Room em 72h*), permitindo selecionar os itens com checkboxes que somam a estimativa na hora e enviam a lista pronta para o despacho!

### Folha 05 (`FL. 05`): Anexo III — Autos Findos (Estudos de Caso com Cronologia Real)
- Apresente **3 casos reais detalhados como "Autos de Processo Auditados"**, onde o usuário pode clicar para expandir a **"Cronologia de Execução Hora a Hora"**:
  - **Caso #01 (M&A Tecnologia — R$ 42M)**: Saneamento de 140 certidões e regularização de 3 filiais na JUCESP em 72 horas úteis para destravar assinatura de *Signing*.
  - **Caso #02 (Regularização Fundiária & Incorporação — 18 Matrículas)**: Unificação de cadeia dominial de 40 anos com baixa de 11 gravames históricos em 3 comarcas distintas.
  - **Caso #03 (Auditoria Preventiva de Contencioso — Banca com 1.200 Processos)**: Reestruturação do fluxo de cadastro, guias e protocolos em 5 sistemas judiciais, reduzindo retrabalho de advogados em 38%.

### Folha 06 (`FL. 06`): Termo de Abertura de Demanda & Credenciais Executivas
- **Currículo Técnico Verificável (Para Recrutadores)**:
  - Linha do tempo de formação e certificações (Bacharelado em Direito / Pós-graduação em Direito Societário e Registral / Certificação em Gestão de Operações Jurídicas - Legal Ops / Domínio avançado de PJe, e-SAJ, Eproc, SEI, JUCESP/REDESIM, Cenprot, ONR/SAEC).
- **Formulário "Termo de Despacho Rápido"**:
  - Em vez de um formulário SaaS comum, parece uma **Folha de Despacho Oficial**:
    - `"À Especialista Helena Prado, solicito análise para a seguinte natureza de operação: [Seletor: Assinatura Recorrente B2B | Diligência Societária/Cartorária Urgente | Convite para Posição / Entrevista]..."`
    - Ao clicar em **"Protocolar Despacho"**, gera a minuta formatada, exibe feedback visual de carimbo **"PROTOCOLADO SOB Nº..."** e oferece envio direto via WhatsApp ou E-mail com 1 clique.

---

## 7. Coreografia de Movimento — Lei de 2 Camadas (Seção 6.0 da Skill)

Para atingir nível Awwwards sem poluição visual e respeitando `prefers-reduced-motion`:

1. **Camada 1 — Cinemática de Entrada & Scroll**:
   - **Carimbo Rotativo de Chancelaria (SVG)**: Um selo circular tipográfico (`HELENA PRADO • INTELIGÊNCIA PARALEGAL • FÉ PÚBLICA & DILIGÊNCIA •`) que gira suavemente conforme a rolagem da página.
   - **Contador de Folhas Vivo (`FL. 001 -> FL. 006`)**: No topo do dossiê e na coluna esquerda, o número da folha atual é atualizado de acordo com a seção em foco.
   - **Revelação de Marca-Texto (`Highlight Sweep`)**: Palavras-chave nos títulos recebem um fundo `--surface-highlight-amber` que se expande horizontalmente (`origin-left`) quando entram na viewport.
2. **Camada 2 — Física Tátil de Interface**:
   - **Botões com Peso Mecânico de Carimbo**: Em vez de botões arredondados com sombra difusa (`shadow-lg`), use botões retangulares com borda de `1.5px solid var(--border-strong)`, deslocamento tátil de `2px` no hover/active (`translate(-2px, -2px)` com sombra sólida `4px 4px 0px var(--border-strong)` ou `var(--accent-vermilion)`), transmitindo a sensação física de pressionar um carimbo ou tecla de máquina de escrever.
   - **Linhas de Tabela Interativas**: Ao passar o mouse sobre qualquer linha de procedimento ou métrica, a linha inteira assume um tom quente de papel iluminado (`--surface-highlight-amber` com 35% de opacidade) e desloca o título `6px` para a direita com mola física (`stiffness: 400, damping: 28`).

---

## 8. Imagens Contextuais (Unsplash Livre + Tratamento Editorial de Arquivo)

Nenhuma foto deve parecer um banner de banco de imagens cru. Todas as imagens devem ser emolduradas como **"Documento Fotográfico Anexado aos Autos"** com borda interna de `1px`, filtro editorial sutil (`sepia(0.12) contrast(1.06)`) e legenda técnica catalogada (`FIG. 01 — ARQUIVO SP`):

- **Retrato Principal (Helena Prado / Mesa de Trabalho Iluminada)**:
  - `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85`
- **Arquitetura Judiciária / Biblioteca de Obras Clássicas & Luz Natural**:
  - `https://images.unsplash.com/photo-1507842229356-51c61504d3ab?auto=format&fit=crop&w=1200&q=80`
- **Detalhe de Documentação, Papel Timbrado e Assinatura**:
  - `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80`

---

## 9. Checklist de Verificação Obrigatória Antes de Entregar

O modelo responsável pela implementação deve validar todos os itens abaixo antes de concluir:

- [ ] **Modo Claro por Padrão**: `theme` inicia em `'light'` (`oklch(96.5% 0.009 84.6)`), nunca escuro. O botão de alternância para o modo `'dark'` funciona instantaneamente e muda todas as variáveis CSS sem quebrar o contraste.
- [ ] **Zero Pílulas de IA (`anti-slop-pill-badge`)**: Nenhum `rounded-full` em badges de texto. Usar exclusivamente notação de autos entre colchetes `[FL. 01]`, barras `/` ou carimbos retangulares de cantos vivos (`rounded-none`).
- [ ] **Arquitetura `Asymmetric Split Dossier`**: Coluna esquerda fixa (`sticky`) em desktop funcionando como Ficha Catalográfica + Índice Vivo dos Autos, e coluna direita como Lauda Rolável numerada.
- [ ] **Simulador Interativo Real**: Na Folha 04, o visitante pode alternar entre **Plano de Assinatura (Retainer)** e **Calculadora de Atos Avulsos (Checkboxes somáveis)** que enviam o orçamento calculado diretamente para o formulário/WhatsApp.
- [ ] **100% Mobile-First (375px–430px)**: Barra inferior fixa de navegação rápida entre folhas (`FL. 01–06`) + botão de Despacho Rápido, áreas de toque `>= 44px`, zero scroll horizontal involuntário.
- [ ] **Executar `audit-ui.mjs`**: Rodar `node "C:\Users\Ti-03\.gemini\skills\avant-garde-frontend\scripts\audit-ui.mjs" ./src/components/lex-dossier --mode web` e garantir **0 erros e 0 avisos** (incluindo tokens `oklch()` presentes e suporte a `prefers-reduced-motion`).
- [ ] **TypeScript & Next.js Build Limpos**: `npx tsc --noEmit` sem nenhum erro.
