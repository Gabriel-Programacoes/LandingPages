"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/ArrowLeft";
import { ArrowRightIcon } from "@phosphor-icons/react/ArrowRight";
import { BarbellIcon } from "@phosphor-icons/react/Barbell";
import { DownloadSimpleIcon } from "@phosphor-icons/react/DownloadSimple";
import { EggIcon } from "@phosphor-icons/react/Egg";
import { FireIcon } from "@phosphor-icons/react/Fire";
import { ForkKnifeIcon } from "@phosphor-icons/react/ForkKnife";
import { GaugeIcon } from "@phosphor-icons/react/Gauge";
import { GenderIntersexIcon } from "@phosphor-icons/react/GenderIntersex";
import { LeafIcon } from "@phosphor-icons/react/Leaf";
import { LightningIcon } from "@phosphor-icons/react/Lightning";
import { PersonSimpleRunIcon } from "@phosphor-icons/react/PersonSimpleRun";
import { RulerIcon } from "@phosphor-icons/react/Ruler";
import { ScalesIcon } from "@phosphor-icons/react/Scales";
import { SparkleIcon } from "@phosphor-icons/react/Sparkle";
import { SunIcon } from "@phosphor-icons/react/Sun";
import { TargetIcon } from "@phosphor-icons/react/Target";
import { TrophyIcon } from "@phosphor-icons/react/Trophy";

type Goal = "hipertrofia" | "manutencao" | "emagrecimento";
type Diet = "onivoro" | "vegetariano" | "ovolacto" | "vegano";
type Time = 20 | 40 | 60;
type Sex = "masculino" | "feminino";
type Activity = "sedentario" | "leve" | "moderado" | "alto";

interface Profile {
  sex: Sex | null;
  age: string;
  height: string;
  weight: string;
  activity: Activity | null;
}

interface CalcResult {
  bmr: number;
  tdee: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: number;
  proteinPerKg: number;
  adjustment: number;
  trainDays: number;
  sessionVolume: string;
  method: string[];
}

