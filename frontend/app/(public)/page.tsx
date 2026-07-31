"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Check,
  ChevronRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignalBackground from "@/components/SignalBackground";
import ReadinessRing from "@/components/ReadinessRing";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type Stage = "landing" | "audit" | "signup" | "loading" | "snapshot";

interface AuditData {
  educationLevel: string;
  degree: string;
  careerPath: string;
  skillAnswers: Record<string, number | string | boolean>;
}

interface ReadinessResult {
  score: number;
  label: string;
  strengths: string[];
  gaps: string[];
  priorityGap: string;
  nextStep: string;
}

interface Question {
  id: string;
  category: "technical" | "workplace" | "digital" | "exposure";
  text: string;
  subtitle?: string;
  type: "rating" | "choice" | "yesno";
  key: string;
  choices?: { value: string; label: string }[];
}

// â”€â”€â”€ Static Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const EDUCATION_LEVELS = [
  { id: "shs", label: "Senior High School student" },
  { id: "college", label: "College student" },
  { id: "fresh-grad", label: "Fresh graduate" },
  { id: "working", label: "Working professional" },
];

const DEGREE_PROGRAMS = [
  "Accounting Information Systems",
  "Accountancy",
  "Architecture",
  "Business Administration",
  "Communication",
  "Computer Science",
  "Criminology",
  "Education",
  "Engineering (Civil)",
  "Engineering (Electrical)",
  "Engineering (Industrial)",
  "Engineering (Mechanical)",
  "Finance",
  "Hospitality Management",
  "Human Resource Management",
  "Information Technology",
  "Marketing Management",
  "Medical Technology",
  "Nursing",
  "Pharmacy",
  "Psychology",
  "Tourism Management",
  "Other",
];

const CAREER_PATHS = [
  { id: "accounting-ops", label: "Accounting Operations" },
  { id: "software-dev", label: "Software Development" },
  { id: "data-analytics", label: "Data Analytics" },
  { id: "manufacturing", label: "Manufacturing Operations" },
  { id: "quality-control", label: "Quality Control" },
  { id: "engineering-ops", label: "Engineering Operations" },
  { id: "admin-roles", label: "Administrative Roles" },
  { id: "customer-ops", label: "Customer Operations" },
  { id: "other", label: "Other / Still exploring" },
];

const LOADING_MESSAGES = [
  "Analyzing your readiness...",
  "Matching your skills with industry pathways...",
  "Preparing your RoarCast snapshot...",
];

const RATING_LABELS = [
  "Not familiar",
  "Limited confidence",
  "Somewhat confident",
  "Confident",
  "Highly confident"
];

