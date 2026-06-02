import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="logo">Qoala</div>
        <div className={`links ${open ? "open" : ""}`}>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#team">Team</a>
          <a href="#contact" className="cta">
            Work with us
          </a>
        </div>
        <button
          className="burger"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            className="bar"
          />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="bar" />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            className="bar"
          />
        </button>
      </div>
    </nav>
  );
}