const DEFAULT_PROFILE: Profile = {
  sex: null,
  age: "32",
  height: "175",
  weight: "78",
  activity: null,
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const goals = [
  { id: "hipertrofia" as Goal, label: "Hipertrofia", Icon: BarbellIcon, desc: "Superavit leve e mais carboidrato" },
  { id: "manutencao" as Goal, label: "Manutenção", Icon: ScalesIcon, desc: "Peso estável e performance" },
  { id: "emagrecimento" as Goal, label: "Emagrecimento", Icon: FireIcon, desc: "Déficit com proteína alta" },
];

const diets = [
  { id: "onivoro" as Diet, label: "Onívoro", Icon: ForkKnifeIcon, desc: "Carnes, ovos e laticínios" },
  { id: "vegetariano" as Diet, label: "Vegetariano", Icon: LeafIcon, desc: "Sem carnes" },
  { id: "ovolacto" as Diet, label: "Ovolacto", Icon: EggIcon, desc: "Ovos e laticínios" },
  { id: "vegano" as Diet, label: "Vegano", Icon: SunIcon, desc: "100% vegetal" },
];

const times = [
  { id: 20 as Time, label: "20 min", Icon: LightningIcon, desc: "Mais frequente, blocos curtos" },
  { id: 40 as Time, label: "40 min", Icon: TargetIcon, desc: "Equilíbrio volume/rotina" },
  { id: 60 as Time, label: "60 min", Icon: TrophyIcon, desc: "Menos dias, mais volume" },
];

const activities = [
  { id: "sedentario" as Activity, label: "Baixa", factor: 1.2, desc: "Mesa, poucos passos" },
  { id: "leve" as Activity, label: "Leve", factor: 1.375, desc: "1-3 treinos/semana" },
  { id: "moderado" as Activity, label: "Moderada", factor: 1.55, desc: "3-5 treinos/semana" },
  { id: "alto" as Activity, label: "Alta", factor: 1.725, desc: "Trabalho ativo ou 6x/semana" },
];
const activityById = new Map(activities.map((item) => [item.id, item]));
const dietProteinBoost = { onivoro: 0, vegetariano: 0.05, ovolacto: 0.03, vegano: 0.1 } satisfies Record<Diet, number>;
const baseProteinPerKg = { hipertrofia: 1.8, manutencao: 1.6, emagrecimento: 2.0 } satisfies Record<Goal, number>;
const kcalAdjustmentBounds = {
  hipertrofia: { rate: 0.1, min: 180, max: 350 },
  manutencao: { rate: 0, min: 0, max: 0 },
  emagrecimento: { rate: -0.18, min: -650, max: -300 },
} satisfies Record<Goal, { rate: number; min: number; max: number }>;
const trainDaysByTime = {
  20: { hipertrofia: 5, manutencao: 4, emagrecimento: 5 },
  40: { hipertrofia: 4, manutencao: 3, emagrecimento: 4 },
  60: { hipertrofia: 3, manutencao: 3, emagrecimento: 3 },
} satisfies Record<Time, Record<Goal, number>>;
const methodology = [
  "TMB: Mifflin-St Jeor",
  "TDEE: fator de atividade",
  "Proteína: ISSN 1.4-2.0 g/kg",
  "Macros: AMDR + saldo de carboidratos",
];
const progressSteps = [0, 1, 2, 3, 4];
const sexOptions = ["masculino", "feminino"] as const;

const stepMeta = [
  { title: "Qual é o seu objetivo?", subtitle: "Isso define déficit, manutenção ou superávit calórico" },
  { title: "Dados corporais", subtitle: "A estimativa usa a equação Mifflin-St Jeor" },
  { title: "Nível de atividade", subtitle: "Transformamos TMB em gasto diário total" },
  { title: "Qual é a sua dieta?", subtitle: "Ajustamos margem de proteína para qualidade e adesão" },
  { title: "Quanto tempo por treino?", subtitle: "Distribuímos volume semanal com mínimo efetivo" },
];

const goalLabels = {
  hipertrofia: "Hipertrofia",
  manutencao: "Manutenção",
  emagrecimento: "Emagrecimento",
};

function toNumber(value: string) {
  return Number(value.replace(",", "."));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

function isProfileValid(profile: Profile) {
  const age = toNumber(profile.age);
  const height = toNumber(profile.height);
  const weight = toNumber(profile.weight);

  return (
    !!profile.sex &&
    Number.isFinite(age) &&
    Number.isFinite(height) &&
    Number.isFinite(weight) &&
    age >= 16 &&
    age <= 80 &&
    height >= 130 &&
    height <= 220 &&
    weight >= 35 &&
    weight <= 220
  );
}

function calculatePlan(goal: Goal, diet: Diet, time: Time, profile: Profile): CalcResult {
  const age = clamp(toNumber(profile.age), 16, 80);
  const height = clamp(toNumber(profile.height), 130, 220);
  const weight = clamp(toNumber(profile.weight), 35, 220);
  const sexOffset = profile.sex === "masculino" ? 5 : -161;
  const activity = profile.activity ? activityById.get(profile.activity) ?? activities[1] : activities[1];

  const bmr = 10 * weight + 6.25 * height - 5 * age + sexOffset;
  const tdee = bmr * activity.factor;
  const adjustmentRule = kcalAdjustmentBounds[goal];
  const kcalAdjustment =
    goal === "manutencao"
      ? 0
      : clamp(tdee * adjustmentRule.rate, adjustmentRule.min, adjustmentRule.max);
  const kcal = roundTo(tdee + kcalAdjustment, 25);

  const proteinPerKg = clamp(baseProteinPerKg[goal] + dietProteinBoost[diet], 1.4, 2.2);
  const protein = Math.round(weight * proteinPerKg);

  const fatFloor = weight * (goal === "emagrecimento" ? 0.7 : 0.8);
  const fatByCalories = (kcal * (goal === "hipertrofia" ? 0.25 : 0.28)) / 9;
  const fat = Math.round(clamp(Math.max(fatFloor, fatByCalories), (kcal * 0.2) / 9, (kcal * 0.35) / 9));
  const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4));
  const fiber = Math.round((kcal / 1000) * 14);
  const water = Math.round(weight * 35);

  const trainDays = trainDaysByTime[time][goal];

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    kcal,
    protein,
    carbs,
    fat,
    fiber,
    water,
    proteinPerKg: Number(proteinPerKg.toFixed(2)),
    adjustment: Math.round(kcalAdjustment),
    trainDays,
    sessionVolume: time === 20 ? "full-body denso" : time === 40 ? "superiores/inferiores" : "blocos completos",
    method: methodology,
  };
}

function OptionButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`liquid-glass relative rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer ${
        active
          ? "bg-white/24 border-white/65 shadow-[0_18px_44px_rgba(162,200,240,0.22),inset_0_1px_0_rgba(255,255,255,0.48)]"
          : "bg-white/9 border-white/24 hover:bg-white/16 hover:border-white/38"
      }`}
    >
      {children}
    </motion.button>
  );
}

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
      <div className="relative size-20">
        <svg viewBox="0 0 88 88" className="size-full -rotate-90">
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
        <OptionButton key={g.id} active={goal === g.id} onClick={() => setGoal(g.id)}>
          {goal === g.id ? <motion.div layoutId="goal-selected" className="absolute inset-0 rounded-2xl border-2 border-white/60" /> : null}
          <div className="mb-2 flex size-9 items-center justify-center rounded-xl bg-white/20 border border-white/30">
            <g.Icon size={20} weight="duotone" color="white" />
          </div>
          <p className="font-pilcrow font-bold text-white text-sm">{g.label}</p>
          <p className="font-archivo text-xs text-white/60 mt-0.5">{g.desc}</p>
        </OptionButton>
      ))}
    </div>
  );
}

function NumberField({
  label,
  value,
  suffix,
  icon,
  onChange,
}: {
  label: string;
  value: string;
  suffix: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}) {
  return (
    <label className="liquid-glass relative rounded-2xl border border-white/24 bg-white/9 p-4">
      <span className="flex items-center gap-2 font-archivo text-xs text-white/58">
        {icon}
        {label}
      </span>
      <span className="mt-3 flex items-end gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^\d,.]/g, ""))}
          inputMode="decimal"
          className="w-full bg-transparent font-pilcrow text-3xl font-black text-white outline-none placeholder:text-white/20"
        />
        <span className="pb-1 font-archivo text-xs text-white/45">{suffix}</span>
      </span>
    </label>
  );
}

