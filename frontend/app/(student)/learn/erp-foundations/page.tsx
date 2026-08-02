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

const MODULES: Module[] = [
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
    <div className="rounded-[20px] border border-black/[0.05] bg-[#faf9f8] p-5 shadow-sm">
      <p className="mb-4 text-[15.5px] font-bold text-[#201d1d]">{question}</p>
      <div className="flex flex-col gap-2.5">
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
              className={`rounded-2xl border px-4 py-3.5 text-left text-[14.5px] font-medium transition-colors ${
                isCorrect
                  ? "border-green-500/30 bg-green-50 text-green-800"
                  : isWrong
                  ? "border-red-500/30 bg-red-50 text-red-800"
                  : isSelected
                  ? "border-[#6b0000] bg-[#6b0000]/5 text-[#6b0000]"
                  : "border-black/[0.08] bg-white text-[#5e5a5a] hover:border-black/[0.15] hover:text-[#201d1d] disabled:cursor-default"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3.5 text-[14px] font-bold ${
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
      <div className="rounded-[20px] border border-black/[0.05] bg-white p-6 shadow-sm">
        <p className="mb-4 font-mono text-[11.5px] font-bold uppercase tracking-wide text-[#7a7373]">
          Explanation
        </p>
        <p className="text-[16px] leading-relaxed text-[#5e5a5a]">
          {module.content.explanation}
        </p>
      </div>

      {/* Process Example */}
      <div className="rounded-[20px] border border-[#d97706]/20 bg-gradient-to-br from-white to-[#fffbeb] p-6 shadow-sm">
        <p className="mb-4 font-mono text-[11.5px] font-bold uppercase tracking-wide text-[#d97706]">
          Real-World Example
        </p>
        <p className="text-[16px] leading-relaxed text-[#5e5a5a]">
          {module.content.example}
        </p>
      </div>

      {/* Key Takeaway */}
      <div className="rounded-[20px] border border-[#6b0000]/15 bg-gradient-to-br from-white to-[#fff5f2] p-6 shadow-sm">
        <p className="mb-3 font-mono text-[11.5px] font-bold uppercase tracking-wide text-[#6b0000]">
          Key Takeaway
        </p>
        <p className="font-bold text-[16px] text-[#201d1d]">{module.content.keyTakeaway}</p>
        <label className="mt-5 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={readConfirmed}
            onChange={(e) => setReadConfirmed(e.target.checked)}
            className="h-5 w-5 rounded border-black/[0.2] accent-[#6b0000]"
          />
          <span className="text-[14.5px] font-medium text-[#5e5a5a]">I understand this takeaway</span>
        </label>
      </div>

      {/* Quick Checks */}
      <div className="space-y-4 mt-2">
        <p className="font-mono text-[11.5px] font-bold uppercase tracking-wide text-[#7a7373]">
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#201d1d] px-7 py-4 text-[15.5px] font-bold text-white shadow-sm transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCircle2 size={18} strokeWidth={2.5} />
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
    <div className="flex flex-1 flex-col h-full bg-[#f5f3f0] font-sans overflow-y-auto relative">
      {/* ── Header ── */}
      <header className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-6 pb-12">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex flex-col">
          <div className="flex items-center gap-3">
            <Link
              href="/skills/erp-workflow"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Back to Skill Detail"
            >
              <ArrowLeft size={16} />
            </Link>
            <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
              Upskilling Roadmap
            </h1>
          </div>
          <p className="text-[13px] text-white/80 ml-[44px]">
            Your personalized path to readiness.
          </p>
        </div>
      </header>

      {/* ── Content sheet ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex-1 min-h-screen bg-white rounded-t-[2.5rem] relative z-10 -mt-6 px-4 pt-6 pb-24 flex flex-col gap-5 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]"
      >
        {/* Overall progress */}
        <div className="flex flex-col rounded-[20px] border border-black/[0.05] bg-[#faf9f8] p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-bold text-[13px] text-[#201d1d]">
              Pathway Progress
            </span>
            <span className="font-bold text-[14px] text-[#6b0000] tabular-nums">
              {overallProgress}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e8e4df]">
            <motion.div
              className="h-full rounded-full bg-[#6b0000]"
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Module Nav / Pill Filter */}
        <div className="sticky top-0 z-20 -mx-4 px-4 py-2 bg-white/95 backdrop-blur-sm">
          <div className="flex overflow-x-auto no-scrollbar rounded-full bg-[#faf9f8] p-1 shadow-inner border border-black/[0.05]">
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
                  className={`flex-1 shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[12.5px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    isActive
                      ? "bg-[#6b0000] text-white shadow-sm"
                      : locked
                      ? "text-[#c0bbbb] cursor-not-allowed"
                      : "text-[#7a7373] hover:bg-white hover:text-[#201d1d]"
                  }`}
                >
                  {locked ? (
                    <Lock size={12} strokeWidth={2.5} />
                  ) : status === "completed" ? (
                    <CheckCircle2 size={13} strokeWidth={2.5} />
                  ) : status === "in_progress" ? (
                    <PlayCircle size={13} strokeWidth={2.5} />
                  ) : null}
                  {module.index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Content */}
        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            {completedAnimation === activeModuleId ? (
              <motion.div
                key="complete-flash"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[#6b0000]/15 bg-gradient-to-br from-white to-[#fff5f2] p-10 text-center shadow-sm"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6b0000] text-white"
                >
                  <CheckCircle2 size={28} strokeWidth={2} />
                </motion.span>
                <h2 className="font-display text-[20px] font-bold text-[#201d1d]">
                  Module Complete!
                </h2>
                <p className="text-[14px] text-[#7a7373]">
                  {activeModule.index < MODULES.length - 1
                    ? "Unlocking next module..."
                    : "All modules complete! Redirecting..."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeModuleId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Module header */}
                <div className="rounded-[20px] border border-black/[0.05] bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#d97706]">
                        Module {activeModule.index + 1} of {MODULES.length}
                      </span>
                      <h2 className="font-display text-[20px] font-bold text-[#201d1d] leading-tight">
                        {activeModule.title}
                      </h2>
                      <p className="text-[13.5px] text-[#7a7373] mt-1 leading-snug">
                        {activeModule.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {activeStatus === "completed" ? (
                  <div className="flex flex-col items-center gap-3 rounded-[20px] border border-black/[0.05] bg-[#faf9f8] p-8 text-center shadow-sm">
                    <CheckCircle2 size={36} className="text-[#6b0000]" strokeWidth={1.5} />
                    <p className="font-display text-[18px] font-bold text-[#201d1d]">
                      You&apos;ve completed this module
                    </p>
                    {activeModule.index < MODULES.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleModuleClick(MODULES[activeModule.index + 1])
                        }
                        className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#201d1d] px-6 py-3 text-[14px] font-bold text-white transition-transform active:scale-95"
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

          {allComplete && (
            <motion.div variants={staggerItem} className="mt-8">
              <Link
                href="/assessment/erp-workflow"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6b0000] px-5 py-3.5 text-[15px] font-bold text-white shadow-sm transition-transform active:scale-[0.98]"
              >
                Take Skill Check
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
