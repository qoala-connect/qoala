import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "GenAI Systems",
    desc: "Transform ideas into intelligent, AI-powered solutions built for real-world impact.",
  },
  {
    num: "02",
    title: "Web Applications",
    desc: "Build sleek, scalable, and user-friendly web apps tailored to your business.",
  },
  {
    num: "03",
    title: "RAG Implementation",
    desc: "Supercharge AI responses with precise, up-to-date, context-rich information retrieval.",
  },
  {
    num: "04",
    title: "AI Chatbots",
    desc: "Deliver 24/7 intelligent conversations with domain-specific, custom-built chatbots.",
  },
  {
    num: "05",
    title: "Data Quality",
    desc: "Ensure your data is clean, reliable, and ready to fuel accurate decision-making.",
  },
  {
    num: "06",
    title: "AI Automation",
    desc: "Streamline workflows and boost productivity with intelligent, automated processes.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="section-label">What We Do</div>
      <h2 className="section-title">Services</h2>
      <div className="services-grid">
        {services.map((s, i) => (
          <motion.div
            key={s.num}
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="service-number">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
