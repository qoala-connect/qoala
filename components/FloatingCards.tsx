"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
  Variants,
} from "framer-motion";

/* ── Card metadata ─────────────────────────────────────────────────────── */

interface CardDef {
  id:     string;
  label:  string;
  tag:    string;
  accent: string;
  rotate: number;
  baseX:  number;
  baseY:  number;
  depth:  number;
  zIdx:   number;
}

const CARDS: CardDef[] = [
  { id: "senpy",     label: "SenPy",       tag: "AI CHATBOT", accent: "#5b7cff", rotate: -9, baseX: 0,   baseY: 48, depth: 0.55, zIdx: 1 },
  { id: "intellidq", label: "IntelliDQ",   tag: "DASHBOARD",  accent: "#9a6bff", rotate: -3, baseX: 96,  baseY: 24, depth: 0.75, zIdx: 3 },
  { id: "codemorph", label: "CodeMorphAI", tag: "CODE",       accent: "#60a5fa", rotate:  3, baseX: 192, baseY: 10, depth: 1.00, zIdx: 4 },
  { id: "talk2data", label: "Talk2Data",   tag: "ANALYTICS",  accent: "#a78bfa", rotate:  9, baseX: 288, baseY: 36, depth: 0.65, zIdx: 2 },
];

/* ── Entrance variants ─────────────────────────────────────────────────── */

const wrapVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.88 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Mini UI: SenPy (AI chatbot) ───────────────────────────────────────── */

