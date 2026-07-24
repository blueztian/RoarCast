"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  PlayCircle,
  ChevronRight,
} from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import {
  getModuleStatus,
  setModuleStatus,
  getLessonProgress,
  areAllModulesComplete,
  getOverallLearningProgress,
  MODULE_IDS,
} from "@/lib/studentState";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";

// ── Module data ───────────────────────────────────────────────────────────────

export interface Module {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  content: {
    explanation: string;
    example: string;
    keyTakeaway: string;
    quickChecks: { question: string; options: string[]; correct: number }[];
  };
}

export const MODULES: Module[] = [
  {
    id: "erp-foundations",
    index: 0,
    title: "ERP Foundations",
    subtitle: "What ERP systems are and why they matter",
    estimatedMinutes: 8,
    content: {
      explanation:
        "Enterprise Resource Planning (ERP) systems are integrated software platforms that manage core business processes—accounting, procurement, inventory, HR—from a single unified system. Instead of siloed spreadsheets, every department reads from and writes to one shared source of truth.",
      example:
        "Picture a sales order arriving at Laguna Technopark. The moment it's confirmed in the ERP, inventory is reserved, the AP/AR ledger is queued, and the warehouse gets a pick list—all without anyone sending a single email. That's ERP: one transaction ripples cleanly across every function.",
      keyTakeaway:
        "ERP systems eliminate re-entry errors by linking all departments through shared data. Your job as an accounting associate is to be the reliable link between the business event and the ledger record.",
      quickChecks: [
        {
          question: "What does ERP stand for?",
          options: [
            "Enterprise Resource Planning",
            "Electronic Record Processing",
            "Enhanced Reporting Protocol",
            "Enterprise Reconciliation Platform",
          ],
          correct: 0,
        },
        {
          question:
            "Which of the following is the main benefit of an ERP system?",
          options: [
            "Faster internet speeds",
            "A single shared source of truth across departments",
            "Eliminating the need for accountants",
            "Automatic tax filing",
          ],
          correct: 1,
        },
        {
          question:
            "When a sales order is confirmed in an ERP, what typically happens automatically?",
          options: [
            "Nothing—approvals are always manual",
            "Only the invoice is generated",
            "Inventory, ledger, and warehouse tasks are all updated",
            "Only email notifications are sent",
          ],
          correct: 2,
        },
      ],
    },
  },
  {
    id: "accounting-workflow",
    index: 1,
    title: "Accounting Workflow",
    subtitle: "How transactions flow through the system",
    estimatedMinutes: 10,
    content: {
      explanation:
        "In an ERP, accounting workflow defines the path a financial transaction takes from business event to ledger entry. This includes initiating a document (invoice, PO, receipt), routing it for approval, posting it to the correct GL account, and reconciling it at month-end.",
      example:
        "An employee submits a reimbursement claim. The ERP routes it to their manager for approval, then to Finance for GL coding and posting. The system matches the claim against the employee record and the cost center budget—then closes the expense with a single journal entry. No printed forms, no email chains.",
      keyTakeaway:
        "Every business event should end in a clean GL posting. Accounting workflow is the process discipline that makes that happen consistently—your role is to ensure accuracy at each checkpoint.",
      quickChecks: [
        {
          question: "What is a GL account?",
          options: [
            "A Government License account",
            "A General Ledger account that records financial transactions",
            "A Global Login account for ERP access",
            "A Gross Loss account used in tax reporting",
          ],
          correct: 1,
        },
        {
          question: "In an ERP workflow, what happens after a document is submitted?",
          options: [
            "It is immediately printed and filed",
            "It is automatically deleted after 24 hours",
            "It is routed for approval before posting",
            "It is sent to HR for processing",
          ],
          correct: 2,
        },
      ],
    },
  },
  {
    id: "transactions-reconciliation",
    index: 2,
    title: "Transactions & Reconciliation",
    subtitle: "Matching records to reality",
    estimatedMinutes: 10,
    content: {
      explanation:
        "Reconciliation is the process of ensuring your ERP's financial records match external statements—bank statements, supplier invoices, or subsidiary ledgers. Discrepancies signal either a missing entry, a timing difference, or an error that must be resolved before period-close.",
      example:
        "At month-end, the AP balance in your ERP shows ₱480,000 owed to a supplier. The supplier statement says ₱495,000. The ₱15,000 gap could be an invoice that arrived late and wasn't entered yet. You locate it, post it, and the records align. That's a clean reconciliation.",
      keyTakeaway:
        "Reconciliation is proof that your books reflect reality. In an ERP, it's faster than manual processes—but only if transactions are posted correctly and completely in real time.",
      quickChecks: [
        {
          question: "What does reconciliation verify?",
          options: [
            "That employees are paid on time",
            "That ERP financial records match external statements",
            "That all emails have been read",
            "That inventory is stored correctly",
          ],
          correct: 1,
        },
        {
          question: "A discrepancy in reconciliation most likely indicates:",
          options: [
            "A system crash",
            "A missing entry, timing difference, or posting error",
            "Too many users logged in simultaneously",
            "An expired license",
          ],
          correct: 1,
        },
        {
          question: "When should transactions ideally be posted in an ERP?",
          options: [
            "Only at the end of the fiscal year",
            "In batches once a month",
            "Correctly and completely in real time",
            "After management approval of year-end reports",
          ],
          correct: 2,
        },
      ],
    },
  },
  {
    id: "reporting",
    index: 3,
    title: "Reporting",
    subtitle: "Turning data into decisions",
    estimatedMinutes: 8,
    content: {
      explanation:
        "ERP systems generate financial reports by querying the same GL data your team posts daily. Common reports include the Trial Balance, Income Statement, Balance Sheet, Cash Flow, and aging reports for AP/AR. The quality of your reports depends entirely on the quality of your postings.",
      example:
        "Your CFO needs the monthly P&L before tomorrow's board meeting. In an ERP, you run the Income Statement report, filter by this month, and export. The data is live and complete because your team posts transactions in real time. No manual data gathering. No formula errors. One click.",
      keyTakeaway:
        "Good ERP reporting is only possible when postings are accurate, timely, and consistently coded. As an accounting associate, every GL entry you make either improves or degrades the quality of every report that follows.",
      quickChecks: [
        {
          question: "What determines the quality of ERP financial reports?",
          options: [
            "The brand of the ERP software",
            "The number of users in the system",
            "The accuracy and consistency of the GL postings that feed them",
            "The speed of the company's internet connection",
          ],
          correct: 2,
        },
        {
          question: "Which of the following is a common ERP-generated report?",
          options: [
            "Social media analytics",
            "Trial Balance",
            "Website traffic report",
            "Employee satisfaction survey",
          ],
          correct: 1,
        },
      ],
    },
  },
];

