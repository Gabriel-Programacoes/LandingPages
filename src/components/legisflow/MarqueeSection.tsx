"use client";

const clients = [
  "DELOITTE", "KPMG", "ERNST & YOUNG", "BDO BRASIL",
  "GRANT THORNTON", "BAKER TILLY", "MAZARS", "CROWE HORWATH",
  "RSM BRASIL", "PKF BRASIL",
];

export default function MarqueeSection() {
  const items = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="group border-b-2 border-ink bg-ink overflow-hidden py-5 select-none">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]">
        {items.map((client, i) => (
          <span
            key={i}
            className="font-headline text-xl tracking-[0.22em] text-off-white/50 mx-10 shrink-0"
          >
            {client}
            <span className="ml-10 text-verde/50">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

