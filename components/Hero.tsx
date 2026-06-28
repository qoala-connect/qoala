"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import FloatingCards from "./FloatingCards";

function StatNum({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(value); return; }

    let raf: number;
    let start: number | null = null;
    const duration = 1400;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Framer Motion variants ─────────────────────────────────────────────── */

// Outer container — drives the top-level stagger cadence (~90ms per child)
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// Inner headline container — staggers each line at ~100ms
const headlineVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10 } },
};

// Every animated item fades up 20px → 0 with a spring-like ease
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } },
};

// No-op fallback for prefers-reduced-motion
const noop: Variants = { hidden: {}, show: {} };

export default function Hero() {
  const reduced  = useReducedMotion();
  const heroRef  = useRef<HTMLElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Cursor glow — rAF-throttled, disabled on touch
  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform =
            `translate(calc(${mouseRef.current.x}px - 50%), calc(${mouseRef.current.y}px - 50%))`;
          glowRef.current.style.opacity = "1";
        }
        rafRef.current = 0;
      });
    };

    const onLeave = () => { if (glow) glow.style.opacity = "0"; };

    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  const cV = reduced ? noop : containerVariants;
  const hV = reduced ? noop : headlineVariants;
  const iV = reduced ? noop : itemVariants;

  return (
    <section className="hero" id="home" ref={heroRef}>

      {/* ── Aurora blobs ──────────────────────────────────────────────── */}
      <div className="hero-aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* ── Dot-grid texture ──────────────────────────────────────────── */}
      <div className="hero-dots" aria-hidden="true" />

      {/* ── Cursor glow ───────────────────────────────────────────────── */}
      <div className="hero-cursor-glow" ref={glowRef} aria-hidden="true" />

      <div className="hero-inner">
        {/*
          Stagger order (spec):
          1. Pill
          2. h1 line 1 → line 2 → line 3  (~100ms each, inner stagger)
          3. Subtext
          4. Buttons (both rise together)
          5. Stats row
        */}
        <motion.div
          className="hero-content"
          variants={cV}
          initial="hidden"
          animate="show"
        >
          {/* 1. Pill badge */}
          <motion.div variants={iV} className="hero-badge">
            <span className="hero-badge-dot" />
            Available for new projects
          </motion.div>

          {/* 2. Headline — inner stagger gives line-by-line reveal */}
          <motion.h1 className="hero-h1" variants={hV}>
            <motion.span variants={iV} className="hero-line">Full-Stack Devs.</motion.span>
            <motion.span variants={iV} className="hero-line">
              <em>GenAI Engineers.</em>
            </motion.span>
            <motion.span variants={iV} className="hero-line">Freelance excellence.</motion.span>
          </motion.h1>

          {/* 3. Subtext */}
          <motion.p variants={iV} className="hero-sub">
            We build production-ready Web Apps, Generative AI systems,
            integrations, and prototypes — fast.
          </motion.p>

          {/* 4. CTAs — both buttons rise in together as one item */}
          <motion.div variants={iV} className="hero-cta">
            <a href="#contact" className="btn primary btn-glow">Hire the team</a>
            <a href="#projects" className="btn btn-outline">View work</a>
          </motion.div>

          {/* 5. Stats with count-up */}
          <motion.div variants={iV} className="hero-stats">
            <div className="stat-item">
              <span className="stat-num"><StatNum value={10} suffix="+" /></span>
              <span className="stat-label">Projects Shipped</span>
            </div>
            <div className="stat-item">
              <span className="stat-num"><StatNum value={5} /></span>
              <span className="stat-label">Core Specialists</span>
            </div>
            <div className="stat-item">
              <span className="stat-num"><StatNum value={9} suffix="+" /></span>
              <span className="stat-label">Services Offered</span>
            </div>
          </motion.div>
        </motion.div>

        <FloatingCards />
      </div>
    </section>
  );
}