// ── Quick Check component ─────────────────────────────────────────────────────

function QuickCheck({
  question,
  options,
  correct,
  onCorrect,
}: {
  question: string;
  options: string[];
  correct: number;
  onCorrect: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === correct) {
      setTimeout(onCorrect, 500);
    }
  }

  return (
    <div className="rounded-2xl border border-paper-line bg-paper p-5">
      <p className="mb-4 font-medium text-ink">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = selected !== null && i === correct;
          const isWrong = isSelected && i !== correct;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                isCorrect
                  ? "border-green-300 bg-green-50 text-green-800"
                  : isWrong
                  ? "border-red-200 bg-red-50 text-red-700"
                  : isSelected
                  ? "border-roar-maroon bg-roar-maroon/5 text-roar-maroon"
                  : "border-paper-line bg-white text-ink-soft hover:border-ink/20 hover:text-ink disabled:cursor-default"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 text-sm font-medium ${
            selected === correct ? "text-green-700" : "text-red-600"
          }`}
        >
          {selected === correct
            ? "✓ Correct!"
            : `Not quite. The answer is: "${options[correct]}"`}
        </motion.p>
      )}
    </div>
  );
}

// ── Module content view ───────────────────────────────────────────────────────

function ModuleContent({
  module,
  onComplete,
}: {
  module: Module;
  onComplete: () => void;
}) {
  const totalChecks = module.content.quickChecks.length;
  const [correctCount, setCorrectCount] = useState(0);
  const [readConfirmed, setReadConfirmed] = useState(false);

  const allCorrect = correctCount >= totalChecks;
  const canComplete = readConfirmed && allCorrect;

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <div className="rounded-2xl border border-paper-line bg-white p-7">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          Explanation
        </p>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          {module.content.explanation}
        </p>
      </div>

      {/* Process Example */}
      <div className="rounded-2xl border border-roar-amber/20 bg-gradient-to-br from-white to-[#FFFBEF] p-7">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-roar-amber">
          Real-World Example
        </p>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          {module.content.example}
        </p>
      </div>

      {/* Key Takeaway */}
      <div className="rounded-2xl border border-roar-maroon/15 bg-gradient-to-br from-white to-[#FBF2EF] p-7">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-roar-maroon">
          Key Takeaway
        </p>
        <p className="font-medium text-ink">{module.content.keyTakeaway}</p>
        <label className="mt-4 flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={readConfirmed}
            onChange={(e) => setReadConfirmed(e.target.checked)}
            className="h-4 w-4 rounded border-paper-line accent-roar-maroon"
          />
          <span className="text-sm text-ink-soft">I understand this takeaway</span>
        </label>
      </div>

      {/* Quick Checks */}
      <div className="space-y-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          Quick Checks ({correctCount}/{totalChecks} correct)
        </p>
        {module.content.quickChecks.map((qc, i) => (
          <QuickCheck
            key={i}
            question={qc.question}
            options={qc.options}
            correct={qc.correct}
            onCorrect={() => setCorrectCount((c) => Math.min(c + 1, totalChecks))}
          />
        ))}
      </div>

      {/* Complete button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: canComplete ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <button
          type="button"
          onClick={canComplete ? onComplete : undefined}
          disabled={!canComplete}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-roar-maroon px-7 py-4 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCircle2 size={16} strokeWidth={2.5} />
          {canComplete
            ? "Mark Module Complete"
            : `Complete all ${totalChecks} checks to continue`}
        </button>
      </motion.div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LearnPage() {
  const router = useRouter();
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [activeModuleId, setActiveModuleId] = useState<string>("erp-foundations");
  const [overallProgress, setOverallProgress] = useState(0);
  const [completedAnimation, setCompletedAnimation] = useState<string | null>(null);

  const refreshStatuses = useCallback(() => {
    setStatuses(getLessonProgress());
    setOverallProgress(getOverallLearningProgress());
  }, []);

  useEffect(() => {
    refreshStatuses();
    // Mark first module as in-progress if not started
    const s = getModuleStatus("erp-foundations");
    if (s === "not_started") {
      setModuleStatus("erp-foundations", "in_progress");
      refreshStatuses();
    }
  }, [refreshStatuses]);

  const activeModule = MODULES.find((m) => m.id === activeModuleId) ?? MODULES[0];
  const activeStatus = statuses[activeModuleId] ?? "not_started";

  function isUnlocked(module: Module): boolean {
    if (module.index === 0) return true;
    const prevId = MODULE_IDS[module.index - 1];
    return (statuses[prevId] ?? "not_started") === "completed";
  }

  function handleModuleClick(module: Module) {
    if (!isUnlocked(module)) return;
    setActiveModuleId(module.id);
    const current = getModuleStatus(module.id);
    if (current === "not_started") {
      setModuleStatus(module.id, "in_progress");
      refreshStatuses();
    }
  }

  function handleComplete() {
    setModuleStatus(activeModuleId, "completed");
    setCompletedAnimation(activeModuleId);
    refreshStatuses();

    // Unlock and navigate to next module
    const nextIndex = activeModule.index + 1;
    if (nextIndex < MODULES.length) {
      const nextModule = MODULES[nextIndex];
      setTimeout(() => {
        setCompletedAnimation(null);
        setActiveModuleId(nextModule.id);
        setModuleStatus(nextModule.id, "in_progress");
        refreshStatuses();
      }, 1200);
    } else {
      // All done — go to assessment
      setTimeout(() => {
        setCompletedAnimation(null);
        router.push("/assessment/erp-workflow");
      }, 1500);
    }
  }

  const allComplete = areAllModulesComplete();

  return (
    <>
      <SignalBackground />
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <Link
            href="/squads/erp-fundamentals"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} />
            Back to Squad
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-[300px_1fr]"
        >
          {/* Sidebar */}
          <motion.aside variants={staggerItem} className="space-y-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-roar-maroon">
                Learning Pathway
              </span>
              <h1 className="mt-1 font-display text-xl font-semibold text-ink">
                ERP Workflow
              </h1>
            </div>

            {/* Overall progress */}
            <div className="rounded-2xl border border-paper-line bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Progress
                </span>
                <span className="font-display text-lg font-semibold text-ink tabular-nums">
                  {overallProgress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-paper-dim">
                <motion.div
                  className="h-full rounded-full bg-roar-maroon"
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  role="progressbar"
                  aria-valuenow={overallProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Overall learning progress"
                />
              </div>
            </div>

            {/* Module list */}
            <nav aria-label="Modules">
              <div className="flex flex-col gap-2">
                {MODULES.map((module) => {
                  const status = statuses[module.id] ?? "not_started";
                  const locked = !isUnlocked(module);
                  const isActive = activeModuleId === module.id;

                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => handleModuleClick(module)}
                      disabled={locked}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                        isActive
                          ? "border-roar-maroon/25 bg-roar-maroon/[0.04]"
                          : locked
                          ? "cursor-not-allowed border-paper-line bg-paper opacity-50"
                          : "border-paper-line bg-white hover:border-ink/15 hover:bg-paper-dim"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition-colors ${
                          status === "completed"
                            ? "bg-roar-maroon text-white"
                            : status === "in_progress"
                            ? "border border-roar-amber text-roar-amber"
                            : locked
                            ? "bg-paper-dim text-ink-faint"
                            : "bg-paper-dim text-ink-faint"
                        }`}
                      >
                        {locked ? (
                          <Lock size={11} strokeWidth={2.5} />
                        ) : status === "completed" ? (
                          <CheckCircle2 size={13} strokeWidth={2.5} />
                        ) : status === "in_progress" ? (
                          <PlayCircle size={13} strokeWidth={2.5} />
                        ) : (
                          <span className="font-mono text-[10px]">
                            {String(module.index + 1).padStart(2, "0")}
                          </span>
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isActive ? "text-ink" : "text-ink-soft"
                          }`}
                        >
                          {module.title}
                        </p>
                        <p className="font-mono text-[11px] text-ink-faint">
                          ~{module.estimatedMinutes} min
                        </p>
                      </div>
                      {isActive && !locked && (
                        <ChevronRight size={14} className="shrink-0 text-roar-maroon" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {allComplete && (
              <Link
                href="/assessment/erp-workflow"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-roar-maroon px-5 py-3 text-sm font-semibold text-white"
              >
                Take Skill Check
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            )}
          </motion.aside>

          {/* Content area */}
          <motion.div variants={staggerItem}>
            <AnimatePresence mode="wait">
              {completedAnimation === activeModuleId ? (
                <motion.div
                  key="complete-flash"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-roar-maroon/15 bg-gradient-to-br from-white to-[#FBF2EF] p-16 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-roar-maroon text-white"
                  >
                    <CheckCircle2 size={32} strokeWidth={2} />
                  </motion.span>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Module Complete!
                  </h2>
                  <p className="text-ink-soft">
                    {activeModule.index < MODULES.length - 1
                      ? "Unlocking next module…"
                      : "All modules complete! Redirecting to Skill Check…"}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeModuleId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Module header */}
                  <div className="mb-6 rounded-2xl border border-paper-line bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                          Module {activeModule.index + 1} of {MODULES.length}
                        </span>
                        <h2 className="mt-1 font-display text-2xl font-semibold text-ink">
                          {activeModule.title}
                        </h2>
                        <p className="mt-1 text-sm text-ink-soft">{activeModule.subtitle}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 font-mono text-[11px] ${
                          activeStatus === "completed"
                            ? "bg-roar-maroon/10 text-roar-maroon"
                            : activeStatus === "in_progress"
                            ? "bg-roar-amber/10 text-roar-amber"
                            : "bg-paper-dim text-ink-faint"
                        }`}
                      >
                        {activeStatus === "completed"
                          ? "Completed"
                          : activeStatus === "in_progress"
                          ? "In Progress"
                          : "Not Started"}
                      </span>
                    </div>
                  </div>

                  {activeStatus === "completed" ? (
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-paper-line bg-white p-10 text-center">
                      <CheckCircle2 size={40} className="text-roar-maroon" strokeWidth={1.5} />
                      <p className="font-display text-lg font-semibold text-ink">
                        You&apos;ve completed this module
                      </p>
                      <p className="text-sm text-ink-soft">
                        Feel free to review the content, or continue to the next module.
                      </p>
                      {activeModule.index < MODULES.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleModuleClick(MODULES[activeModule.index + 1])
                          }
                          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper hover:bg-roar-maroon"
                        >
                          Next Module
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <ModuleContent module={activeModule} onComplete={handleComplete} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
