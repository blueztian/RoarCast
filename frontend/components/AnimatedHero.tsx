"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import HeroSignalField from "@/components/HeroSignalField";

const PHRASES = [
  "before you graduate",
  "before your first interview",
  "before the job expects it",
  "while you still have time to prepare",
];

export default function AnimatedHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-24">
      <HeroSignalField />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-roar-amber"
        >
          <Sparkles size={14} className="text-roar-yellow" aria-hidden="true" />
          <span>LIVE WORKFORCE SIGNALS • SANTA ROSA</span>
        </motion.div>

        <h1 className="flex flex-col items-center justify-center text-balance font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-6xl">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Know what employers need
          </motion.span>
          <div
            className="relative mt-2 flex h-[1.3em] w-full items-center justify-center overflow-hidden text-roar-maroon"
            aria-label={`Know what employers need ${PHRASES[0]}`}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute whitespace-nowrap px-4"
                aria-hidden="true"
              >
                {PHRASES[index]}.
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          RoarCast turns changing industry demand into a personal skill roadmap—showing what you
          already have, what you&rsquo;re missing, and what to build next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-roar-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roar-maroon focus-visible:ring-offset-2"
          >
            Take the 60-Second Micro-Audit
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </Link>
          <Link
            href="#skill-signals"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-7 py-3.5 text-sm font-semibold text-ink-soft backdrop-blur transition-colors hover:border-ink/20 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Explore Skill Signals
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-5 font-mono text-[11px] uppercase tracking-wide text-ink-faint"
        >
          Free • No résumé required • ~60 seconds
        </motion.p>
      </div>



      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block" aria-hidden="true">
        <ArrowDown size={18} className="animate-bounce text-ink-faint" />
      </div>
    </section>
  );
}
