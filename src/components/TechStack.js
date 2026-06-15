import React from "react";
import { motion } from "framer-motion";
import {
  siReact,
  siNextdotjs,
  siPython,
  siTypescript,
  siNodedotjs,
  siTailwindcss,
  siFastapi,
  siDocker,
  siLangchain,
  siPostgresql,
  siHuggingface,
  siSupabase,
  siPrisma,
  siMongodb,
  siJupyter,
  siVercel,
} from "simple-icons";

const row1 = [
  { name: "React",        icon: siReact,       color: "#61DAFB" },
  { name: "Next.js",      icon: siNextdotjs,   color: "#e2e8f0" },
  { name: "Python",       icon: siPython,      color: "#3776AB" },
  { name: "TypeScript",   icon: siTypescript,  color: "#3178C6" },
  { name: "Node.js",      icon: siNodedotjs,   color: "#5FA04E" },
  { name: "FastAPI",      icon: siFastapi,     color: "#009688" },
  { name: "Tailwind CSS", icon: siTailwindcss, color: "#06B6D4" },
  { name: "Docker",       icon: siDocker,      color: "#2496ED" },
];

const row2 = [
  { name: "LangChain",   icon: siLangchain,   color: "#7FC8FF" },
  { name: "PostgreSQL",  icon: siPostgresql,  color: "#4169E1" },
  { name: "HuggingFace", icon: siHuggingface, color: "#FFD21E" },
  { name: "Supabase",    icon: siSupabase,    color: "#3FCF8E" },
  { name: "Prisma",      icon: siPrisma,      color: "#94a3b8" },
  { name: "MongoDB",     icon: siMongodb,     color: "#47A248" },
  { name: "Jupyter",     icon: siJupyter,     color: "#F37626" },
  { name: "Vercel",      icon: siVercel,      color: "#e2e8f0" },
];

function TechPill({ name, icon, color }) {
  return (
    <div className="tech-pill" style={{ "--brand": color }}>
      <svg
        viewBox="0 0 24 24"
        className="tech-pill-icon"
        style={{ fill: color }}
        aria-hidden="true"
      >
        <path d={icon.path} />
      </svg>
      <span>{name}</span>
    </div>
  );
}

function Track({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="tech-track-wrap">
      <div className={`tech-track${reverse ? " tech-track--reverse" : ""}`}>
        {doubled.map((t, i) => (
          <TechPill key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="techstack">
      <motion.div
        className="techstack-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-label" style={{ textAlign: "center" }}>
          Cutting-Edge Tools
        </div>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 0 }}>
          Built with the best
        </h2>
        <p className="techstack-sub">
          Modern stacks, production-grade infra — the tools that actually ship.
        </p>
      </motion.div>

      <motion.div
        className="techstack-tracks"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Track items={row1} />
        <Track items={row2} reverse />
      </motion.div>
    </section>
  );
}
