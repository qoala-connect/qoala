"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "sending" | "success" | "error">(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      .then(() => {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      })
      .catch(() => setStatus("error"));
  };

  return (
    <section id="contact" className="section">
      <div className="section-label">Get in Touch</div>
      <h2 className="section-title">Start a Project</h2>
      <div className="contact-wrap">
        <p className="contact-subtitle">
          Tell us about the problem you want to solve — we&apos;ll respond within 48 hours.
        </p>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-row">
            <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <input required type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <textarea required placeholder="Project brief — goals, timeline, budget (optional)" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="form-actions">
            <button className="btn primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send project brief"}
            </button>
            {status === "success" && <p className="form-status success">Message sent! We&apos;ll get back to you within 48 hours.</p>}
            {status === "error" && <p className="form-status error">Something went wrong. Please try again.</p>}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
