"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MiniHubMenu from "@/components/MiniHubMenu";
import "./lex-dossier.css";

const leaves = ["Capa & parecer", "Balanço de auditoria", "Matriz de operações", "Simulador de contratação", "Caderno de provas", "Credenciais & despacho"];
const personas = [
  { label: "Bancas de Advocacia", title: "Sua tese merece uma execução à altura.", text: "Assumo os bastidores societários e cartorários para devolver à banca o tempo de pensar o Direito. Uma interlocutora sênior, do primeiro documento ao último protocolo.", focus: "45–95h / mês devolvidas à banca", cta: "Dimensionar minha célula", leaf: 4 },
  { label: "Jurídico Corporativo & M&A", title: "O fechamento não pode esperar pelo documento.", text: "Conecto certidões, estruturas societárias e evidências em uma cadeia documental rastreável. Data Rooms saneados e riscos visíveis antes da mesa de assinatura.", focus: "14h / montagem média de Data Room", cta: "Inspecionar operações", leaf: 3 },
  { label: "Recrutadores & Headhunters", title: "Senioridade que se comprova no detalhe.", text: "Mais de uma década de prática operacional, domínio de sistemas e autonomia para conduzir rotinas críticas. Conheça minha formação e o raciocínio por trás de cada entrega.", focus: "Desde 2015 / prática paralegal", cta: "Abrir credenciais executivas", leaf: 6 },
];
const procedures = [
  { title: "Governança societária", subtitle: "Juntas comerciais / RFB / BACEN", scope: "Constituição de holdings e SPEs, acordos de quotistas, transformação de tipo jurídico e instrução conforme DREI. Controle de CNPJ, QSA e RDE-IED.", systems: "JUCESP · REDESIM · Receita Federal · BACEN", output: "Organograma societário, livro de registro e certidões consolidadas.", steps: ["Conferência da cadeia de representação", "Preparação e validação do DBE", "Protocolo e acompanhamento até deferimento"] },
  { title: "Diligência imobiliária", subtitle: "Notarial / registral / dominial", scope: "Cadeia dominial vintenária, retificação de área, usucapião extrajudicial, ITBI/ITCMD, escrituras complexas e desmembramentos.", systems: "ONR / SAEC · e-Notariado · Cenprot", output: "Matriz de risco registral: impeditivo, saneável ou regular, com evidência por apontamento.", steps: ["Leitura de matrícula e títulos antecedentes", "Cruzamento de ônus e certidões", "Plano de saneamento por registro"] },
  { title: "Contencioso estratégico", subtitle: "Protocolo / prazo / rastreabilidade", scope: "Auditoria de protocolos, guias recursais, cartas precatórias, alvarás e cálculo de tempestividade em múltiplas jurisdições.", systems: "PJe · e-SAJ · Eproc · SEI · Projudi", output: "Relatório diário de publicações auditadas e comprovantes de protocolo indexados.", steps: ["Conferência de prazo e competência", "Validação de guias e anexos", "Protocolo com dupla conferência"] },
  { title: "Data Room & M&A", subtitle: "Saneamento / compliance / closing", scope: "Organização documental de rodadas, fusões e aquisições. Controle de procurações e certidões federais, estaduais e trabalhistas, com atenção à LGPD.", systems: "VDR · JUCESP · SEI · Centrais de certidões", output: "Data Room indexado, matriz de pendências e índice remissivo clicável para auditoria.", steps: ["Inventário documental e classificação", "Saneamento de pendências críticas", "Entrega de índice e trilha de versões"] },
];
const tiers = [
  { name: "Célula Essencial", price: 2800, hours: 45, sla: "24h úteis / triagem", scope: "Até 25 atos por mês. Certidões, diligências e protocolos de rotina para bancas boutique." },
  { name: "Célula Corporativa", price: 4900, hours: 95, sla: "4h úteis / prioridade", scope: "Até 60 atos por mês. Gestão integral de Juntas Comerciais, certidões e pauta operacional." },
  { name: "Dedicated Desk", price: 8200, hours: 160, sla: "4h úteis / mesa dedicada", scope: "Alocação dedicada para M&A, imobiliário ou contencioso de alto volume. Reunião semanal de pauta." },
];
const acts = [
  { name: "Protocolo e diligência societária", price: 650 },
  { name: "Dossiê de due diligence de imóvel urbano", price: 1800 },
  { name: "Alteração contratual complexa em Junta", price: 2400 },
  { name: "Saneamento express de Data Room / 72h", price: 3900 },
];
const cases = [
  { title: "O documento que destravou o signing.", kind: "M&A / Tecnologia", result: "R$ 42 milhões", text: "140 certidões saneadas e três filiais regularizadas na JUCESP em 72 horas úteis.", timeline: [["Hora 00h", "Inventário e classificação das 140 certidões."], ["Hora 14h", "Data Room consolidado; pendências societárias isoladas."], ["Hora 48h", "Regularização das três filiais e conferência de documentos."], ["Hora 72h", "Deferimento e liberação documental para assinatura."]] },
  { title: "Quarenta anos, uma cadeia dominial.", kind: "Imobiliário / Incorporação", result: "18 matrículas", text: "Unificação da cadeia dominial de 40 anos e baixa de 11 gravames históricos em três comarcas.", timeline: [["Hora 00h", "Levantamento das matrículas e títulos antecedentes."], ["Hora 14h", "Mapa de gravames e divergências por comarca."], ["Saneamento", "Instrução dos pedidos de baixa e conferência registral."], ["Conclusão", "Onze gravames baixados; cadeia consolidada para incorporação."]] },
  { title: "Menos retrabalho. Mais tese jurídica.", kind: "Contencioso / Operações", result: "−38% retrabalho", text: "Reestruturação do fluxo de cadastro, guias e protocolos de uma banca com 1.200 processos em cinco sistemas.", timeline: [["Hora 00h", "Amostragem de falhas e inventário dos cinco sistemas."], ["Hora 14h", "Matriz de controles e fila de exceções implantadas."], ["Implantação", "Dupla conferência de guias, anexos e recibos."], ["Auditoria", "Redução de 38% no retrabalho observado no fluxo."]] },
];
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const whatsapp = (text: string) => `https://wa.me/5511987654321?text=${encodeURIComponent(text)}`;