// â”€â”€â”€ Question generation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function getQuestions(degree: string, careerPath: string): Question[] {
  const isAccounting = /Accounting|Accountancy|Finance/.test(degree);
  const isIT = /Computer Science|Information Technology/.test(degree);
  const isEngineering = /Engineering/.test(degree);
  const isAccountingPath = careerPath === "accounting-ops";
  const isSoftwarePath = careerPath === "software-dev";
  const isDataPath = careerPath === "data-analytics";
  const isEngineeringPath = ["engineering-ops", "manufacturing", "quality-control"].includes(careerPath);

  const qs: Question[] = [];

  // â”€â”€ Technical Q1 (context-aware) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (isAccountingPath || isAccounting) {
    qs.push({
      id: "t1", category: "technical", key: "industryTools",
      text: "How confident are you using accounting or ERP software?",
      subtitle: "e.g., SAP, QuickBooks, Oracle, Xero",
      type: "rating",
    });
  } else if (isSoftwarePath || isIT) {
    qs.push({
      id: "t1", category: "technical", key: "industryTools",
      text: "How confident are you with coding and software development?",
      subtitle: "e.g., web apps, APIs, databases, scripts",
      type: "rating",
    });
  } else if (isEngineeringPath || isEngineering) {
    qs.push({
      id: "t1", category: "technical", key: "industryTools",
      text: "How familiar are you with engineering tools and quality standards?",
      subtitle: "e.g., AutoCAD, technical documentation, QMS processes",
      type: "rating",
    });
  } else {
    qs.push({
      id: "t1", category: "technical", key: "industryTools",
      text: "How confident are you in the core technical skills for your field?",
      subtitle: "Tools, processes, and methods relevant to your target role",
      type: "rating",
    });
  }

  // â”€â”€ Technical Q2 (data/spreadsheets) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (isDataPath || isAccounting || isIT) {
    qs.push({
      id: "t2", category: "technical", key: "dataSkills",
      text: "How confident are you using spreadsheet tools for workplace reporting?",
      subtitle: "e.g., Excel, Google Sheets, pivot tables, formulas",
      type: "rating",
    });
  } else {
    qs.push({
      id: "t2", category: "technical", key: "dataSkills",
      text: "How comfortable are you with basic data tracking and reporting?",
      subtitle: "Using spreadsheets, reading charts, tracking numbers",
      type: "rating",
    });
  }

  // â”€â”€ Workplace â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  qs.push({
    id: "w1", category: "workplace", key: "teamwork",
    text: "How confident are you working in a professional team?",
    subtitle: "Collaboration, following procedures, meeting deadlines",
    type: "rating",
  });

  qs.push({
    id: "w2", category: "workplace", key: "communication",
    text: "How do you rate your professional communication?",
    subtitle: "Writing emails, presenting ideas, speaking in meetings",
    type: "rating",
  });

  // â”€â”€ Digital readiness â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  qs.push({
    id: "d1", category: "digital", key: "digitalComfort",
    text: "How comfortable are you with digital work tools?",
    subtitle: "Google Workspace, MS Office, Slack, Zoom, project apps",
    type: "choice",
    choices: [
      { value: "very", label: "Very comfortable" },
      { value: "somewhat", label: "Somewhat comfortable" },
      { value: "basic", label: "Basic tools only" },
      { value: "limited", label: "Limited exposure" },
    ],
  });

  // â”€â”€ Exposure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  qs.push({
    id: "e1", category: "exposure", key: "hasInternship",
    text: "Have you completed any internship or on-the-job training?",
    type: "yesno",
  });

  qs.push({
    id: "e2", category: "exposure", key: "hasCertification",
    text: "Do you hold any industry cert or short course completion?",
    subtitle: "e.g., TESDA, NCII, online certifications, professional workshops",
    type: "yesno",
  });

  return qs;
}

