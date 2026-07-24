"use client";

import { useEffect, useRef } from "react";

/**
 * SignalBackground — ambient canvas animation for student screens.
 *
 * Much quieter than HeroSignalField. This is background infrastructure,
 * not foreground decoration. Text readability is always the priority.
 *
 * - Fewer, slower nodes
 * - Softer opacity (links at 0.08, nodes at 0.18)
 * - Gentle cursor illumination halo only — nodes do NOT scatter
 * - Autonomous on mobile (no cursor logic)
 * - Respects prefers-reduced-motion: only draws one static frame
 */
export default function SignalBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      anchor: boolean; // maroon anchor nodes
    }

    interface Signal {
      from: number;
      to: number;
      t: number;
      speed: number;
    }

    const LINK_DIST = 200;
    const NODE_COUNT = isMobile ? 18 : 38;
    const SIGNAL_COUNT = isMobile ? 4 : 8;
    const cursor = { x: -9999, y: -9999 };

    let nodes: Node[] = [];
    let signals: Signal[] = [];

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        r: Math.random() * 1.4 + 0.8,
        anchor: Math.random() < 0.1,
      }));

      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < LINK_DIST) links.push([i, j]);
        }
      }

      signals = Array.from({ length: SIGNAL_COUNT }, () => {
        const link = links[Math.floor(Math.random() * links.length)] ?? [
          0,
          Math.min(1, nodes.length - 1),
        ];
        return {
          from: link[0],
          to: link[1],
          t: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
        };
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // Move nodes
      if (!reducedMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      // Draw links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.08;
            ctx!.strokeStyle = `rgba(182, 117, 0, ${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Cursor illumination halo (desktop only)
      if (!isMobile && cursor.x > 0) {
        const halo = ctx!.createRadialGradient(
          cursor.x,
          cursor.y,
          0,
          cursor.x,
          cursor.y,
          220
        );
        halo.addColorStop(0, "rgba(255, 184, 0, 0.04)");
        halo.addColorStop(1, "rgba(255, 184, 0, 0)");
        ctx!.fillStyle = halo;
        ctx!.fillRect(0, 0, w, h);
      }

      // Traveling signal particles
      if (!reducedMotion) {
        for (const s of signals) {
          const a = nodes[s.from];
          const b = nodes[s.to];
          if (!a || !b) continue;
          s.t += s.speed;
          if (s.t > 1) s.t = 0;
          const x = a.x + (b.x - a.x) * s.t;
          const y = a.y + (b.y - a.y) * s.t;
          const g = ctx!.createRadialGradient(x, y, 0, x, y, 5);
          g.addColorStop(0, "rgba(255, 184, 0, 0.55)");
          g.addColorStop(1, "rgba(255, 184, 0, 0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(x, y, 5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Nodes
      for (const n of nodes) {
        const color = n.anchor ? "113, 0, 0" : "182, 117, 0";
        // Glow
        const glow = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        glow.addColorStop(0, `rgba(${color}, 0.12)`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx!.fill();
        // Core
        ctx!.fillStyle = `rgba(${color}, 0.28)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(e: MouseEvent) {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    }

    resize();
    seed();

    if (reducedMotion) {
      draw();
    } else {
      loop();
      window.addEventListener("mousemove", onPointerMove, { passive: true });
    }

    const ro = new ResizeObserver(() => {
      resize();
      seed();
      if (reducedMotion) draw();
    });
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className || "pointer-events-none fixed inset-0 -z-10"}
    />
  );
}
