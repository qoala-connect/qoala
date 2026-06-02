import React from "react";

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{
        display: "flex",
        justifyContent: "center", // centers horizontally
        alignItems: "center", // centers vertically
        padding: "1rem",
      }}
    >
      <div>© {new Date().getFullYear()} Qoala AI — Freelance team.</div>
    </footer>
  );
}