function SenpyUI({ accent }: { accent: string }) {
  return (
    <div style={{ padding: "12px 10px 8px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6,
          background: accent, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1.5h10v7H7l-3 2.5V8.5H1z" fill="rgba(255,255,255,0.92)" />
          </svg>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#e8f2ff" }}>SenPy</span>
        <span style={{ fontSize: 8, color: "#5a6a88", marginLeft: 2 }}>v2.1</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
        <div style={{
          alignSelf: "flex-start", maxWidth: "82%",
          background: "rgba(91,124,255,0.14)", border: "1px solid rgba(91,124,255,0.22)",
          borderRadius: "10px 10px 10px 2px", padding: "5px 8px",
        }}>
          <p style={{ margin: 0, fontSize: 8.5, color: "#c4d4f0", lineHeight: 1.4 }}>
            How can I assist you today?
          </p>
        </div>

        <div style={{
          alignSelf: "flex-end", maxWidth: "76%",
          background: `${accent}22`, border: `1px solid ${accent}3a`,
          borderRadius: "10px 10px 2px 10px", padding: "5px 8px",
        }}>
          <p style={{ margin: 0, fontSize: 8.5, color: "#e8f2ff", lineHeight: 1.4 }}>
            Summarize this document
          </p>
        </div>

        {/* Typing dots */}
        <div style={{
          alignSelf: "flex-start",
          background: "rgba(91,124,255,0.10)", border: "1px solid rgba(91,124,255,0.16)",
          borderRadius: "10px 10px 10px 2px",
          padding: "8px 10px", display: "flex", gap: 4, alignItems: "center",
        }}>
          <span className="fc-dot fc-dot-1" />
          <span className="fc-dot fc-dot-2" />
          <span className="fc-dot fc-dot-3" />
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        marginTop: 8,
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 8, padding: "5px 8px",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ fontSize: 8, color: "#3d4f6a", flex: 1 }}>Type a message…</span>
        <div style={{
          width: 16, height: 16, borderRadius: "50%", background: accent, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
            <path d="M1 3.5h5M4 1.5l2 2-2 2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Mini UI: IntelliDQ (bar-chart dashboard) ──────────────────────────── */

const BAR_DATA = [
  { h: 55, lbl: "M" },
  { h: 80, lbl: "T" },
  { h: 42, lbl: "W" },
  { h: 90, lbl: "T" },
  { h: 68, lbl: "F" },
];

function IntelliDQUI({ accent }: { accent: string }) {
  return (
    <div style={{ padding: "12px 10px 8px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#e8f2ff" }}>IntelliDQ</span>
      </div>

      {/* Big metric */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#e8f2ff", lineHeight: 1 }}>2,847</div>
        <div style={{ fontSize: 7.5, color: "#4ade80", marginTop: 2 }}>↑ 12.4% vs last week</div>
      </div>

      {/* Bar chart */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4 }}>
        {BAR_DATA.map((b, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{
              width: "100%",
              height: `${Math.round((b.h / 100) * 64)}px`,
              background: i === 3 ? accent : `${accent}42`,
              borderRadius: "3px 3px 0 0",
              minHeight: 4,
            }} />
            <span style={{ fontSize: 7, color: "#4a5a78" }}>{b.lbl}</span>
          </div>
        ))}
      </div>

      {/* Mini metrics row */}
      <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
        {[["Active", "184"], ["Avg ms", "38"]].map(([k, v]) => (
          <div key={k} style={{
            flex: 1, padding: "4px 6px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 6,
          }}>
            <div style={{ fontSize: 6.5, color: "#4a5a78" }}>{k}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#c4d4f0" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mini UI: CodeMorphAI (code editor) ────────────────────────────────── */

const CODE_LINES = [
  [
    { t: "async ",    c: "#60a5fa" }, { t: "fn ",      c: "#e8f2ff" },
    { t: "transform", c: "#86efac" }, { t: "(code) {", c: "#9ca3af" },
  ],
  [
    { t: "  const ", c: "#60a5fa" }, { t: "ast ",   c: "#e8f2ff" },
    { t: "= ",       c: "#9ca3af" }, { t: "parse",  c: "#86efac" },
    { t: "(code);",  c: "#9ca3af" },
  ],
  [
    { t: "  return ", c: "#60a5fa" }, { t: "morph", c: "#86efac" },
    { t: "(ast);",    c: "#9ca3af" },
  ],
  [{ t: "}", c: "#9ca3af" }],
];

function CodeMorphUI({ accent }: { accent: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
      {/* Window chrome */}
      <div style={{
        padding: "7px 10px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {(["#f87171","#fbbf24","#4ade80"] as const).map(c => (
          <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
        ))}
        <span style={{
          marginLeft: 8, fontSize: 8.5, color: "#4a5a78",
          fontFamily: "monospace",
        }}>transform.ts</span>
        <div style={{
          marginLeft: "auto",
          padding: "2px 6px",
          background: `${accent}1a`,
          border: `1px solid ${accent}33`,
          borderRadius: 4,
        }}>
          <span style={{ fontSize: 7.5, color: accent, fontWeight: 600 }}>AI</span>
        </div>
      </div>

      {/* Code */}
      <div style={{ flex: 1, padding: "8px 10px 8px 6px", fontFamily: "monospace", fontSize: 8, lineHeight: "1.65", overflow: "hidden" }}>
        {CODE_LINES.map((line, li) => (
          <div key={li} style={{ display: "flex", whiteSpace: "pre" }}>
            <span style={{ color: "#2d3d5a", width: 14, textAlign: "right", marginRight: 8, flexShrink: 0, userSelect: "none" }}>
              {li + 1}
            </span>
            {line.map((p, pi) => <span key={pi} style={{ color: p.c }}>{p.t}</span>)}
          </div>
        ))}
        <div style={{ display: "flex", whiteSpace: "pre" }}>
          <span style={{ color: "#2d3d5a", width: 14, textAlign: "right", marginRight: 8, userSelect: "none" }}>5</span>
          <span className="fc-cursor" aria-hidden="true">▋</span>
        </div>
      </div>
    </div>
  );
}

/* ── Mini UI: Talk2Data (analytics chart) ──────────────────────────────── */

function Talk2DataUI({ accent }: { accent: string }) {
  const gradId = `fcg-${accent.replace("#", "")}`;
  return (
    <div style={{ padding: "12px 10px 8px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#e8f2ff" }}>Talk2Data</span>
        <span style={{ fontSize: 7.5, color: "#4a5a78" }}>Revenue</span>
      </div>

      <div style={{ marginBottom: 6 }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#e8f2ff" }}>₹48.2L</span>
        <span style={{ fontSize: 8, color: "#4ade80", marginLeft: 6 }}>+23%</span>
      </div>

      {/* SVG chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <svg
          viewBox="0 0 120 55"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={accent} stopOpacity={0.35} />
              <stop offset="100%" stopColor={accent} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <polygon
            points="0,45 20,38 40,35 55,42 70,28 85,22 100,18 120,12 120,55 0,55"
            fill={`url(#${gradId})`}
          />
          <polyline
            points="0,45 20,38 40,35 55,42 70,28 85,22 100,18 120,12"
            fill="none" stroke={accent} strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Metric chips */}
      <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
        {[["Sessions", "1.2K"], ["Avg. Value", "₹4.0K"]].map(([k, v]) => (
          <div key={k} style={{
            flex: 1, padding: "4px 6px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 6,
          }}>
            <div style={{ fontSize: 6.5, color: "#4a5a78" }}>{k}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#c4d4f0" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Per-card wrapper with parallax transform ──────────────────────────── */

interface AnimCardProps {
  card:    CardDef;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  active:  boolean;
}

function AnimCard({ card, springX, springY, active }: AnimCardProps) {
  const tx = useTransform(springX, v => active ? v * card.depth * 40 : 0);
  const ty = useTransform(springY, v => active ? v * card.depth * 24 : 0);

  return (
    <motion.div
      variants={cardVariants}
      style={{
        position: "absolute",
        left:     card.baseX,
        top:      card.baseY,
        width:    168,
        height:   210,
        rotate:   card.rotate,
        x:        tx,
        y:        ty,
        zIndex:   card.zIdx,
        background:     "rgba(7,12,26,0.88)",
        border:         `1px solid ${card.accent}2e`,
        borderRadius:   14,
        overflow:       "hidden",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow:      `0 20px 52px rgba(0,0,0,0.5), 0 0 0 1px ${card.accent}1a`,
      }}
    >
      {/* Accent top stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${card.accent}cc, transparent)`,
        pointerEvents: "none",
      }} />

      {/* Tag pill — top right */}
      <div style={{
        position: "absolute", top: 8, right: 8, zIndex: 5,
        padding: "2px 6px",
        background: `${card.accent}1e`,
        border:     `1px solid ${card.accent}40`,
        borderRadius: 20,
        fontSize: 7, fontWeight: 700, color: card.accent, letterSpacing: "0.06em",
        pointerEvents: "none",
      }}>{card.tag}</div>

      {/* Mock product UI */}
      <div style={{ height: "100%" }}>
        {card.id === "senpy"     && <SenpyUI     accent={card.accent} />}
        {card.id === "intellidq" && <IntelliDQUI accent={card.accent} />}
        {card.id === "codemorph" && <CodeMorphUI accent={card.accent} />}
        {card.id === "talk2data" && <Talk2DataUI accent={card.accent} />}
      </div>
    </motion.div>
  );
}

/* ── Main component ────────────────────────────────────────────────────── */

const FC_CSS = `
  @keyframes fc-blink {
    0%,49%  { opacity: 1; }
    50%,100%{ opacity: 0; }
  }
  @keyframes fc-dot-pulse {
    0%,100%{ opacity: 0.3; transform: scale(0.75); }
    50%    { opacity: 1;   transform: scale(1);    }
  }
  .fc-cursor {
    color: #60a5fa;
    animation: fc-blink 1.1s step-end infinite;
  }
  .fc-dot {
    display: inline-block;
    width: 4px; height: 4px; border-radius: 50%;
    background: #5b7cff;
    animation: fc-dot-pulse 1.2s ease-in-out infinite;
  }
  .fc-dot-1 { animation-delay: 0s;   }
  .fc-dot-2 { animation-delay: 0.2s; }
  .fc-dot-3 { animation-delay: 0.4s; }
  .fc-scale { transform-origin: top center; }
  @media (max-width: 540px) {
    .fc-scale { transform: scale(0.70); margin-bottom: -90px; }
  }
  @media (max-width: 380px) {
    .fc-scale { transform: scale(0.54); margin-bottom: -138px; }
  }
`;

export default function FloatingCards() {
  const reduced = useReducedMotion();
  const [parallax, setParallax] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25, mass: 0.5 });

  useEffect(() => {
    if (reduced || "ontouchstart" in window) return;
    setParallax(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth  - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      mouseX.set(0);
      mouseY.set(0);
    };
  }, [reduced, mouseX, mouseY]);

  return (
    <>
      {/* Scoped keyframes + responsive scale */}
      <style suppressHydrationWarning>{FC_CSS}</style>

      <div
        aria-hidden="true"
        style={{ display: "flex", justifyContent: "center", marginTop: 56, marginBottom: 16 }}
      >
        <div className="fc-scale">
          <motion.div
            variants={wrapVariants}
            initial="hidden"
            animate={reduced ? "hidden" : "show"}
            style={{ position: "relative", width: 460, height: 300, overflow: "visible" }}
          >
            {CARDS.map(card => (
              <AnimCard
                key={card.id}
                card={card}
                springX={springX}
                springY={springY}
                active={parallax}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
