import React from "react";
import { motion } from "framer-motion";

const people = [
  { name: "Satyam", role: "GenAI Engineer" },
  { name: "Aman", role: "FullStack Developer" },
  { name: "Azam", role: "Data Enginner" },
  { name: "Suraj", role: "Frontend & Integration" },
  { name: "Anusheel", role: "Backend Developer" },
];

export default function Team() {
  return (
    <section id="team" className="section">
      <h2 className="section-title">The Team</h2>
      <div className="team-grid">
        {people.map((p, i) => (
          <motion.div
            key={p.name}
            className="team-card"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="avatar" aria-hidden>
              {p.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="meta">
              <h4>{p.name}</h4>
              <p>{p.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