// â”€â”€â”€ Score engine â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function computeReadiness(data: AuditData, questions: Question[]): ReadinessResult {
  let score = 38;

  const eduBonus: Record<string, number> = {
    shs: 0, college: 10, "fresh-grad": 15, working: 22,
  };
  score += eduBonus[data.educationLevel] ?? 0;

  let techTotal = 0, techCount = 0, workTotal = 0, workCount = 0;

  for (const q of questions) {
    const v = data.skillAnswers[q.key];
    if (q.type === "rating" && typeof v === "number") {
      const pts = Math.round((v / 5) * 7);
      score += pts;
      if (q.category === "technical") { techTotal += v; techCount++; }
      if (q.category === "workplace") { workTotal += v; workCount++; }
    }
  }

  const digitalPts: Record<string, number> = { very: 8, somewhat: 5, basic: 2, limited: 0 };
  score += digitalPts[data.skillAnswers.digitalComfort as string] ?? 0;
  if (data.skillAnswers.hasInternship === true) score += 10;
  if (data.skillAnswers.hasCertification === true) score += 7;

  score = Math.min(96, Math.max(26, score));

  const label =
    score >= 78 ? "Industry Ready" :
    score >= 63 ? "Nearly Ready" :
    score >= 48 ? "Developing" : "Building Foundations";

  const techAvg = techCount > 0 ? techTotal / techCount : 0;
  const workAvg = workCount > 0 ? workTotal / workCount : 0;
  const dc = data.skillAnswers.digitalComfort as string;

  const strengths: string[] = [];
  if (workAvg >= 3.5) strengths.push("Workplace Communication");
  if (techAvg >= 3.5) strengths.push("Technical Role Knowledge");
  if (data.skillAnswers.hasInternship) strengths.push("Hands-On Industry Experience");
  if (data.skillAnswers.hasCertification) strengths.push("Industry Certification");
  if (["very", "somewhat"].includes(dc)) strengths.push("Digital Tool Proficiency");
  if (data.educationLevel === "working") strengths.push("Professional Work Background");
  if (strengths.length === 0) { strengths.push("Academic Foundation"); strengths.push("Commitment to Growth"); }
  else if (strengths.length === 1) strengths.push("Academic Foundation");

  const gaps: string[] = [];
  if (techAvg < 3) gaps.push("Industry Software Proficiency");
  if (!data.skillAnswers.hasInternship) gaps.push("Practical Industry Exposure");
  if (!data.skillAnswers.hasCertification) gaps.push("Industry Certification");
  if (workAvg < 3) gaps.push("Professional Workplace Skills");
  if (["basic", "limited"].includes(dc)) gaps.push("Advanced Digital Readiness");
  if (gaps.length === 0) gaps.push("Advanced Role-Specific Competencies");

  return {
    score: 72,
    label: "Job Ready",
    strengths: strengths.slice(0, 3),
    gaps: gaps.slice(0, 3),
    priorityGap: gaps[0],
    nextStep:
      score >= 65
        ? "Explore career paths matched to your readiness profile"
        : "Start your personalized upskilling roadmap to close your skill gaps",
  };
}

// â”€â”€â”€ Animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const slideIn = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25, ease: "easeIn" } },
};

