"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, RotateCcw, ShieldAlert } from "lucide-react";
import { DEMO_STUDENT, CAREER_PATHS } from "@/features/demo-data";
import { demoRepository } from "@/lib/demoRepository";
import type { StudentProfile, ProfileDraft } from "@/lib/storageTypes";

interface FormState {
  [key: string]: string;
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
  { label: string; placeholder: string; type?: string; readOnlyExplanation?: string }
> = {
  name: { label: "What is your name?", placeholder: "Jana Cruz" },
  age: { label: "How old are you?", placeholder: "23", type: "number" },
  school: { label: "Where do you study?", placeholder: "Santa Rosa, Laguna" },
  program: { label: "What is your academic program?", placeholder: "Accounting Information Systems", readOnlyExplanation: "Pre-filled from your audit selection" },
  gradYear: { label: "Expected graduation year?", placeholder: "2026", type: "number" },
  careerInterest: { label: "What career path interests you most?", placeholder: "Accounting Operations", readOnlyExplanation: "Pre-filled from your audit selection" },
};

export default function SignupPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [direction, setDirection] = useState(1);
  const [isChecking, setIsChecking] = useState(true);
  const [isSampleMode, setIsSampleMode] = useState(false);
  const totalSteps = steps.length + 1; // + review step
  const isReview = stepIndex === steps.length;

  useEffect(() => {
    // 2.4 Route prerequisite check: redirect to /audit if snapshot is absent
    const snapshot = demoRepository.getReadinessSnapshot();
    const auditData = demoRepository.getAuditData();

    if (!snapshot || !auditData) {
      router.replace("/audit");
      return;
    }

    setIsSampleMode(demoRepository.isSampleMode());

    // 2.3 Check for existing Profile Draft
    const draft = demoRepository.getProfileDraft();
    if (draft && draft.formValues) {
      setForm({
        name: draft.formValues.name ?? "",
        age: draft.formValues.age ?? "",
        school: draft.formValues.school ?? "",
        program: draft.formValues.program ?? "",
        gradYear: draft.formValues.gradYear ?? "",
        careerInterest: draft.formValues.careerInterest ?? "",
      });
      setStepIndex(draft.currentStep ?? 0);
    } else {
      // 2.5 Prefill program & careerInterest from audit without duplication/conflict
      const matchedCareer = CAREER_PATHS.find((cp) => cp.id === auditData.careerPath)?.label || auditData.careerPath;
      setForm((prev) => ({
        ...prev,
        program: auditData.degree || "",
        careerInterest: matchedCareer || "",
      }));
    }

    setIsChecking(false);
  }, [router]);

  const saveDraft = (newIndex: number, updatedForm: FormState) => {
    const draft: ProfileDraft = {
      currentStep: newIndex,
      formValues: updatedForm,
      updatedAt: new Date().toISOString(),
    };
    demoRepository.saveProfileDraft(draft);
  };

  function update(field: keyof FormState, value: string) {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    saveDraft(stepIndex, nextForm);
  }

  function fillDemo() {
    const sampleForm = {
      name: DEMO_STUDENT.name,
      age: String(DEMO_STUDENT.age),
      school: DEMO_STUDENT.school,
      program: DEMO_STUDENT.program,
      gradYear: String(DEMO_STUDENT.gradYear),
      careerInterest: DEMO_STUDENT.careerInterest,
    };
    setForm(sampleForm);
    demoRepository.setSampleMode(true);
    setIsSampleMode(true);
    saveDraft(stepIndex, sampleForm);
  }

  function currentFieldsFilled() {
    if (isReview) return true;
    return steps[stepIndex].fields.every((f) => (form[f] || "").trim().length > 0);
  }

  function goNext() {
    if (!currentFieldsFilled()) return;
    const nextIdx = Math.min(stepIndex + 1, steps.length);
    setDirection(1);
    setStepIndex(nextIdx);
    saveDraft(nextIdx, form);
  }

  function goBack() {
    if (stepIndex === 0) {
      router.push("/audit");
      return;
    }
    const prevIdx = Math.max(stepIndex - 1, 0);
    setDirection(-1);
    setStepIndex(prevIdx);
    saveDraft(prevIdx, form);
  }

  function handleReset() {
    demoRepository.clearProfileDraft();
    const auditData = demoRepository.getAuditData();
    const matchedCareer = auditData ? CAREER_PATHS.find((cp) => cp.id === auditData.careerPath)?.label || auditData.careerPath : "";
    setForm({
      name: "",
      age: "",
      school: "",
      program: auditData?.degree || "",
      gradYear: "",
      careerInterest: matchedCareer || "",
    });
    setStepIndex(0);
  }

  function saveProfileAndViewResults() {
    const profile: StudentProfile = {
      name: form.name,
      age: form.age,
      school: form.school,
      program: form.program,
      gradYear: form.gradYear,
      careerInterest: form.careerInterest,
      location: form.school,
    };
    demoRepository.saveStudentProfile(profile);
    demoRepository.clearProfileDraft();
    router.push("/results");
  }

