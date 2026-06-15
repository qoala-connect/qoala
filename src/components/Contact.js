import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("New Project Brief");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=azamnaqvi90@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="section">
      <div className="section-label">Get in Touch</div>
      <h2 className="section-title">Start a Project</h2>
      <div className="contact-wrap">
        <p className="contact-subtitle">
          Tell us about the problem you want to solve — we'll respond within 48 hours.
        </p>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-row">
            <input
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
            <textarea
              required
              placeholder="Project brief — goals, timeline, budget (optional)"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button className="btn primary" type="submit">
              Send project brief
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