function Count({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        element.textContent = (value * (1 - (1 - progress) ** 3)).toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, decimals, reduced]);
  return <span ref={ref}>{value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
}

function Leaf({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  return <section id={`fl-${n}`} className={`lex-leaf lex-leaf-${n}`} aria-labelledby={`title-${n}`}>
    <div className="lex-ruler" aria-hidden>{Array.from({ length: 45 }, (_, i) => <span key={i}>{String(i + 1).padStart(2, "0")}</span>)}</div>
    <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .65 }}>
      <div className="lex-leaf-meta"><span>[FL. {String(n).padStart(2, "0")}] / {title}</span><span>HP / SP</span></div>
      {children}
      <footer className="lex-leaf-footer">Helena Prado / Inteligência Paralegal <span>{String(n).padStart(3, "0")} / 006</span></footer>
    </motion.div>
  </section>;
}

function Identity({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "lex-identity lex-identity-mobile" : "lex-identity"}>
    <figure><div className="lex-portrait"><Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85" alt="Retrato editorial de Helena Prado" fill priority={!compact} sizes={compact ? "100px" : "(min-width: 1024px) 25vw, 100px"}/></div><figcaption>FIG. 01 / ARQUIVO SP</figcaption></figure>
    <div><p className="lex-meta">Ficha catalográfica / 2015–2026</p><h2>Helena Prado<span>Inteligência Paralegal</span></h2><p>São Paulo / Atuação nacional</p><p className="lex-available">Disponível para Retainer B2B<br/>e posição Sênior</p><a href="#fl-6">Consultar credenciais ↗</a></div>
  </div>;
}

