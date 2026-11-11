# Valmont Barber Club — especificação de rebuild

## 1. Objetivo e premissas

Reconstruir `/Valmont` como experiência editorial de alta barbearia e conversão para reserva ou clube. Preservar serviços, preços, profissionais, calculadora de assinatura, FAQ, endereço e fluxo WhatsApp já presentes no protótipo. O site **não** possui agenda, pagamento ou CRM: selecionar dia/turno cria apenas uma solicitação no WhatsApp. Nunca exibir confirmação de reserva antes de resposta humana.

Dados comerciais atuais (endereço, telefone, preços, disponibilidade, nomes/fotos dos profissionais, benefícios e avaliações) são conteúdo demonstrativo do protótipo. Validar com a marca antes da publicação. Remover `aggregateRating` não verificável do JSON-LD; manter `BarberShop`, serviços e contato apenas depois de validação comercial.

## 2. Direção de arte

- Conceito: **catálogo de rituais / espelho e comanda de balcão**. A experiência alterna imagem editorial, tipografia de catálogo e uma comanda tátil de reserva. Não repetir a estrutura de autos da LexDossier.
- Arquétipo: **Tactile Modular Deck**, reinterpretado como bancada de barbearia. Hero fotográfico assimétrico; índice horizontal; serviços em lista de catálogo; módulo de clube como régua de custo; formulário como comanda.
- Paleta: papel marfim `oklch(96% 0.012 80)`, tinta espresso `oklch(22% 0.024 62)`, vinho oxblood `oklch(35% 0.105 26)`, latão envelhecido `oklch(62% 0.095 78)`, superfície creme `oklch(99% 0.005 80)`. Modo noturno: espresso profundo `oklch(17% 0.018 62)` e texto marfim. Cores em variáveis CSS; contraste AA.
- Tipos: manter `Cinzel` para marca/números e `Plus Jakarta Sans` para leitura. Não usar Cinzel em todo corpo. Marcadores discretos e linhas finas; sem pílulas, bolhas, glassmorphism ou grades de três cards idênticos.
- Assinatura visual: retrato vertical do ritual e trilho lateral de etapas; linha de serviço cresce no hover; comanda de reserva ganha carimbo “SOLICITAÇÃO PRONTA” apenas após composição válida.
- Movimento: entrada escalonada, fotografia com zoom discreto, indicadores interpolados, hover tátil, troca de conteúdo com `AnimatePresence`; nenhum movimento essencial para compreensão. `prefers-reduced-motion` mostra estado final sem transições.

## 3. Arquitetura e seções

1. **Abertura**: marca, navegação curta, alternância claro/noturno e CTA. Hero com imagem de ofício, headline editorial, serviço em destaque, preço e ação de reserva. Sem promessas não verificadas de vagas hoje.
2. **Rituais**: quatro serviços existentes (corte R$ 120/45 min; barboterapia R$ 95/40 min; combo R$ 195/75 min; detox R$ 110/40 min). Filtro Todos/Cabelo/Barba/Experiências. Linha selecionada abre descrição, inclusões e atalho que preenche a comanda.
3. **Clube**: três planos existentes: Essencial R$ 139, Gentleman R$ 219, Black Imperial R$ 389. Simulador ajusta visitas/mês e barba; mostra gasto avulso, plano sugerido, economia mensal/anual. Economia é **estimativa**, comparando atos indicados, não promessa contratual. CTA WhatsApp com plano e premissas.
4. **Profissionais**: três retratos existentes e especialidades. Seleção do profissional atualiza a comanda; números de avaliação existentes não aparecem sem fonte.
5. **Comanda de reserva**: serviço, profissional, data real (`input type=date`) e turno. Resumo visível. CTA abre WhatsApp com texto preenchido; se pop-up for bloqueado, link permanece acessível. Estado final informa “solicitação enviada ao WhatsApp”, nunca “reserva confirmada”.
6. **Informações**: localização, horário, acesso a mapa com endereço real como query, FAQ nativo em `<details>`, rodapé com contatos e aviso de confirmação humana.

## 4. Estados e comportamento

- Tema claro inicial, toggle manual e persistência `localStorage`. Escopo de tema no contêiner da Valmont; não alterar `html`/`body` e não afetar outras páginas do hub.
- Navegação por âncoras com `scroll-margin-top`, sem observador contínuo pesado. Menu mobile acessível por botão, fecha após salto e Escape.
- Seleções de serviço/profissional persistem dentro da visita. Filtro não apaga seleção da comanda. Formulário usa validação nativa; data mínima é o dia local, não um valor fixo.
- WhatsApp gerado com `encodeURIComponent`; número atual `5511998765432` é demonstrativo. Não afirmar agendamento automático.
- Sem dependência nova. Reusar `MiniHubMenu`, `next/image`, `framer-motion` e fontes já instaladas.

## 5. Mobile, acessibilidade e performance

- Projetar primeiro para 375–430 px. Zero overflow horizontal. CTA fixo inferior com `safe-area-inset-bottom`; conteúdo final com espaço para não ficar oculto.
- Alvos de toque de pelo menos 44×44 px; foco visível; campos com `<label>`; botões com `type` explícito; estados acessíveis (`aria-pressed`/`aria-expanded`).
- Imagem hero prioritária com `sizes` correto; demais lazy. Imagens remotas precisam ser verificadas contra 404. Sem vídeo/WebGL ou dependência pesada.
- Respeitar `prefers-reduced-motion`. Animações só em transform/opacidade. Evitar layout shift com dimensões/razão de aspecto fixas.
- SEO: título, descrição, canonical e JSON-LD coerentes com dados exibidos; sem avaliações falsas.

## 6. Critérios de aceite

1. Todos os seis blocos funcionam em desktop e 375/390/430/768/1024 px sem overflow.
2. Filtro, seleção de serviço/profissional, simulador, alternância de tema, FAQ, menu mobile e comanda funcionam por teclado e toque.
3. WhatsApp recebe serviço, profissional, data e turno selecionados. Nenhuma mensagem declara reserva confirmada.
4. Auditoria `audit-ui.mjs --mode web` sem issues; `npx tsc --noEmit` e lint dos arquivos alterados sem erros.
5. Capturas desktop/mobile revisadas visualmente e URLs de imagem sem 404.
