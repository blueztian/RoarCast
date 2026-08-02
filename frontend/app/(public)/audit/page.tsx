"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { EDUCATION_LEVELS, DEGREE_PROGRAMS, CAREER_PATHS } from "@/features/demo-data";
import { getContextAwareQuestions } from "@/features/onboarding";
import { calculateDemoReadiness } from "@/features/readiness";
import { demoRepository } from "@/lib/demoRepository";
import type { AuditData } from "@/lib/storageTypes";
import { cn } from "@/lib/utils";

const RATING_LABELS = [
  "Not familiar",
  "Limited confidence",
  "Somewhat confident",
  "Confident",
  "Highly confident",
];

export default function CanonicalAuditPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<AuditData>({
    educationLevel: "college",
    degree: "Accounting Information Systems",
    careerPath: "accounting-ops",
    skillAnswers: {
      industryTools: 3,
      dataSkills: 3,
      teamwork: 4,
      communication: 4,
      digitalComfort: "somewhat",
      hasInternship: false,
      hasCertification: false,
    },
  });

  const questions = useMemo(
    () => (data.degree && data.careerPath ? getContextAwareQuestions(data.degree, data.careerPath) : []),
    [data.degree, data.careerPath]
  );

  // Total steps: 0 (Education), 1 (Degree), 2 (Career Path) + number of context-aware questions
  const totalSteps = 3 + questions.length;
  const currentQuestion = step >= 3 ? questions[step - 3] : null;

  const updateField = (field: keyof Omit<AuditData, "skillAnswers">, val: string) => {
    setData((d) => ({ ...d, [field]: val }));
  };

  const updateAnswer = (key: string, val: number | string | boolean) => {
    setData((d) => ({ ...d, skillAnswers: { ...d.skillAnswers, [key]: val } }));
  };

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      // Final audit step completed: compute readiness and transition to profile creation
      const snapshot = calculateDemoReadiness(data, questions);
      demoRepository.saveAuditData(data);
      demoRepository.saveReadinessSnapshot(snapshot);
      router.push("/signup");
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-[100dvh] justify-center bg-[#201d1d]">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#f5f3f0]">
        {/* Header navigation and progress */}
        <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] bg-white px-5 py-4 shadow-sm">
          <button
            type="button"
            onClick={goBack}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3f0] text-[#5e5a5a] transition-colors hover:bg-black/[0.07]"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-display text-[15px] font-bold text-[#201d1d]">60-Second Micro-Audit</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#7a7373]">
              Step {step + 1} of {totalSteps}
            </span>
          </div>
          <div className="h-9 w-9" /> {/* spacer */}
        </div>

        {/* Visual Progress Bar */}
        <div className="h-1.5 w-full bg-[#e8e4dc]">
          <div
            className="h-full bg-gradient-to-r from-[#6b0000] to-[#f59e0b] transition-all duration-300 ease-out"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Body Content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-6 pb-28">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
            >
              {step === 0 && (
                <div>
                  <h1 className="mb-2 font-display text-[22px] font-bold leading-tight text-[#201d1d]">
                    What is your current education level?
                  </h1>
                  <p className="mb-6 text-[13.5px] text-[#7a7373]">
                    We tailor your readiness snapshot based on your academic stage.
                  </p>
                  <div className="flex flex-col gap-3">
                    {EDUCATION_LEVELS.map((level) => {
                      const selected = data.educationLevel === level.id;
                      return (
                        <button
                          key={level.id}
                          type="button"
                          onClick={() => {
                            updateField("educationLevel", level.id);
                            goNext();
                          }}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border p-4 text-left font-medium transition-all",
                            selected
                              ? "border-[#6b0000] bg-[#6b0000]/[0.04] text-[#6b0000] shadow-sm ring-1 ring-[#6b0000]"
                              : "border-black/[0.08] bg-white text-[#201d1d] hover:border-black/[0.15]"
                          )}
                        >
                          <span className="text-[15px] font-semibold">{level.label}</span>
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border",
                              selected ? "border-[#6b0000] bg-[#6b0000] text-white" : "border-black/20 bg-transparent"
                            )}
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h1 className="mb-2 font-display text-[22px] font-bold leading-tight text-[#201d1d]">
                    What degree program are you pursuing?
                  </h1>
                  <p className="mb-6 text-[13.5px] text-[#7a7373]">
                    Select your academic program to unlock relevant industry skills.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {DEGREE_PROGRAMS.map((deg) => {
                      const selected = data.degree === deg;
                      return (
                        <button
                          key={deg}
                          type="button"
                          onClick={() => {
                            updateField("degree", deg);
                            goNext();
                          }}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all",
                            selected
                              ? "border-[#6b0000] bg-[#6b0000]/[0.04] text-[#6b0000] font-bold shadow-sm ring-1 ring-[#6b0000]"
                              : "border-black/[0.08] bg-white text-[#201d1d] font-medium hover:border-black/[0.15]"
                          )}
                        >
                          <span className="text-[14.5px]">{deg}</span>
                          {selected && <Check size={16} className="text-[#6b0000]" strokeWidth={2.5} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h1 className="mb-2 font-display text-[22px] font-bold leading-tight text-[#201d1d]">
                    Which target career path excites you most?
                  </h1>
                  <p className="mb-6 text-[13.5px] text-[#7a7373]">
                    We match your answers with real employer demand signals.
                  </p>
                  <div className="flex flex-col gap-3">
                    {CAREER_PATHS.map((cp) => {
                      const selected = data.careerPath === cp.id;
                      return (
                        <button
                          key={cp.id}
                          type="button"
                          onClick={() => {
                            updateField("careerPath", cp.id);
                            goNext();
                          }}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border p-4 text-left transition-all",
                            selected
                              ? "border-[#6b0000] bg-[#6b0000]/[0.04] text-[#6b0000] font-bold shadow-sm ring-1 ring-[#6b0000]"
                              : "border-black/[0.08] bg-white text-[#201d1d] font-medium hover:border-black/[0.15]"
                          )}
                        >
                          <span className="text-[15px]">{cp.label}</span>
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border",
                              selected ? "border-[#6b0000] bg-[#6b0000] text-white" : "border-black/20 bg-transparent"
                            )}
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step >= 3 && currentQuestion && (
                <div>
                  <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#6b0000]/10 px-3 py-1 text-[11.5px] font-bold uppercase tracking-widest text-[#6b0000]">
                    <Sparkles size={12} /> {currentQuestion.category} competency
                  </span>
                  <h1 className="mt-1 font-display text-[22px] font-bold leading-tight text-[#201d1d]">
                    {currentQuestion.text}
                  </h1>
                  {currentQuestion.subtitle && (
                    <p className="mt-1 text-[13.5px] text-[#7a7373]">{currentQuestion.subtitle}</p>
                  )}

                  <div className="mt-8 flex flex-col gap-3">
                    {currentQuestion.type === "rating" && (
                      <div className="flex flex-col gap-2.5">
                        {[1, 2, 3, 4, 5].map((num, i) => {
                          const val = data.skillAnswers[currentQuestion.key];
                          const selected = val === num;
                          return (
                            <button
                              key={num}
                              type="button"
                              onClick={() => {
                                updateAnswer(currentQuestion.key, num);
                                setTimeout(goNext, 250);
                              }}
                              className={cn(
                                "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                                selected
                                  ? "border-[#6b0000] bg-[#6b0000]/[0.05] text-[#6b0000] font-bold shadow-sm ring-1 ring-[#6b0000]"
                                  : "border-black/[0.08] bg-white text-[#201d1d] font-medium hover:border-black/[0.15]"
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold",
                                  selected ? "bg-[#6b0000] text-white" : "bg-[#f5f3f0] text-[#7a7373]"
                                )}
                              >
                                {num}
                              </span>
                              <span className="text-[15px]">{RATING_LABELS[i]}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {currentQuestion.type === "choice" &&
                      currentQuestion.choices &&
                      currentQuestion.choices.map((c) => {
                        const val = data.skillAnswers[currentQuestion.key];
                        const selected = val === c.value;
                        return (
                          <button
                            key={c.value}
                            type="button"
                            onClick={() => {
                                updateAnswer(currentQuestion.key, c.value);
                                setTimeout(goNext, 250);
                            }}
                            className={cn(
                              "flex items-center justify-between rounded-2xl border p-4 text-left transition-all",
                              selected
                                ? "border-[#6b0000] bg-[#6b0000]/[0.05] text-[#6b0000] font-bold shadow-sm ring-1 ring-[#6b0000]"
                                : "border-black/[0.08] bg-white text-[#201d1d] font-medium hover:border-black/[0.15]"
                            )}
                          >
                            <span className="text-[15px]">{c.label}</span>
                            {selected && <Check size={18} className="text-[#6b0000]" strokeWidth={2.5} />}
                          </button>
                        );
                      })}

                    {currentQuestion.type === "yesno" && (
                      <div className="flex gap-4 mt-2">
                        {[
                          { label: "Yes", val: true },
                          { label: "No", val: false },
                        ].map(({ label, val }) => {
                          const curr = data.skillAnswers[currentQuestion.key];
                          const selected = curr === val;
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => {
                                updateAnswer(currentQuestion.key, val);
                                setTimeout(goNext, 250);
                              }}
                              className={cn(
                                "flex-1 rounded-2xl border py-5 text-center text-[16px] font-bold transition-all shadow-sm",
                                selected
                                  ? "border-[#6b0000] bg-[#6b0000] text-white shadow-[0_4px_16px_rgba(107,0,0,0.25)] scale-[1.02]"
                                  : "border-black/[0.08] bg-white text-[#201d1d] hover:border-black/[0.15]"
                              )}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA Actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-black/[0.06] bg-white/95 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-black/10 px-5 py-3.5 text-[14.5px] font-bold text-[#5e5a5a] transition-colors hover:bg-black/[0.03]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] py-3.5 text-[15px] font-bold text-white shadow-[0_4px_18px_rgba(107,0,0,0.3)] transition-all hover:opacity-95 active:scale-[0.98]"
            >
              {step === totalSteps - 1 ? "Complete Audit" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
