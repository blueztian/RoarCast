import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  eyebrow?: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function CTASection({ eyebrow, headline, ctaLabel, ctaHref }: CTASectionProps) {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-roar-maroon px-8 py-16 text-center sm:px-16 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-roar-yellow/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-roar-amber/20 blur-3xl"
        />
        <div className="relative">
          {eyebrow && (
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-roar-yellow">
              {eyebrow}
            </p>
          )}
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold text-white sm:text-5xl">
            {headline}
          </h2>
          <Link
            href={ctaHref}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-roar-yellow px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {ctaLabel}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
