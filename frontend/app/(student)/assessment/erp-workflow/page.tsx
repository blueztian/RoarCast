"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import SignalBackground from "@/components/SignalBackground";
import {
  areAllModulesComplete,
  saveAssessmentResult,
  getAssessmentResult,
  getStudent,
} from "@/lib/studentState";
import { staggerContainer, staggerItem, successReveal } from "@/lib/motion";

// ── 5 assessment questions ────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: "a1",
    question:
      "A new purchase order is submitted in your company's ERP. Which sequence correctly describes the next steps?",
    options: [
      "Post to GL → Manager approves → Vendor pays",
      "Manager approves → Verify against budget → Post to GL → Notify vendor",
      "Email vendor → Print PO → File in cabinet",
      "Auto-post immediately → Skip approval for amounts under ₱50,000",
    ],
    correct: 1,
    skill: "ERP Workflow",
  },
  {
    id: "a2",
    question:
      "At month-end reconciliation, your AP balance shows ₱620,000 but the supplier statement shows ₱638,000. What is the most likely cause?",
    options: [
      "The supplier miscounted",
      "The ERP system has a calculation bug",
      "An invoice was received but not yet entered in the ERP",
      "A payment was made but not recorded by the bank",
    ],
    correct: 2,
    skill: "Reconciliation",
  },
  {
    id: "a3",
    question:
      "Which of the following best describes the purpose of a General Ledger in an ERP?",
    options: [
      "A backup copy of all emails sent by the finance team",
      "A centralized record of all financial transactions categorized by account",
      "A tool used exclusively by the CFO to approve payments",
      "A database of employee salaries and deductions",
    ],
    correct: 1,
    skill: "ERP Foundations",
  },
  {
    id: "a4",
    question:
      "You are generating an Income Statement report for the board meeting tomorrow. The numbers seem off. What should you check first?",
    options: [
      "Reboot the ERP server",
      "Request a new login from IT",
      "Verify that all transactions for the period have been posted and correctly coded",
      "Re-export the report in a different file format",
    ],
    correct: 2,
    skill: "Reporting",
  },
  {
    id: "a5",
    question:
      "An employee submits a reimbursement for ₱4,200 for client entertainment. In a properly configured ERP workflow, what happens next?",
    options: [
      "The amount is automatically added to payroll",
      "The finance team manually enters it into a spreadsheet",
      "The system routes it to the approver, validates the GL code and cost center, then queues for posting",
      "Nothing — reimbursements below ₱10,000 are processed at year-end",
    ],
    correct: 2,
    skill: "Accounting Workflow",
  },
];

// ── Scoring ───────────────────────────────────────────────────────────────────

function computeScore(answers: (number | null)[]): number {
  let correct = 0;
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (answers[i] === QUESTIONS[i].correct) correct++;
  }
  return Math.round((correct / QUESTIONS.length) * 100);
}

const PASS_THRESHOLD = 60;

// ── Analysis steps ────────────────────────────────────────────────────────────

const ANALYSIS_STEPS = [
  "Reading your responses",
  "Mapping answers to Skill Tags",
  "Comparing against ERP Workflow benchmark",
  "Generating your result",
];

// ── Page ──────────────────────────────────────────────────────────────────────

type Phase = "blocked" | "questions" | "analyzing" | "result";

