"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  UserPlus,
  LayoutDashboard,
  Shield,
  Loader2,
  Check,
  Radio,
} from "lucide-react";
import Image from "next/image";
import SignalBackground from "@/components/SignalBackground";
import {
  getAssessmentResult,
  getStudent,
  earnCredential,
  getCredential,
  markProfileAdded,
  isProfileAdded,
} from "@/lib/studentState";
import { staggerContainer, staggerItem, successReveal } from "@/lib/motion";

// ── Mock QR pattern (SVG-based, no external dependency) ──────────────────────

function MockQR({ id }: { id: string }) {
  // A deterministic but visually QR-like pattern using the credential ID
  const cells = Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 7 }, (_, col) => {
      // Fixed corners (finder patterns)
      if (
        (row < 3 && col < 3) ||
        (row < 3 && col >= 4) ||
        (row >= 4 && col < 3)
      ) {
        return true;
      }
      // Deterministic fill based on id hash
      const charCode = id.charCodeAt((row * 7 + col) % id.length) ?? 0;
      return (charCode + row + col) % 3 !== 0;
    })
  );

  return (
    <div
      role="img"
      aria-label="Mock QR code for credential verification"
      className="inline-grid gap-[2px]"
      style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
    >
      {cells.flat().map((filled, i) => (
        <div
          key={i}
          className={`h-4 w-4 rounded-[2px] ${filled ? "bg-ink" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type ActionState = "idle" | "loading" | "done";

export default function CredentialPage() {
  const router = useRouter();
  const [credential, setCredential] = useState<ReturnType<typeof getCredential>>(null);
  const [profileState, setProfileState] = useState<ActionState>("idle");
  const [copyState, setCopyState] = useState<ActionState>("idle");
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const result = getAssessmentResult();
    if (!result?.passed) {
      router.replace("/assessment/erp-workflow");
      return;
    }

    // Earn/load credential
    let cred = getCredential();
    if (!cred) {
      const student = getStudent();
      cred = earnCredential(student.name);
    }
    setCredential(cred);
    setAlreadyAdded(isProfileAdded());

    // Trigger reveal animation
    setTimeout(() => setRevealed(true), 200);
  }, [router]);

  function handleAddToProfile() {
    if (alreadyAdded || profileState === "done") return;
    setProfileState("loading");
    setTimeout(() => {
      markProfileAdded();
      setProfileState("done");
      setAlreadyAdded(true);
    }, 900);
  }

  function handleCopyLink() {
    setCopyState("loading");
    navigator.clipboard
      .writeText(
        `https://roarcast.app/verify/${credential?.credentialId ?? "RC-ERP-2026-01842"}`
      )
      .catch(() => {})
      .finally(() => {
        setCopyState("done");
        setTimeout(() => setCopyState("idle"), 2500);
      });
  }

  if (!credential) return null;

  const issuedDate = new Date(credential.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <SignalBackground />
      <section className="mx-auto max-w-2xl px-6 pb-24 pt-32">
        <AnimatePresence>
          {revealed && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Header */}
              <motion.div variants={staggerItem} className="text-center">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-roar-maroon">
                  Credential Earned
                </p>
                <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {credential.skillName}
                </h1>
              </motion.div>

              {/* Credential card */}
              <motion.div
                variants={successReveal}
                className="relative overflow-hidden rounded-3xl border border-roar-maroon/20 bg-gradient-to-br from-white via-[#FBF2EF] to-[#F5E6E3] p-8 shadow-card sm:p-10"
              >
                {/* Ambient badge glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-roar-yellow opacity-10 blur-3xl"
                />

                {/* Issuer */}
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/roarcast-icon.png"
                      alt="RoarCast Logo"
                      width={28}
                      height={28}
                      className="rounded-full shadow-sm"
                    />
                    <span className="font-display text-sm font-semibold text-ink">RoarCast</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-roar-maroon/20 bg-white/80 px-3 py-1.5 backdrop-blur">
                    <Shield size={12} strokeWidth={2} className="text-roar-maroon" />
                    <span className="font-mono text-[11px] text-roar-maroon">Verified</span>
                  </div>
                </div>

                {/* Skill name */}
                <div className="mb-8">
                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-4 h-0.5 w-16 bg-roar-maroon"
                  />
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {credential.skillName}
                  </h2>
                  <p className="mt-1 font-mono text-sm text-ink-soft">
                    RoarCast Student Credential · Prototype / Demo
                  </p>
                </div>

                {/* Issued to / date */}
                <div className="mb-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                      Issued To
                    </p>
                    <p className="font-display text-lg font-semibold text-ink">
                      {credential.issuedTo}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                      Issued
                    </p>
                    <p className="font-display text-lg font-semibold text-ink">{issuedDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                      Credential ID
                    </p>
                    <p className="font-mono text-sm font-medium text-ink">
                      {credential.credentialId}
                    </p>
                  </div>
                </div>

                {/* QR + Verification */}
                <div className="flex items-end justify-between gap-6 border-t border-roar-maroon/10 pt-6">
                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                      Verification
                    </p>
                    <MockQR id={credential.credentialId} />
                  </div>
                  <div className="text-right">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-roar-maroon px-4 py-2 font-mono text-sm font-medium text-white"
                    >
                      <CheckCircle2 size={14} strokeWidth={2.5} />
                      VERIFIED
                    </motion.span>
                    <p className="mt-2 font-mono text-[10px] text-ink-faint">
                      Prototype · Demo Only
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Skill metadata */}
              <motion.div variants={staggerItem} className="rounded-2xl border border-paper-line bg-white p-6">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Skill Details
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { label: "Pathway", value: "Accounting Operations" },
                    { label: "Format", value: "4 Modules + Assessment" },
                    { label: "Score", value: `${getAssessmentResult()?.score ?? 0}%` },
                    { label: "Platform", value: "RoarCast" },
                    { label: "Type", value: "Prototype Demo" },
                    { label: "Location", value: "Santa Rosa, Laguna" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div variants={staggerItem} className="flex flex-col gap-3">
                {/* Add to profile */}
                <button
                  type="button"
                  onClick={handleAddToProfile}
                  disabled={alreadyAdded}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-colors ${
                    alreadyAdded
                      ? "bg-paper-dim text-ink-soft"
                      : "bg-roar-maroon text-white shadow-glow hover:bg-[#5a0000]"
                  }`}
                >
                  {profileState === "loading" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : alreadyAdded ? (
                    <CheckCircle2 size={16} strokeWidth={2.5} />
                  ) : (
                    <UserPlus size={16} strokeWidth={2.5} />
                  )}
                  {alreadyAdded ? "Added to Profile" : "Add to My Profile"}
                </button>

                {/* Copy verification link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  disabled={copyState === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-4 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
                >
                  {copyState === "loading" ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : copyState === "done" ? (
                    <Check size={15} strokeWidth={2.5} className="text-green-600" />
                  ) : (
                    <Copy size={15} strokeWidth={2.5} />
                  )}
                  {copyState === "done" ? "Copied!" : "Copy Verification Link"}
                </button>

                {/* View Credential Portfolio */}
                <Link
                  href="/credentials/portfolio"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-4 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
                >
                  <Radio size={15} strokeWidth={2.5} />
                  View My Credential Portfolio
                </Link>

                {/* Go to dashboard */}
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-4 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/20 hover:text-ink"
                >
                  <LayoutDashboard size={15} strokeWidth={2.5} />
                  View My Dashboard
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
