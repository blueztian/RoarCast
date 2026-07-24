"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  TrendingUp,
  Building2,
  Users,
  BookOpen,
  Briefcase,
} from "lucide-react";
import DemandBadge from "@/components/DemandBadge";
import SkillTag from "@/components/SkillTag";
import SignalBackground from "@/components/SignalBackground";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";

// ── Mock data for ERP Workflow skill detail ──────────────────────────────────

const demandHistory = [
  { month: "Feb", value: 54 },
  { month: "Mar", value: 58 },
  { month: "Apr", value: 63 },
  { month: "May", value: 69 },
  { month: "Jun", value: 74 },
  { month: "Jul", value: 82 },
];

const relatedSkillTags = [
  { label: "Purchase Orders", category: "strengthen" as const },
  { label: "AP/AR Workflow", category: "strengthen" as const },
  { label: "GL Reconciliation", category: "ready" as const },
  { label: "Month-End Close", category: "priority" as const },
  { label: "Oracle NetSuite", category: "priority" as const },
];

const relatedPathways = [
  { name: "Accounting Operations", match: "Primary Match", icon: Briefcase },
  { name: "Financial Systems Admin", match: "Strong Match", icon: Building2 },
  { name: "Business Process Analyst", match: "Emerging", icon: Users },
];

const opportunities = [
  {
    company: "Laguna Technopark Industrial Zone",
    role: "Accounting Clerk",
    tag: "ERP required",
  },
  {
    company: "Santa Rosa Business District",
    role: "AP/AR Associate",
    tag: "High match",
  },
  {
    company: "NLEx Commercial Accounts",
    role: "Finance Operations Trainee",
    tag: "ERP preferred",
  },
];

// ── Mini Bar Chart ────────────────────────────────────────────────────────────