function ProfileStep({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {sexOptions.map((sex) => (
          <OptionButton key={sex} active={profile.sex === sex} onClick={() => setProfile((current) => ({ ...current, sex }))}>
            <GenderIntersexIcon size={20} weight="duotone" color="white" />
            <p className="mt-2 font-pilcrow font-bold text-white text-sm">{sex === "masculino" ? "Masculino" : "Feminino"}</p>
            <p className="font-archivo text-xs text-white/55">Constante da equacao</p>
          </OptionButton>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <NumberField
          label="Idade"
          value={profile.age}
          suffix="anos"
          icon={<GaugeIcon size={15} weight="duotone" />}
          onChange={(age) => setProfile((current) => ({ ...current, age }))}
        />
        <NumberField
          label="Altura"
          value={profile.height}
          suffix="cm"
          icon={<RulerIcon size={15} weight="duotone" />}
          onChange={(height) => setProfile((current) => ({ ...current, height }))}
        />
        <NumberField
          label="Peso"
          value={profile.weight}
          suffix="kg"
          icon={<ScalesIcon size={15} weight="duotone" />}
          onChange={(weight) => setProfile((current) => ({ ...current, weight }))}
        />
      </div>
      <p className="font-archivo text-[11px] text-white/42 text-center">
        Faixas aceitas: 16-80 anos, 130-220 cm, 35-220 kg.
      </p>
    </div>
  );
}

function ActivityStep({ activity, setActivity }: { activity: Activity | null; setActivity: (value: Activity) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mx-auto">
      {activities.map((item) => (
        <OptionButton key={item.id} active={activity === item.id} onClick={() => setActivity(item.id)}>
          <PersonSimpleRunIcon size={21} weight="duotone" color="white" />
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <p className="font-pilcrow font-bold text-white text-sm">{item.label}</p>
            <p className="font-archivo text-xs text-[#a0d8ef]">x{item.factor}</p>
          </div>
          <p className="font-archivo text-xs text-white/58 mt-0.5">{item.desc}</p>
        </OptionButton>
      ))}
    </div>
  );
}

function DietStep({ diet, setDiet }: { diet: Diet | null; setDiet: (v: Diet) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl mx-auto">
      {diets.map((d) => (
        <OptionButton key={d.id} active={diet === d.id} onClick={() => setDiet(d.id)}>
          <div className="mb-2 flex size-9 items-center justify-center rounded-xl bg-white/20 border border-white/30">
            <d.Icon size={20} weight="duotone" color="white" />
          </div>
          <p className="font-pilcrow font-bold text-white text-xs">{d.label}</p>
          <p className="font-archivo text-xs text-white/60 mt-0.5 leading-tight">{d.desc}</p>
        </OptionButton>
      ))}
    </div>
  );
}

function TimeStep({ time, setTime }: { time: Time | null; setTime: (v: Time) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mx-auto">
      {times.map((t) => (
        <OptionButton key={t.id} active={time === t.id} onClick={() => setTime(t.id)}>
          <div className="mb-2 flex size-9 items-center justify-center rounded-xl bg-white/20 border border-white/30">
            <t.Icon size={20} weight="duotone" color="white" />
          </div>
          <p className="font-pilcrow font-bold text-white text-sm">{t.label}</p>
          <p className="font-archivo text-xs text-white/60 mt-0.5">{t.desc}</p>
        </OptionButton>
      ))}
    </div>
  );
}

function ResultStep({ result, goal, time }: { result: CalcResult; goal: Goal; time: Time }) {
  const proteinPercent = Math.round((result.protein * 4 / result.kcal) * 100);
  const carbsPercent = Math.round((result.carbs * 4 / result.kcal) * 100);
  const fatPercent = Math.round((result.fat * 9 / result.kcal) * 100);

  return (
    <motion.div
      key="result"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col items-center gap-6"
    >
      <div className="text-center">
        <p className="font-archivo text-sm text-white/60">Plano para {goalLabels[goal]}</p>
        <h3 className="font-pilcrow font-black text-4xl sm:text-5xl text-white mt-1">
          <OdometerNumber value={result.kcal} />
          <span className="text-xl text-white/60 ml-1">kcal/dia</span>
        </h3>
        <p className="font-archivo text-sm text-white/50 mt-1">
          TMB {result.bmr.toLocaleString("pt-BR")} kcal · TDEE {result.tdee.toLocaleString("pt-BR")} kcal · ajuste {result.adjustment > 0 ? "+" : ""}{result.adjustment} kcal
        </p>
      </div>

      <div className="flex flex-wrap gap-6 sm:gap-8 justify-center">
        <MacroRing percent={proteinPercent} color="#a0d8ef" label={`Proteina · ${result.proteinPerKg} g/kg`} grams={result.protein} />
        <MacroRing percent={carbsPercent} color="#f0c0a0" label="Carboidrato" grams={result.carbs} />
        <MacroRing percent={fatPercent} color="#d0a0d8" label="Gordura" grams={result.fat} />
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
        <div className="rounded-2xl border border-white/16 bg-white/8 p-4">
          <p className="font-archivo text-[10px] uppercase tracking-[0.14em] text-white/42">Treino</p>
          <p className="mt-1 font-pilcrow font-black text-2xl text-white">{result.trainDays}x/sem</p>
      <p className="font-archivo text-xs text-white/50">{time} min · {result.sessionVolume}</p>
        </div>
        <div className="rounded-2xl border border-white/16 bg-white/8 p-4">
          <p className="font-archivo text-[10px] uppercase tracking-[0.14em] text-white/42">Base diaria</p>
          <p className="mt-1 font-pilcrow font-black text-2xl text-white">{result.water} ml</p>
          <p className="font-archivo text-xs text-white/50">{result.fiber} g fibra estimada</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {result.method.map((item) => (
          <span key={item} className="rounded-full border border-white/14 bg-white/8 px-3 py-1 font-archivo text-[10px] text-white/48">
            {item}
          </span>
        ))}
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
  );
}

export default function CalculatorSection() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [diet, setDiet] = useState<Diet | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [result, setResult] = useState<CalcResult | null>(null);

  const profileValid = useMemo(() => isProfileValid(profile), [profile]);
  const previewResult = useMemo(
    () => (goal && diet && time && profileValid && profile.activity ? calculatePlan(goal, diet, time, profile) : null),
    [goal, diet, time, profile, profileValid]
  );

  const advance = useCallback(() => {
    setDir(1);
    setStep((current) => current + 1);
  }, []);

  const back = useCallback(() => {
    setDir(-1);
    setStep((current) => current - 1);
  }, []);

  const handleFinish = useCallback(() => {
    if (!previewResult) return;
    setResult(previewResult);
    setDir(1);
    setStep(5);
  }, [previewResult]);

  const setActivity = useCallback((activity: Activity) => {
    setProfile((current) => ({ ...current, activity }));
  }, []);

  const resetCalculator = useCallback(() => {
    setStep(0);
    setDir(-1);
    setResult(null);
    setGoal(null);
    setDiet(null);
    setTime(null);
    setProfile(DEFAULT_PROFILE);
  }, []);

  const canAdvance =
    step === 0 ? !!goal :
    step === 1 ? profileValid :
    step === 2 ? !!profile.activity :
    step === 3 ? !!diet :
    step === 4 ? !!time :
    false;

  return (
    <section id="calculator" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(150,198,238,0.38),transparent_32%),radial-gradient(circle_at_84%_72%,rgba(232,144,184,0.24),transparent_34%),linear-gradient(135deg,#243862_0%,#324d80_46%,#553861_100%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#6090c0]/20 blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#c080a0]/20 blur-[80px]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0 18%, rgba(255,255,255,0.24) 18.5%, transparent 19.5% 44%, rgba(255,255,255,0.12) 44.5%, transparent 45.5% 100%), linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 72px 72px, 72px 72px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-archivo font-semibold text-white/70 bg-white/10 border border-white/20 rounded-full uppercase tracking-widest">
            Calculadora com base científica
          </span>
          <h2 className="font-pilcrow font-black text-4xl sm:text-5xl text-white leading-tight">
            Monte seu plano com
            <br />
            <span className="text-[#a0c8f0]">cálculo real</span>
          </h2>
        </motion.div>

        <div className="liquid-glass relative bg-white/[0.075] border border-white/35 rounded-3xl shadow-[0_32px_90px_rgba(10,22,44,0.36),0_4px_18px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.34)] min-h-[560px] flex flex-col">
          {step < 5 ? (
            <div className="px-8 pt-6">
              <div className="flex gap-2">
                {progressSteps.map((i) => (
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
              <p className="font-archivo text-xs text-white/40 mt-2">{step + 1} de 5</p>
            </div>
          ) : null}

          <div className="flex-1 flex flex-col justify-center p-8">
            <AnimatePresence mode="wait" custom={dir}>
              {step < 5 ? (
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
                  {step === 1 && <ProfileStep profile={profile} setProfile={setProfile} />}
                  {step === 2 && <ActivityStep activity={profile.activity} setActivity={setActivity} />}
                  {step === 3 && <DietStep diet={diet} setDiet={setDiet} />}
                  {step === 4 && <TimeStep time={time} setTime={setTime} />}
                </motion.div>
              ) : result && goal && time ? (
                <ResultStep result={result} goal={goal} time={time} />
              ) : null}
            </AnimatePresence>
          </div>

          {step < 5 ? (
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
                onClick={step === 4 ? handleFinish : advance}
                disabled={!canAdvance}
                whileHover={canAdvance ? { scale: 1.04 } : {}}
                whileTap={canAdvance ? { scale: 0.97 } : {}}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-archivo font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  canAdvance
                    ? "bg-white/20 border border-white/40 text-white hover:bg-white/30"
                    : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                {step === 4 ? (
                  <><SparkleIcon size={15} weight="fill" /> Calcular Plano</>
                ) : (
                  <>Próximo <ArrowRightIcon size={14} weight="bold" /></>
                )}
              </motion.button>
            </div>
          ) : (
            <div className="flex justify-center pb-6">
              <button
                onClick={resetCalculator}
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
