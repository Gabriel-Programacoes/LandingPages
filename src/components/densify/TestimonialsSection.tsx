"use client";

import { motion } from "framer-motion";
import { StarIcon, QuotesIcon } from "@phosphor-icons/react";

const testimonials = [
	{
		name: "Mariana Costa",
		role: "Advogada",
		location: "São Paulo",
		text: "Sempre quis ganhar massa mas nunca tive mais de 45 minutos no meu dia. O Densify resolveu isso de um jeito que nenhum outro app conseguiu.",
		rating: 5,
		avatar: "MC",
		accent: "#4a7fb5",
		result: "+3kg em 90 dias",
	},
	{
		name: "Rafael Melo",
		role: "Dev Senior",
		location: "Remoto",
		text: "A calculadora me deu um plano de 3.900kcal vegetarianas por dia. Achei impossível no início. Três meses depois, 4kg de massa e sem sair da frente do computador.",
		rating: 5,
		avatar: "RM",
		accent: "#c07050",
		result: "+4kg massa magra",
		featured: true,
	},
	{
		name: "Beatriz Alves",
		role: "Médica",
		location: "Residência",
		text: "Planto e mal tenho energia pro básico. Os treinos de 20 minutos do Densify mudaram minha qualidade de vida completamente.",
		rating: 5,
		avatar: "BA",
		accent: "#8060c0",
		result: "20min diários",
	},
	{
		name: "Lucas Ferreira",
		role: "Empreendedor",
		location: "Brasil",
		text: "Já tentei 7 apps diferentes. Nenhum entendia que eu tinha 35 minutos, não uma hora inteira. O Densify é o único que respeita meu tempo.",
		rating: 5,
		avatar: "LF",
		accent: "#3a8a5a",
		result: "7 apps testados antes",
		featured: true,
	},
	{
		name: "Camila Santos",
		role: "Designer",
		location: "Freelance",
		text: "As receitas de alta densidade são incríveis. Nunca imaginei que 15 minutos de preparo poderia resultar em algo tão nutritivo e gostoso.",
		rating: 5,
		avatar: "CS",
		accent: "#b07820",
		result: "15min na cozinha",
	},
	{
		name: "Pedro Rocha",
		role: "Professor",
		location: "Universitário",
		text: "Meu plano ovolactovegetariano de hipertrofia funciona há 4 meses seguidos. Nunca imaginei que seria possível com minha rotina de aulas.",
		rating: 5,
		avatar: "PR",
		accent: "#a04870",
		result: "4 meses consecutivos",
	},
];

function Stars({ n }: { n: number }) {
	return (
		<div className="flex gap-0.5">
			{[...Array(n)].map((_, i) => (
				<StarIcon key={i} size={13} weight="fill" color="#f0b830" />
			))}
		</div>
	);
}

export default function TestimonialsSection() {
	const col1 = testimonials.filter((_, i) => i % 3 === 0);
	const col2 = testimonials.filter((_, i) => i % 3 === 1);
	const col3 = testimonials.filter((_, i) => i % 3 === 2);

	return (
		<section id="testimonials" className="relative py-28 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#1a2a48] via-[#24365a] to-[#30204a]" />
			<div className="absolute top-1/4 left-[-5%] w-[500px] h-[500px] rounded-full bg-[#4070b0]/12 blur-[110px] pointer-events-none" />
			<div className="absolute bottom-1/4 right-[-5%] w-[420px] h-[420px] rounded-full bg-[#9050b0]/12 blur-[110px] pointer-events-none" />
			<div className="absolute top-[-5%] right-[30%] w-[300px] h-[300px] rounded-full bg-[#c07050]/10 blur-[90px] pointer-events-none" />

			{/* Subtle grid texture */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			<div className="relative z-10 max-w-6xl mx-auto px-6">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
						<div>
							<span className="inline-block px-4 py-1.5 mb-5 text-xs font-archivo font-semibold text-white/50 bg-white/8 border border-white/15 rounded-full uppercase tracking-widest">
								Histórias reais
							</span>
							<h2 className="font-pilcrow font-black text-4xl sm:text-5xl text-white leading-[1.1]">
								Quem já transformou
								<br />
								<span className="text-[#90b8e8]">
									a rotina com Densify
								</span>
							</h2>
						</div>
						<div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/8 border border-white/12 self-start sm:self-auto">
							<div className="flex">
								{[...Array(5)].map((_, i) => (
									<StarIcon key={i} size={16} weight="fill" color="#f0b830" />
								))}
							</div>
							<div>
								<p className="font-pilcrow font-black text-white text-sm">4.9</p>
								<p className="font-archivo text-[10px] text-white/40">App Store</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Masonry grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
					{[col1, col2, col3].map((col, colIdx) => (
						<div
							key={colIdx}
							className="flex flex-col gap-4"
							style={{
								marginTop:
									colIdx === 1 ? "32px" : colIdx === 2 ? "16px" : "0",
							}}
						>
							{col.map((t, i) => (
								<motion.div
									key={t.name}
									initial={{ opacity: 0, y: 36 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{
										delay: colIdx * 0.12 + i * 0.18,
										duration: 0.65,
										ease: [0.16, 1, 0.3, 1],
									}}
									whileHover={{ y: -5, scale: 1.01 }}
									className={`relative p-6 rounded-[24px] border transition-shadow duration-400 cursor-default
                    ${
											t.featured
												? "bg-white/12 border-white/20 shadow-[0_12px_48px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_24px_72px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]"
												: "bg-white/7 border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_18px_56px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)]"
										}`}
								>
									{/* Colored top accent bar */}
									<div
										className="absolute top-0 left-6 right-6 h-[1.5px] rounded-b-full"
										style={{
											background: `linear-gradient(90deg, transparent, ${t.accent}60, transparent)`,
										}}
									/>

									<div className="relative z-10">
										{/* Quote icon */}
										<div className="mb-4">
											<QuotesIcon
												size={24}
												weight="fill"
												color={`${t.accent}50`}
											/>
										</div>

										<Stars n={t.rating} />

										<p className="font-archivo text-sm text-white/75 mt-3 mb-5 leading-relaxed">
											&ldquo;{t.text}&rdquo;
										</p>

										{/* Result badge */}
										<div
											className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-archivo font-semibold border"
											style={{
												background: `${t.accent}15`,
												borderColor: `${t.accent}30`,
												color: t.accent,
											}}
										>
											{t.result}
										</div>

										<div className="flex items-center gap-3 pt-4 border-t border-white/8">
											<div
												className="w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0"
												style={{
													background: `${t.accent}20`,
													borderColor: `${t.accent}35`,
												}}
											>
												<span
													className="font-pilcrow font-black text-xs"
													style={{ color: t.accent }}
												>
													{t.avatar}
												</span>
											</div>
											<div>
												<p className="font-archivo font-semibold text-sm text-white/90">
													{t.name}
												</p>
												<p className="font-archivo text-xs text-white/40">
													{t.role} · {t.location}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
