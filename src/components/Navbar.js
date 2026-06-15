import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href="/">
          <img src="/logo-transparent.png" alt="Qoala" />
          Qoala
        </a>
        <div className={`links ${open ? "open" : ""}`}>
          <a href="#services" onClick={close}>Services</a>
          <a href="#projects" onClick={close}>Projects</a>
          <a href="#team" onClick={close}>Team</a>
          <a href="#contact" className="cta" onClick={close}>Work with us</a>
        </div>
        <button
          className="burger"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="bar" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="bar" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="bar" />
        </button>
      </div>
    </nav>
  );
}
