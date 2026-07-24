"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Users } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import { joinSquad, getSquad } from "@/lib/studentState";
import { staggerContainer, staggerItem, successReveal } from "@/lib/motion";

const matchingSteps = [
  { label: "Matching your Skill Tag", detail: "ERP Workflow" },
  { label: "Finding learners with the same goal", detail: "Accounting Operations" },
  { label: "Building your pathway", detail: "4-week plan" },
];

const SQUAD_ID = "erp-fundamentals";

export default function SquadMatchPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = matching, matchingSteps.length = reveal
  const [joining, setJoining] = useState(false);
  const [done, setDone] = useState(false);

  // If already joined, skip straight to squad page
  useEffect(() => {
    if (getSquad()?.squadId === SQUAD_ID) {
      router.replace("/squads/erp-fundamentals");
    }
  }, [router]);

  // Animate through matching steps
  useEffect(() => {
    if (step >= matchingSteps.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [step]);

  const isRevealed = step >= matchingSteps.length;

  function handleJoin() {
    setJoining(true);
    joinSquad(SQUAD_ID);
    setTimeout(() => {
      setDone(true);
      setTimeout(() => router.push("/squads/erp-fundamentals"), 700);
    }, 800);
  }

  function handleIndependent() {
    router.push("/learn/erp-foundations");
  }

  return (
    <>
      <SignalBackground />
      <section className="mx-auto flex min-h-[100svh] max-w-xl flex-col items-center justify-center px-6 pb-16 pt-32">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* ── Matching animation ─────────────────────────────────────────── */
            <motion.div
              key="matching"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-center"
            >
              <div className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full bg-roar-maroon/[0.08]">
                <Users size={28} className="text-roar-maroon" strokeWidth={1.5} />
              </div>
              <h1 className="mb-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Finding your squad
                <span className="animate-pulse">…</span>
              </h1>
              <p className="mb-12 text-sm text-ink-soft">
                RoarCast is looking for learners working toward the same goal.
              </p>

              <div className="flex flex-col gap-4 text-left">
                {matchingSteps.map((s, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.15 }}
                      className="flex items-center gap-3"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          done
                            ? "border-roar-maroon bg-roar-maroon text-white"
                            : active
                            ? "border-roar-amber text-roar-amber"
                            : "border-paper-line text-transparent"
                        }`}
                      >
                        {done ? (
                          <Check size={13} strokeWidth={3} />
                        ) : active ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : null}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            done || active ? "text-ink" : "text-ink-faint"
                          }`}
                        >
                          {s.label}
                        </p>
                        {(done || active) && (
                          <p className="font-mono text-[11px] text-roar-amber">{s.detail}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ── Squad reveal ───────────────────────────────────────────────── */
            <motion.div
              key="reveal"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <motion.div variants={staggerItem} className="mb-2 text-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-roar-maroon">
                  Match Found
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="mb-8 text-center font-display text-2xl font-semibold text-ink sm:text-3xl"
              >
                ERP Fundamentals Squad
              </motion.h1>

              {/* Squad card */}
              <motion.div
                variants={successReveal}
                className="mb-8 overflow-hidden rounded-3xl border border-paper-line bg-white shadow-card"
              >
                {/* Header */}
                <div className="border-b border-paper-line bg-gradient-to-r from-roar-maroon/[0.04] to-transparent p-7">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-roar-maroon text-white">
                      <Users size={22} strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold text-ink">
                        ERP Fundamentals Squad
                      </p>
                      <p className="text-sm text-ink-faint">
                        Accounting Operations · Santa Rosa
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-paper-line p-6">
                  {[
                    { value: "8", label: "learners" },
                    { value: "4-week", label: "pathway" },
                    { value: "38%", label: "avg progress" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-1 px-4">
                      <span className="font-display text-2xl font-semibold text-ink">
                        {stat.value}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pathway */}
                <div className="border-t border-paper-line px-7 py-5">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    Pathway
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "ERP Foundations",
                      "Accounting Workflow",
                      "Transactions & Reconciliation",
                      "Reporting",
                      "Skill Check",
                    ].map((module, i) => (
                      <div key={module} className="flex items-center gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper-dim font-mono text-[10px] text-ink-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-ink-soft">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={staggerItem} className="flex flex-col gap-3">
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div
                      key="joined"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 rounded-full bg-roar-maroon py-3.5 text-sm font-semibold text-white"
                    >
                      <Check size={16} strokeWidth={2.5} />
                      Joined! Redirecting…
                    </motion.div>
                  ) : joining ? (
                    <motion.div
                      key="joining"
                      className="flex items-center justify-center gap-2 rounded-full bg-roar-maroon py-3.5 text-sm font-semibold text-white"
                    >
                      <Loader2 size={16} className="animate-spin" />
                      Joining squad…
                    </motion.div>
                  ) : (
                    <motion.button
                      key="join-btn"
                      type="button"
                      onClick={handleJoin}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-roar-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
                    >
                      Join This Squad
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </motion.button>
                  )}
                </AnimatePresence>

                {!joining && !done && (
                  <button
                    type="button"
                    onClick={handleIndependent}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-3.5 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
                  >
                    Continue Independently
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
