import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <Image src="/logo-transparent.png" alt="Qoala" width={22} height={22} />
          Qoala
        </div>
        <span className="footer-copy">
          © {new Date().getFullYear()} Qoala — Freelance Team
        </span>
      </div>
    </footer>
  );
}
