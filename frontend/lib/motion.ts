/**
 * Shared motion presets — import and reuse across all pages.
 * Never invent a new animation style per screen.
 */

import type { Variants } from "framer-motion";

// ── Timing ───────────────────────────────────────────────────────────────────

export const ease = {
  smooth: [0.16, 1, 0.3, 1] as const,
  out: [0, 0, 0.2, 1] as const,
  in: [0.4, 0, 1, 1] as const,
};

export const duration = {
  micro: 0.15,
  normal: 0.28,
  reveal: 0.5,
  hero: 0.65,
};

// ── Page Transitions ─────────────────────────────────────────────────────────

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.smooth },
  },
};

// ── Fade Up (single element) ──────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.smooth },
  },
};

// ── Fade In ───────────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal },
  },
};

// ── Stagger Container ─────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// ── Stagger Item ──────────────────────────────────────────────────────────────

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.smooth },
  },
};

// ── Card Hover ────────────────────────────────────────────────────────────────

export const cardHover = {
  whileHover: { scale: 1.012, transition: { duration: duration.micro } },
  whileTap: { scale: 0.985, transition: { duration: duration.micro } },
};

// ── Button Press ──────────────────────────────────────────────────────────────

export const buttonPress = {
  whileTap: { scale: 0.96, transition: { duration: duration.micro } },
};

// ── Progress Reveal ───────────────────────────────────────────────────────────

export const progressReveal = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: duration.hero, ease: ease.smooth, delay: 0.2 },
  },
};

// ── Success Reveal ────────────────────────────────────────────────────────────

export const successReveal: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.reveal, ease: ease.smooth },
  },
};

// ── Drawer ────────────────────────────────────────────────────────────────────

export const drawerEnter: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.32, ease: ease.smooth },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.28, ease: ease.in },
  },
};

// ── Modal ─────────────────────────────────────────────────────────────────────

export const modalEnter: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: duration.normal },
  },
};

// ── Backdrop ──────────────────────────────────────────────────────────────────

export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal } },
  exit: { opacity: 0, transition: { duration: duration.micro } },
};
