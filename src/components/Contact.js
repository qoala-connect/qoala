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

    // Open Gmail compose directly
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=azamnaqvi90@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <section id="contact" className="contact section alt">
      <div className="contact-inner">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          Start a project
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Tell us about the problem you want to solve — we’ll respond within 48
          hours.
        </motion.p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="row">
            <input
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <textarea
            required
            placeholder="Project brief — goals, timeline, budget (optional)"
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="form-actions">
            <button className="btn primary" type="submit">
              Send project brief
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
