"use client";

import React, { useRef, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* Starfield particles scattered across the section */
const SVC_PARTICLES = [
  { l:"8%",  t:"12%", s:1.5, o:0.40, dur:7.2,  dl:0   },
  { l:"15%", t:"68%", s:1.0, o:0.28, dur:9.1,  dl:1.2 },
  { l:"22%", t:"34%", s:2.0, o:0.50, dur:8.4,  dl:2.5 },
  { l:"32%", t:"82%", s:1.0, o:0.25, dur:10.3, dl:0.8 },
  { l:"42%", t:"18%", s:1.5, o:0.35, dur:6.8,  dl:3.1 },
  { l:"55%", t:"56%", s:1.0, o:0.30, dur:11.2, dl:1.7 },
  { l:"63%", t:"28%", s:2.0, o:0.42, dur:7.9,  dl:4.2 },
  { l:"72%", t:"74%", s:1.5, o:0.45, dur:8.7,  dl:0.5 },
  { l:"80%", t:"42%", s:1.0, o:0.30, dur:9.5,  dl:2.9 },
  { l:"88%", t:"88%", s:2.0, o:0.50, dur:6.5,  dl:1.4 },
  { l:"93%", t:"16%", s:1.5, o:0.38, dur:10.8, dl:3.6 },
  { l:"5%",  t:"92%", s:1.0, o:0.22, dur:7.6,  dl:2.0 },
  { l:"48%", t:"8%",  s:1.5, o:0.40, dur:12.1, dl:0.3 },
  { l:"75%", t:"6%",  s:1.0, o:0.30, dur:8.2,  dl:4.8 },
  { l:"28%", t:"52%", s:2.0, o:0.44, dur:9.7,  dl:1.9 },
];

/* ── Service data ──────────────────────────────────────────────────────── */

type Badge = "Core" | "New" | "High demand";

interface Service {
  num:      string;
  title:    string;
  desc:     string;
  badge:    Badge;
  icon:     string;
  accent:   string;
  iconGrad: string;
}

const SERVICES: Service[] = [
  {
    num: "01", title: "GenAI Systems",
    desc: "Transform ideas into intelligent, AI-powered products built for real-world impact.",
    badge: "Core", icon: "sparkles",
    accent: "#7c5cff", iconGrad: "linear-gradient(135deg,#4f35cc,#7c5cff)",
  },
  {
    num: "02", title: "Web Applications",
    desc: "Sleek, scalable, production-grade web apps in Next.js — tailored to your business.",
    badge: "Core", icon: "globe",
    accent: "#3b82f6", iconGrad: "linear-gradient(135deg,#1e40af,#3b82f6)",
  },
  {
    num: "03", title: "RAG Implementation",
    desc: "Supercharge AI with precise, context-rich retrieval over your own documents and data.",
    badge: "Core", icon: "database",
    accent: "#06b6d4", iconGrad: "linear-gradient(135deg,#0e7490,#06b6d4)",
  },
  {
    num: "04", title: "AI Chatbots",
    desc: "24/7 intelligent conversations with domain-specific, custom-built chatbots.",
    badge: "Core", icon: "chat",
    accent: "#8b5cf6", iconGrad: "linear-gradient(135deg,#6d28d9,#8b5cf6)",
  },
  {
    num: "05", title: "AI Automation & Agents",
    desc: "From rule-based triggers to fully autonomous AI agents — intelligent processes that run without you.",
    badge: "High demand", icon: "bolt",
    accent: "#f97316", iconGrad: "linear-gradient(135deg,#c2410c,#f97316)",
  },
  {
    num: "06", title: "Mobile App Development",
    desc: "Cross-platform iOS and Android apps in React Native — one codebase, native performance.",
    badge: "New", icon: "phone",
    accent: "#60a5fa", iconGrad: "linear-gradient(135deg,#1d4ed8,#60a5fa)",
  },
  {
    num: "07", title: "WhatsApp Business Integration",
    desc: "Chatbots, broadcasts, lead capture, and order updates — all automated over WhatsApp.",
    badge: "High demand", icon: "whatsapp",
    accent: "#22c55e", iconGrad: "linear-gradient(135deg,#15803d,#22c55e)",
  },
  {
    num: "08", title: "No-Code Automation",
    desc: "Connect your stack with n8n, Make, and Zapier — CRM pipelines, reporting, and invoicing, zero custom code.",
    badge: "New", icon: "layers",
    accent: "#eab308", iconGrad: "linear-gradient(135deg,#a16207,#eab308)",
  },
  {
    num: "09", title: "Legacy App Modernisation",
    desc: "Migrate outdated PHP, WordPress, or desktop systems to modern, scalable Next.js and cloud-native stacks.",
    badge: "New", icon: "refresh",
    accent: "#a855f7", iconGrad: "linear-gradient(135deg,#7e22ce,#a855f7)",
  },
];

/* ── Badge config ──────────────────────────────────────────────────────── */

const BADGE: Record<Badge, { bg: string; border: string; color: string }> = {
  "Core":        { bg: "rgba(59,130,246,.10)",  border: "rgba(59,130,246,.28)",  color: "#60a5fa" },
  "New":         { bg: "rgba(34,197,94,.09)",   border: "rgba(34,197,94,.26)",   color: "#4ade80" },
  "High demand": { bg: "rgba(249,115,22,.10)",  border: "rgba(249,115,22,.30)",  color: "#fb923c" },
};

/* ── Icons ─────────────────────────────────────────────────────────────── */

function SvcIcon({ name }: { name: string }) {
  const s = {
    stroke: "#fff",
    strokeWidth: 1.65 as number,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none" as const,
  };

  const icons: Record<string, React.ReactNode> = {
    sparkles: (
      <>
        <path {...s} d="M9 3 10.18 7.55 15 9l-4.82 1.45L9 15 7.82 10.45 3 9l4.82-1.45z" />
        <path {...s} d="M18.5 12l.75 2.25L21.5 15l-2.25.75L18.5 18l-.75-2.25L15.5 15l2.25-.75z" />
      </>
    ),
    globe: (
      <>
        <circle {...s} cx="12" cy="12" r="9" />
        <path {...s} d="M3 12h18" />
        <path {...s} d="M12 3a14 14 0 010 18" />
        <path {...s} d="M12 3a14 14 0 000 18" />
      </>
    ),
    database: (
      <>
        <ellipse {...s} cx="12" cy="6.5" rx="7" ry="2.5" />
        <path {...s} d="M5 6.5v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-4" />
        <path {...s} d="M5 10.5v4c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-4" />
        <circle {...s} cx="18.5" cy="19" r="3" />
        <path {...s} d="M18.5 17.5v3M17 19h3" strokeWidth={1.8} />
      </>
    ),
    chat: (
      <>
        <path {...s} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="11" r="1" fill="#fff" />
        <circle cx="12" cy="11" r="1" fill="#fff" />
        <circle cx="15" cy="11" r="1" fill="#fff" />
      </>
    ),
    bolt: (
      <path {...s} d="M13 2 4.09 12.96a.5.5 0 00.41.79H11l-1 8.25 8.91-10.96A.5.5 0 0018.5 10H12L13 2z" />
    ),
    phone: (
      <>
        <rect {...s} x="7" y="2" width="10" height="20" rx="3" />
        <circle cx="12" cy="18" r="1" fill="#fff" />
        <path {...s} d="M10 5.5h4" />
      </>
    ),
    whatsapp: (
      <>
        <path {...s} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8A8.5 8.5 0 018.7 3.8a8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.6z" />
        <path {...s} d="M9 10c0 3.87 3.13 7 7 7" strokeWidth={1.3} />
      </>
    ),
    layers: (
      <>
        <path {...s} d="M12 2L2 7l10 5 10-5-10-5z" />
        <path {...s} d="M2 12l10 5 10-5" />
        <path {...s} d="M2 17l10 5 10-5" />
      </>
    ),
    refresh: (
      <>
        <path {...s} d="M23 4v6h-6" />
        <path {...s} d="M1 20v-6h6" />
        <path {...s} d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      {icons[name] ?? null}
    </svg>
  );
}

/* ── Service Card ──────────────────────────────────────────────────────── */

function ServiceCard({
  svc, index, reduced,
}: {
  svc: Service; index: number; reduced: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);
  const lightRef = useRef<HTMLDivElement>(null);

  /* Radial mouse-glow — direct DOM mutation, no re-render */
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!lightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lightRef.current.style.transform =
      `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    lightRef.current.style.opacity = "1";
  }, []);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => {
    setHovered(false);
    if (lightRef.current) lightRef.current.style.opacity = "0";
  }, []);

  const badge = BADGE[svc.badge];

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 32 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={reduced ? undefined : { once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
      whileHover={reduced ? undefined : { y: -8 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={reduced ? undefined : onMove}
      style={{
        position:        "relative",
        minHeight:       "260px",
        borderRadius:    "22px",
        padding:         "28px 28px 24px",
        background:      "rgba(10,16,30,.72)",
        backdropFilter:  "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border:  hovered ? `1px solid ${svc.accent}44` : "1px solid rgba(255,255,255,.08)",
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,.52), 0 0 0 1px ${svc.accent}1e, 0 0 60px ${svc.accent}18`
          : "0 20px 50px rgba(0,0,0,.35)",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
      }}
    >
      {/* Radial mouse light */}
      <div ref={lightRef} aria-hidden="true" style={{
        position: "absolute", top: 0, left: 0,
        width: 260, height: 260, borderRadius: "50%",
        background: `radial-gradient(circle at center, ${svc.accent}12 0%, transparent 70%)`,
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Card content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", flex: 1 }}>

        {/* Icon + engraved number */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>

          {/* Icon square */}
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: svc.iconGrad,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: hovered
                ? `0 8px 26px ${svc.accent}55`
                : `0 4px 16px ${svc.accent}38, 0 0 0 1px ${svc.accent}20`,
              transition: "box-shadow 0.35s ease",
            }}
          >
            <SvcIcon name={svc.icon} />
          </motion.div>

          {/* Engraved number */}
          <span style={{
            fontSize: 52, fontWeight: 700, color: "#fff", opacity: 0.07,
            lineHeight: 1, letterSpacing: "-2px",
            userSelect: "none", fontVariantNumeric: "tabular-nums",
          }}>{svc.num}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 16.5, fontWeight: 700, color: "#f0f5ff",
          marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.25px",
        }}>{svc.title}</h3>

        {/* Description */}
        <p style={{
          fontSize: 13.5, color: "#64748b", lineHeight: 1.68, flex: 1,
        }}>{svc.desc}</p>

        {/* Badge + arrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>

          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 999,
            background: badge.bg, border: `1px solid ${badge.border}`,
            color: badge.color, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em",
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%", background: badge.color, flexShrink: 0,
              boxShadow: `0 0 6px 1px ${badge.color}`,
            }} />
            {svc.badge}
          </span>

          <motion.div
            animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ color: hovered ? svc.accent : "#2d3f5c", transition: "color 0.3s ease" }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H7M13 3v6"
                stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ──────────────────────────────────────────────────────── */

const SVC_CSS = `
  @keyframes svc-aurora {
    0%   { transform: scale(1)    translate(0px,   0px); }
    25%  { transform: scale(1.07) translate(22px, -18px); }
    50%  { transform: scale(1.12) translate(-12px,-28px); }
    75%  { transform: scale(1.05) translate(16px,  12px); }
    100% { transform: scale(1)    translate(0px,   0px); }
  }
  @keyframes svc-aurora-b {
    0%   { transform: scale(1)    translate(0px,   0px); }
    30%  { transform: scale(1.09) translate(-20px,-14px); }
    60%  { transform: scale(1.05) translate(18px,  20px); }
    100% { transform: scale(1)    translate(0px,   0px); }
  }
  @keyframes svc-float {
    0%,100% { transform: translateY(0px);   }
    50%     { transform: translateY(-12px); }
  }
  @keyframes svc-grid-pulse {
    0%,100% { opacity: 0.9;  }
    50%     { opacity: 0.55; }
  }
  @keyframes svc-cta-grad {
    0%,100% { background-position: 0% 50%;   }
    50%     { background-position: 100% 50%; }
  }
  .svc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  @media (max-width: 1024px) { .svc-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 640px)  { .svc-grid { grid-template-columns: 1fr; } }
  .svc-cta-btn {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 0 32px; height: 52px; border-radius: 999px; flex-shrink: 0;
    background: linear-gradient(135deg,#6D6BFF,#8B6DFF,#B16CFF,#8B6DFF,#6D6BFF);
    background-size: 280% 280%;
    animation: svc-cta-grad 3.5s ease-in-out infinite;
    color: #fff; font-size: 15px; font-weight: 600; text-decoration: none;
    letter-spacing: -0.01em; white-space: nowrap;
    box-shadow: 0 0 36px rgba(124,92,255,.45), 0 2px 16px rgba(124,92,255,.22);
    transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease;
  }
  .svc-cta-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 58px rgba(124,92,255,.72), 0 6px 28px rgba(124,92,255,.40);
  }
  .svc-cta-arrow {
    display: inline-block;
    transition: transform 0.25s cubic-bezier(.22,1,.36,1);
  }
  .svc-cta-btn:hover .svc-cta-arrow { transform: translateX(6px); }
  .svc-cta-panel {
    display: flex; align-items: center;
    justify-content: space-between; gap: 28px;
  }
  @media (max-width: 640px) {
    .svc-cta-panel { flex-direction: column; text-align: center; }
  }
`;

export default function Services() {
  const reduced = useReducedMotion();

  return (
    <section id="services" style={{
      position: "relative", padding: "120px 0 140px",
      background: "linear-gradient(180deg, #040714 0%, #070B18 35%, #0A1020 100%)",
    }}>

      {/* ── Scoped styles ── */}
      <style suppressHydrationWarning>{SVC_CSS}</style>

      {/* ── Layer 1: Large purple aurora — top-left ── */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-5%", left: "-10%",
        width: 700, height: 700,
        background: "radial-gradient(circle, rgba(145,92,255,.28) 0%, transparent 65%)",
        filter: "blur(160px)",
        animation: "svc-aurora 20s ease-in-out infinite",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* ── Layer 2: Large blue aurora — top-right ── */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-5%", right: "-10%",
        width: 700, height: 700,
        background: "radial-gradient(circle, rgba(55,130,255,.22) 0%, transparent 65%)",
        filter: "blur(180px)",
        animation: "svc-aurora-b 22s ease-in-out 3s infinite",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* ── Layer 3: Centre spotlight behind section title ── */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "4%", left: "50%",
        transform: "translateX(-50%)",
        width: 640, height: 320,
        background: "radial-gradient(ellipse, rgba(124,92,255,.18) 0%, transparent 70%)",
        filter: "blur(80px)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* ── Layer 4: Dark vignette — edges ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 38%, rgba(4,7,20,.38) 100%)",
      }} />

      {/* ── Layer 5: Technical grid with glowing dots + edge fade ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: [
          "radial-gradient(circle, rgba(124,92,255,.20) 0.5px, transparent 0.5px)",
          "linear-gradient(rgba(255,255,255,.020) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,.020) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "40px 40px, 40px 40px, 40px 40px",
        maskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 30%, transparent 100%)",
        animation: "svc-grid-pulse 9s ease-in-out infinite",
      }} />

      {/* ── Layer 6: Film-grain noise texture — 2 % opacity ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>")`,
      }} />

      {/* ── Starfield particles ── */}
      {SVC_PARTICLES.map((p, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute",
          left: p.l, top: p.t,
          width: p.s, height: p.s,
          borderRadius: "50%",
          background: i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#60a5fa" : "#e2d9ff",
          opacity: p.o,
          boxShadow: `0 0 ${p.s * 2}px ${p.s}px ${i % 2 === 0 ? "rgba(145,92,255,.35)" : "rgba(55,130,255,.25)"}`,
          animation: `svc-float ${p.dur}s ease-in-out ${p.dl}s infinite`,
          pointerEvents: "none", zIndex: 0,
        }} />
      ))}

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>

        {/* Section header */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={reduced ? undefined : { once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          {/* Badge pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "6px 16px", borderRadius: 999,
            background: "rgba(124,92,255,.10)", border: "1px solid rgba(124,92,255,.22)",
            marginBottom: 22,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#7c5cff", boxShadow: "0 0 8px 1px #7c5cff",
            }} />
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#9a7eff", letterSpacing: "0.1em",
            }}>WHAT WE DO</span>
          </div>

          <h2 style={{
            fontSize: "clamp(44px, 5.5vw, 72px)",
            fontWeight: 800, color: "#fff",
            letterSpacing: "-2px", lineHeight: 1,
            marginBottom: 20,
          }}>Services</h2>

          <p style={{
            maxWidth: 580, margin: "0 auto",
            fontSize: 17, color: "#4a5a78", lineHeight: 1.65,
          }}>
            Production-ready builds across web, AI, and automation — shipped fast.
          </p>
        </motion.div>

        {/* 3 × 3 grid */}
        <div className="svc-grid">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
