"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRightIcon, ArrowUpRightIcon, CheckIcon, ChartLineUpIcon,
  CirclesThreePlusIcon, ClockCountdownIcon, CodeIcon, DatabaseIcon,
  LightningIcon, ListIcon, LockKeyIcon, QuotesIcon,
  TargetIcon, TrendUpIcon, UsersThreeIcon, WhatsappLogoIcon, XIcon,
} from "@phosphor-icons/react";

const benefits = [
  [LightningIcon, "Menos trabalho manual", "Automações cuidam das tarefas repetitivas enquanto seu time foca nas decisões."],
  [TargetIcon, "Decisões mais claras", "Métricas essenciais reunidas em uma visão que todos conseguem entender."],
  [UsersThreeIcon, "Times em sintonia", "Marketing, vendas e sucesso do cliente trabalhando na mesma cadência."],
  [LockKeyIcon, "Dados protegidos", "Permissões granulares, histórico completo e segurança desde a primeira camada."],
] as const;

const modules = [
  ["01", "Pulse", "Visão executiva em tempo real", "Transforme dados dispersos em um painel vivo, com metas, alertas e previsões que apontam onde agir agora.", ChartLineUpIcon, "Visão 360º"],
  ["02", "Flows", "Automação sem engessar o processo", "Crie jornadas entre equipes, distribua responsáveis e elimine follow-ups manuais com regras visuais.", CirclesThreePlusIcon, "-42% trabalho manual"],
  ["03", "Signals", "Oportunidades antes que esfriem", "Identifique intenção, risco e potencial com sinais comportamentais reunidos em uma fila inteligente.", TrendUpIcon, "+31% conversão"],
  ["04", "Vault", "Uma fonte confiável para cada cliente", "Centralize contexto, conversas e decisões em perfis vivos que acompanham toda a jornada.", DatabaseIcon, "Dados unificados"],
  ["05", "Studio", "Relatórios que contam o que importa", "Monte narrativas executivas com blocos reutilizáveis e compartilhe resultados sem planilhas paralelas.", CodeIcon, "Pronto em minutos"],
] as const;

const faqs = [
  ["Preciso substituir as ferramentas que já uso?", "Não. A Nexa conecta seu stack atual e cria uma camada única de operação. Você pode migrar processos gradualmente, sem interromper o time."],
  ["Quanto tempo leva para começar?", "A maioria dos times publica o primeiro fluxo em até 7 dias. O plano Scale inclui onboarding acompanhado e desenho dos processos prioritários."],
  ["A plataforma atende empresas menores?", "Sim. O plano Start foi desenhado para equipes enxutas que precisam ganhar método sem adicionar complexidade."],
  ["Como funciona a segurança dos dados?", "Usamos criptografia em trânsito e repouso, controle de acesso por função e trilha completa de auditoria."],
  ["Posso cancelar quando quiser?", "Sim. Nos planos mensais não há fidelidade. Você pode exportar seus dados antes do encerramento."],
] as const;

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_NEXA_WHATSAPP ?? "5511999999999";

function Logo() {
  return <Link href="/Nexa" className="nexa-logo" aria-label="Nexa, início"><span>N</span>NEXA<small>OS</small></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="nexa-header"><Logo /><nav className={open ? "is-open" : ""} aria-label="Principal">
    <a href="/Nexa#solucoes" onClick={() => setOpen(false)}>Soluções</a><a href="/Nexa#beneficios" onClick={() => setOpen(false)}>Benefícios</a><a href="/Nexa#precos" onClick={() => setOpen(false)}>Preços</a><a href="/Nexa#faq" onClick={() => setOpen(false)}>FAQ</a>
    <Link href="/Nexa/contato" className="nexa-nav-cta">Falar com especialista <ArrowUpRightIcon /></Link>
  </nav><button className="nexa-menu" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(v => !v)}>{open ? <XIcon /> : <ListIcon />}</button></header>;
}

function Button({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`nexa-button ${secondary ? "secondary" : ""}`}>{children}<ArrowRightIcon weight="bold" /></Link>;
}

function Dashboard() {
  return <div className="nexa-dashboard nexa-glow-card" aria-label="Prévia do painel Nexa">
    <div className="dash-top"><span className="dash-brand"><i /> NEXA / PULSE</span><span>Últimos 30 dias⌄</span></div>
    <div className="dash-grid">
      <div className="dash-sidebar">{["Visão geral", "Receita", "Pipeline", "Clientes", "Automações"].map((x,i)=><span className={i===0?"active":""} key={x}><i />{x}</span>)}</div>
      <div className="dash-main"><div className="dash-title"><div><small>VISÃO GERAL</small><strong>Bom dia, Marina.</strong></div><b>+ Criar relatório</b></div>
        <div className="dash-metrics">{[["Receita recorrente","R$ 284 mil","+18.4%"],["Novas contas","148","+12.1%"],["Conversão","32,8%","+5.7%"]].map(x=><div key={x[0]}><small>{x[0]}</small><strong>{x[1]}</strong><em>{x[2]}</em></div>)}</div>
        <div className="dash-chart"><div className="chart-label"><span>Crescimento da receita</span><b>R$ 1.4 mi</b></div><svg viewBox="0 0 600 150" role="img" aria-label="Gráfico ascendente"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c7ff48" stopOpacity=".24"/><stop offset="1" stopColor="#c7ff48" stopOpacity="0"/></linearGradient></defs><path d="M0 128 C70 115 92 105 142 110 S215 90 254 96 S315 62 356 70 S420 56 455 45 S520 36 600 12 L600 150 L0 150Z" fill="url(#fill)"/><path d="M0 128 C70 115 92 105 142 110 S215 90 254 96 S315 62 356 70 S420 56 455 45 S520 36 600 12" fill="none" stroke="#c7ff48" strokeWidth="3"/></svg></div>
      </div>
    </div>
  </div>;
}

