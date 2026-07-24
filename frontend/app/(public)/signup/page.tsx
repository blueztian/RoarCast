"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { mockStudent } from "@/data/mockStudent";

interface FormState {
  name: string;
  age: string;
  school: string;
  program: string;
  gradYear: string;
  careerInterest: string;
}

const emptyForm: FormState = {
  name: "",
  age: "",
  school: "",
  program: "",
  gradYear: "",
  careerInterest: "",
};

const steps: { key: keyof FormState; fields: (keyof FormState)[] }[] = [
  { key: "name", fields: ["name", "age"] },
  { key: "school", fields: ["school", "program"] },
  { key: "gradYear", fields: ["gradYear", "careerInterest"] },
];

const fieldMeta: Record<
  keyof FormState,
  { label: string; placeholder: string; type?: string }
> = {
  name: { label: "What's your name?", placeholder: "Jana Cruz" },
  age: { label: "How old are you?", placeholder: "23", type: "number" },
  school: { label: "Where do you study?", placeholder: "Santa Rosa, Laguna" },
  program: { label: "What's your program or strand?", placeholder: "Accounting Information System" },
  gradYear: { label: "Expected graduation year?", placeholder: "2026", type: "number" },
  careerInterest: { label: "What career path interests you most?", placeholder: "Accounting Operations" },
};

export default function SignupPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [direction, setDirection] = useState(1);
  const totalSteps = steps.length + 1; // + review step
  const isReview = stepIndex === steps.length;

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function fillDemo() {
    setForm({
      name: mockStudent.name,
      age: String(mockStudent.age),
      school: mockStudent.school,
      program: mockStudent.program,
      gradYear: String(mockStudent.gradYear),
      careerInterest: mockStudent.careerInterest,
    });
  }

  function currentFieldsFilled() {
    if (isReview) return true;
    return steps[stepIndex].fields.every((f) => form[f].trim().length > 0);
  }

  function goNext() {
    if (!currentFieldsFilled()) return;
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, steps.length));
  }

  function goBack() {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function startAudit() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("roarcast_student", JSON.stringify(form));
    }
    router.push("/audit");
  }

  return (
    <section className="mx-auto flex min-h-[100svh] max-w-xl flex-col justify-center px-6 pb-16 pt-32">
      {/* progress */}
      <div className="mb-12 flex items-center gap-2" aria-label="Onboarding progress">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= stepIndex ? "bg-roar-maroon" : "bg-paper-line"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {!isReview ? (
          <motion.div
            key={stepIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-2 font-mono text-xs uppercase tracking-wide text-ink-faint">
              Step {stepIndex + 1} of {totalSteps}
            </p>
            <h1 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Let&rsquo;s set up your profile.
            </h1>

            <div className="flex flex-col gap-6">
              {steps[stepIndex].fields.map((field) => (
                <label key={field} className="block">
                  <span className="mb-2 block text-sm font-medium text-ink-soft">
                    {fieldMeta[field].label}
                  </span>
                  <input
                    type={fieldMeta[field].type ?? "text"}
                    value={form[field]}
                    onChange={(e) => update(field, e.target.value)}
                    placeholder={fieldMeta[field].placeholder}
                    className="w-full rounded-2xl border border-paper-line bg-white px-5 py-3.5 text-[15px] text-ink outline-none transition-colors focus:border-roar-maroon"
                  />
                </label>
              ))}
            </div>

            {stepIndex === 0 && (
              <button
                type="button"
                onClick={fillDemo}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-roar-amber hover:text-roar-maroon"
              >
                <Sparkles size={13} strokeWidth={2.5} />
                Use a sample profile (Jana Cruz)
              </button>
            )}

            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-soft disabled:opacity-0"
              >
                <ArrowLeft size={15} />
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!currentFieldsFilled()}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-roar-maroon disabled:cursor-not-allowed disabled:bg-ink/20"
              >
                Continue
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-2 font-mono text-xs uppercase tracking-wide text-ink-faint">
              Step {totalSteps} of {totalSteps}
            </p>
            <h1 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Here&rsquo;s what we&rsquo;ll use.
            </h1>

            <div className="mb-10 flex flex-col divide-y divide-paper-line rounded-2xl border border-paper-line bg-white">
              {(Object.keys(fieldMeta) as (keyof FormState)[]).map((field) => (
                <div key={field} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-ink-faint">{fieldMeta[field].label}</span>
                  <span className="text-sm font-medium text-ink">{form[field] || "—"}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-soft"
              >
                <ArrowLeft size={15} />
                Back
              </button>
              <button
                type="button"
                onClick={startAudit}
                className="inline-flex items-center gap-2 rounded-full bg-roar-maroon px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Start My Micro-Audit
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
