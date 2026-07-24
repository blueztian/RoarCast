"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  CheckCircle2,
  Clock,
  Target,
  MessageSquare,
} from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import {
  getSquad,
  getOverallLearningProgress,
  getLessonProgress,
  MODULE_IDS,
} from "@/lib/studentState";
import { staggerContainer, staggerItem } from "@/lib/motion";

const SQUAD_MODULES = [
  { id: "erp-foundations", label: "ERP Foundations" },
  { id: "accounting-workflow", label: "Accounting Workflow" },
  { id: "transactions-reconciliation", label: "Transactions & Reconciliation" },
  { id: "reporting", label: "Reporting" },
  { id: "skill-check", label: "Skill Check" },
];

const SQUAD_ACTIVITY = [
  { name: "Carla", action: "completed Module 2", time: "2h ago" },
  { name: "Luis", action: "reached 50% progress", time: "4h ago" },
  { name: "Mika", action: "completed ERP Foundations", time: "Yesterday" },
];

function ProgressBar({
  value,
  label,
  color = "bg-roar-maroon",
}: {
  value: number;
  label: string;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          {label}
        </span>
        <span className="font-display text-xl font-semibold text-ink tabular-nums">
          {value}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-paper-dim">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
    </div>
  );
}

export default function SquadPage() {
  const [myProgress, setMyProgress] = useState(0);
  const [joined, setJoined] = useState(false);
  const [moduleStatuses, setModuleStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    const squad = getSquad();
    setJoined(squad?.squadId === "erp-fundamentals");
    setMyProgress(getOverallLearningProgress());
    setModuleStatuses(getLessonProgress());
  }, []);

  const squadProgress = 38; // Squad's average (static mock for others)

  const completedModules = MODULE_IDS.filter(
    (id) => moduleStatuses[id] === "completed"
  ).length;

  const currentModuleIndex = MODULE_IDS.findIndex(
    (id) => (moduleStatuses[id] ?? "not_started") !== "completed"
  );
  const currentModule = SQUAD_MODULES[Math.max(currentModuleIndex, 0)];

  return (
    <>
      <SignalBackground />
      <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={staggerItem}>
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-roar-maroon">
              {joined ? "Your Squad" : "Squad Overview"}
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-roar-maroon text-white">
                  <Users size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    ERP Fundamentals Squad
                  </h1>
                  <p className="text-sm text-ink-faint">
                    8 learners · 4-week pathway · Accounting Operations
                  </p>
                </div>
              </div>
              {joined && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-roar-maroon/20 bg-roar-maroon/[0.06] px-3 py-1.5 font-mono text-[11px] text-roar-maroon">
                  <CheckCircle2 size={12} strokeWidth={2.5} />
                  Joined
                </span>
              )}
            </div>
          </motion.div>

          {/* Progress cards */}
          <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-paper-line bg-white p-6">
              <ProgressBar value={myProgress} label="Your Progress" color="bg-roar-maroon" />
            </div>
            <div className="rounded-2xl border border-paper-line bg-white p-6">
              <ProgressBar value={squadProgress} label="Squad Progress" color="bg-roar-amber" />
            </div>
          </motion.div>

          {/* Current Objective */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4 rounded-2xl border border-paper-line bg-white p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-roar-amber/10 text-roar-amber">
              <Target size={18} strokeWidth={2} />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                Current Objective
              </p>
              <p className="font-medium text-ink">{currentModule.label}</p>
            </div>
          </motion.div>

          {/* Pathway */}
          <motion.div variants={staggerItem} className="rounded-3xl border border-paper-line bg-white p-7">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Pathway
            </p>
            <div className="flex flex-col gap-3">
              {SQUAD_MODULES.map((module, i) => {
                const status = moduleStatuses[module.id] ?? "not_started";
                const isCompleted = status === "completed";
                const isInProgress = status === "in_progress";
                const isLocked =
                  module.id !== "skill-check" &&
                  i > 0 &&
                  (moduleStatuses[SQUAD_MODULES[i - 1].id] ?? "not_started") === "not_started";
                const isSkillCheck = module.id === "skill-check";
                const allLessonsComplete = completedModules === MODULE_IDS.length;

                return (
                  <div key={module.id} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-medium transition-colors ${
                        isCompleted
                          ? "bg-roar-maroon text-white"
                          : isInProgress
                          ? "border border-roar-amber text-roar-amber"
                          : "bg-paper-dim text-ink-faint"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <span
                      className={`flex-1 text-sm ${
                        isCompleted
                          ? "font-medium text-ink line-through decoration-ink-faint"
                          : isInProgress
                          ? "font-medium text-ink"
                          : "text-ink-soft"
                      }`}
                    >
                      {module.label}
                    </span>
                    {isSkillCheck && allLessonsComplete && (
                      <Link
                        href="/assessment/erp-workflow"
                        className="rounded-full bg-roar-maroon px-3 py-1 font-mono text-[11px] text-white"
                      >
                        Unlocked
                      </Link>
                    )}
                    {isSkillCheck && !allLessonsComplete && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-ink-faint">
                        <Clock size={11} />
                        Locked
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Squad Activity */}
          <motion.div variants={staggerItem} className="rounded-3xl border border-paper-line bg-white p-7">
            <div className="mb-5 flex items-center gap-2">
              <MessageSquare size={15} className="text-ink-faint" strokeWidth={2} />
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                Recent Activity
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {SQUAD_ACTIVITY.map((a) => (
                <div key={a.name + a.action} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-dim font-display text-sm font-semibold text-ink">
                    {a.name[0]}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-ink">{a.name}</span>
                    <span className="text-sm text-ink-soft"> {a.action}</span>
                  </div>
                  <span className="font-mono text-[11px] text-ink-faint">{a.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={staggerItem}>
            <Link
              href="/learn/erp-foundations"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-roar-maroon px-7 py-4 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Continue Learning
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
