"use client";

/**
 * IntroOverlay — cinematic preloader for Qoala
 *
 * Sequence (~5 s total):
 *   0 – 4 s   Progress bar climbs 0 → 100 % with an ease-in surge (Math.pow(t, EASE_EXP))
 *             Canvas: particles converge inward, rings emanate from core, core pulses
 *             Text: four phrases decode letter-by-letter from random glyphs
 *   4 s       100 % reached → climax: screen shake → white flash → iris reveal
 *   4 – 5.2 s Iris (transparent circle) expands from center, unveiling the page beneath
 *
 * Tuning: change the ALL-CAPS constants directly below.
 */

import { useEffect, useRef, useState } from "react";

// ─── Tuning ──────────────────────────────────────────────────────────────────
const LOAD_MS      = 4000;   // duration of the 0 → 100 % progress sweep (ms)
const SHAKE_MS     = 340;    // screen-shake CSS animation duration
const FLASH_MS     = 500;    // white-flash fade-in + fade-out total
const REVEAL_MS    = 950;    // iris expansion from center to edge
const EASE_EXP     = 1.6;    // exponent for progress easing — higher = more surge at end
const P_DESKTOP    = 150;    // particle count on screens ≥ 600 px wide
const P_MOBILE     = 55;     // particle count on screens < 600 px wide
const RING_PERIOD  = 2400;   // ms per concentric ring cycle
const CORE_PULSE   = 370;    // ms per core-dot breath cycle
const SESSION_KEY  = "qoala_intro_seen"; // sessionStorage flag — change if you want a reset
// Always show in dev so you don't have to clear sessionStorage on every refresh.
// Automatically false in production builds.
const DEV_ALWAYS   = process.env.NODE_ENV === "development";

// Four decode phrases — each gets LOAD_MS / PHRASES.length ms
const PHRASES = [
  "ESTABLISHING UPLINK",
  "COMPILING INTELLIGENCE",
  "SYNCING NEURAL CORE",
  "QOALA SYSTEMS ONLINE",
] as const;

// Glyph pool for the scramble effect
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?/<>[]{}^~";
const g = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// ─── Particle ────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseSize: number;
  baseAlpha: number;
  hue: number; // 220–280  →  blue → purple range
}

