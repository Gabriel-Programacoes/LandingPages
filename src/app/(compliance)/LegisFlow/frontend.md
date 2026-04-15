📄 Especificação de Interface e Engenharia: LegisFlow
1. Visão Geral do Projeto
   Produto: LegisFlow (SaaS de Gestão e Compliance Paralegal e Ambiental).

Público-Alvo: Escritórios de Contabilidade e Departamentos Paralegais.

Objetivo: Agendamento de demonstrações (Lead Gen) B2B de alto nível.

2. Direção de Arte: Brutalismo Corporativo Moderado
   A estética foge do clichê de "software em nuvem amigável" e abraça a realidade do trabalho contábil: dados, processos e exatidão. O "Brutalismo Corporativo" foca na clareza estrutural. As linhas do grid são visíveis, as divisões de tela são demarcadas com bordas sólidas (1px a 2px) e as sombras são secas (hard shadows), eliminando qualquer rastro de glassmorphism ou esfumaçados.

O "Ponto de Equilíbrio": Para que o cliente não se sinta oprimido pelo brutalismo, a densidade de informação é rigorosamente controlada por amplos espaços em branco (negative space) nas áreas de respiro, dando a sensação de que o processo burocrático, antes caótico, agora está enquadrado e sob controle absoluto.

Paleta de Cores: Fundo em tom Off-White cru (lembrando papel ofício ou pólo documental), linhas estruturais em Preto/Chumbo puro, e toques de um Verde Utilitário (remetendo diretamente a conformidade e ao módulo IBAMA) apenas nos pontos de interação.

3. Identidade Tipográfica
   Display / Headlines: Famílias tipográficas no estilo Tanker (ou alternativas como Druk, Bebas Neue Pro ou Tungsten). A tipografia será usada em escalas massivas (textos extragrandes), com entrelinhas e espaçamento de caracteres (tracking) ajustados para formar blocos maciços de texto. Ela é o elemento central do design.

Body / UI e Dados: Uma fonte Grotesca de leitura impecável e estrutura geométrica firme (ex: Archivo, Space Grotesk ou Switzer). Essa fonte fará o contraste necessário com as headlines, focando na lealdade dos dados.

4. Composição Espacial e Wireframe (Grid 3x2 Reimaginado)
   A estrutura tradicional foi substituída para garantir dinamismo e modernidade:

Hero Section (Bloco Estrutural):

Layout: Ocupa os primeiros 85vh. O texto "Automação e Conformidade Paralegal" entra quebrando a tela em tipografia Tanker monumental, justificada à esquerda, encostando nas margens do container.

CTA: Botão maciço, com borda escura e preenchimento de cor chapada. Sem cantos arredondados macios; cantos retos ou levemente cortados.

Social Proof (Marquee Brutalista):

Uma faixa horizontal contínua de ponta a ponta, delimitada por bordas pretas superior e inferior, com os logotipos monocromáticos em alto contraste deslizando com precisão matemática.

Features & Mockup: O Bento Box Assimétrico

Em vez de um grid 3x2 chato, as funcionalidades são dispostas em um Bento Box. Essa é a "quebra" de leveza solicitada. Caixas de tamanhos variados que se encaixam perfeitamente.

Bloco 1 (Largo): Integração de Dados. Destaca visualmente linhas de código ou um terminal limpo simbolizando o consumo de APIs dos robôs (scripts Python e Selenium) que buscam dados nos portais governamentais.

Bloco 2 (Quadrado): Monitoramento Automático. Mostra componentes de UI de alertas de vencimento saltando em camadas sólidas.

Bloco 3 (Vertical Alto): Demonstração Visual (Mockup). A imagem do dashboard limpo mostrando o status "Em dia" vs "Pendente" de CNPJs, integrado nativamente ao bloco do Bento.

Bloco 4 (Quadrado Destaque): Módulo Ambiental IBAMA. Destacado com a cor de sotaque (Verde Utilitário) com tipografia pesada.

Lead Capture (Formulário Terminal):

Design que remete a um terminal de entrada de dados de alta precisão. Campos grandes, tipografia monoespaçada no placeholder e feedback de validação estrito.

5. Coreografia e Movimento
   Filosofia: Movimentos fluidos, porém precisos. O ritmo deve remeter a uma máquina bem calibrada, sem atrasos elásticos ou gelatinosos.

Curvas de Animação: Uso de curvas bezier customizadas para um início rápido e uma desaceleração controlada (ex: cubic-bezier(0.22, 1, 0.36, 1)).

Interações:

O Bento Box se revela no scroll com elementos surgindo de baixo para cima acompanhados de hard shadows que se deslocam milimetricamente.

Ao passar o mouse (hover) em elementos do Bento Box, em vez de brilharem ou ficarem translúcidos, eles sobem 4px com uma sombra sólida preta preenchendo o espaço inferior, dando a sensação física de pressionar um botão mecânico de painel.

6. Especificações de Engenharia (Frontend)
   Stack Principal: Construção em Next.js 15 aproveitando o React 19 para garantir performance na renderização de servidor e cliente.

Estilização: Tailwind CSS estendido com variáveis de CSS puras para a paleta brutalista e sombras sólidas (ex: box-shadow: 4px 4px 0px 0px #000;).

Coreografia UI: Framer Motion para lidar com o stagger perfeito na revelação do Bento Box e as curvas bezier personalizadas sem prejudicar a thread principal.

Segurança e Ação: O formulário de Lead utilizará estritamente Next.js Server Actions para submissão, com a validação completa do schema rodando na borda (Edge) através do Zod. O feedback visual de erro ou sucesso deve ser imediato, sem carregamentos falsos, priorizando a confiança B2B.