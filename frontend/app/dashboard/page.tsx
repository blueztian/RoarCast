"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Flame,
  CheckCircle2,
  Star,
  Users,
  Shield,
  ChevronRight,
} from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import ReadinessRing from "@/components/ReadinessRing";
import {
  getStudent,
  computeReadiness,
  BASE_READINESS,
  isCredentialEarned,
  getCredential,
  getSquad,
  getOverallLearningProgress,
  hasDashboardBeenSeen,
  markDashboardSeen,
  isProfileAdded,
  getLessonProgress,
  MODULE_IDS,
} from "@/lib/studentState";
import { staggerContainer, staggerItem } from "@/lib/motion";

// ── Animated number counter ───────────────────────────────────────────────────

function CountUp({
  from,
  to,
  duration = 1.4,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(from);
  const start = useRef(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (from === to) return;
    start.current = Date.now();
    function tick() {
      const elapsed = (Date.now() - start.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [from, to, duration]);

  return <>{display}</>;
}

// ── Demand watch items ────────────────────────────────────────────────────────

const DEMAND_WATCH = [
  {
    skill: "Advanced Excel",
    trend: "high" as const,
    reason: "Required in 9 of 11 local accounting postings this month",
    icon: Flame,
    path: null,
  },
  {
    skill: "Reporting & Visualization",
    trend: "rising" as const,
    reason: "Demand up 22% since May — employers want narrative-ready data",
    icon: TrendingUp,
    path: null,
  },
  {
    skill: "ERP Workflow",
    trend: "high" as const,
    reason: "You've now verified this skill ✓",
    icon: Flame,
    path: "/credentials/erp-workflow",
    verified: true,
  },
];

const trendLabel: Record<string, string> = {
  high: "High Demand",
  rising: "Rising",
  steady: "Steady",
};

const trendClass: Record<string, string> = {
  high: "text-roar-maroon border-roar-maroon/20 bg-roar-maroon/[0.05]",
  rising: "text-roar-amber border-roar-amber/25 bg-roar-amber/[0.06]",
  steady: "text-ink-soft border-ink/10 bg-paper-dim",
};

// ── Skill groups ──────────────────────────────────────────────────────────────

function getSkillGroups(erpVerified: boolean) {
  return {
    ready: [
      "Basic Accounting",
      "Spreadsheet Fundamentals",
      "Financial Documentation",
      ...(erpVerified ? ["ERP Workflow"] : []),
    ],
    strengthen: ["Advanced Excel", "Reporting & Visualization"],
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [student] = useState(getStudent());
  const [credentialEarned, setCredentialEarned] = useState(false);
  const [credential, setCredential] = useState<ReturnType<typeof getCredential>>(null);
  const [squadJoined, setSquadJoined] = useState(false);
  const [profileAdded, setProfileAdded] = useState(false);
  const [learningProgress, setLearningProgress] = useState(0);
  const [prevReadiness, setPrevReadiness] = useState(BASE_READINESS);
  const [currentReadiness, setCurrentReadiness] = useState(BASE_READINESS);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [moduleStatuses, setModuleStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    const credEarned = isCredentialEarned();
    const cred = getCredential();
    const squad = getSquad();
    const progress = getOverallLearningProgress();
    const profileAdd = isProfileAdded();
    const seen = hasDashboardBeenSeen();
    const statuses = getLessonProgress();

    setCredentialEarned(credEarned);
    setCredential(cred);
    setSquadJoined(squad !== null);
    setLearningProgress(progress);
    setProfileAdded(profileAdd);
    setModuleStatuses(statuses);

    const newReadiness = computeReadiness();

    if (credEarned && !seen) {
      // First arrival after earning credential — animate the upgrade
      setPrevReadiness(BASE_READINESS);
      setCurrentReadiness(BASE_READINESS);
      markDashboardSeen();
      setTimeout(() => {
        setCurrentReadiness(newReadiness);
        setShowUpgrade(true);
      }, 800);
    } else {
      setPrevReadiness(newReadiness);
      setCurrentReadiness(newReadiness);
    }
  }, []);

  const { ready, strengthen } = getSkillGroups(credentialEarned);
  const completedModules = MODULE_IDS.filter((id) => moduleStatuses[id] === "completed").length;
  const nextSkill = "Advanced Excel Reporting";

  return (
    <>
      <SignalBackground />
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Greeting + upgrade banner */}
          <motion.div variants={staggerItem}>
            <AnimatePresence>
              {showUpgrade && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 flex items-start gap-3 rounded-2xl border border-roar-maroon/20 bg-gradient-to-r from-roar-maroon/[0.04] to-transparent p-5"
                >
                  <Star size={18} className="mt-0.5 shrink-0 text-roar-yellow" strokeWidth={2} />
                  <div>
                    <p className="font-medium text-ink">You&apos;re getting closer.</p>
                    <p className="text-sm text-ink-soft">
                      Closing a priority gap improved your readiness for Accounting Operations.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-roar-maroon">
                Your Dashboard
              </p>
              <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {student.name}
              </h1>
              <p className="text-sm text-ink-soft">
                {student.program} · {student.careerInterest}
              </p>
            </div>
          </motion.div>

          {/* Top cards: Readiness + Pathway + Next Action */}
          <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-3">
            {/* Industry Readiness */}
            <div className="flex flex-col items-center rounded-3xl border border-paper-line bg-white p-7 text-center shadow-card">
              <div className="mb-4">
                <ReadinessRing
                  percentage={currentReadiness}
                  size={120}
                  strokeWidth={9}
                  label="readiness"
                />
              </div>
              {showUpgrade && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 rounded-full border border-roar-maroon/20 bg-roar-maroon/[0.05] px-3 py-1.5"
                >
                  <TrendingUp size={12} className="text-roar-maroon" strokeWidth={2.5} />
                  <span className="font-mono text-[11px] text-roar-maroon">
                    +{currentReadiness - BASE_READINESS}% from ERP
                  </span>
                </motion.div>
              )}
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                Industry Readiness
              </p>
            </div>

            {/* Target Pathway */}
            <div className="rounded-3xl border border-paper-line bg-white p-7 shadow-card">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                Target Pathway
              </p>
              <h2 className="font-display text-lg font-semibold text-ink">
                {student.careerInterest}
              </h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Skills Ready</span>
                  <span className="font-medium text-ink">{ready.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">To Strengthen</span>
                  <span className="font-medium text-ink">{strengthen.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Credentials</span>
                  <span className="font-medium text-ink">{credentialEarned ? 1 : 0}</span>
                </div>
              </div>
            </div>

            {/* Next Best Action */}
            <div className="flex flex-col justify-between rounded-3xl border border-roar-maroon/15 bg-gradient-to-br from-white to-[#FBF2EF] p-7 shadow-card">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-roar-maroon">
                  Next Best Action
                </p>
                <h2 className="font-display text-lg font-semibold text-ink">
                  {nextSkill}
                </h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  High demand · Strengthen category
                </p>
              </div>
              <Link
                href="/skills/erp-workflow"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-roar-maroon px-5 py-2.5 text-sm font-semibold text-white"
              >
                Start Next Skill
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>

          {/* Skill Map */}
          <motion.div variants={staggerItem} className="rounded-3xl border border-paper-line bg-white p-7 shadow-card">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Skill Map
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Ready */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    Ready
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {ready.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 rounded-xl border border-paper-line bg-paper px-4 py-2.5"
                    >
                      <CheckCircle2 size={14} className="shrink-0 text-green-600" strokeWidth={2.5} />
                      <span className="text-sm font-medium text-ink">{skill}</span>
                      {skill === "ERP Workflow" && credentialEarned && (
                        <span className="ml-auto flex items-center gap-1 rounded-full bg-roar-maroon/10 px-2 py-0.5 font-mono text-[10px] text-roar-maroon">
                          <Shield size={9} strokeWidth={2.5} />
                          Verified
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengthen */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-roar-yellow" />
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    Strengthen
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {strengthen.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 rounded-xl border border-paper-line bg-paper px-4 py-2.5"
                    >
                      <TrendingUp size={14} className="shrink-0 text-roar-amber" strokeWidth={2.5} />
                      <span className="text-sm font-medium text-ink-soft">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom row: Credentials + Squad + Demand Watch */}
          <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-3">
            {/* Credentials */}
            <div className="rounded-3xl border border-paper-line bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Shield size={14} className="text-ink-faint" strokeWidth={2} />
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Credentials
                </p>
              </div>
              {credentialEarned && credential ? (
                <Link
                  href="/credentials/erp-workflow"
                  className="group flex items-center justify-between rounded-xl border border-roar-maroon/20 bg-roar-maroon/[0.04] px-4 py-3 transition-colors hover:bg-roar-maroon/[0.07]"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{credential.skillName}</p>
                    <p className="font-mono text-[10px] text-roar-maroon">Verified</p>
                  </div>
                  <ChevronRight size={14} className="text-roar-maroon" />
                </Link>
              ) : (
                <p className="text-sm text-ink-faint">
                  Complete a skill pathway to earn your first credential.
                </p>
              )}
            </div>

            {/* Squad */}
            <div className="rounded-3xl border border-paper-line bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Users size={14} className="text-ink-faint" strokeWidth={2} />
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Squad
                </p>
              </div>
              {squadJoined ? (
                <Link
                  href="/squads/erp-fundamentals"
                  className="group flex items-center justify-between rounded-xl border border-paper-line px-4 py-3 transition-colors hover:bg-paper-dim"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">ERP Fundamentals Squad</p>
                    <p className="font-mono text-[10px] text-ink-faint">
                      {learningProgress}% complete
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-ink-faint" />
                </Link>
              ) : (
                <p className="text-sm text-ink-faint">
                  No squad yet.{" "}
                  <Link href="/squads/match" className="text-roar-maroon underline-offset-2 hover:underline">
                    Find one →
                  </Link>
                </p>
              )}
            </div>

            {/* Demand Watch */}
            <div className="rounded-3xl border border-paper-line bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <Flame size={14} className="text-ink-faint" strokeWidth={2} />
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Demand Watch
                </p>
              </div>
              <p className="mb-4 text-sm font-medium text-ink">
                2 skills relevant to your pathway are rising.
              </p>
              <div className="space-y-2">
                {DEMAND_WATCH.slice(0, 2).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.skill} className="flex items-center gap-2">
                      <Icon size={12} className="shrink-0 text-ink-faint" strokeWidth={2.5} />
                      <span className="flex-1 truncate text-sm text-ink-soft">{item.skill}</span>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] ${trendClass[item.trend]}`}
                      >
                        {trendLabel[item.trend]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Demo Reset */}
          <motion.div variants={staggerItem} className="text-center">
            <DemoResetButton />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

// ── Demo Reset Button ─────────────────────────────────────────────────────────

function DemoResetButton() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  function handleReset() {
    // Import resetAllProgress dynamically to keep initial render clean
    import("@/lib/studentState").then(({ resetAllProgress }) => {
      resetAllProgress();
      router.push("/");
    });
  }

  return (
    <div className="inline-block">
      <AnimatePresence mode="wait">
        {!confirming ? (
          <motion.button
            key="trigger"
            type="button"
            onClick={() => setConfirming(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[11px] uppercase tracking-wide text-ink-faint hover:text-ink-soft"
          >
            Reset Demo Progress
          </motion.button>
        ) : (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 rounded-2xl border border-paper-line bg-white px-5 py-3"
          >
            <span className="text-sm text-ink-soft">Reset all progress? This can&apos;t be undone.</span>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full bg-roar-maroon px-4 py-1.5 font-mono text-[11px] text-white"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="font-mono text-[11px] text-ink-faint hover:text-ink"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
