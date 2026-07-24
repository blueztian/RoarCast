"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  maroon: boolean;
}

interface Signal {
  from: number;
  to: number;
  t: number;
  speed: number;
}

const LINK_DISTANCE = 170;
const CURSOR_RADIUS = 190;

export default function HeroSignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes: Node[] = [];
    let signals: Signal[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let parallax = { x: 0, y: 0 };
    let raf = 0;

    const nodeCount = isSmall ? 22 : 46;
    const signalCount = isSmall ? 6 : 14;

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 1.2,
        maroon: Math.random() < 0.12,
      }));

      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < LINK_DISTANCE) links.push([i, j]);
        }
      }
      signals = Array.from({ length: signalCount }, () => {
        const link = links[Math.floor(Math.random() * links.length)] || [0, Math.min(1, nodes.length - 1)];
        return { from: link[0], to: link[1], t: Math.random(), speed: 0.0025 + Math.random() * 0.003 };
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // update node positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS) {
            const force = (1 - dist / CURSOR_RADIUS) * 0.28;
            n.x += (dx / (dist || 1)) * force;
            n.y += (dy / (dist || 1)) * force;
          }
        }
      }

      const ox = parallax.x;
      const oy = parallax.y;

      // draw links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.16;
            ctx!.strokeStyle = `rgba(182, 117, 0, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x + ox, a.y + oy);
            ctx!.lineTo(b.x + ox, b.y + oy);
            ctx!.stroke();
          }
        }
      }

      // traveling signal particles
      for (const s of signals) {
        const a = nodes[s.from];
        const b = nodes[s.to];
        if (!a || !b) continue;
        s.t += s.speed;
        if (s.t > 1) s.t = 0;
        const x = a.x + (b.x - a.x) * s.t + ox;
        const y = a.y + (b.y - a.y) * s.t + oy;
        const glow = ctx!.createRadialGradient(x, y, 0, x, y, 7);
        glow.addColorStop(0, "rgba(255, 184, 0, 0.9)");
        glow.addColorStop(1, "rgba(255, 184, 0, 0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(x, y, 7, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "rgba(255, 184, 0, 0.95)";
        ctx!.beginPath();
        ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      // nodes
      for (const n of nodes) {
        const x = n.x + ox;
        const y = n.y + oy;
        const color = n.maroon ? "113, 0, 0" : "255, 184, 0";
        const glow = ctx!.createRadialGradient(x, y, 0, x, y, n.r * 5);
        glow.addColorStop(0, `rgba(${color}, 0.22)`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(x, y, n.r * 5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(${color}, 0.55)`;
        ctx!.beginPath();
        ctx!.arc(x, y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      parallax.x = ((mouse.x - cx) / cx) * 6;
      parallax.y = ((mouse.y - cy) / cy) * 6;
    }

    function onPointerLeave() {
      mouse.active = false;
      parallax = { x: 0, y: 0 };
    }

    resize();
    seed();

    if (reduceMotion) {
      draw();
    } else {
      loop();
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
    }

    const ro = new ResizeObserver(() => {
      resize();
      seed();
      if (reduceMotion) draw();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper" />
    </div>
  );
}
