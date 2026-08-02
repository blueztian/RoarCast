"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import AuditQuestion from "@/components/AuditQuestion";
import { mockAuditQuestions, type AuditAnswer } from "@/data/mockAuditQuestions";

const analyzingSteps = [
  "Reading responses",
  "Comparing with local demand",
  "Mapping Skill Tags",
  "Building your readiness profile",
];

export default function AuditPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AuditAnswer>>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (!analyzing) return;
    if (completedSteps >= analyzingSteps.length) {
      const t = setTimeout(() => router.push("/results"), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCompletedSteps((c) => c + 1), 750);
    return () => clearTimeout(t);
  }, [analyzing, completedSteps, router]);

  const question = mockAuditQuestions[index];
  const total = mockAuditQuestions.length;

  if (!question && !analyzing) {
    return null;
  }

  function handleSelect(answer: AuditAnswer) {
    if (!question) return;
    setAnswers((a) => ({ ...a, [question.id]: answer }));
    setTimeout(() => {
      setIndex((currentIndex) => {
        if (currentIndex < total - 1) {
          return currentIndex + 1;
        }
        return currentIndex;
      });
      if (index === total - 1) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "roarcast_audit_answers",
            JSON.stringify({ ...answers, [question.id]: answer })
          );
        }
        setAnalyzing(true);
      }
    }, 380);
  }

  if (analyzing) {
    return (
      <section className="flex min-h-[100svh] items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="mb-10 font-display text-2xl font-semibold text-ink">
            Analyzing your profile<span className="animate-pulse">...</span>
          </h1>
          <div className="flex flex-col gap-4 text-left">
            {analyzingSteps.map((step, i) => {
              const done = i < completedSteps;
              const active = i === completedSteps;
              return (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
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
                  <span className={`text-sm ${done || active ? "text-ink" : "text-ink-faint"}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 pb-16 pt-32">
      <div className="mb-12 flex items-center gap-2" aria-label="Micro-audit progress">
        {mockAuditQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= index ? "bg-roar-maroon" : "bg-paper-line"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {question && (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <AuditQuestion
              index={index}
            total={total}
            skillTag={question.skillTag}
            prompt={question.prompt}
            selected={answers[question.id]}
            onSelect={handleSelect}
          />
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