export default function AssessmentPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("questions");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );
  const [analysisStep, setAnalysisStep] = useState(0);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const studentName = getStudent().name;

  // Check if learning is complete
  useEffect(() => {
    const existing = getAssessmentResult();
    if (existing) {
      setScore(existing.score);
      setPassed(existing.passed);
      setPhase("result");
      return;
    }
    if (!areAllModulesComplete()) {
      setPhase("blocked");
    }
  }, []);

  // Analysis animation
  useEffect(() => {
    if (phase !== "analyzing") return;
    if (analysisStep >= ANALYSIS_STEPS.length) {
      // Compute and persist result
      const finalScore = computeScore(answers);
      const hasPassed = finalScore >= PASS_THRESHOLD;
      setScore(finalScore);
      setPassed(hasPassed);
      saveAssessmentResult({
        score: finalScore,
        passed: hasPassed,
        completedAt: new Date().toISOString(),
        answers: answers.map((a) => a ?? -1),
      });
      setTimeout(() => setPhase("result"), 800);
      return;
    }
    const t = setTimeout(() => setAnalysisStep((s) => s + 1), 750);
    return () => clearTimeout(t);
  }, [phase, analysisStep, answers]);

  const question = QUESTIONS[currentQ];
  const selectedAnswer = answers[currentQ];

  function selectAnswer(i: number) {
    if (selectedAnswer !== null) return; // don't allow re-select
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = i;
      return next;
    });
  }

  function goNext() {
    if (selectedAnswer === null) return;
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setPhase("analyzing");
    }
  }

  function goBack() {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  }

  // ── Blocked ────────────────────────────────────────────────────────────────
  if (phase === "blocked") {
    return (
      <>
        <SignalBackground />
        <section className="flex min-h-[100svh] items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm text-center"
          >
            <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-paper-dim text-ink-faint">
              <AlertCircle size={28} strokeWidth={1.5} />
            </span>
            <h1 className="mb-3 font-display text-2xl font-semibold text-ink">
              Complete All Modules First
            </h1>
            <p className="mb-8 text-[15px] leading-relaxed text-ink-soft">
              Finish all 4 learning modules before taking the final skill check.
              You have to build the knowledge before you validate it.
            </p>
            <Link
              href="/learn/erp-foundations"
              className="inline-flex items-center gap-2 rounded-full bg-roar-maroon px-7 py-3.5 text-sm font-semibold text-white"
            >
              Return to Learning
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  // ── Analyzing ──────────────────────────────────────────────────────────────
  if (phase === "analyzing") {
    return (
      <>
        <SignalBackground />
        <section className="flex min-h-[100svh] items-center justify-center px-6">
          <div className="w-full max-w-sm text-center">
            <h1 className="mb-10 font-display text-2xl font-semibold text-ink">
              Analyzing your responses
              <span className="animate-pulse">…</span>
            </h1>
            <div className="flex flex-col gap-4 text-left">
              {ANALYSIS_STEPS.map((step, i) => {
                const done = i < analysisStep;
                const active = i === analysisStep;
                return (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        done
                          ? "border-roar-maroon bg-roar-maroon text-white"
                          : active
                            ? "border-roar-amber text-roar-amber"
                            : "border-paper-line"
                      }`}
                    >
                      {done ? (
                        <Check size={13} strokeWidth={3} />
                      ) : active ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : null}
                    </span>
                    <span
                      className={`text-sm ${done || active ? "text-ink" : "text-ink-faint"}`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  if (phase === "result") {
    return (
      <>
        <SignalBackground />
        <section className="mx-auto flex min-h-[100svh] max-w-xl flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {passed ? (
              <>
                <motion.div variants={successReveal} className="mb-8">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 22,
                      delay: 0.1,
                    }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-roar-maroon text-roar-yellow shadow-glow"
                  >
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </motion.span>
                  <p className="mb-2 font-mono text-sm uppercase tracking-widest text-roar-maroon">
                    Skill Verified
                  </p>
                  <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                    ERP Workflow Fundamentals
                  </h1>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="mb-8 overflow-hidden rounded-3xl border border-roar-maroon/15 bg-gradient-to-br from-white to-[#FBF2EF] p-8 shadow-card"
                >
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    Your Score
                  </p>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-display text-5xl font-semibold text-roar-maroon"
                  >
                    {score}%
                  </motion.p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper-dim">
                    <motion.div
                      className="h-full rounded-full bg-roar-maroon"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{
                        delay: 0.4,
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-ink-soft">
                    Issued to {studentName} · RoarCast Prototype Credential
                  </p>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Link
                    href="/credentials/erp-workflow"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-roar-maroon px-7 py-4 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
                  >
                    View My Credential
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </Link>
                </motion.div>
              </>
            ) : (
              /* Retry state */
              <>
                <motion.div variants={staggerItem} className="mb-8">
                  <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-paper-dim text-ink-faint">
                    <AlertCircle size={40} strokeWidth={1.5} />
                  </span>
                  <p className="mb-2 font-mono text-sm uppercase tracking-wide text-roar-amber">
                    Keep Going
                  </p>
                  <h1 className="font-display text-3xl font-semibold text-ink">
                    Not quite there yet
                  </h1>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="mb-8 rounded-3xl border border-paper-line bg-white p-8 shadow-card"
                >
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    Your Score
                  </p>
                  <p className="font-display text-5xl font-semibold text-ink">
                    {score}%
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    You need {PASS_THRESHOLD}% to earn the credential.
                    You&apos;re close — reviewing the modules will get you
                    there.
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerItem}
                  className="flex flex-col gap-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers(Array(QUESTIONS.length).fill(null));
                      setCurrentQ(0);
                      setAnalysisStep(0);
                      setPhase("questions");
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-roar-maroon px-7 py-4 text-sm font-semibold text-white"
                  >
                    Try Again
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                  <Link
                    href="/learn/erp-foundations"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-4 text-sm font-semibold text-ink-soft hover:text-ink"
                  >
                    Review Modules
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </section>
      </>
    );
  }

  // ── Questions ──────────────────────────────────────────────────────────────
  return (
    <>
      <SignalBackground />
      <section className="mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 pb-16 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-roar-maroon">
            Final Skill Check · ERP Workflow
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Let&apos;s validate what you&apos;ve learned.
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {QUESTIONS.length} questions · Take your time · No guessing penalty
          </p>
        </motion.div>

        {/* Progress bar */}
        <div
          className="mb-8 flex items-center gap-2"
          aria-label="Assessment progress"
        >
          {QUESTIONS.map((_, i) => {
            const answered = answers[i] !== null;
            return (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i < currentQ
                    ? "bg-roar-maroon"
                    : i === currentQ
                      ? "bg-roar-amber"
                      : answered
                        ? "bg-roar-maroon"
                        : "bg-paper-line"
                }`}
              />
            );
          })}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Question {currentQ + 1} of {QUESTIONS.length} · {question.skill}
            </p>
            <h2 className="mb-6 font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
              {question.question}
            </h2>

            <div className="flex flex-col gap-3">
              {question.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAnswer(i)}
                    aria-pressed={isSelected}
                    className={`rounded-2xl border px-5 py-4 text-left text-[15px] transition-colors ${
                      isSelected
                        ? "border-roar-maroon bg-roar-maroon/[0.06] font-medium text-roar-maroon"
                        : "border-paper-line bg-white text-ink-soft hover:border-ink/20 hover:text-ink"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium transition-colors ${
                          isSelected
                            ? "border-roar-maroon bg-roar-maroon text-white"
                            : "border-paper-line bg-paper-dim text-ink-faint"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentQ === 0}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-soft disabled:opacity-0"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={selectedAnswer === null}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-roar-maroon disabled:cursor-not-allowed disabled:bg-ink/20"
          >
            {currentQ === QUESTIONS.length - 1 ? "Submit" : "Next"}
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </>
  );
}
