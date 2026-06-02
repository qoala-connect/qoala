import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "GenAI Systems",
    desc: "Transform ideas into intelligent, creative AI-powered solutions for real-world impact.",
  },
  {
    title: "Web Applications",
    desc: "Build sleek, scalable, and user-friendly web apps tailored to your business needs.",
  },
  {
    title: "RAG Implementation",
    desc: "Supercharge AI responses with precise, up-to-date, and context-rich information.",
  },
  {
    title: "Tailored AI Chatbots",
    desc: "Deliver 24/7 intelligent conversations with custom-built, domain-specific chatbots.",
  },
  {
    title: "Data Quality Solutions",
    desc: "Ensure your data is clean, reliable, and ready to fuel accurate decision-making.",
  },
  {
    title: "AI-Powered Business Automation",
    desc: "Streamline workflows and boost productivity with smart, automated processes.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <h2 className="section-title">Services</h2>
      <div className="cards">
        {services.map((s, i) => (
          <motion.article
            className="card"
            key={s.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ scale: 1.03, y: -6 }}
          >
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <a className="link" href="#contact">
              Let's talk
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
