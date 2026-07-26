"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronRight, UserCircle, Bell, ShieldCheck, HelpCircle, LogOut,
} from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const settingsGroups = [
  {
    title: "Account",
    items: [{ icon: UserCircle, label: "Edit Profile, Change Password" }],
  },
  {
    title: "Notifications",
    items: [{ icon: Bell, label: "Email, Push, Reminders" }],
  },
  {
    title: "Privacy & Security",
    items: [{ icon: ShieldCheck, label: "Data & Privacy, 2FA" }],
  },
  {
    title: "Help & Support",
    items: [{ icon: HelpCircle, label: "FAQs, Contact Us" }],
  },
];

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14 rounded-b-[2.5rem]">
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Profile"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
            Settings
          </h1>
        </div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-8 flex flex-col gap-4 pb-12"
      >
        {settingsGroups.map((group) => (
          <motion.section key={group.title} variants={fadeUpItem} className="flex flex-col">
            <h3 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
              {group.title}
            </h3>
            <div className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm border border-black/[0.05]">
              {group.items.map((item, idx) => (
                <button
                  key={item.label}
                  className={`flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-[#faf9f8] ${
                    idx !== group.items.length - 1 ? "border-b border-black/[0.05]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-[#6b0000]" strokeWidth={1.75} />
                    <span className="text-[13.5px] font-medium text-[#201d1d]">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-[#9c9595]" />
                </button>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.button
          variants={fadeUpItem}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-[20px] bg-white py-3.5 text-[13.5px] font-bold text-[#c0392b] shadow-sm border border-black/[0.05] transition-colors hover:bg-red-50"
        >
          <LogOut size={16} /> Log Out
        </motion.button>
      </motion.div>
    </div>
  );
}
