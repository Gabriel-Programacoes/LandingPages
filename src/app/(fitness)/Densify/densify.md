Especificação de Interface e Engenharia: Densify
1. Visão Geral do Projeto
   Produto: Densify (App de Planejamento Fitness de Alta Densidade).

Público-Alvo: Pessoas com rotinas de tempo escasso focadas em hipertrofia.

Objetivo: Retenção imediata do usuário através da calculadora interativa e conversão para download.

2. Direção de Arte: Minimalismo "Liquid Glass" e Tons Pastel
   A estética rompe completamente com o padrão agressivo e escuro dos apps de academia (geralmente focados em preto e vermelho). O Densify adota uma abordagem de "Luxo Minimalista". A interface deve transmitir leveza mental para usuários que já têm rotinas pesadas, utilizando a refração do vidro para criar hierarquia sem peso visual.

Paleta de Cores: Fundo dinâmico com gradientes suaves e esféricos misturando Pale Sky (azul muito claro e acinzentado) e Pastel Petal / Peach nas áreas de destaque. O Apricot Cream entra como cor de aviso ou destaque secundário.

Texturas e Materiais (Liquid Glass): Inspirado nas referências anexadas, os cards e modais não têm cores sólidas. Eles utilizam um efeito de vidro líquido (altíssimo desfoque de fundo combinado com saturação elevada e bordas semi-transparentes brancas) que distorce e reflete o fundo em tempo real.

Fotografia e Mídia: Carrosséis de imagens fitness de alta resolução (estilo editorial), mostrando não apenas treinos, mas a preparação de alimentos com cores vivas, que serão parcialmente sobrepostas pelas placas de liquid glass.

3. Identidade Tipográfica
   A combinação escolhida equilibra proximidade e precisão técnica.

Display / Headlines: Pilcrow Rounded. Aplicada com pesos generosos (Bold/Black), ela traz um aspecto amigável, moderno e quase "tátil" que combina perfeitamente com os cantos arredondados extremos do efeito liquid glass.

Body / UI e Dados: Archivo. Uma fonte geométrica super limpa e técnica. Ela garantirá que a leitura dos macronutrientes, números de calorias e rótulos da interface seja impecável em qualquer tamanho de tela, fazendo o contraponto sério ao design amigável da Pilcrow.

4. Composição Espacial e Wireframe
   O layout é projetado para guiar o usuário em uma jornada imersiva, priorizando telas mobile (Mobile-First real).

Hero Section (Imersão Inicial):

Fundo em movimento lento com gradientes Peach e Pale Sky.

O texto "Resultados Reais para Rotinas Impossíveis" em Pilcrow Rounded, centralizado, com um leve efeito de brilho interno.

CTA: Uma pílula grande de liquid glass, com o texto flutuando no centro, convidando para iniciar o plano.

Calculadora Interativa (Sequência Cinética):

Uma experiência em etapas (step-by-step) onde cada pergunta ocupa o centro da tela.

Interação: Ao escolher o objetivo e a restrição, a tela desliza suavemente para a próxima. Se o usuário configurar, por exemplo, o filtro "Ovolactovegetariano" para hipertrofia, o output final surge em uma placa de vidro translúcido projetando uma meta de alta densidade (como 3800 a 4000 kcal diárias), dividindo os macros em gráficos circulares minimalistas.

Carrossel de Benefícios e Imagens:

Imagens high-end deslizando horizontalmente. Sobre cada imagem, pequenas tags de vidro líquido exibem os benefícios ("Preparo em 15 min", "Treinos de 40 min").

Grid de Avaliações (Social Proof):

Um layout de alvenaria (masonry grid) onde os depoimentos flutuam em cards de vidro sobrepostos, criando profundidade no scroll.

5. Coreografia e Movimento
   A sensação é de estar manipulando um sistema operacional polido e nativo, focado em fluidez contínua.

Scroll Parallax: Enquanto o usuário desce a página, formas orgânicas de cor no fundo se movem em velocidades diferentes em relação aos cards de conteúdo (vidro), evidenciando a refração do material.

Transições Cinéticas: A passagem pelas etapas da calculadora usa transições de máscara e deslizamento (slide e fade simultâneos). Quando uma opção é tocada, ela se expande levemente, confirmando o toque tátil antes de avançar.

Micro-interações: Os números da calculadora de calorias devem rolar como um odômetro ao invés de aparecerem subitamente, dando peso ao processamento do plano.

6. Especificações de Engenharia (Frontend)
   A stack acompanha o alto nível de exigência visual:

Core: Aplicação rodando em Next.js 15 com componentes React 19. A interface interativa e contínua tira proveito de hooks como useOptimistic para que a transição de dados na calculadora não tenha milissegundos de atraso.

Estilização & Liquid Glass: Construído com Tailwind CSS. O efeito principal exigirá a composição de utilitários de backdrop-filter: blur(20px) saturate(150%), junto com bordas em border-white/20 e backgrounds em bg-white/10 ou bg-white/5 combinados com sombras suaves multicamadas para criar a lente de aumento do vidro líquido.

Componentes Acessíveis: Adoção do Radix UI sob o capô para garantir que os sliders, carrosséis de imagens e modais funcionem perfeitamente via teclado e leitores de tela, mantendo a semântica sem sacrificar o visual customizado.

Animações: Framer Motion para orquestrar o parallax amarrado ao scroll (useScroll) e gerenciar a presença (AnimatePresence) das etapas da calculadora de forma performática no mobile.