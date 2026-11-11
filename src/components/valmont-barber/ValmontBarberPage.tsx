"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MiniHubMenu from "@/components/MiniHubMenu";
import "./valmont.css";

const services = [
  { id: "corte", category: "cabelo", name: "Corte Valmont Signature", price: 120, duration: "45 min", detail: "Visagismo, corte na tesoura e navalha, lavagem estimulante e finalização precisa.", steps: ["Leitura do rosto", "Tesoura & navalha", "Lavagem & finalização"] },
  { id: "barba", category: "barba", name: "Barboterapia Tradicional", price: 95, duration: "40 min", detail: "Vapor, esfoliação, toalhas quentes e acabamento com lâmina japonesa.", steps: ["Vapor & preparação", "Toalha aromática", "Lâmina & bálsamo"] },
  { id: "combo", category: "experiencia", name: "Combo Imperial", price: 195, duration: "75 min", detail: "Cabelo e barba no mesmo encontro, com massagem crânio-cervical e tempo para desacelerar.", steps: ["Corte de precisão", "Ritual de barba", "Massagem final"] },
  { id: "detox", category: "cabelo", name: "Detox & Alinhamento", price: 110, duration: "40 min", detail: "Cuidado do couro cabeludo com argila mineral e tônico de finalização.", steps: ["Diagnóstico", "Argila mineral", "Alinhamento dos fios"] },
] as const;
const barbers = [
  { id: "ricardo", name: "Ricardo Silva", role: "Cortes clássicos e visagismo", experience: "14 anos de ofício", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80" },
  { id: "arthur", name: "Arthur Peixoto", role: "Barboterapia e fade escovado", experience: "9 anos de ofício", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80" },
  { id: "matheus", name: "Matheus Prado", role: "Tesoura livre e alinhamento de barba", experience: "8 anos de ofício", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=700&q=80" },
] as const;
const plans = [
  { name: "Essencial", price: 139, description: "Até 2 cortes por mês" },
  { name: "Gentleman", price: 219, description: "Cortes recorrentes + barba quinzenal" },
  { name: "Black Imperial", price: 389, description: "Cabelo e barba em alta frequência" },
] as const;
const questions = [
  { q: "Como funciona o Clube Valmont?", a: "A assinatura é mensal. Consulte o concierge para confirmar disponibilidade, serviços incluídos e condições atuais antes de aderir." },
  { q: "Posso pausar ou cancelar?", a: "O concierge informa as regras vigentes de pausa e cancelamento antes da contratação." },
  { q: "O pedido pelo site já confirma o horário?", a: "Não. A comanda prepara uma mensagem para o WhatsApp. O horário depende de confirmação da equipe." },
  { q: "Posso escolher profissional?", a: "Sim. Indique sua preferência na comanda; a equipe confirma a agenda do profissional." },
];
const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
const whatsapp = (message: string) => `https://wa.me/5511998765432?text=${encodeURIComponent(message)}`;
const localDate = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

export default function ValmontBarberPage() {
  const reduced = useReducedMotion();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<"todos" | "cabelo" | "barba" | "experiencia">("todos");
  const [serviceId, setServiceId] = useState<(typeof services)[number]["id"]>("combo");
  const [barberId, setBarberId] = useState<(typeof barbers)[number]["id"]>("ricardo");
  const [visits, setVisits] = useState(3);
  const [withBeard, setWithBeard] = useState(true);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("Tarde");
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("valmont_theme") !== "dark") return;
    const frame = requestAnimationFrame(() => setTheme("dark"));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  const service = services.find((item) => item.id === serviceId)!;
  const barber = barbers.find((item) => item.id === barberId)!;
  const singleCost = visits * (120 + (withBeard ? 95 : 0));
  const plan = visits <= 2 && !withBeard ? plans[0] : visits >= 4 && withBeard ? plans[2] : plans[1];
  const savings = Math.max(0, singleCost - plan.price);
  const bookingUrl = whatsapp(`Olá, Valmont. Quero solicitar um horário.\nServiço: ${service.name} (${money(service.price)}).\nProfissional: ${barber.name}.\nData: ${date ? date.split("-").reverse().join("/") : "a definir"}.\nTurno: ${shift}.\nAguardo confirmação de disponibilidade.`);
  const clubUrl = whatsapp(`Olá, Valmont. Gostaria de conhecer o plano ${plan.name} (${money(plan.price)}/mês). Minha estimativa é ${visits} visita(s) por mês, ${withBeard ? "com" : "sem"} barba. Podem confirmar condições e disponibilidade?`);
  const selectService = (id: (typeof services)[number]["id"], go = false) => {
    setServiceId(id); setPrepared(false);
    if (go) document.getElementById("reserva")?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  };
  const toggleTheme = () => { const next = theme === "light" ? "dark" : "light"; setTheme(next); localStorage.setItem("valmont_theme", next); };
  const submitBooking = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setPrepared(true); window.open(bookingUrl, "_blank", "noopener,noreferrer"); };

  return <div className="valmont" data-theme={theme}>
    <MiniHubMenu />
    <header className="vm-header" id="topo">
      <a className="vm-brand" href="#topo" aria-label="Valmont, voltar ao início"><span className="vm-mark">V<span>·</span></span><span>VALMONT<small>BARBER CLUB / JARDINS</small></span></a>
      <nav className="vm-nav" aria-label="Seções da página"><a href="#rituais">Rituais</a><a href="#clube">Clube</a><a href="#mestres">Profissionais</a><a href="#local">Localização</a></nav>
      <div className="vm-header-actions"><button className="vm-theme" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Ativar modo noturno" : "Ativar modo claro"}>{theme === "light" ? "☾" : "☼"}</button><a className="vm-header-cta" href="#reserva">Reservar cadeira ↗</a><button className="vm-menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? "Fechar" : "Menu"}</button></div>
    </header>
    {menuOpen && <nav className="vm-mobile-menu" aria-label="Menu mobile">{[["Rituais","rituais"],["Clube","clube"],["Profissionais","mestres"],["Reserva","reserva"],["Localização","local"]].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<span aria-hidden="true">↗</span></a>)}</nav>}
    <main>
      <section className="vm-hero" aria-labelledby="vm-title"><div className="vm-hero-copy"><div className="vm-kicker"><span>EST. JARDINS, SÃO PAULO</span><span>01 / O OFÍCIO</span></div><p className="vm-overline">UM LUGAR PARA VOLTAR A SI.</p><h1 id="vm-title">O tempo<br />bem <em>cortado.</em></h1><p className="vm-lead">Precisão na cadeira. Pausa no relógio. Um ritual de barbearia para quem conhece o valor de ambos.</p><div className="vm-hero-actions"><a className="vm-primary" href="#reserva">Escolher meu ritual <span aria-hidden="true">↗</span></a><a className="vm-text-link" href="#rituais">Explorar o catálogo ↓</a></div><div className="vm-hero-foot"><span>TESOURA / NAVALHA / TEMPO</span><span>RUA OSCAR FREIRE · SP</span></div></div><div className="vm-hero-visual"><Image src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1500&q=85" alt="Barbeiro trabalhando em um corte de cabelo" fill priority sizes="(max-width: 800px) 100vw, 52vw" /><div className="vm-image-caption"><span>FIG. 01 — O OFÍCIO</span><span>45 MINUTOS PARA RECOMEÇAR</span></div><span className="vm-image-corner" aria-hidden="true">V.</span></div></section>
      <section className="vm-intro" aria-label="A proposta Valmont"><span className="vm-section-no">[ 01 — ATELIER ]</span><p>Não é sobre aparar o tempo. <em>É sobre ter tempo para si.</em></p><div className="vm-intro-side">Na Valmont, cada detalhe pertence ao ritual: o encontro, o corte, a pausa e o retorno.</div></section>
      <section className="vm-section vm-rituals" id="rituais" aria-labelledby="vm-ritual-title"><div className="vm-section-heading"><div><span className="vm-section-no">[ 02 — CATÁLOGO DE RITUAIS ]</span><h2 id="vm-ritual-title">Escolha seu <em>tempo.</em></h2></div><p>Quatro maneiras de sair diferente. Selecione um ritual para abrir a comanda.</p></div><div className="vm-filter" role="group" aria-label="Filtrar serviços">{([["Todos","todos"],["Cabelo","cabelo"],["Barba","barba"],["Experiência","experiencia"]] as const).map(([label,value]) => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{label}</button>)}</div><div className="vm-service-list">{services.filter((item) => category === "todos" || item.category === category).map((item, index) => <div className={`vm-service ${serviceId === item.id ? "is-selected" : ""}`} key={item.id}><button type="button" className="vm-service-trigger" aria-expanded={serviceId === item.id} onClick={() => selectService(item.id)}><span className="vm-service-index">0{index + 1}</span><span className="vm-service-name">{item.name}</span><span className="vm-service-duration">{item.duration}</span><span className="vm-service-price">{money(item.price)}</span><span className="vm-service-plus" aria-hidden="true">{serviceId === item.id ? "−" : "+"}</span></button><AnimatePresence initial={false}>{serviceId === item.id && <motion.div className="vm-service-detail" initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.22 }}><p>{item.detail}</p><div className="vm-service-steps">{item.steps.map((step,i) => <span key={step}><b>0{i + 1}</b> {step}</span>)}</div><button type="button" className="vm-inline-action" onClick={() => selectService(item.id, true)}>Adicionar à comanda ↗</button></motion.div>}</AnimatePresence></div>)}</div></section>
      <section className="vm-club" id="clube" aria-labelledby="vm-club-title"><div className="vm-club-copy"><span className="vm-section-no">[ 03 — O CLUBE ]</span><h2 id="vm-club-title">Seu lugar<br /><em>à mesa.</em></h2><p>Para quem faz do cuidado um hábito. Ajuste sua frequência e compare uma estimativa mensal.</p><div className="vm-club-divider" /><span className="vm-club-note">CONDIÇÕES SUJEITAS À CONFIRMAÇÃO DO CONCIERGE.</span></div><div className="vm-calculator"><div className="vm-calc-top"><span>RÉGUA DE FREQUÊNCIA</span><span>SIMULAÇÃO / 01</span></div><label className="vm-range-label" htmlFor="vm-visits">Visitas por mês <strong>{String(visits).padStart(2,"0")}</strong></label><input id="vm-visits" type="range" min="1" max="6" value={visits} onChange={(event) => setVisits(Number(event.target.value))} /><div className="vm-range-ticks">{[1,2,3,4,5,6].map((n) => <span key={n}>0{n}</span>)}</div><label className="vm-check"><input type="checkbox" checked={withBeard} onChange={(event) => setWithBeard(event.target.checked)} /><span>Incluir barba em cada visita</span></label><div className="vm-calc-result"><span>PLANO SUGERIDO</span><AnimatePresence mode="wait"><motion.div key={plan.name} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.2 }}><h3>{plan.name}</h3><p>{plan.description}</p><strong>{money(plan.price)}<small> / mês</small></strong></motion.div></AnimatePresence></div><div className="vm-calc-comparison"><div><span>AVULSO ESTIMADO</span><strong>{money(singleCost)}</strong></div><div><span>ECONOMIA ESTIMADA / MÊS</span><strong>{money(savings)}</strong></div></div><p className="vm-calc-disclaimer">Estimativa baseada em {visits} visita(s), {withBeard ? "corte e barba" : "apenas corte"}. Benefícios e limites devem ser confirmados com a equipe.</p><a className="vm-primary" href={clubUrl} target="_blank" rel="noopener noreferrer">Consultar o concierge ↗</a></div></section>
      <section className="vm-section vm-masters" id="mestres" aria-labelledby="vm-masters-title"><div className="vm-section-heading"><div><span className="vm-section-no">[ 04 — QUEM ASSINA O CORTE ]</span><h2 id="vm-masters-title">Mãos de <em>ofício.</em></h2></div><p>O mesmo gesto nunca é igual. Escolha quem conduz o seu próximo ritual.</p></div><div className="vm-barber-grid">{barbers.map((person,i) => <article className="vm-barber" key={person.id}><button type="button" onClick={() => { setBarberId(person.id); setPrepared(false); document.getElementById("reserva")?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" }); }} aria-label={`Selecionar ${person.name} e ir para reserva`}><div className="vm-barber-image"><Image src={person.image} alt={`Retrato de ${person.name}`} fill sizes="(max-width: 650px) 100vw, (max-width: 1024px) 50vw, 33vw" /><span>0{i + 1} / 03</span></div><div className="vm-barber-meta"><div><h3>{person.name}</h3><p>{person.role}</p></div><span aria-hidden="true">↗</span></div><small>{person.experience}</small></button></article>)}</div></section>
      <section className="vm-booking" id="reserva" aria-labelledby="vm-booking-title"><div className="vm-booking-intro"><span className="vm-section-no">[ 05 — COMANDA DE RESERVA ]</span><h2 id="vm-booking-title">A cadeira<br />é <em>sua.</em></h2><p>Monte sua preferência. A equipe confirma a disponibilidade pelo WhatsApp.</p><div className="vm-booking-number">V / 001</div></div><form className="vm-booking-form" onSubmit={submitBooking}><div className="vm-form-heading"><span>COMANDA DE ATENDIMENTO</span><span>VALMONT / SP</span></div><label htmlFor="vm-service">01 / Ritual</label><select id="vm-service" value={serviceId} onChange={(event) => { setServiceId(event.target.value as (typeof services)[number]["id"]); setPrepared(false); }}>{services.map((item) => <option key={item.id} value={item.id}>{item.name} — {money(item.price)}</option>)}</select><label htmlFor="vm-barber">02 / Profissional</label><select id="vm-barber" value={barberId} onChange={(event) => { setBarberId(event.target.value as (typeof barbers)[number]["id"]); setPrepared(false); }}>{barbers.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select><div className="vm-form-row"><div><label htmlFor="vm-date">03 / Data preferida</label><input id="vm-date" type="date" required min={localDate()} value={date} onChange={(event) => { setDate(event.target.value); setPrepared(false); }} /></div><div><label htmlFor="vm-shift">04 / Turno</label><select id="vm-shift" value={shift} onChange={(event) => { setShift(event.target.value); setPrepared(false); }}><option>Manhã</option><option>Tarde</option><option>Noite</option></select></div></div><div className="vm-booking-summary"><span>RESUMO DO PEDIDO</span><strong>{service.name}</strong><p>{barber.name} · {service.duration} · {money(service.price)}</p></div><button className="vm-primary" type="submit">Preparar no WhatsApp ↗</button><p className="vm-booking-notice">O envio não confirma o horário. Aguarde retorno do concierge.</p>{prepared && <div className="vm-prepared" role="status"><strong>SOLICITAÇÃO PRONTA</strong><span>Se o WhatsApp não abriu, <a href={bookingUrl} target="_blank" rel="noopener noreferrer">abra sua mensagem aqui</a>.</span></div>}</form></section>
      <section className="vm-section vm-local" id="local" aria-labelledby="vm-local-title"><div className="vm-local-main"><span className="vm-section-no">[ 06 — ENCONTRE A CASA ]</span><h2 id="vm-local-title">Nos <em>Jardins.</em></h2><p>Rua Oscar Freire, 1120<br />Jardins · São Paulo, SP</p><p>Segunda a sábado · 09h às 21h<br />Atendimento mediante confirmação.</p><a className="vm-inline-action" href="https://www.google.com/maps/search/?api=1&query=Rua+Oscar+Freire+1120+Jardins+Sao+Paulo" target="_blank" rel="noopener noreferrer">Traçar rota no mapa ↗</a></div><div className="vm-faq"><span className="vm-section-no">PERGUNTAS FREQUENTES</span>{questions.map((item,i) => <details key={item.q}><summary><span>0{i + 1}</span>{item.q}<b aria-hidden="true">+</b></summary><p>{item.a}</p></details>)}</div></section>
    </main>
    <footer className="vm-footer"><a className="vm-footer-brand" href="#topo">VALMONT<span>BARBER CLUB</span></a><p>Tempo bem investido. Corte bem feito.</p><div><a href={whatsapp("Olá, Valmont. Gostaria de falar com o concierge.")} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href="#rituais">Rituais ↑</a></div><small>© {new Date().getFullYear()} Valmont. Conteúdo demonstrativo; confirme dados antes de publicar.</small></footer>
    <div className="vm-mobile-bar"><span>SEU PRÓXIMO RITUAL<small>Escolha uma data preferida</small></span><a href="#reserva">Reservar ↗</a></div>
  </div>;
}