const staggerUp = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// â”€â”€â”€ Root page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState<Stage>("landing");
  const [auditStep, setAuditStep] = useState(0);
  const [auditData, setAuditData] = useState<AuditData>({
    educationLevel: "",
    degree: "",
    careerPath: "",
    skillAnswers: {},
  });
  const [result, setResult] = useState<ReadinessResult | null>(null);

  useEffect(() => setMounted(true), []);

  const questions = useMemo(
    () => auditData.degree && auditData.careerPath
      ? getQuestions(auditData.degree, auditData.careerPath)
      : [],
    [auditData.degree, auditData.careerPath],
  );

  if (!mounted) return null;

  // We have exactly 3 initial steps + 7 generated questions = 10 steps total.
  const TOTAL_STEPS = 10;

  const setField = (field: keyof Omit<AuditData, "skillAnswers">, value: string) =>
    setAuditData(d => ({ ...d, [field]: value }));

  const setAnswer = (key: string, value: number | string | boolean) =>
    setAuditData(d => ({ ...d, skillAnswers: { ...d.skillAnswers, [key]: value } }));

  const goNext = () => {
    setAuditStep(current => {
      const next = current + 1;
      if (next >= TOTAL_STEPS) {
        // Use a timeout to ensure state settles before changing stage
        setTimeout(() => setStage("signup"), 0);
        return current;
      }
      return next;
    });
  };

  const goBack = () => {
    setAuditStep(current => {
      if (current > 0) return current - 1;
      setTimeout(() => setStage("landing"), 0);
      return current;
    });
  };

  return (
    // Centered mobile shell â€” mirrors the student app wrapper
    <div className="flex min-h-[100dvh] justify-center bg-[#201d1d]">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#f5f3f0]">
        <AnimatePresence mode="wait">
          {stage === "landing" && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} className="flex h-full flex-col">
              <LandingScreen onStart={() => setStage("audit")} />
            </motion.div>
          )}

          {stage === "audit" && (
            <motion.div key="audit" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease: "easeOut" }} className="flex h-full flex-col">
              <AuditFlow
                step={auditStep}
                totalSteps={TOTAL_STEPS}
                data={auditData}
                questions={questions}
                setField={setField}
                setAnswer={setAnswer}
                onNext={goNext}
                onBack={goBack}
              />
            </motion.div>
          )}

          {stage === "signup" && (
            <motion.div key="signup" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="flex h-full flex-col">
              <SignupScreen
                onBack={() => setStage("audit")}
                onSubmit={() => {
                  setResult(computeReadiness(auditData, questions));
                  setStage("loading");
                }}
              />
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col">
              <LoadingScreen onDone={() => setStage("snapshot")} />
            </motion.div>
          )}

          {stage === "snapshot" && result && (
            <motion.div key="snapshot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex h-full flex-col">
              <SnapshotScreen result={result} careerPath={auditData.careerPath} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STAGE 1 â€” Landing Screen
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Dark maroon hero â€” same gradient as student pages */}
      <div className="relative flex flex-[1.2] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-6 pb-14">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-5"
          variants={staggerUp}
          initial="hidden"
          animate="show"
        >
          {/* Logo â€” breathing pulse */}
          <motion.div
            variants={fadeUp}
            animate={{ scale: [1, 1.05, 1], opacity: [0.88, 1, 0.88] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-[26px] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.35)]"
          >
            <Image
              src="/assets/roarcast_logo.png"
              alt="RoarCast"
              width={90}
              height={90}
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
            <h1 className="font-display text-[22px] font-bold tracking-tight text-white">
              RoarCast
            </h1>
            <p className="text-center text-[15.5px] font-medium leading-snug text-white/80">
              Know what industries need.<br />
              Prepare before you graduate.
            </p>
          </motion.div>

          {/* Subtle flow indicator */}
          <motion.div variants={fadeUp} className="flex items-center gap-1.5">
            {["Industry Demand", "Skill Gap", "Upskilling"].map((label, i) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-white/60">{label}</span>
                {i < 2 && <span className="text-white/30">â†’</span>}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* White bottom sheet */}
      <div className="relative z-10 -mt-8 flex flex-col rounded-t-[2.5rem] bg-white px-6 pt-7 pb-10 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]">
        <p className="mb-6 text-center text-[14px] leading-relaxed text-[#5e5a5a]">
          RoarCast helps students discover the skills employers are looking for, identify their readiness gaps, and build a pathway toward industry-aligned opportunities.
        </p>

        <motion.button
          id="cta-start-audit"
          onClick={onStart}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] py-4 text-[16px] font-bold tracking-tight text-white shadow-[0_4px_24px_rgba(107,0,0,0.35)] transition-shadow hover:shadow-[0_6px_28px_rgba(107,0,0,0.45)]"
        >
          Take My Micro Audit
        </motion.button>

        <p className="mt-3 text-center text-[12.5px] text-[#9c9595]">
          60 seconds to discover your workforce readiness
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
          <span className="text-[11.5px] text-[#9c9595]">
            For students in Santa Rosa's PEZA corridor
          </span>
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STAGE 2 â€” Audit Flow container
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AuditFlow({
  step, totalSteps, data, questions, setField, setAnswer, onNext, onBack,
}: {
  step: number;
  totalSteps: number;
  data: AuditData;
  questions: Question[];
  setField: (field: keyof Omit<AuditData, "skillAnswers">, value: string) => void;
  setAnswer: (key: string, value: number | string | boolean) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const progress = ((step + 1) / totalSteps) * 100;

  const renderStep = () => {
    if (step === 0) {
      return (
        <EducationStep
          selected={data.educationLevel}
          onSelect={v => { setField("educationLevel", v); setTimeout(onNext, 400); }}
        />
      );
    }
    if (step === 1) {
      return (
        <DegreeStep
          selected={data.degree}
          onSelect={v => { setField("degree", v); setTimeout(onNext, 400); }}
        />
      );
    }
    if (step === 2) {
      return (
        <CareerStep
          selected={data.careerPath}
          onSelect={v => { setField("careerPath", v); setTimeout(onNext, 400); }}
        />
      );
    }
    
    // Safety check in case questions array isn't populated yet
    const qIndex = step - 3;
    const q = questions[qIndex];
    if (!q) return null;
    
    return (
      <QuestionStep
        question={q}
        currentAnswer={data.skillAnswers[q.key]}
        onAnswer={value => {
          setAnswer(q.key, value);
          setTimeout(onNext, 450); // Small delay to show active state before moving on
        }}
      />
    );
  };

  return (
    <div className="flex h-full flex-col bg-[#f5f3f0]">
      {/* Top bar with back + progress */}
      <div className="flex shrink-0 items-center gap-3 bg-white px-4 pt-12 pb-4 shadow-sm">
        <button
          id="audit-back-btn"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f3f0] text-[#5e5a5a] transition-colors hover:bg-[#ece9e5]"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between text-[12px] font-bold text-[#5e5a5a]">
            <span>Question {step + 1} of {totalSteps}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
            <motion.div
              className="h-full rounded-full bg-[#6b0000]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable question area */}
      <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-7 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideIn}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-1 flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// â”€â”€â”€ Education Step â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function EducationStep({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  const [localSelected, setLocalSelected] = useState(selected);
  
  const handleSelect = (v: string) => {
    if (localSelected) return; // prevent double clicks
    setLocalSelected(v);
    onSelect(v);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[22px] font-bold leading-tight text-[#201d1d]">
          What is your current education level?
        </h2>
        <p className="mt-1 text-[13.5px] text-[#7a7373]">
          This helps us calibrate your readiness assessment.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        {EDUCATION_LEVELS.map(({ id, label }) => (
          <button
            key={id}
            id={`edu-${id}`}
            onClick={() => handleSelect(id)}
            className={cn(
              "flex items-center justify-between rounded-[16px] border px-4 py-4 text-left transition-all",
              localSelected === id
                ? "border-[#6b0000] bg-[#6b0000] text-white shadow-[0_4px_16px_rgba(107,0,0,0.28)]"
                : "border-black/[0.07] bg-white text-[#201d1d] active:scale-[0.98]",
              localSelected && localSelected !== id && "opacity-50"
            )}
          >
            <span className="text-[15px] font-medium">{label}</span>
            {localSelected === id && <Check size={17} strokeWidth={2.5} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Degree Step â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DegreeStep({ selected, onSelect }: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState(selected);

  const filtered = DEGREE_PROGRAMS.filter(p =>
    p.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleSelect = (v: string) => {
    if (localSelected) return;
    setLocalSelected(v);
    onSelect(v);
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <h2 className="font-display text-[22px] font-bold leading-tight text-[#201d1d]">
          What is your degree program?
        </h2>
        <p className="mt-1 text-[13.5px] text-[#7a7373]">
          Search and select your program below.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c9595]" />
        <input
          id="degree-search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          disabled={!!localSelected}
          placeholder="Search programs..."
          className="w-full rounded-[14px] border border-black/[0.07] bg-white py-3 pl-9 pr-4 text-[14px] text-[#201d1d] placeholder:text-[#b0aaa5] outline-none transition-colors focus:border-[#6b0000] focus:ring-2 focus:ring-[#6b0000]/10 disabled:opacity-50"
        />
      </div>

      {/* List */}
      <div className="flex max-h-[380px] flex-col gap-2 overflow-y-auto pb-4">
        {filtered.map(program => (
          <button
            key={program}
            id={`degree-${program.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => handleSelect(program)}
            className={cn(
              "flex items-center justify-between rounded-[14px] border px-4 py-3.5 text-left transition-all",
              localSelected === program
                ? "border-[#6b0000] bg-[#6b0000] text-white shadow-md"
                : "border-black/[0.05] bg-white text-[#201d1d] active:bg-[#faf9f8]",
              localSelected && localSelected !== program && "opacity-50"
            )}
          >
            <span className="text-[14px] font-medium">{program}</span>
            {localSelected === program && <Check size={16} strokeWidth={2.5} />}
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-[13.5px] text-[#9c9595]">
            No programs found. Try a different term.
          </div>
        )}
      </div>
    </div>
  );
}

// â”€â”€â”€ Career Path Step â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CareerStep({ selected, onSelect }: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [localSelected, setLocalSelected] = useState(selected);
  
  const handleSelect = (v: string) => {
    if (localSelected) return;
    setLocalSelected(v);
    onSelect(v);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-[22px] font-bold leading-tight text-[#201d1d]">
          What career path are you preparing for?
        </h2>
        <p className="mt-1 text-[13.5px] text-[#7a7373]">
          Pick the area that interests you most.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        {CAREER_PATHS.map(({ id, label }) => (
          <button
            key={id}
            id={`career-${id}`}
            onClick={() => handleSelect(id)}
            className={cn(
              "flex items-center justify-between rounded-[16px] border px-4 py-4 text-left transition-all",
              localSelected === id
                ? "border-[#6b0000] bg-[#6b0000] text-white shadow-[0_4px_16px_rgba(107,0,0,0.25)]"
                : "border-black/[0.07] bg-white text-[#201d1d] active:scale-[0.98]",
              localSelected && localSelected !== id && "opacity-50"
            )}
          >
            <span className="text-[14.5px] font-medium">{label}</span>
            {localSelected === id && <Check size={16} strokeWidth={2.5} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Question Step â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function QuestionStep({
  question, currentAnswer, onAnswer,
}: {
  question: Question;
  currentAnswer: number | string | boolean | undefined;
  onAnswer: (v: number | string | boolean) => void;
}) {
  const [localAnswer, setLocalAnswer] = useState(currentAnswer);

  const handleAnswer = (val: number | string | boolean) => {
    if (localAnswer !== undefined) return; // Prevent clicking multiple while transitioning
    setLocalAnswer(val);
    onAnswer(val);
  };

  const categoryLabel: Record<Question["category"], string> = {
    technical: "Technical Skills",
    workplace: "Workplace Skills",
    digital: "Digital Readiness",
    exposure: "Industry Exposure",
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#f59e0b]">
          {categoryLabel[question.category]}
        </span>
        <h2 className="mt-1.5 font-display text-[22px] font-bold leading-snug text-[#201d1d]">
          {question.text}
        </h2>
        {question.subtitle && (
          <p className="mt-1.5 text-[14px] leading-snug text-[#7a7373]">{question.subtitle}</p>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {/* â”€â”€ Rating 1â€“5 Vertical Cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {question.type === "rating" && (
          <div className="flex flex-col gap-2.5">
            {[1, 2, 3, 4, 5].map((v, i) => (
              <button
                key={v}
                id={`rating-${question.id}-${v}`}
                onClick={() => handleAnswer(v)}
                className={cn(
                  "flex items-center gap-4 rounded-[16px] border px-4 py-4 text-left transition-all",
                  localAnswer === v
                    ? "border-[#6b0000] bg-[#6b0000] text-white shadow-md"
                    : "border-black/[0.07] bg-white text-[#201d1d] active:scale-[0.98]",
                  localAnswer !== undefined && localAnswer !== v && "opacity-50"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-bold transition-colors",
                  localAnswer === v ? "bg-white/20 text-white" : "bg-black/5 text-[#5e5a5a]"
                )}>
                  {v}
                </div>
                <span className="flex-1 text-[15px] font-medium">{RATING_LABELS[i]}</span>
                {localAnswer === v && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check size={18} strokeWidth={2.5} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* â”€â”€ 4-choice â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {question.type === "choice" && (
          <div className="flex flex-col gap-2.5">
            {question.choices!.map(({ value, label }) => (
              <button
                key={value}
                id={`choice-${question.id}-${value}`}
                onClick={() => handleAnswer(value)}
                className={cn(
                  "flex items-center justify-between rounded-[16px] border px-4 py-4 text-left transition-all",
                  localAnswer === value
                    ? "border-[#6b0000] bg-[#6b0000] text-white shadow-md"
                    : "border-black/[0.07] bg-white text-[#201d1d] active:scale-[0.98]",
                  localAnswer !== undefined && localAnswer !== value && "opacity-50"
                )}
              >
                <span className="text-[15px] font-medium">{label}</span>
                {localAnswer === value && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check size={18} strokeWidth={2.5} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* â”€â”€ Yes / No â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {question.type === "yesno" && (
          <div className="flex flex-col gap-3">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map(({ value, label }) => (
              <button
                key={label}
                id={`yesno-${question.id}-${label.toLowerCase()}`}
                onClick={() => handleAnswer(value)}
                className={cn(
                  "flex items-center justify-between rounded-[16px] border px-4 py-4 transition-all",
                  localAnswer === value
                    ? "border-[#6b0000] bg-[#6b0000] text-white shadow-md"
                    : "border-black/[0.07] bg-white text-[#201d1d] active:scale-[0.98]",
                  localAnswer !== undefined && localAnswer !== value && "opacity-50"
                )}
              >
                <span className="text-[16px] font-bold">{label}</span>
                {localAnswer === value && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check size={18} strokeWidth={2.5} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STAGE 3 â€” Signup Screen
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SignupScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const valid = form.name.trim().length > 1 && form.email.includes("@") && form.password.length >= 6;

  return (
    <div className="flex h-full flex-col bg-[#f5f3f0]">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 bg-white px-4 pt-12 pb-4 shadow-sm">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f3f0] text-[#5e5a5a]"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-display text-[16px] font-bold text-[#201d1d]">Account Creation</h2>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 pt-6 pb-10">
        
        {/* Completion moment card */}
        <div className="flex flex-col items-center gap-2.5 rounded-[20px] bg-gradient-to-b from-emerald-50 to-white px-5 py-6 text-center border border-emerald-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-1">
            <CheckCircle2 size={26} strokeWidth={2.5} />
          </div>
          <h3 className="font-display text-[18px] font-bold text-[#201d1d]">
            Micro Audit Complete!
          </h3>
          <p className="text-[13.5px] leading-relaxed text-[#7a7373]">
            You've completed your 60-second workforce readiness check. <br/>
            <span className="font-medium text-[#201d1d]">Create your account to view your results.</span>
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-3.5 mt-2">
          {(
            [
              { key: "name", label: "Full Name", type: "text", placeholder: "Juan dela Cruz" },
              { key: "email", label: "Email Address", type: "email", placeholder: "juan@email.com" },
              { key: "password", label: "Password", type: "password", placeholder: "At least 6 characters" },
            ] as const
          ).map(({ key, label, type, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label
                htmlFor={`signup-${key}`}
                className="text-[11.5px] font-bold uppercase tracking-widest text-[#7a7373]"
              >
                {label}
              </label>
              <input
                id={`signup-${key}`}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="rounded-[14px] border border-black/[0.07] bg-white px-4 py-3.5 text-[14.5px] text-[#201d1d] placeholder:text-[#c0bab5] outline-none transition-colors focus:border-[#6b0000] focus:ring-2 focus:ring-[#6b0000]/10"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-2 flex flex-col gap-3">
          <button
            id="signup-submit"
            onClick={onSubmit}
            disabled={!valid}
            className="w-full rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] py-4 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(107,0,0,0.3)] transition-opacity disabled:opacity-40"
          >
            Create Account &amp; View Results
          </button>
          
          <button className="flex w-full items-center justify-center gap-2.5 rounded-full border border-black/[0.08] bg-white py-3.5 text-[14px] font-bold text-[#201d1d] shadow-sm transition-all active:bg-[#faf9f8]">
            <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} height={18} />
            Continue with Google
          </button>
        </div>

        <p className="mt-2 text-center text-[12px] text-[#9c9595]">
          By continuing, you agree to RoarCast's terms of service.
        </p>
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STAGE 4 â€” Loading Screen
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => {
        if (i < LOADING_MESSAGES.length - 1) return i + 1;
        clearInterval(interval);
        return i;
      });
    }, 1150);
    const timer = setTimeout(onDone, 3700);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onDone]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-9 bg-white px-8">
      {/* Pulsing logo */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.82, 1, 0.82] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-[82px] w-[82px] items-center justify-center overflow-hidden rounded-[24px] shadow-[0_8px_36px_rgba(107,0,0,0.18)]"
      >
        <Image
          src="/assets/roarcast_logo.png"
          alt="RoarCast"
          width={82}
          height={82}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Cycling message */}
      <div className="flex h-8 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.38 }}
            className="text-center text-[14.5px] font-medium text-[#5e5a5a]"
          >
            {LOADING_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-[#6b0000]"
          />
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STAGE 5 â€” Readiness Snapshot
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SnapshotScreen({ result, careerPath }: { result: ReadinessResult; careerPath: string }) {
  const careerLabel = CAREER_PATHS.find(c => c.id === careerPath)?.label ?? "Your Target Role";

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000]">
      {/* Hero header â€” matches dashboard header layout exactly */}
      <header className="relative shrink-0 overflow-hidden px-5 pt-6 pb-8">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <Award size={26} className="text-[#f59e0b]" strokeWidth={2} />
            <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
              Readiness Snapshot
            </h1>
          </div>
          <p className="mt-0.5 text-[13.5px] text-white/80 ml-[36px]">
            Based on your skills and target pathway.
          </p>
        </div>
      </header>

      {/* Content â€” rounded top, overlapping header */}
      <motion.div
        variants={staggerUp}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto bg-[#f5f3f0] rounded-t-[2.5rem] relative z-10 px-4 pt-6 pb-12 flex flex-col gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
      >
        {/* â”€â”€ Score card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center rounded-[24px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        >
          <p className="mb-4 text-center text-[11.5px] font-bold uppercase tracking-widest text-[#7a7373]">
            Your Workforce Readiness
          </p>

          <div className="shrink-0 mb-3">
            <ReadinessRing
              percentage={result.score}
              size={144}
              strokeWidth={12}
              label={result.label}
            />
          </div>

          <p className="mt-2 text-center text-[12px] leading-snug text-[#9c9595]">
            Towards <span className="font-bold text-[#201d1d]">{careerLabel}</span> â€” not a hiring score, a readiness snapshot.
          </p>
        </motion.div>

        {/* â”€â”€ Recommended next step â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col rounded-[20px] border border-[#f59e0b]/25 bg-[#fff8ee] p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#d97706]" strokeWidth={2} />
            <h3 className="text-[12px] font-bold uppercase tracking-wide text-[#d97706]">
              Recommended Next Step
            </h3>
          </div>
          <p className="text-[13.5px] font-medium leading-snug text-[#201d1d]">
            {result.nextStep}
          </p>
        </motion.div>

        {/* â”€â”€ CTAs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.div variants={fadeUp} className="flex flex-col gap-2.5">
          <Link
            id="snapshot-go-to-dashboard"
            href="/dashboard"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] py-4 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(107,0,0,0.3)] transition-all hover:shadow-[0_6px_28px_rgba(107,0,0,0.4)]"
          >
            Go to RoarCast Dashboard <ChevronRight size={18} />
          </Link>
          <Link
            id="snapshot-explore-careers"
            href="/explore/career-paths"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white py-3.5 text-[14px] font-bold text-[#201d1d] shadow-sm transition-all hover:bg-[#faf9f8]"
          >
            Explore My Career Path
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
