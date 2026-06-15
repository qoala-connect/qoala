import React from "react";
import { motion } from "framer-motion";

const people = [
  { name: "Satyam", role: "GenAI Engineer" },
  { name: "Aman", role: "FullStack Developer" },
  { name: "Azam", role: "Data Engineer" },
  { name: "Suraj", role: "Frontend & Integration" },
];

export default function Team() {
  return (
    <section id="team" className="section">
      <div className="section-label">Who We Are</div>
      <h2 className="section-title">The Team</h2>
      <div className="team-grid">
        {people.map((p, i) => (
          <motion.div
            key={p.name}
            className="team-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="avatar" aria-hidden>
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h4>{p.name}</h4>
            <p>{p.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
