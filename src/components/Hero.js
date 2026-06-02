import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <motion.h2
          style={{ fontSize: "40px" }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Full Stack Devs. GenAI engineers. Freelance excellence.
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          We build production-ready Web Apps, Generative AI systems,
          integrations, and prototypes — fast.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a href="#contact" className="btn primary">
            Hire the team
          </a>
          <a href="#projects" className="btn">
            View work
          </a>
        </motion.div>
      </div>

      {/* animated blobs / background */}
      <svg
        className="blobs"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M0 300 Q150 400 300 300 T800 300 L800 400 L0 400 Z"
          fill="#f3f7ff"
          animate={{
            d: [
              "M0 300 Q150 360 300 300 T800 300 L800 400 L0 400 Z",
              "M0 320 Q150 380 300 330 T800 300 L800 400 L0 400 Z",
              "M0 300 Q150 400 300 300 T800 300 L800 400 L0 400 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </svg>
    </section>
  );
}