function spawnParticle(W: number, H: number): Particle {
  const edge = Math.floor(Math.random() * 4); // 0 top / 1 right / 2 bottom / 3 left
  const pad = 16;
  let x = 0, y = 0;
  if      (edge === 0) { x = Math.random() * W; y = -pad; }
  else if (edge === 1) { x = W + pad;           y = Math.random() * H; }
  else if (edge === 2) { x = Math.random() * W; y = H + pad; }
  else                 { x = -pad;              y = Math.random() * H; }

  // Aim toward center with a little angular spread so they don't all converge
  // on the exact pixel
  const toCenter = Math.atan2(H / 2 - y, W / 2 - x);
  const angle    = toCenter + (Math.random() - 0.5) * 0.45;
  const speed    = 0.20 + Math.random() * 0.50;

  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    baseSize:  0.7 + Math.random() * 1.7,
    baseAlpha: 0.20 + Math.random() * 0.42,
    hue:       220 + Math.random() * 60,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function IntroOverlay() {
  // Start hidden; the session check will flip this to true on first visit only
  const [active, setActive] = useState(false);

  // All DOM mutations go through these refs so React never re-renders mid-frame
  const overlayRef = useRef<HTMLDivElement>(null);
  const shakeRef   = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const pctRef     = useRef<HTMLSpanElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const flashRef   = useRef<HTMLDivElement>(null);

  // Animation bookkeeping — refs keep them out of the render cycle
  const doneRef    = useRef(false);
  const startRef   = useRef<number | null>(null);
  const rafRef     = useRef<number>(0);
  const particles  = useRef<Particle[]>([]);
  const phraseRef  = useRef({ idx: -1, since: 0 }); // current phrase + when it started
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── First-visit gate ───────────────────────────────────────────────────────
  useEffect(() => {
    // In dev: always show so refreshing works without clearing sessionStorage.
    // In production: show only on the first visit per browser session.
    if (DEV_ALWAYS || !sessionStorage.getItem(SESSION_KEY)) setActive(true);
  }, []);

  // ── Main animation effect ──────────────────────────────────────────────────
  useEffect(() => {
    if (!active) return;

    // React Strict Mode (enabled by default in Next.js dev) runs every effect
    // twice: mount → cleanup → remount. Refs survive that cycle, so we reset
    // all animation state here to prevent doneRef=true from silently killing
    // the RAF loop on the second mount.
    doneRef.current   = false;
    startRef.current  = null;
    rafRef.current    = 0;
    phraseRef.current = { idx: -1, since: 0 };
    timersRef.current = [];

    // ── Reduced motion: 400 ms opacity fade only, no particles/shake/flash ──
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      const el = overlayRef.current;
      if (!el) return;
      el.style.transition = "opacity 0.4s ease";
      el.style.opacity = "0";
      const t = setTimeout(() => setActive(false), 440);
      return () => clearTimeout(t);
    }

    // ── Canvas setup ─────────────────────────────────────────────────────────
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W; // physical pixels
    canvas.height = H;

    const count = W < 600 ? P_MOBILE : P_DESKTOP;
    particles.current = Array.from({ length: count }, () => spawnParticle(W, H));

    // ── Scheduled-timer helper (tracked for cleanup) ──────────────────────
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    // ── Iris reveal: transparent circle grows from center, exposing page ──
    //    Uses mask-image so the page underneath is never blocked or delayed.
    const irisReveal = (duration: number) => {
      const overlay = overlayRef.current;
      if (!overlay) { setActive(false); return; }

      const t0 = performance.now();
      const tick = (now: number) => {
        const p     = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 2); // ease-out quad — slow finish
        // 120 vmax covers the farthest corner of any reasonable viewport
        const r    = eased * 120;
        const mask = `radial-gradient(circle at 50% 50%, transparent ${r}vmax, #050a16 ${r}vmax)`;
        overlay.style.maskImage = mask;
        Object.assign(overlay.style, { webkitMaskImage: mask }); // Safari

        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setActive(false);
          // Return keyboard focus to the page so tab order is correct
          (document.getElementById("main-content") ?? document.body).focus();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    // ── Climax sequence: shake → flash (overlapping) → iris ───────────────
    const runClimax = () => {
      if (shakeRef.current) {
        shakeRef.current.style.animation = `q-shake ${SHAKE_MS}ms ease-in-out`;
      }

      // Flash fades in shortly after shake starts
      later(() => {
        const fl = flashRef.current;
        if (!fl) return;
        fl.style.transition = `opacity ${FLASH_MS * 0.40}ms ease-in`;
        fl.style.opacity    = "1";
        // Then fades back out
        later(() => {
          fl.style.transition = `opacity ${FLASH_MS * 0.60}ms ease-out`;
          fl.style.opacity    = "0";
        }, FLASH_MS * 0.40);
      }, SHAKE_MS * 0.28);

      // Iris begins while flash is at peak — the burst of light masks the seam
      later(
        () => irisReveal(REVEAL_MS),
        SHAKE_MS * 0.50 + FLASH_MS * 0.40,
      );
    };

    // ── Dismiss (end of sequence OR skip) ────────────────────────────────
    const dismiss = (fast: boolean) => {
      if (doneRef.current) return;
      doneRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      cancelAnimationFrame(rafRef.current);

      if (fast) {
        // Skip: jump straight to a quick iris (no shake, no flash)
        irisReveal(280);
      } else {
        // Normal 100 % completion: cinematic climax
        runClimax();
      }
    };

    // Skip on any click or keypress
    const onSkip = () => dismiss(true);
    window.addEventListener("keydown",    onSkip, { once: true });
    window.addEventListener("pointerdown", onSkip, { once: true });

    // ── Main RAF loop ─────────────────────────────────────────────────────
    const PHRASE_MS    = LOAD_MS / PHRASES.length; // ms budgeted per phrase
    const DECODE_FRAC  = 0.50;                     // first 50 % → decode; rest → hold

    const frame = (now: number) => {
      if (doneRef.current) return;
      if (!startRef.current) startRef.current = now;

      const elapsed = now - startRef.current;
      const t       = Math.min(elapsed / LOAD_MS, 1); // 0 → 1

      // ── Progress bar: ease-in surge ──────────────────────────────────
      // pow(t, EASE_EXP) makes the bar creep at first then rush to 100 %.
      const progress = Math.pow(t, EASE_EXP) * 100;
      const charge   = t; // 0 → 1 — shared variable that drives particle energy

      if (barRef.current) {
        barRef.current.style.width     = `${progress.toFixed(2)}%`;
        // Glow intensifies as charge builds
        barRef.current.style.boxShadow = `0 0 ${8 + charge * 14}px rgba(79,107,255,${0.35 + charge * 0.45})`;
      }
      if (pctRef.current) pctRef.current.textContent = `${Math.floor(progress)}%`;

      // ── Phrase decode ────────────────────────────────────────────────
      const phraseIdx = Math.min(Math.floor(elapsed / PHRASE_MS), PHRASES.length - 1);
      if (phraseIdx !== phraseRef.current.idx) {
        phraseRef.current = { idx: phraseIdx, since: now };
      }
      const phraseElapsed = now - phraseRef.current.since;
      const decodeT       = Math.min(phraseElapsed / (PHRASE_MS * DECODE_FRAC), 1);
      const phrase        = PHRASES[phraseIdx];
      const numSettled    = Math.floor(decodeT * phrase.length);

      if (textRef.current) {
        let html = "";
        for (let i = 0; i < phrase.length; i++) {
          if (phrase[i] === " ") {
            // Word gap — explicit non-breaking space so letter-spacing doesn't collapse it
            html += `<span style="display:inline-block;width:0.55em"></span>`;
          } else if (i < numSettled) {
            // Settled character — blue glow
            html += `<span style="color:#93c5fd;text-shadow:0 0 10px rgba(147,197,253,0.70)">${phrase[i]}</span>`;
          } else {
            // Unsettled — dim random glyph, replaced each frame for scramble effect
            html += `<span style="color:#253c58">${g()}</span>`;
          }
        }
        textRef.current.innerHTML = html;
      }

      // ── Canvas: particles + rings + core ─────────────────────────────
      ctx.clearRect(0, 0, W, H);
      const cx       = W / 2;
      const cy       = H / 2;
      const diagHalf = Math.hypot(cx, cy); // max distance from center to corner

      // Two concentric rings emanating outward from the core
      for (let r = 0; r < 2; r++) {
        const period = RING_PERIOD + r * 600;
        const ringT  = ((now + r * period * 0.5) % period) / period;
        ctx.beginPath();
        ctx.arc(cx, cy, ringT * Math.min(W, H) * 0.46, 0, Math.PI * 2);
        ctx.strokeStyle = r === 0
          ? `rgba(96,165,250,${(1 - ringT) * 0.30})`
          : `rgba(167,139,250,${(1 - ringT) * 0.22})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Particles — drift inward, accelerate as charge increases
      for (const p of particles.current) {
        const dist = Math.hypot(cx - p.x, cy - p.y);
        const near = 1 - Math.min(dist / diagHalf, 1); // 0 = far edge, 1 = center

        // Velocity multiplier: base 1× at charge=0, up to ~4.8× at charge=1
        p.x += p.vx * (1 + charge * 3.8);
        p.y += p.vy * (1 + charge * 3.8);

        // Respawn at a random edge when a particle reaches the center
        if (dist < 6) Object.assign(p, spawnParticle(W, H));

        // Near the center: particle grows larger and brighter
        const sizeMult = 1 + near * charge * 2.4;
        const alphMult = 0.32 + near * 0.68 + charge * 0.22;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.35, p.baseSize * sizeMult), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},82%,70%,${Math.min(p.baseAlpha * alphMult, 0.94)})`;
        ctx.fill();
      }

      // Core: radial glow halo + hard white dot (the "energy source")
      const pulse   = 3 + Math.sin(now / CORE_PULSE) * 1.9; // breathing radius
      const glowR   = pulse * 8;
      const grd     = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grd.addColorStop(0,    "rgba(255,255,255,0.92)");
      grd.addColorStop(0.18, `rgba(96,165,250,${0.48 + charge * 0.38})`);
      grd.addColorStop(0.55, `rgba(124,58,237,${0.12 + charge * 0.28})`);
      grd.addColorStop(1,    "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fill();

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        dismiss(false); // 100 % reached — trigger cinematic climax
      }
    };

    rafRef.current = requestAnimationFrame(frame);

    // ── Cleanup: cancel everything on unmount or when active flips to false ─
    return () => {
      doneRef.current = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown",    onSkip);
      window.removeEventListener("pointerdown", onSkip);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [active]);

  // Nothing rendered on repeat visits or after the outro completes
  if (!active) return null;

  return (
    <>
      {/* ── Shake keyframes — injected inline, no external CSS file needed ── */}
      <style>{`
        @keyframes q-shake {
          0%,100% { transform: translate(0,0)       rotate(0deg);    }
          10%      { transform: translate(-7px, 4px)  rotate(-0.5deg); }
          22%      { transform: translate( 7px,-4px)  rotate( 0.4deg); }
          35%      { transform: translate(-5px, 6px)  rotate(-0.3deg); }
          48%      { transform: translate( 5px,-3px)  rotate( 0.3deg); }
          60%      { transform: translate(-3px, 4px)  rotate(-0.2deg); }
          73%      { transform: translate( 3px,-2px)  rotate( 0.1deg); }
          88%      { transform: translate(-1px, 1px)  rotate( 0deg);   }
        }
      `}</style>

      {/*
        aria-hidden + role="presentation" — screen readers skip the decorative
        intro entirely; no spoken content, no ARIA landmarks, no focus traps.
      */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        role="presentation"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        9999,
          background:    "#050a16",
          // pointerEvents: "all" ensures the overlay captures click/tap for the
          // skip handler and prevents accidental interaction with the page beneath
          pointerEvents: "all",
        }}
      >
        {/* Shake wrapper — the q-shake animation is applied here at climax */}
        <div
          ref={shakeRef}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          {/* ── Particle canvas ─────────────────────────────────────────── */}
          {/*    Sized to window dimensions in the effect; styled to fill its  */}
          {/*    container via CSS so it stays crisp during any resize.         */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset:    0,
              width:    "100%",
              height:   "100%",
              display:  "block",
            }}
          />

          {/* ── HUD: decode text + progress bar ─────────────────────────── */}
          <div
            style={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            "30px",
              pointerEvents:  "none", // let clicks pass through to the window listener
            }}
          >
            {/* Decode text — innerHTML updated every frame by the RAF loop */}
            <div
              ref={textRef}
              style={{
                fontFamily:  "'Courier New', Courier, monospace",
                fontSize:    "clamp(9px, 1.4vw, 13px)",
                letterSpacing: "0.30em",
                minHeight:   "20px",
                textAlign:   "center",
                userSelect:  "none",
              }}
            />

            {/* Progress section */}
            <div style={{ width: "clamp(200px, 26vw, 300px)" }}>
              {/* 1 px track */}
              <div
                style={{
                  height:       "1px",
                  background:   "rgba(79,107,255,0.10)",
                  borderRadius: "999px",
                  overflow:     "hidden",
                  marginBottom: "8px",
                }}
              >
                {/* Fill — width and box-shadow driven by RAF loop */}
                <div
                  ref={barRef}
                  style={{
                    height:     "100%",
                    width:      "0%",
                    background: "linear-gradient(90deg, #4f6bff, #7c3aed)",
                  }}
                />
              </div>
              {/* Percentage readout — textContent updated by RAF loop */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span
                  ref={pctRef}
                  style={{
                    fontFamily:    "'Courier New', Courier, monospace",
                    fontSize:      "10px",
                    letterSpacing: "0.14em",
                    color:         "#2e4a62",
                  }}
                >
                  0%
                </span>
              </div>
            </div>
          </div>

          {/* ── Flash layer: radial light burst at climax ────────────────── */}
          {/*    Opacity is set to 0 initially; the climax sequence fades it  */}
          {/*    in then back out via direct style mutations — no re-renders.  */}
          <div
            ref={flashRef}
            style={{
              position:      "absolute",
              inset:         0,
              background:
                "radial-gradient(circle at 50% 50%, " +
                "rgba(255,255,255,0.94) 0%, " +
                "rgba(96,165,250,0.52) 18%, " +
                "rgba(79,107,255,0.16) 46%, " +
                "transparent 70%)",
              opacity:       0,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}
