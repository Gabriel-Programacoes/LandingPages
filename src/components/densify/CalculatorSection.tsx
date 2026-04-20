"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  BarbellIcon,
  ScalesIcon,
  FireIcon,
  ForkKnifeIcon,
  LeafIcon,
  EggIcon,
  SunIcon,
  LightningIcon,
  TargetIcon,
  TrophyIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SparkleIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react";

type Goal = "hipertrofia" | "manutencao" | "emagrecimento";
type Diet = "onivoro" | "vegetariano" | "ovolacto" | "vegano";
type Time = 20 | 40 | 60;

interface CalcResult {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  trainDays: number;
}

function calculatePlan(goal: Goal, diet: Diet, time: Time): CalcResult {
  const baseKcal = { hipertrofia: 3900, manutencao: 2800, emagrecimento: 2100 }[goal];
  const dietMultiplier = { onivoro: 1, vegetariano: 0.97, ovolacto: 0.98, vegano: 0.95 }[diet];
  const trainDays = time === 20 ? 5 : time === 40 ? 4 : 3;

  const kcal = Math.round(baseKcal * dietMultiplier);
  const protein = goal === "hipertrofia" ? Math.round(kcal * 0.30 / 4) : Math.round(kcal * 0.25 / 4);
  const fat = Math.round(kcal * 0.28 / 9);
  const carbs = Math.round((kcal - protein * 4 - fat * 9) / 4);

  return { kcal, protein, carbs, fat, trainDays };
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

// ── Hoisted data arrays (rerender-no-inline-components / js-cache-property-access) ──

const goals = [
  { id: "hipertrofia" as Goal, label: "Hipertrofia", Icon: BarbellIcon, desc: "Ganho de massa muscular" },
  { id: "manutencao" as Goal, label: "Manutenção", Icon: ScalesIcon, desc: "Manter o peso e forma" },
  { id: "emagrecimento" as Goal, label: "Emagrecimento", Icon: FireIcon, desc: "Redução de gordura corporal" },
];

const diets = [
  { id: "onivoro" as Diet, label: "Onívoro", Icon: ForkKnifeIcon, desc: "Inclui carnes e derivados" },
  { id: "vegetariano" as Diet, label: "Vegetariano", Icon: LeafIcon, desc: "Sem carnes" },
  { id: "ovolacto" as Diet, label: "Ovolacto", Icon: EggIcon, desc: "Ovos, laticínios, sem carne" },
  { id: "vegano" as Diet, label: "Vegano", Icon: SunIcon, desc: "100% plant-based" },
];

const times = [
  { id: 20 as Time, label: "20 min", Icon: LightningIcon, desc: "Treinos express" },
  { id: 40 as Time, label: "40 min", Icon: TargetIcon, desc: "Densidade otimizada" },
  { id: 60 as Time, label: "60 min", Icon: TrophyIcon, desc: "Sessão completa" },
];

// Step metadata without JSX — prevents JSX tree recreation on every render
const stepMeta = [
  { title: "Qual é o seu objetivo?",    subtitle: "Vamos calibrar seu plano personalizado" },
  { title: "Qual é a sua dieta?",        subtitle: "Adaptamos as recomendações nutricionais para você" },
  { title: "Quanto tempo por treino?",   subtitle: "Vamos montar a densidade certa para o seu ritmo" },
];

const goalLabels = { hipertrofia: "Hipertrofia", manutencao: "Manutenção", emagrecimento: "Emagrecimento" };

// ── Sub-components extracted at module level (rerender-no-inline-components) ──

function OdometerNumber({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {value.toLocaleString("pt-BR")}
    </motion.span>
  );
}

function MacroRing({ percent, color, label, grams }: { percent: number; color: string; label: string; grams: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
          <motion.circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-pilcrow font-black text-lg text-white leading-none">{grams}g</span>
        </div>
      </div>
      <span className="font-archivo text-xs text-white/70">{label}</span>
    </div>
  );
}

function GoalStep({ goal, setGoal }: { goal: Goal | null; setGoal: (v: Goal) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mx-auto">
      {goals.map((g) => (
        <motion.button
          key={g.id}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setGoal(g.id)}
          className={`relative p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer ${
            goal === g.id
              ? "bg-white/30 border-white/70 shadow-[0_8px_32px_rgba(255,255,255,0.3)]"
              : "bg-white/10 border-white/20 hover:bg-white/20"
          }`}
        >
          {goal === g.id && (
            <motion.div
              layoutId="goal-selected"
              className="absolute inset-0 rounded-2xl border-2 border-white/60"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <div className="mb-2 w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 border border-white/30">
            <g.Icon size={20} weight="duotone" color="white" />
          </div>
          <p className="font-pilcrow font-bold text-white text-sm">{g.label}</p>
          <p className="font-archivo text-xs text-white/60 mt-0.5">{g.desc}</p>
        </motion.button>
      ))}
    </div>
  );
}

function DietStep({ diet, setDiet }: { diet: Diet | null; setDiet: (v: Diet) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl mx-auto">
      {diets.map((d) => (
        <motion.button
          key={d.id}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setDiet(d.id)}
          className={`relative p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer ${
            diet === d.id
              ? "bg-white/30 border-white/70 shadow-[0_8px_32px_rgba(255,255,255,0.3)]"
              : "bg-white/10 border-white/20 hover:bg-white/20"
          }`}
        >
          {diet === d.id && (
            <motion.div
              layoutId="diet-selected"
              className="absolute inset-0 rounded-2xl border-2 border-white/60"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <div className="mb-2 w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 border border-white/30">
            <d.Icon size={20} weight="duotone" color="white" />
          </div>
          <p className="font-pilcrow font-bold text-white text-xs">{d.label}</p>
          <p className="font-archivo text-xs text-white/60 mt-0.5 leading-tight">{d.desc}</p>
        </motion.button>
      ))}
    </div>
  );
}

function TimeStep({ time, setTime }: { time: Time | null; setTime: (v: Time) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mx-auto">
      {times.map((t) => (
        <motion.button
          key={t.id}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setTime(t.id)}
          className={`relative p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer ${
            time === t.id
              ? "bg-white/30 border-white/70 shadow-[0_8px_32px_rgba(255,255,255,0.3)]"
              : "bg-white/10 border-white/20 hover:bg-white/20"
          }`}
        >
          {time === t.id && (
            <motion.div
              layoutId="time-selected"
              className="absolute inset-0 rounded-2xl border-2 border-white/60"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <div className="mb-2 w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 border border-white/30">
            <t.Icon size={20} weight="duotone" color="white" />
          </div>
          <p className="font-pilcrow font-bold text-white text-sm">{t.label}</p>
          <p className="font-archivo text-xs text-white/60 mt-0.5">{t.desc}</p>
        </motion.button>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CalculatorSection() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [diet, setDiet] = useState<Diet | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [result, setResult] = useState<CalcResult | null>(null);

  // Pre-compute result as soon as all inputs are available (js-cache-function-results)
  const previewResult = useMemo(
    () => (goal && diet && time ? calculatePlan(goal, diet, time) : null),
    [goal, diet, time]
  );

  function advance() { setDir(1);  setStep((s) => s + 1); }
  function back()    { setDir(-1); setStep((s) => s - 1); }

  function handleFinish() {
    if (previewResult) {
      setResult(previewResult);
      setDir(1);
      setStep(3);
    }
  }

  // canAdvance derived inline — no JSX array rebuild on every render
  const canAdvance = step === 0 ? !!goal : step === 1 ? !!diet : !!time;

  return (
    <section id="calculator" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a3f6f] via-[#3a5080] to-[#4a3060]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#6090c0]/20 blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#c080a0]/20 blur-[80px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-archivo font-semibold text-white/70 bg-white/10 border border-white/20 rounded-full uppercase tracking-widest">
            Calculadora Personalizada
          </span>
          <h2 className="font-pilcrow font-black text-4xl sm:text-5xl text-white leading-tight">
            Monte seu plano em
            <br />
            <span className="text-[#a0c8f0]">
              30 segundos
            </span>
          </h2>
        </motion.div>

        {/* Card */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] overflow-hidden min-h-[460px] flex flex-col">
          {/* Progress bar */}
          {step < 3 ? (
            <div className="px-8 pt-6">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: step > i ? "100%" : step === i ? "50%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                ))}
              </div>
              <p className="font-archivo text-xs text-white/40 mt-2">{step + 1} de 3</p>
            </div>
          ) : null}

          {/* Steps */}
          <div className="flex-1 flex flex-col justify-center p-8">
            <AnimatePresence mode="wait" custom={dir}>
              {step < 3 ? (
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="text-center">
                    <h3 className="font-pilcrow font-black text-2xl sm:text-3xl text-white">
                      {stepMeta[step].title}
                    </h3>
                    <p className="font-archivo text-sm text-white/60 mt-1">{stepMeta[step].subtitle}</p>
                  </div>
                  {step === 0 && <GoalStep goal={goal} setGoal={setGoal} />}
                  {step === 1 && <DietStep diet={diet} setDiet={setDiet} />}
                  {step === 2 && <TimeStep time={time} setTime={setTime} />}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="text-center">
                    <p className="font-archivo text-sm text-white/60">Plano para {goalLabels[goal!]}</p>
                    <h3 className="font-pilcrow font-black text-4xl sm:text-5xl text-white mt-1">
                      <OdometerNumber value={result!.kcal} />
                      <span className="text-xl text-white/60 ml-1">kcal/dia</span>
                    </h3>
                    <p className="font-archivo text-sm text-white/50 mt-1">
                      {result!.trainDays} treinos por semana · {time} min cada
                    </p>
                  </div>

                  <div className="flex gap-8 justify-center">
                    <MacroRing
                      percent={Math.round((result!.protein * 4 / result!.kcal) * 100)}
                      color="#a0d8ef"
                      label="Proteína"
                      grams={result!.protein}
                    />
                    <MacroRing
                      percent={Math.round((result!.carbs * 4 / result!.kcal) * 100)}
                      color="#f0c0a0"
                      label="Carboidrato"
                      grams={result!.carbs}
                    />
                    <MacroRing
                      percent={Math.round((result!.fat * 9 / result!.kcal) * 100)}
                      color="#d0a0d8"
                      label="Gordura"
                      grams={result!.fat}
                    />
                  </div>

                  <motion.a
                    href="#download"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/90 text-[#2a3f6f] font-archivo font-bold text-base shadow-lg hover:bg-white transition-colors cursor-pointer"
                  >
                    <DownloadSimpleIcon size={18} weight="bold" />
                    Baixar Meu Plano Completo
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {step < 3 ? (
            <div className="flex justify-between items-center px-8 pb-6">
              <motion.button
                onClick={back}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-1.5 font-archivo text-sm text-white/50 hover:text-white/80 transition-colors cursor-pointer ${step === 0 ? "invisible" : ""}`}
              >
                <ArrowLeftIcon size={14} weight="bold" /> Voltar
              </motion.button>

              <motion.button
                onClick={step === 2 ? handleFinish : advance}
                disabled={!canAdvance}
                whileHover={canAdvance ? { scale: 1.04 } : {}}
                whileTap={canAdvance ? { scale: 0.97 } : {}}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-archivo font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  canAdvance
                    ? "bg-white/20 border border-white/40 text-white hover:bg-white/30"
                    : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                {step === 2 ? (
                  <><SparkleIcon size={15} weight="fill" /> Calcular Plano</>
                ) : (
                  <>Próximo <ArrowRightIcon size={14} weight="bold" /></>
                )}
              </motion.button>
            </div>
          ) : null}

          {step === 3 && (
            <div className="flex justify-center pb-6">
              <button
                onClick={() => { setStep(0); setDir(-1); setResult(null); setGoal(null); setDiet(null); setTime(null); }}
                className="font-archivo text-xs text-white/40 hover:text-white/60 transition-colors cursor-pointer"
              >
                Recalcular
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

