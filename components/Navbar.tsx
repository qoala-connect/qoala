"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Team",     href: "#team"     },
];

const PARTICLES = [
  { l: "9%",  t: "-6px",              s: 2.5, c: "#9a6bff", d: 0,   dr: 3.2, b: 4 },
  { l: "27%", t: "calc(100% + 5px)",  s: 2.0, c: "#5b7cff", d: 1.0, dr: 4.2, b: 3 },
  { l: "50%", t: "-5px",              s: 1.5, c: "#7c5cff", d: 1.8, dr: 3.8, b: 3 },
  { l: "71%", t: "calc(100% + 7px)",  s: 2.0, c: "#9a6bff", d: 0.5, dr: 4.6, b: 4 },
  { l: "87%", t: "-7px",              s: 2.5, c: "#5b7cff", d: 1.3, dr: 3.5, b: 4 },
  { l: "97%", t: "38%",               s: 1.5, c: "#b36bff", d: 2.1, dr: 5.0, b: 3 },
];

/* Hoisted so template-literal braces are parsed as JS, not JSX */
const NAVBAR_CSS = `
  @keyframes qn-streak {
    0%   { left: -30%; opacity: 0;    }
    8%   { opacity: 0.22; }
    92%  { opacity: 0.22; }
    100% { left: 115%; opacity: 0;   }
  }
  @keyframes qn-particle {
    0%,100% { opacity: 0.20; transform: scale(0.70); }
    50%     { opacity: 0.90; transform: scale(1.30); }
  }
  @keyframes qn-glow-breathe {
    0%,100% { opacity: 0.12; }
    50%     { opacity: 0.22; }
  }
  @keyframes qn-cta-grad {
    0%,100% { background-position: 0% 50%;   }
    50%     { background-position: 100% 50%; }
  }
  .qn-link {
    position: relative;
    color: #A5AEC8;
    text-decoration: none;
    font-size: 14.5px;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 8px;
    letter-spacing: -0.01em;
    transition: color 0.22s cubic-bezier(.22,1,.36,1),
                transform 0.22s cubic-bezier(.22,1,.36,1);
    white-space: nowrap;
  }
  .qn-link:hover { color: #fff; transform: translateY(-2px); }
  .qn-link::after {
    content: '';
    position: absolute;
    bottom: 3px; left: 50%;
    width: 0; height: 1.5px;
    background: linear-gradient(90deg, #7C5CFF, #B16CFF);
    border-radius: 2px;
    transform: translateX(-50%);
    transition: width 0.28s cubic-bezier(.22,1,.36,1);
  }
  .qn-link:hover::after { width: 60%; }
  .qn-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 30px;
    height: 44px;
    border-radius: 999px;
    background: linear-gradient(135deg, #6D6BFF, #8B6DFF, #B16CFF, #8B6DFF, #6D6BFF);
    background-size: 280% 280%;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: -0.01em;
    box-shadow: 0 0 35px rgba(124,92,255,.45), 0 2px 16px rgba(124,92,255,.25);
    animation: qn-cta-grad 3.5s ease-in-out infinite;
    transition: transform 0.25s cubic-bezier(.22,1,.36,1),
                box-shadow 0.25s ease;
    white-space: nowrap;
  }
  .qn-cta:hover {
    transform: scale(1.05);
    box-shadow: 0 0 55px rgba(124,92,255,.72), 0 6px 28px rgba(124,92,255,.42);
  }
  .qn-arrow {
    display: inline-block;
    transition: transform 0.25s cubic-bezier(.22,1,.36,1);
  }
  .qn-cta:hover .qn-arrow { transform: translateX(6px); }
  .qn-logo-sq {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
    background: #ffffff;
    box-shadow: 0 2px 12px rgba(0,0,0,.18), 0 0 0 1px rgba(255,255,255,.12);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
  }
  .qn-logo-sq:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.20);
  }
  .qn-ml {
    display: block; color: #8a9dc0; text-decoration: none;
    padding: 13px 16px; border-radius: 10px;
    font-size: 15px; font-weight: 500;
    transition: color 0.15s, background 0.15s;
  }
  .qn-ml:hover { color: #e8f2ff; background: rgba(255,255,255,.055); }
  @media (max-width: 820px)  { .qn-desk   { display: none !important; } }
  @media (min-width: 821px)  { .qn-burger { display: none !important; } }
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {/* ─── Scoped styles ─── */}
      <style suppressHydrationWarning>{NAVBAR_CSS}</style>

      {/* ─── Ambient glows behind navbar ─── */}
      <div aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 999,
        width: "40%", height: "160px",
        background: "radial-gradient(ellipse at top left, rgba(124,92,255,.18) 0%, transparent 70%)",
        filter: "blur(80px)",
        animation: "qn-glow-breathe 6s ease-in-out infinite",
      }} />
      <div aria-hidden="true" style={{
        position: "fixed", top: 0, right: 0, pointerEvents: "none", zIndex: 999,
        width: "40%", height: "160px",
        background: "radial-gradient(ellipse at top right, rgba(91,124,255,.18) 0%, transparent 70%)",
        filter: "blur(80px)",
        animation: "qn-glow-breathe 6s ease-in-out 3s infinite",
      }} />

      {/* ─── Full-width fixed navbar ─── */}
      <motion.div
        initial={{ y: -110, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.70, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 1000,
        }}
      >
          {/* ── Particles ── */}
          {PARTICLES.map((p, i) => (
            <div key={i} aria-hidden="true" style={{
              position: "absolute",
              left: p.l, top: p.t,
              width: p.s, height: p.s,
              borderRadius: "50%",
              background: p.c,
              boxShadow: `0 0 ${p.b * 2}px ${p.b}px ${p.c}88`,
              animation: `qn-particle ${p.dr}s ease-in-out ${p.d}s infinite`,
              pointerEvents: "none", zIndex: 5,
            }} />
          ))}

          {/* ═══ Glass nav ═══ */}
          <nav style={{
            position: "relative", zIndex: 1,
            height: "72px",
            background: "rgba(8,10,25,0.72)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            boxShadow: "0 1px 0 rgba(124,92,255,.22), 0 8px 40px rgba(0,0,0,.40)",
            overflow: "hidden",
            display: "flex", alignItems: "center",
          }}>

            {/* Moving light streak */}
            <div aria-hidden="true" style={{
              position: "absolute", top: 0,
              width: "26%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)",
              animation: "qn-streak 5.5s ease-in-out 1.2s infinite",
              pointerEvents: "none", zIndex: 3,
            }} />

            {/* Top edge gradient highlight */}
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(90deg, rgba(124,92,255,.38), rgba(255,255,255,.08), rgba(91,124,255,.30))",
              pointerEvents: "none", zIndex: 2,
            }} />

            {/* Bottom subtle purple reflection */}
            <div aria-hidden="true" style={{
              position: "absolute", bottom: 0, left: "14%", right: "14%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(124,92,255,.16), transparent)",
              pointerEvents: "none", zIndex: 2,
            }} />

            {/* ── Content row ── */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 32px", gap: "20px",
            }}>

              {/* Brand */}
              <a href="/" aria-label="Qoala — home" style={{
                display: "flex", alignItems: "center", gap: "12px",
                textDecoration: "none", flexShrink: 0,
              }}>
                <motion.div
                  className="qn-logo-sq"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.06, rotate: 3 }}
                >
                  <Image
                    src="/logo-transparent.png"
                    alt=""
                    width={26}
                    height={26}
                    style={{ objectFit: "contain", filter: "invert(18%) sepia(90%) saturate(1400%) hue-rotate(210deg) brightness(80%) contrast(110%)" }}
                  />
                </motion.div>
                <span style={{
                  fontWeight: 700, fontSize: "18px", color: "#fff",
                  letterSpacing: "-0.4px",
                  textShadow: "0 0 22px rgba(255,255,255,.18)",
                }}>Qoala</span>
              </a>

              {/* Desktop nav links */}
              <div className="qn-desk" style={{
                display: "flex", alignItems: "center", gap: "4px",
                flex: 1, justifyContent: "center",
              }}>
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} className="qn-link">{l.label}</a>
                ))}
              </div>

              {/* Right: CTA + hamburger */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <a href="#contact" className="qn-cta qn-desk">
                  Work with us <span className="qn-arrow">→</span>
                </a>

                <button
                  className="qn-burger"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen(o => !o)}
                  style={{
                    background: "none", border: "none",
                    padding: "8px", cursor: "pointer",
                    display: "flex", flexDirection: "column",
                    gap: "5px", alignItems: "center",
                  }}
                >
                  {[
                    { animate: { rotate: open ? 45 : 0,  y: open ?  7 : 0 } },
                    { animate: { opacity: open ? 0 : 1, scaleX: open ? 0 : 1 } },
                    { animate: { rotate: open ? -45 : 0, y: open ? -7 : 0 } },
                  ].map((bar, i) => (
                    <motion.span
                      key={i}
                      animate={bar.animate}
                      transition={{ duration: 0.22 }}
                      style={{
                        display: "block", width: "22px", height: "2px",
                        background: "#8a9dc0", borderRadius: "2px",
                        transformOrigin: "center",
                      }}
                    />
                  ))}
                </button>
              </div>
            </div>
          </nav>
      </motion.div>

      {/* ─── Mobile dropdown ─── */}
      <div style={{
        position: "fixed", top: "72px", left: 0, right: 0,
        zIndex: 999, display: "flex", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{    opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                width: "calc(90% - 16px)",
                maxWidth: "calc(1200px - 16px)",
                background: "rgba(8,14,28,0.96)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: "1px solid rgba(255,255,255,.09)",
                borderRadius: "16px",
                padding: "10px",
                boxShadow: "0 24px 64px rgba(0,0,0,.55)",
                pointerEvents: "auto",
              }}
            >
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="qn-ml" onClick={close}>
                  {l.label}
                </a>
              ))}
              <div style={{
                margin: "8px 6px 4px", paddingTop: "10px",
                borderTop: "1px solid rgba(255,255,255,.07)",
              }}>
                <a href="#contact" onClick={close} style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", padding: "13px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #6D6BFF, #8B6DFF, #B16CFF)",
                  color: "#fff", fontWeight: 600, fontSize: "15px",
                  textDecoration: "none",
                }}>
                  Work with us →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
