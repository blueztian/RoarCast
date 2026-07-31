"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Measures the real rendered height of a DOM node and keeps it in sync
 * with a ResizeObserver. Used to size a spacer below a `fixed` header so
 * content below it never gets covered, regardless of font metrics,
 * text wrapping, or viewport width.
 */
export function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setHeight(el.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, height };
}