function Footer() {
  return <footer className="nexa-footer"><div className="footer-lead"><Logo /><p>Clareza para crescer.<br/>Controle para continuar.</p></div><div><b>Produto</b><a href="/Nexa#solucoes">Soluções</a><a href="/Nexa#precos">Preços</a><a href="/Nexa#faq">FAQ</a></div><div><b>Empresa</b><Link href="/Nexa/contato">Contato</Link><a href="#">Sobre</a><a href="#">Carreiras</a></div><div><b>Legal</b><a href="#">Privacidade</a><a href="#">Termos de uso</a><a href="#">Segurança</a></div><div className="footer-bottom"><span>© 2026 Nexa Systems. Todos os direitos reservados.</span><span>São Paulo · Brasil <i /> STATUS: OPERACIONAL</span></div></footer>;
}

export function NexaLanding() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = root.querySelectorAll<HTMLElement>(
      ".section-heading, .benefit-grid article, .modules article, .test-grid blockquote, .price-grid article, .faq details, .nexa-final > *"
    );
    root.classList.add("nexa-motion-ready");
    targets.forEach((target, index) => {
      target.classList.add("nexa-reveal");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
      { rootMargin: "0px 0px -10%", threshold: 0.08 }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return <main ref={scope} className="nexa-page"><Header />
    <section className="nexa-hero"><div className="nexa-spotlight" /><div className="nexa-hero-orb orb-one"/><div className="nexa-hero-orb orb-two"/><h1>Crescer pode ser<br/><em>mais leve.</em></h1><p>Um lugar tranquilo para organizar dados, alinhar pessoas e transformar boas decisões em ritmo de crescimento.</p><div className="hero-actions"><Button href="/Nexa/contato">Experimentar a Nexa</Button><Button href="#solucoes" secondary>Ver como funciona</Button></div><div className="hero-proof"><span><i /> Setup em até 7 dias</span><span><i /> Sem cartão de crédito</span><span><i /> Suporte em português</span></div><Dashboard /></section>
    <section className="nexa-logos"><p>Times que cresceram com mais clareza</p><div className="logo-track">{["VORTEX","NORTHSTAR","AURORA","MONOLITH","BRAVA","ORBITAL","VORTEX","NORTHSTAR","AURORA","MONOLITH","BRAVA","ORBITAL"].map((x,i)=><span key={i}>{x}</span>)}</div></section>
    <section className="nexa-section" id="beneficios"><div className="section-heading"><span>01 / POR QUE NEXA</span><h2>Menos ruído.<br/><em>Mais movimento.</em></h2><p>Uma base operacional que reduz atrito, revela prioridades e devolve tempo ao seu time.</p></div><div className="benefit-grid">{benefits.map(([Icon,title,text],i)=><article className="nexa-glow-card" key={title}><span>0{i+1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="nexa-section modules-section" id="solucoes"><div className="section-heading"><span>02 / PLATAFORMA</span><h2>Um sistema.<br/><em>Cinco forças.</em></h2></div><div className="modules">{modules.map(([n,name,title,text,Icon,stat],i)=><article key={name} className={i%2 ? "reverse" : ""}><div className="module-copy"><span>{n} / {name}</span><h3>{title}</h3><p>{text}</p><a href="/Nexa/contato">Explorar {name} <ArrowUpRightIcon /></a></div><div className="module-visual nexa-glow-card"><Icon weight="duotone"/><div><small>NEXA / {name.toUpperCase()}</small><strong>{stat}</strong><span><i style={{width:`${68+i*5}%`}} /></span></div></div></article>)}</div></section>
    <section className="nexa-testimonials"><div className="section-heading"><span>03 / QUEM USA</span><h2>Crescimento que<br/><em>se sente na rotina.</em></h2></div><div className="test-grid">{[["A Nexa tirou nossa operação do modo reativo. Hoje o time sabe o que priorizar antes da reunião começar.","Marina Costa","COO · Vortex"],["Em três meses, reduzimos quase pela metade o tempo gasto consolidando relatórios. O ganho vai muito além da ferramenta.","Rafael Lima","CRO · Northstar"],["A implementação foi surpreendentemente simples. Em uma semana já tínhamos o primeiro fluxo rodando.","Camila Prado","Head de Ops · Brava"]].map((x,i)=><blockquote key={x[1]}><QuotesIcon weight="fill"/><p>{x[0]}</p><footer><span>{x[1]}</span><small>{x[2]}</small><b>0{i+1}</b></footer></blockquote>)}</div></section>
    <section className="nexa-section pricing" id="precos"><div className="section-heading"><span>04 / PLANOS</span><h2>Comece simples.<br/><em>Escale sem limites.</em></h2><p>Planos transparentes, sem taxa de implantação ou surpresas no fim do mês.</p></div><div className="price-grid">{[
      ["Start","Para times construindo seu primeiro sistema operacional","R$ 490","5 usuários",["Painéis essenciais","3 automações ativas","Integrações padrão","Suporte por e-mail"]],
      ["Scale","Para operações que precisam crescer com previsibilidade","R$ 1.290","20 usuários",["Tudo do Start","Automações ilimitadas","Signals e previsões","Onboarding acompanhado","Suporte prioritário"]],
      ["Enterprise","Para estruturas complexas e requisitos avançados","Sob consulta","Usuários ilimitados",["Tudo do Scale","SSO e permissões avançadas","SLA personalizado","Ambiente dedicado"]],
    ].map((plan,i)=><article className={i===1?"featured":""} key={plan[0] as string}>{i===1&&<div className="popular">MAIS ESCOLHIDO</div>}<span>0{i+1}</span><h3>{plan[0] as string}</h3><p>{plan[1] as string}</p><strong>{plan[2] as string}<small>{i<2?" / mês":""}</small></strong><em>{plan[3] as string}</em><Button href="/Nexa/contato" secondary={i!==1}>{i===2?"Falar com vendas":"Testar por 14 dias"}</Button><ul>{(plan[4] as string[]).map(x=><li key={x}><CheckIcon weight="bold"/>{x}</li>)}</ul></article>)}</div></section>
    <section className="nexa-section faq" id="faq"><div className="section-heading"><span>05 / FAQ</span><h2>Perguntas<br/><em>sem rodeios.</em></h2></div><div>{faqs.map(([q,a],i)=><details key={q}><summary><span>0{i+1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div></section>
    <section className="nexa-final"><div className="nexa-spotlight"/><span>PRONTO PARA AVANÇAR?</span><h2>Sua próxima fase<br/><em>começa com clareza.</em></h2><p>Conte sobre seu desafio. Em 30 minutos, mostramos como a Nexa pode simplificar sua operação.</p><Button href="/Nexa/contato">Agendar uma conversa</Button><small><ClockCountdownIcon /> Resposta em até 1 dia útil</small></section><Footer />
  </main>;
}

export function NexaContact() {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const data = new FormData(e.currentTarget);
    const message = `Olá, time Nexa!%0A%0AMeu nome é ${encodeURIComponent(String(data.get("nome")))}.%0AEmpresa: ${encodeURIComponent(String(data.get("empresa")))}%0AE-mail: ${encodeURIComponent(String(data.get("email")))}%0ATamanho do time: ${encodeURIComponent(String(data.get("time")))}%0A%0ADesafio: ${encodeURIComponent(String(data.get("mensagem")))}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  }
  return <main className="nexa-page contact-page"><Header/><section className="contact-wrap"><div className="contact-copy"><span>CONTATO / 01</span><h1>Vamos destravar<br/><em>sua próxima fase.</em></h1><p>Conte um pouco sobre sua operação. Um especialista retorna com caminhos práticos — sem pitch genérico.</p><div><b><WhatsappLogoIcon weight="fill"/> Conversa direta</b><span>Resposta em até 1 dia útil</span></div><div><b><ClockCountdownIcon/> 30 minutos</b><span>Diagnóstico inicial sem custo</span></div></div><form onSubmit={submit}><div className="form-head"><span>SEUS DADOS</span><small>Todos os campos são obrigatórios</small></div><label>Nome completo<input name="nome" required autoComplete="name" placeholder="Como podemos te chamar?"/></label><label>E-mail corporativo<input name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com"/></label><div className="form-row"><label>Empresa<input name="empresa" required autoComplete="organization" placeholder="Nome da empresa"/></label><label>Tamanho do time<select name="time" required defaultValue=""><option value="" disabled>Selecione</option><option>1–10 pessoas</option><option>11–50 pessoas</option><option>51–200 pessoas</option><option>Mais de 200</option></select></label></div><label>Qual é o principal desafio hoje?<textarea name="mensagem" required rows={5} placeholder="Ex.: queremos integrar vendas e sucesso do cliente..."/></label><button type="submit">Continuar no WhatsApp <WhatsappLogoIcon weight="fill"/></button><p className="form-note"><LockKeyIcon/> Seus dados serão usados apenas para este contato.</p></form></section><Footer/></main>;
}
