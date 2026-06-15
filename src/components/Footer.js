import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src="/logo-transparent.png" alt="Qoala" />
          Qoala
        </div>
        <span className="footer-copy">
          © {new Date().getFullYear()} Qoala — Freelance Team
        </span>
      </div>
    </footer>
  );
}