export default function LexDossierPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [active, setActive] = useState(1);
  const [persona, setPersona] = useState(0);
  const [procedure, setProcedure] = useState(0);
  const [mode, setMode] = useState<"retainer" | "avulso">("retainer");
  const [tier, setTier] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [protocol, setProtocol] = useState<{ id: string; text: string } | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sealRotation = useTransform(scrollYProgress, [0, 1], [-14, 65]);
  const plan = tiers[tier];
  const total = selected.reduce((sum, index) => sum + acts[index].price, 0);
  const request = mode === "retainer" ? `${plan.name} / ${money(plan.price)}/mês / ${plan.sla}` : `${selected.map(i => acts[i].name).join("; ")} / estimativa: ${money(total)}`;

  useEffect(() => {
    const update = () => {
      let current = 1;
      for (let n = 1; n <= 6; n++) {
        if ((document.getElementById(`fl-${n}`)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * .36) current = n;
      }
      setActive(current);
    };
    let frame = 0;
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!drawer) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setDrawer(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [drawer]);

  const go = (n: number) => { setDrawer(false); document.getElementById(`fl-${n}`)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" }); };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = `HP-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const text = `TERMO DE ABERTURA / ${id}\nÀ especialista Helena Prado,\n${data.get("nome")} / ${data.get("empresa")}\nE-mail: ${data.get("email")}\nNatureza: ${data.get("natureza")}\nPrazo: ${data.get("prazo")}\nDemanda: ${data.get("demanda")}\nSimulação: ${request}\nSolicito análise de viabilidade e confirmação de recebimento.`;
    setProtocol({ id, text });
  };

  return <div className={`lex-dossier lex-theme-${theme}`} lang="pt-BR">
    <MiniHubMenu/>
    <header className="lex-command"><a href="#fl-1" className="lex-command-brand"><span className="lex-desktop">AUTOS Nº HP-2026/SP</span><span className="lex-mobile">HELENA PRADO</span></a><span className="lex-meta">FL. <span className="lex-desktop">ATUAL: </span>{String(active).padStart(3, "0")}/006</span><nav aria-label="Abas dos autos" className="lex-top-tabs">{leaves.map((label, i) => <button key={label} onClick={() => go(i + 1)} aria-label={`Folha ${i + 1}: ${label}`} aria-current={active === i + 1 ? "location" : undefined}>{String(i + 1).padStart(2, "0")}</button>)}</nav><button className="lex-theme-toggle" aria-label={theme === "light" ? "Ativar Gabinete Noturno" : "Ativar Luz do Dia"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}><span aria-hidden>{theme === "light" ? "◐" : "☼"}</span><span className="lex-desktop">{theme === "light" ? "Luz do Dia" : "Gabinete Noturno"}</span></button><button className="lex-button lex-command-cta" onClick={() => go(6)}>Despachar ↗</button></header>
    <div className="lex-binding grid lg:grid-cols-12">
      <aside className="lex-sidebar lg:col-span-4 sticky top-11 h-[calc(100vh-2.75rem)]"><div className="lex-sidebar-title"><span>HP.</span><span className="lex-meta">Caderno de diligência<br/>Volume I / edição 2026</span></div><Identity/><nav aria-label="Índice remissivo vivo" className="lex-index"><p className="lex-meta">Índice remissivo vivo</p>{leaves.map((label, i) => <button key={label} onClick={() => go(i + 1)} aria-current={active === i + 1 ? "location" : undefined}><span>FL. 0{i + 1}</span>{label}<span aria-hidden>↗</span></button>)}</nav><motion.svg style={{ rotate: reduced ? 0 : sealRotation }} className="lex-seal" viewBox="0 0 150 150" aria-label="Selo de chancelaria Helena Prado"><defs><path id="lex-seal-text" d="M75,75 m-55,0 a55,55 0 1,1 110,0 a55,55 0 1,1 -110,0"/></defs><circle cx="75" cy="75" r="69"/><circle cx="75" cy="75" r="45"/><text><textPath href="#lex-seal-text">HELENA PRADO / INTELIGÊNCIA PARALEGAL /</textPath></text><text x="75" y="80" textAnchor="middle" className="lex-seal-hp">HP</text><path d="M48 96h54"/></motion.svg><a className="lex-urgent" href={whatsapp("Helena, solicito triagem de diligência urgente.")} target="_blank" rel="noreferrer">[ ! ] Protocolo urgente / WhatsApp ↗</a></aside>
      <main className="lex-pages lg:col-span-8">
        <Leaf n={1} title="Capa dos autos"><p className="lex-jurisdiction">República Federativa do Brasil / Comarca de São Paulo<br/>Dossiê técnico de operações / Nº 2026/HP</p><h1 id="title-1">Onde a tese jurídica encontra a <em className="lex-highlight">execução probatória</em> implacável.</h1><Identity compact/><div className="lex-cover-note"><span>01 / PARECER EXECUTIVO</span><p>O rigor de quem conhece o caminho<br/>entre o papel e o deferimento.</p></div><div className="lex-personas" aria-label="Natureza do visitante">{personas.map((p, i) => <button aria-pressed={persona === i} key={p.label} onClick={() => setPersona(i)}>{persona === i && <motion.span className="lex-key-active" layoutId="lex-persona" transition={{ type: "spring", stiffness: 400, damping: 28 }}/>}<span>[{String.fromCharCode(65 + i)}] {p.label}</span><span aria-hidden>↗</span></button>)}</div><AnimatePresence mode="wait" initial={false}><motion.div className="lex-opinion" key={persona} initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}><h3>{personas[persona].title}</h3><p>{personas[persona].text}</p><p className="lex-meta">{personas[persona].focus}</p><button className="lex-button" onClick={() => go(personas[persona].leaf)}>{personas[persona].cta} ↗</button></motion.div></AnimatePresence></Leaf>
        <Leaf n={2} title="Balanço de auditoria"><h2 id="title-2">A precisão tem<br/><em>lastro.</em></h2><p className="lex-intro">Cada número corresponde a um procedimento. Cada procedimento deixa uma trilha documental.</p><div className="lex-ledger">{[{ value: 1420, suffix: "+", label: "Atos societários arquivados", note: "Consolidação de atos, distratos, SPEs e alterações na JUCESP, JUCERJA e JUCEMG. Contagem por protocolo concluído, sem duplicação de anexos." }, { value: 99.8, suffix: "%", label: "Tempestividade em prazos críticos", note: "Relação entre cumprimentos tempestivos e total de protocolos críticos acompanhados. Conferência cruzada de prazo, recibo e jurisdição." }, { value: 14, suffix: "h", label: "Montagem média de Data Room", note: "Tempo de organização e saneamento inicial após recebimento completo do acervo. Pendências externas e emissão de certidões têm prazo próprio." }, { value: 480, suffix: "M+", label: "Operações instruídas / em reais", note: "Valor agregado das operações com instrução documental. Não representa patrimônio sob gestão nem remuneração profissional." }].map((metric, i) => <div className="lex-ledger-row" key={metric.label}><span className="lex-meta">0{i + 1}</span><strong>{i === 3 && <small>R$ </small>}<Count value={metric.value} decimals={i === 1 ? 1 : 0}/><small>{metric.suffix}</small></strong><div><h3>{metric.label}</h3><details><summary>Prova / metodologia +</summary><p>{metric.note}</p></details></div></div>)}</div><p className="lex-footnote">Base declarada no dossiê de apresentação. Evidências e recortes de período disponíveis em diligência de validação, respeitado o sigilo dos clientes.</p></Leaf>
        <Leaf n={3} title="Anexo I / Matriz de operações"><h2 id="title-3">O método,<br/><em>peça por peça.</em></h2><div className="lex-inspector"><div className="lex-procedure-tabs" role="tablist" aria-label="Procedimentos">{procedures.map((p, i) => <button role="tab" id={`procedure-tab-${i}`} aria-controls="procedure-panel" aria-selected={procedure === i} key={p.title} onClick={() => setProcedure(i)}><span className="lex-meta">0{i + 1} / 04</span>{p.title}<span aria-hidden>↗</span></button>)}</div><AnimatePresence mode="wait" initial={false}><motion.article id="procedure-panel" role="tabpanel" aria-labelledby={`procedure-tab-${procedure}`} key={procedure} initial={reduced ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}><p className="lex-meta">{procedures[procedure].subtitle}</p><h3>{procedures[procedure].title}</h3><p>{procedures[procedure].scope}</p><ol>{procedures[procedure].steps.map(step => <li key={step}>{step}</li>)}</ol><dl><dt>Sistemas & órgãos</dt><dd>{procedures[procedure].systems}</dd><dt>Entregável físico / digital</dt><dd>{procedures[procedure].output}</dd></dl></motion.article></AnimatePresence></div><figure className="lex-evidence-photo"><Image src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80" alt="Acervo de consulta e biblioteca jurídica" width={1000} height={400} sizes="(min-width: 1024px) 60vw, 100vw"/><figcaption>FIG. 02 / ACERVO DE CONSULTA / O método precede o protocolo.</figcaption></figure></Leaf>
        <Leaf n={4} title="Anexo II / Memória de cálculo"><h2 id="title-4">Tempo jurídico<br/>é <em>capital.</em></h2><p className="lex-intro">Dimensione a operação. Reserve o trabalho intelectual da banca para o que exige a assinatura de um advogado.</p><div className="lex-mode" role="group" aria-label="Modalidade de contratação">{(["retainer", "avulso"] as const).map((m, i) => <button key={m} aria-pressed={mode === m} onClick={() => { setMode(m); setProtocol(null); }}>[0{i + 1}] {m === "retainer" ? "Retainer B2B" : "Atos avulsos"}</button>)}</div>{mode === "retainer" ? <div className="lex-retainer"><label className="lex-meta" htmlFor="lex-tier">Porte da célula operacional</label><select id="lex-tier" value={tier} onChange={e => { setTier(Number(e.target.value)); setProtocol(null); }}>{tiers.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}</select><div className="lex-price" key={tier}>R$ <Count value={plan.price}/><small>/ mês</small></div><div className="lex-saving"><strong>~<Count value={plan.hours}/>h</strong><span>de capacidade jurídica<br/>liberada por mês*</span></div><p>{plan.scope}</p><p className="lex-meta">SLA: {plan.sla}</p><p className="lex-footnote">*Estimativa de planejamento conforme volume e complexidade. SLA refere-se ao início do atendimento, não ao prazo de deferimento do órgão.</p></div> : <div className="lex-acts">{acts.map((act, i) => <label key={act.name}><input type="checkbox" checked={selected.includes(i)} onChange={e => { setSelected(e.target.checked ? [...selected, i] : selected.filter(x => x !== i)); setProtocol(null); }}/><span>{act.name}</span><strong>{money(act.price)}</strong></label>)}<div className="lex-total"><span className="lex-meta">Estimativa de honorários</span><strong>{money(total)}</strong></div><p className="lex-footnote">Custas, taxas e emolumentos não inclusos. Proposta final após análise de escopo e documentos.</p></div>}<div className="lex-actions"><button className="lex-button" disabled={mode === "avulso" && !selected.length} onClick={() => go(6)}>Anexar ao termo de despacho ↗</button><a className="lex-text-link" href={whatsapp(`Olá, Helena. Solicito análise desta simulação: ${request}`)} target="_blank" rel="noreferrer">Consultar via WhatsApp ↗</a></div></Leaf>
        <Leaf n={5} title="Anexo III / Caderno de provas"><h2 id="title-5">Autos findos.<br/><em>Efeito concreto.</em></h2><p className="lex-intro">Três recortes de execução. Identidades preservadas; raciocínio operacional aberto à inspeção.</p>{cases.map((c, i) => <details className="lex-case" key={c.title}><summary><span className="lex-meta">DOSSIÊ 00{i + 1} / {c.kind}</span><h3>{c.title}</h3><span className="lex-case-result">{c.result}</span><p>{c.text}</p><span className="lex-meta lex-expand">Abrir cronologia de execução +</span></summary><ol className="lex-timeline">{c.timeline.map(([time, text]) => <li key={time}><span>{time}</span><p>{text}</p></li>)}</ol></details>)}<p className="lex-footnote">Relatos constantes do briefing. A comprovação documental depende de autorização e anonimização do acervo original.</p></Leaf>
        <Leaf n={6} title="Termo de abertura / Credenciais"><h2 id="title-6">O próximo ato<br/><em>começa aqui.</em></h2><div className="lex-credentials"><p className="lex-meta">Credenciais executivas / consulta para recrutamento</p>{[["01", "Bacharelado em Direito", "Formação jurídica de base"], ["02", "Direito Societário e Registral", "Pós-graduação / especialização"], ["03", "Legal Operations", "Gestão de operações jurídicas"]].map(([n, title, detail]) => <div key={n}><span>{n}</span><strong>{title}</strong><span>{detail}</span></div>)}<p><strong>Sistemas:</strong> PJe, e-SAJ, Eproc, SEI, JUCESP/REDESIM, Cenprot e ONR/SAEC.</p><a href={whatsapp("Helena, solicito currículo e comprovantes de formação e certificações para análise de recrutamento.")}>Solicitar currículo e comprovantes ↗</a><p className="lex-footnote">Instituições, datas e certificados serão apresentados na validação profissional. Nenhum certificado é emitido por esta página.</p></div><form className="lex-dispatch" onSubmit={submit} onChange={() => setProtocol(null)}><div className="lex-form-heading"><span className="lex-meta">MINUTA / TERMO DE ABERTURA</span><span>HP.</span></div><p>À especialista Helena Prado,<br/>solicito análise para a seguinte natureza de operação:</p><label>Natureza da solicitação<select name="natureza" required defaultValue="Assinatura recorrente B2B"><option>Assinatura recorrente B2B</option><option>Diligência societária / cartorária urgente</option><option>Convite para posição / entrevista</option></select></label><div className="lex-form-pair"><label>Nome do solicitante<input name="nome" autoComplete="name" required maxLength={120}/></label><label>Banca / empresa<input name="empresa" autoComplete="organization" required maxLength={160}/></label></div><div className="lex-form-pair"><label>E-mail de retorno<input name="email" type="email" autoComplete="email" required maxLength={180}/></label><label>Prazo / data esperada<input name="prazo" type="date" required/></label></div><label>Objeto da demanda<textarea name="demanda" rows={4} required maxLength={3000} placeholder="Descreva escopo, jurisdição e documentos disponíveis."/></label><div className="lex-attached"><span className="lex-meta">ANEXO / MEMÓRIA DE CÁLCULO</span><p>{request}</p><button type="button" className="lex-text-link" onClick={() => go(4)}>Revisar simulação ↗</button></div><label className="lex-consent"><input required type="checkbox"/>Autorizo o uso destes dados para retorno sobre esta solicitação.</label><button type="submit" className="lex-button">Protocolar despacho ↗</button><p className="lex-footnote">O protocolo identifica esta minuta local. O recebimento é confirmado após o envio por WhatsApp ou e-mail.</p><AnimatePresence>{protocol && <motion.div role="status" className="lex-protocol" initial={reduced ? false : { opacity: 0, scale: 1.18, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: -3 }}><strong>PROTOCOLADO</strong><span>SOB Nº {protocol.id}</span><div className="lex-actions"><a href={whatsapp(protocol.text)} target="_blank" rel="noreferrer">Enviar por WhatsApp ↗</a><a href={`mailto:contato@helenaprado.adv.br?subject=${encodeURIComponent(protocol.id)}&body=${encodeURIComponent(protocol.text)}`}>Enviar por e-mail ↗</a></div></motion.div>}</AnimatePresence></form><p className="lex-signature">Helena Prado</p><p className="lex-meta">Inteligência Paralegal / São Paulo · Brasil</p></Leaf>
      </main>
    </div>
    <div className="lex-mobile-bar lg:hidden"><button aria-expanded={drawer} aria-controls="lex-mobile-index" onClick={() => setDrawer(!drawer)}>Índice [01–06] {drawer ? "−" : "+"}</button><button onClick={() => go(6)}>Protocolar despacho ↗</button></div>
    <AnimatePresence>{drawer && <motion.nav id="lex-mobile-index" className="lex-drawer" aria-label="Índice rápido" initial={reduced ? false : { y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}><button onClick={() => setDrawer(false)}>Fechar índice ×</button>{leaves.map((label, i) => <button key={label} onClick={() => go(i + 1)} aria-current={active === i + 1 ? "location" : undefined}>[FL. 0{i + 1}] {label}</button>)}</motion.nav>}</AnimatePresence>
  </div>;
}
