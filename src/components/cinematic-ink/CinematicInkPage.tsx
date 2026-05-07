"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SpineBook = {
  id: string;
  title: string;
  author: string;
  year: string;
  isbn: string;
  price: string;
  blurb: string;
  spineColor: string;
  coverUrl?: string;
};

type OpenLibraryDoc = {
  key?: string;
  title?: string;
  isbn?: string[];
  cover_i?: number;
  author_name?: string[];
  first_publish_year?: number;
  first_sentence?: string[] | string;
};

type OpenLibrarySearchResponse = {
  docs?: OpenLibraryDoc[];
};

const fallbackBooks: SpineBook[] = [
  { id: "complete-sherlock-holmes", title: "The Complete Sherlock Holmes", author: "Arthur Conan Doyle", year: "1930", isbn: "9780553212419", price: "$21.00", blurb: "The definitive Holmes archive: deduction, obsession, and the machinery of Victorian intrigue.", spineColor: "#3e241c", coverUrl: "https://covers.openlibrary.org/b/olid/OL32088004M-L.jpg" },
  { id: "beloved", title: "Beloved", author: "Toni Morrison", year: "1987", isbn: "9781400033416", price: "$18.00", blurb: "A haunted, intimate narrative on memory, trauma, and the cost of survival.", spineColor: "#73321d", coverUrl: "https://covers.openlibrary.org/b/isbn/9781400033416-L.jpg" },
  { id: "name-of-the-rose", title: "The Name of the Rose", author: "Umberto Eco", year: "1980", isbn: "9780156001311", price: "$19.00", blurb: "A medieval murder mystery where language, power, and faith collide.", spineColor: "#2b2f37", coverUrl: "https://covers.openlibrary.org/b/isbn/9780156001311-L.jpg" },
  { id: "left-hand-darkness", title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", year: "1969", isbn: "9780441478125", price: "$17.50", blurb: "An icy world, radical politics, and a profound meditation on identity.", spineColor: "#5a513f", coverUrl: "https://covers.openlibrary.org/b/isbn/9780441478125-L.jpg" },
  { id: "things-fall-apart", title: "Things Fall Apart", author: "Chinua Achebe", year: "1958", isbn: "9780385474542", price: "$16.00", blurb: "A foundational novel about tradition, fracture, and colonial violence.", spineColor: "#372626", coverUrl: "https://covers.openlibrary.org/b/isbn/9780385474542-L.jpg" },
];

const bestsellerLayout = [
  { title: "Night Ledger", author: "S. Morrow", className: "col-span-2 row-span-2 md:translate-y-14" },
  { title: "Ash Protocol", author: "A. Kline", className: "md:-translate-y-8" },
  { title: "The Fifth Wall", author: "R. Mendez", className: "md:translate-y-20" },
  { title: "Marrowline", author: "P. El Idrissi", className: "col-span-2 md:-translate-y-10" },
];

export default function CinematicInkPage() {
  const [hoveringBook, setHoveringBook] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [activeBook, setActiveBook] = useState<SpineBook | null>(null);
  const [dragLimit, setDragLimit] = useState(0);
  const [spineBooks, setSpineBooks] = useState<SpineBook[]>(fallbackBooks);
  const railRef = useRef<HTMLDivElement | null>(null);
  const bestsellerBooks = bestsellerLayout.map((item, idx) => ({
    ...item,
    book: spineBooks[idx % spineBooks.length],
  }));

  useEffect(() => {
    const controller = new AbortController();
    const loadRealBooks = async () => {
      try {
        const q = encodeURIComponent(
          "the complete sherlock holmes beloved name of the rose left hand of darkness things fall apart"
        );
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${q}&language=eng&limit=24`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data: OpenLibrarySearchResponse = await res.json();
        const docs = Array.isArray(data?.docs) ? data.docs : [];

        const mapped: SpineBook[] = docs
          .filter((d) => d?.title && (d?.isbn?.[0] || d?.cover_i))
          .slice(0, 10)
          .map((d, idx: number) => {
            const isbn = d?.isbn?.[0] ?? `REF-${idx + 100}`;
            const coverUrl = d?.cover_i
              ? `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`
              : d?.isbn?.[0]
                ? `https://covers.openlibrary.org/b/isbn/${d.isbn[0]}-L.jpg`
                : undefined;
            return {
              id: `${d.key ?? d.title}-${idx}`,
              title: String(d.title),
              author: d?.author_name?.[0] ? String(d.author_name[0]) : "Unknown Author",
              year: d?.first_publish_year ? String(d.first_publish_year) : "N/A",
              isbn: String(isbn),
              price: `$${(14 + idx * 1.7).toFixed(2)}`,
              blurb:
                (Array.isArray(d?.first_sentence) ? d.first_sentence[0] : d?.first_sentence) ??
                "A heavyweight narrative selected for readers who prefer stories with consequence.",
              spineColor: ["#3e241c", "#73321d", "#2b2f37", "#5a513f", "#372626"][idx % 5],
              coverUrl,
            };
          });

        if (mapped.length >= 5) setSpineBooks(mapped.slice(0, 8));
      } catch {
        // Fallback dataset already covers offline or API errors.
      }
    };
    loadRealBooks();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const update = () => {
      if (!railRef.current) return;
      const max = railRef.current.scrollWidth - railRef.current.offsetWidth;
      setDragLimit(Math.max(max, 0));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <main
      className="min-h-screen bg-[#0A0A0A] text-[#E8E3D9] overflow-x-hidden"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <motion.div
        aria-hidden
        className="fixed z-[100] pointer-events-none hidden md:block mix-blend-difference"
        animate={{ x: cursor.x - 22, y: cursor.y - 22 }}
        transition={{ type: "spring", damping: 32, stiffness: 500, mass: 0.25 }}
      >
        <div className="text-[#E8E3D9] font-[family-name:var(--font-space-mono-books)] text-xl">
          {hoveringBook ? "[  ]" : "•"}
        </div>
      </motion.div>

      <section className="relative h-[90vh] px-8 md:px-16 pb-16 flex flex-col justify-between">
        <div className="pt-8 flex justify-end">
          <button className="font-[family-name:var(--font-space-mono-books)] text-xs tracking-[0.22em] uppercase border border-[#E8E3D9]/30 px-3 py-2 hover:text-[#D9531E] hover:border-[#D9531E] transition-colors">
            Menu
          </button>
        </div>
        <div className="grid md:grid-cols-[1fr_320px] gap-10 items-end border-b border-[#E8E3D9]/20 pb-8">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } } }}
            className="uppercase leading-[0.85] tracking-tight font-[family-name:var(--font-dm-serif)] text-[3.4rem] sm:text-[5.2rem] md:text-[7rem] lg:text-[9rem]"
          >
            {"Stories that leave a mark.".split(" ").map((word) => (
              <motion.span
                key={word}
                variants={{ hidden: { y: 90, opacity: 0, rotate: 4 }, visible: { y: 0, opacity: 1, rotate: 0 } }}
                transition={{ type: "spring", damping: 14, stiffness: 105 }}
                className="inline-block mr-5"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="font-[family-name:var(--font-space-mono-books)] text-xs md:text-sm text-right text-[#E8E3D9]/70"
          >
            <p className="text-[#D9531E] mb-2">[ EST. 2026 ]</p>
            <p className="mb-8">Curated archives for the relentless reader. We stock narratives, not filler.</p>
            <div className="ml-auto w-[190px] h-[280px] border border-[#E8E3D9]/20 bg-gradient-to-br from-[#4e463d] via-[#1f1d1a] to-[#0b0b0b]" />
          </motion.aside>
        </div>
      </section>

      <section className="px-8 md:px-16 py-20">
        <div className="flex items-end justify-between mb-7">
          <h2 className="font-[family-name:var(--font-dm-serif)] text-4xl md:text-6xl uppercase">Featured Spines</h2>
          <p className="font-[family-name:var(--font-space-mono-books)] text-xs tracking-[0.18em] uppercase text-[#E8E3D9]/50">Drag left / right</p>
        </div>
        <div ref={railRef} className="overflow-hidden border-y border-[#E8E3D9]/20 py-8">
          <motion.div drag="x" dragConstraints={{ left: -dragLimit, right: 0 }} className="flex gap-3 w-max cursor-grab active:cursor-grabbing">
            {spineBooks.map((book) => (
              <motion.button
                key={book.id}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setHoveringBook(true)}
                onMouseLeave={() => setHoveringBook(false)}
                onClick={() => setActiveBook(book)}
                className="h-[280px] w-[92px] border border-[#E8E3D9]/20 text-left px-2 py-4 flex flex-col justify-between"
                style={{ background: `linear-gradient(180deg, ${book.spineColor}, #121212)` }}
              >
                <span className="font-[family-name:var(--font-space-mono-books)] text-[10px] text-[#E8E3D9]/70">{book.year}</span>
                <span className="font-[family-name:var(--font-dm-serif)] [writing-mode:vertical-rl] rotate-180 text-xl">{book.title}</span>
                <span className="font-[family-name:var(--font-space-mono-books)] text-[10px] text-[#D9531E]">OPEN</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-8 md:px-16 py-20">
        <h2 className="font-[family-name:var(--font-dm-serif)] text-4xl md:text-6xl uppercase mb-10">Curated Dissonance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {bestsellerBooks.map((entry, idx) => (
            <motion.article
              key={`${entry.book.id}-${idx}`}
              className={`relative group overflow-hidden border border-[#E8E3D9]/15 ${entry.className}`}
              initial={{ x: idx % 2 === 0 ? -70 : 80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              {entry.book.coverUrl ? (
                <img
                  src={entry.book.coverUrl}
                  alt={`Cover of ${entry.book.title}`}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 bg-[radial-gradient(circle_at_15%_15%,#8f8979_0%,#2a2824_40%,#111_100%)]" />
              )}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity border border-[#D9531E] bg-[#0A0A0A]/95 p-3">
                <p className="font-[family-name:var(--font-dm-serif)] text-2xl">{entry.book.title}</p>
                <p className="font-[family-name:var(--font-space-mono-books)] text-xs text-[#E8E3D9]/70">{entry.book.author}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-16 py-24 border-y border-[#E8E3D9]/15">
        <motion.p
          className="font-[family-name:var(--font-dm-serif)] text-[#D9531E] text-[2.2rem] sm:text-[3rem] md:text-[5.4rem] uppercase leading-[0.98]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.65 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {[
            "We archive fiction with consequence.",
            "Every spine carries weight.",
            "Every page should alter the reader.",
          ].map((line) => (
            <motion.span key={line} variants={{ hidden: { opacity: 0, y: 55 }, visible: { opacity: 1, y: 0 } }} className="block">
              {line}
            </motion.span>
          ))}
        </motion.p>
      </section>

      <footer className="px-8 md:px-16 py-14 font-[family-name:var(--font-space-mono-books)]">
        <div className="grid md:grid-cols-4 gap-6 border border-[#E8E3D9]/20 p-6 text-xs tracking-[0.08em] uppercase">
          <p className="text-[#D9531E]">Index / Cinematic Ink & Concrete</p>
          <a className="hover:text-[#D9531E] transition-colors" href="#">Catalog</a>
          <a className="hover:text-[#D9531E] transition-colors" href="#">Bestsellers</a>
          <a className="hover:text-[#D9531E] transition-colors" href="#">Archive Notes</a>
        </div>
      </footer>

      <AnimatePresence>
        {activeBook && (
          <motion.div
            className="fixed inset-0 z-[90] bg-[#0A0A0A] p-8 md:p-16 grid md:grid-cols-[200px_1fr] gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div initial={{ x: -120 }} animate={{ x: 0 }} exit={{ x: -120 }} style={{ background: `linear-gradient(180deg, ${activeBook.spineColor}, #111)` }} className="border border-[#E8E3D9]/25 p-4 flex items-end">
              <p className="font-[family-name:var(--font-dm-serif)] text-5xl [writing-mode:vertical-rl] rotate-180">{activeBook.title}</p>
            </motion.div>
            <motion.div initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} className="flex flex-col justify-between">
              <div>
                <p className="font-[family-name:var(--font-space-mono-books)] text-xs text-[#D9531E] mb-4">ARCHIVE ENTRY</p>
                <h3 className="font-[family-name:var(--font-dm-serif)] text-5xl md:text-7xl uppercase leading-[0.9] mb-4">{activeBook.title}</h3>
                <p className="font-[family-name:var(--font-space-mono-books)] text-sm text-[#E8E3D9]/65 mb-8">{activeBook.author} · {activeBook.year} · {activeBook.isbn}</p>
                <p className="max-w-2xl text-lg text-[#E8E3D9]/88">{activeBook.blurb}</p>
              </div>
              <div className="my-8">
                {activeBook.coverUrl ? (
                  <img
                    src={activeBook.coverUrl}
                    alt={`Cover of ${activeBook.title}`}
                    className="w-[220px] h-[320px] object-cover border border-[#E8E3D9]/20"
                  />
                ) : (
                  <div className="w-[220px] h-[320px] border border-[#E8E3D9]/20 bg-[#111]" />
                )}
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-[family-name:var(--font-space-mono-books)] text-2xl">{activeBook.price}</p>
                <button className="px-5 py-3 border border-[#D9531E] bg-[#D9531E] text-[#0A0A0A] font-[family-name:var(--font-space-mono-books)] text-xs tracking-[0.14em] uppercase">
                  Add to Archive
                </button>
                <button onClick={() => setActiveBook(null)} className="px-5 py-3 border border-[#E8E3D9]/30 font-[family-name:var(--font-space-mono-books)] text-xs tracking-[0.14em] uppercase hover:border-[#D9531E] hover:text-[#D9531E] transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
