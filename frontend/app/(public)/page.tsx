"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Building2, Landmark, Radio } from "lucide-react";
import AnimatedHero from "@/components/AnimatedHero";
import DemandBadge from "@/components/DemandBadge";
import SkillTag from "@/components/SkillTag";
import ReadinessRing from "@/components/ReadinessRing";
import CTASection from "@/components/CTASection";
import { mockDemand } from "@/data/mockDemand";
import { mockSkillResults, overallReadiness } from "@/data/mockSkills";

import ParticlesBackground from "@/components/ParticlesBackground";


const howItWorks = [
  {
    step: "01",
    title: "Industry demand",
    copy: "RoarCast continuously reads real hiring signals from employers across Santa Rosa's growing industrial and business corridor.",
  },
  {
    step: "02",
    title: "Skill Tags",
    copy: "Every posting is broken down into concrete Skill Tags — the actual capabilities employers are hiring for, not just job titles.",
  },
  {
    step: "03",
    title: "Your micro-audit",
    copy: "A 60-second, no-pressure check-in maps what you already bring to the table across the Skill Tags that matter for your track.",
  },
  {
    step: "04",
    title: "Your skill roadmap",
    copy: "RoarCast compares the two and hands you a clear, prioritized roadmap — what's ready, what to strengthen, what to build next.",
  },
];

export default function LandingPage() {
  return (
    <>
      <ParticlesBackground />
      <AnimatedHero />

      {/* A. LIVE SKILL SIGNALS */}
      <section id="skill-signals" className="border-y border-paper-line bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-roar-amber">
                Live Skill Signals
              </p>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                What Santa Rosa employers are hiring for, right now.
              </h2>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
          <div className="flex w-max animate-marquee gap-4 px-6">
            {[...mockDemand, ...mockDemand].map((signal, i) => (
              <div
                key={`${signal.id}-${i}`}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-paper-line bg-paper px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{signal.skill}</p>
                  <p className="text-xs text-ink-faint">{signal.sector}</p>
                </div>
                <DemandBadge label={signal.label} trend={signal.trend} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B. PROBLEM */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-roar-amber">
            The Problem
          </p>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            The job posting shouldn&rsquo;t be the first time you discover what you&rsquo;re missing.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-paper-line bg-white p-8">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Current
            </p>
            <div className="flex flex-col gap-3">
              {["Graduate", "Apply", "Discover Gap"].map((stage, i) => (
                <div key={stage} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-dim font-mono text-xs font-medium text-ink-faint">
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-medium text-ink-soft">{stage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-roar-maroon/15 bg-gradient-to-br from-white to-[#FBF2EF] p-8">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-wide text-roar-maroon">
              RoarCast
            </p>
            <div className="flex flex-col gap-3">
              {["Discover Gap", "Build Skill", "Graduate", "Apply"].map((stage, i) => (
                <div key={stage} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-roar-maroon font-mono text-xs font-medium text-white">
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-medium text-ink">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* C. HOW ROARCAST WORKS */}
      <section id="how-it-works" className="border-y border-paper-line bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-roar-amber">
              How It Works
            </p>
            <h2 className="text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
              From market signal to your next move.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <span className="mb-4 font-display text-3xl font-semibold text-roar-yellow">
                  {item.step}
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{item.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* D. STUDENT DASHBOARD PREVIEW */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-roar-amber">
              Your Dashboard
            </p>
            <h2 className="mb-5 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              One clear picture of where you stand.
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
              Every skill you&rsquo;ve tagged is scored against real local demand, so you always know
              which gaps are worth closing first — and which strengths already put you ahead.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-paper-line bg-white p-8 shadow-card"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Readiness snapshot
                </p>
                <p className="font-display text-lg font-semibold text-ink">Jana Cruz</p>
              </div>
              <ReadinessRing percentage={overallReadiness} size={104} strokeWidth={9} label="ready" />
            </div>

            <div className="flex flex-col gap-3">
              {mockSkillResults.slice(0, 4).map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-xl border border-paper-line px-4 py-3"
                >
                  <div className="flex items-center gap-2.5">
                    <SkillTag label={skill.category} category={skill.category} />
                    <span className="text-sm font-medium text-ink">{skill.name}</span>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-ink-faint">
                    {skill.readiness}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOR INSTITUTIONS — Triple Helix */}
      <section id="for-institutions" className="border-y border-paper-line bg-paper-dim/60 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-roar-amber">
              For Institutions
            </p>
            <h2 className="text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
              Powering the Triple Helix of Santa Rosa.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              RoarCast gives academe, industry, and local government a shared, real-time view of
              workforce readiness — so curriculum, hiring, and policy can move in step.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Academe",
                copy: "See exactly which Skill Tags your students are missing, program by program.",
              },
              {
                icon: Building2,
                title: "Industry",
                copy: "Surface real demand signals directly from hiring activity, without manual surveys.",
              },
              {
                icon: Landmark,
                title: "Government",
                copy: "Track regional workforce readiness trends to guide local economic programs.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-3xl border border-paper-line bg-white p-7">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-roar-maroon/[0.06] text-roar-maroon">
                  <Icon size={20} strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-roar-maroon text-roar-yellow">
          <Radio size={20} strokeWidth={2} aria-hidden="true" />
        </span>
        <h2 className="mb-4 text-balance font-display text-2xl font-semibold text-ink sm:text-3xl">
          Built in Santa Rosa, for Santa Rosa.
        </h2>
        <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-ink-soft">
          RoarCast is a workforce-intelligence platform connecting local students, schools, and
          employers around one question: what does readiness actually look like, right now.
        </p>
      </section>

      {/* E. FINAL CTA */}
      <CTASection
        headline="Know before you graduate."
        ctaLabel="Create My Account"
        ctaHref="/signup"
      />

      <footer className="border-t border-paper-line py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-ink-faint sm:flex-row">
          <span>© 2026 RoarCast. All demand signals shown are illustrative.</span>
          <span>Santa Rosa, Laguna</span>
        </div>
      </footer>
    </>
  );
}
