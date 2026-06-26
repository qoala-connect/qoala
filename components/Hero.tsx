"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-badge-dot" />
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Full-Stack Devs.<br />
          <em>GenAI Engineers.</em><br />
          Freelance excellence.
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We build production-ready Web Apps, Generative AI systems,
          integrations, and prototypes — fast.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
        >
          <a href="#contact" className="btn primary">Hire the team</a>
          <a href="#projects" className="btn">View work</a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
        >
          <div className="stat-item">
            <span className="stat-num">10+</span>
            <span className="stat-label">Projects Shipped</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">4</span>
            <span className="stat-label">Core Specialists</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">3</span>
            <span className="stat-label">Domains</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
