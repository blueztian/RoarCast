"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has been scrolled past a small threshold.
 * Used to switch a header from its normal in-flow, rounded-overlap state
 * to a pinned/fixed, square-cornered state once the user starts scrolling.
 */
export function useScrolled(threshold = 4) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