function DemandChart({ data }: { data: typeof demandHistory }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div
      role="img"
      aria-label="ERP demand trend over the past 6 months"
      className="flex items-end gap-1.5"
    >
      {data.map((d, i) => (
        <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-sm bg-roar-amber/80"
            style={{ height: `${(d.value / max) * 72}px` }}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="font-mono text-[10px] text-ink-faint">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SkillDetailPage() {
  const [activeTab, setActiveTab] = useState<"why" | "opportunities" | "pathways">("why");

  const readiness = 34;
  const demandValue = 82;

  return (
    <>
      <SignalBackground />

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        {/* Breadcrumb */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Link
            href="/results"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} />
            Back to Skill Map
          </Link>
        </motion.div>

        {/* Hero card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={staggerItem}
            className="mb-8 overflow-hidden rounded-3xl border border-roar-maroon/15 bg-gradient-to-br from-white to-[#FBF2EF] p-8 shadow-card sm:p-10"
          >
            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="mb-3 block font-mono text-[11px] uppercase tracking-widest text-roar-maroon">
                  Priority Gap · Accounting Operations
                </span>
                <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  ERP Workflow
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DemandBadge label="High Demand" trend="high" />
                  <DemandBadge label="Rising" trend="rising" />
                </div>
              </div>

              {/* Readiness vs Demand */}
              <div className="flex gap-6 sm:text-right">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    Your Readiness
                  </p>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="font-display text-3xl font-semibold text-roar-maroon"
                  >
                    {readiness}%
                  </motion.p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    Industry Demand
                  </p>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="font-display text-3xl font-semibold text-roar-amber"
                  >
                    {demandValue}%
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Gap visual */}
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                <span>Your readiness</span>
                <span>Industry demand</span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-paper-dim">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-roar-maroon"
                  initial={{ width: 0 }}
                  animate={{ width: `${readiness}%` }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  role="progressbar"
                  aria-valuenow={readiness}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Your ERP readiness"
                />
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-roar-amber opacity-20"
                  initial={{ width: 0 }}
                  animate={{ width: `${demandValue}%` }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Gap indicator */}
                <motion.div
                  className="absolute top-0 h-full border-r-2 border-dashed border-roar-amber"
                  initial={{ left: 0 }}
                  animate={{ left: `${demandValue}%` }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              </div>
              <p className="font-mono text-[11px] text-ink-faint">
                Gap of {demandValue - readiness}% — closing this gap has the highest impact on your readiness score.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/squads/match"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-roar-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
              >
                Start Closing This Gap
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/results"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-3.5 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                Back to Skill Map
              </Link>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={staggerItem}>
            <div className="mb-6 flex gap-1 rounded-2xl border border-paper-line bg-white p-1.5" role="tablist">
              {(
                [
                  { key: "why", label: "Why This Matters" },
                  { key: "opportunities", label: "Opportunities" },
                  { key: "pathways", label: "Pathways" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-roar-maroon text-white"
                      : "text-ink-soft hover:bg-paper-dim hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Why This Matters */}
            {activeTab === "why" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {/* Why Recommended */}
                <div className="rounded-3xl border border-paper-line bg-white p-7">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-roar-maroon/[0.06] text-roar-maroon">
                    <BookOpen size={18} strokeWidth={2} />
                  </div>
                  <h2 className="mb-3 font-display text-lg font-semibold text-ink">
                    Why RoarCast Recommended This
                  </h2>
                  <p className="text-[15px] leading-relaxed text-ink-soft">
                    You&apos;re seeing ERP Workflow because it appears frequently in
                    opportunities related to Accounting Operations, while your audit
                    indicates limited exposure to ERP systems and approval workflows.
                    Closing this gap has the fastest impact on your overall readiness.
                  </p>
                </div>

                {/* Demand Trend */}
                <div className="rounded-3xl border border-paper-line bg-white p-7">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-roar-amber/[0.08] text-roar-amber">
                    <TrendingUp size={18} strokeWidth={2} />
                  </div>
                  <h2 className="mb-4 font-display text-lg font-semibold text-ink">
                    Demand Trend (6 Months)
                  </h2>
                  <DemandChart data={demandHistory} />
                  <p className="mt-3 font-mono text-[11px] text-ink-faint">
                    ↑ +28% employer mentions since February
                  </p>
                </div>

                {/* Related Skill Tags */}
                <div className="rounded-3xl border border-paper-line bg-white p-7 sm:col-span-2">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-roar-maroon/[0.06] text-roar-maroon">
                    <Flame size={18} strokeWidth={2} />
                  </div>
                  <h2 className="mb-4 font-display text-lg font-semibold text-ink">
                    Related Skill Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {relatedSkillTags.map((tag) => (
                      <SkillTag key={tag.label} label={tag.label} category={tag.category} />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-ink-soft">
                    Mastering ERP Workflow unlocks fluency in all related tags above — employers
                    treat these as a connected skill cluster.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab: Opportunities */}
            {activeTab === "opportunities" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  3 active mock opportunities in Santa Rosa requiring ERP Workflow
                </p>
                {opportunities.map((opp) => (
                  <div
                    key={opp.role}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-paper-line bg-white p-5"
                  >
                    <div>
                      <p className="font-medium text-ink">{opp.role}</p>
                      <p className="mt-0.5 text-sm text-ink-faint">{opp.company}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-roar-maroon/20 bg-roar-maroon/[0.05] px-3 py-1 font-mono text-[11px] text-roar-maroon">
                      {opp.tag}
                    </span>
                  </div>
                ))}
                <p className="pt-2 font-mono text-[11px] text-ink-faint">
                  * Opportunities shown are illustrative for demo purposes.
                </p>
              </motion.div>
            )}

            {/* Tab: Pathways */}
            {activeTab === "pathways" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="space-y-4"
              >
                {relatedPathways.map(({ name, match, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 rounded-2xl border border-paper-line bg-white p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-roar-maroon/[0.06] text-roar-maroon">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-ink">{name}</p>
                      <p className="text-sm text-ink-soft">ERP Workflow is a core skill in this pathway</p>
                    </div>
                    <span className="font-mono text-[11px] text-roar-amber">{match}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