  if (isChecking) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#201d1d]">
        <div className="text-[#f5f3f0] text-sm font-mono animate-pulse flex items-center gap-2">
          <span>Checking audit prerequisites...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] justify-center bg-[#201d1d]">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#f5f3f0]">
        {/* Header navigation */}
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
            <span className="font-display text-[15px] font-bold text-[#201d1d]">Demo Profile Setup</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#7a7373]">
              Step {stepIndex + 1} of {totalSteps}
            </span>
          </div>
          {(stepIndex > 0 || Boolean(form.name)) ? (
            <button
              type="button"
              onClick={handleReset}
              title="Reset profile draft"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3f0] text-[#5e5a5a] transition-colors hover:bg-black/[0.07] hover:text-[#6b0000]"
            >
              <RotateCcw size={16} />
            </button>
          ) : (
            <div className="h-9 w-9" />
          )}
        </div>

        {isSampleMode && (
          <div className="bg-[#b45309]/10 px-5 py-2 flex items-center justify-center gap-2 border-b border-[#b45309]/20">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-[#b45309]">
              Sample persona mode
            </span>
          </div>
        )}

        {/* Progress indicators */}
        <div className="px-6 pt-6 pb-2 flex items-center gap-2" aria-label="Onboarding progress">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= stepIndex ? "bg-[#6b0000]" : "bg-[#e8e4dc]"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-4 pb-12">
          <AnimatePresence mode="wait" custom={direction}>
            {!isReview ? (
              <motion.div
                key={stepIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <h1 className="mb-2 font-display text-[22px] font-bold text-[#201d1d]">
                  Create your RoarCast profile
                </h1>
                <p className="mb-6 text-[13.5px] leading-relaxed text-[#7a7373]">
                  Save your readiness snapshot to view your diagnostics and match with local employer signals.
                </p>

                <div className="flex flex-col gap-5">
                  {steps[stepIndex].fields.map((field) => (
                    <label key={field} className="block">
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="block text-[12px] font-bold uppercase tracking-wider text-[#5e5a5a]">
                          {fieldMeta[field].label}
                        </span>
                        {fieldMeta[field].readOnlyExplanation && (
                          <span className="text-[11px] text-[#6b0000] font-mono">
                            {fieldMeta[field].readOnlyExplanation}
                          </span>
                        )}
                      </div>
                      <input
                        type={fieldMeta[field].type ?? "text"}
                        value={form[field]}
                        onChange={(e) => update(field, e.target.value)}
                        placeholder={fieldMeta[field].placeholder}
                        className="w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3.5 text-[15px] text-[#201d1d] placeholder:text-[#c0bab5] outline-none transition-colors focus:border-[#6b0000] focus:ring-1 focus:ring-[#6b0000]"
                      />
                    </label>
                  ))}
                </div>

                {stepIndex === 0 && (
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="mt-6 inline-flex items-center gap-1.5 self-start rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-3.5 py-2 text-[12.5px] font-bold text-[#b45309] transition-colors hover:bg-[#f59e0b]/20"
                  >
                    <Sparkles size={14} strokeWidth={2.5} />
                    Use sample profile (Jana Cruz)
                  </button>
                )}

                <div className="mt-10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-full border border-black/10 px-5 py-3 text-[14px] font-bold text-[#5e5a5a] transition-colors hover:bg-black/[0.03]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!currentFieldsFilled()}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] py-3.5 text-[15px] font-bold text-white shadow-[0_4px_18px_rgba(107,0,0,0.3)] transition-opacity disabled:opacity-40"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="mb-6 flex flex-col items-center gap-2.5 rounded-[20px] bg-gradient-to-b from-amber-50/80 to-white px-5 py-5 text-center border border-amber-200/60 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100/80 text-amber-700 mb-1">
                    <CheckCircle2 size={26} strokeWidth={2.5} />
                  </div>
                  <h2 className="font-display text-[18px] font-bold text-[#201d1d]">
                    Ready to View Your Results!
                  </h2>
                  <p className="text-[13px] text-[#7a7373] leading-relaxed">
                    We have prepared your demonstration workforce diagnosis and skills gap summary.
                  </p>
                </div>

                <h3 className="mb-3 font-display text-[16px] font-bold text-[#201d1d]">
                  Your Demo Snapshot Summary
                </h3>

                <div className="mb-8 flex flex-col divide-y divide-black/[0.05] rounded-2xl border border-black/[0.07] bg-white shadow-xs">
                  {(Object.keys(fieldMeta) as (keyof FormState)[]).map((field) => (
                    <div key={field} className="flex items-center justify-between px-4 py-3.5">
                      <span className="text-[13px] text-[#7a7373]">{fieldMeta[field].label}</span>
                      <span className="text-[13.5px] font-bold text-[#201d1d]">{form[field] || "—"}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-full border border-black/10 px-5 py-3.5 text-[14px] font-bold text-[#5e5a5a]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={saveProfileAndViewResults}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] py-4 text-[15px] font-bold text-white shadow-[0_4px_22px_rgba(107,0,0,0.35)] transition-transform active:scale-[0.98]"
                  >
                    Save Profile &amp; View Results
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
