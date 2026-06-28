import Image from "next/image";

const FOOTER_CSS = `
  @keyframes ft-glow {
    0%,100% { opacity: 0.5; }
    50%     { opacity: 1;   }
  }
  .ft-link {
    color: #3d4f6a;
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 500;
    transition: color 0.2s ease, transform 0.2s ease;
    display: inline-block;
    line-height: 1;
  }
  .ft-link:hover { color: #c4d4f0; transform: translateX(4px); }

  .ft-social {
    display: flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    color: #3d4f6a;
    text-decoration: none;
    transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.22s;
    flex-shrink: 0;
  }
  .ft-social:hover {
    background: rgba(124,92,255,.14);
    border-color: rgba(124,92,255,.38);
    color: #a78bfa;
    transform: translateY(-3px);
  }

  .ft-backtop {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 600; color: #3d4f6a;
    text-decoration: none;
    padding: 8px 14px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,.06);
    background: rgba(255,255,255,.02);
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .ft-backtop:hover {
    color: #a78bfa;
    border-color: rgba(124,92,255,.3);
    background: rgba(124,92,255,.06);
  }

  .ft-col-head {
    font-size: 10.5px; font-weight: 700; color: #7c5cff;
    letter-spacing: 0.10em; text-transform: uppercase;
    margin-bottom: 20px;
  }

  .ft-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px 40px;
    padding-bottom: 64px;
  }

  .ft-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0 32px;
  }

  .ft-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 5px 14px; border-radius: 999px;
    background: rgba(124,92,255,.08);
    border: 1px solid rgba(124,92,255,.18);
    font-size: 11px; font-weight: 600; color: #7c5cff;
    letter-spacing: 0.05em; text-transform: uppercase;
    margin-bottom: 18px;
  }

  @media (max-width: 900px) {
    .ft-grid { grid-template-columns: 1fr 1fr !important; }
    .ft-brand-col { grid-column: 1 / -1; }
  }
  @media (max-width: 560px) {
    .ft-grid { grid-template-columns: 1fr !important; }
    .ft-bottom { flex-direction: column !important; gap: 14px !important; text-align: center; }
  }
`;

const SERVICES_LIST = [
  "GenAI Systems",
  "Web Applications",
  "AI Chatbots & Agents",
  "RAG Implementation",
  "WhatsApp Business",
  "No-Code Automation",
];

const COMPANY_LINKS = [
  { label: "Our Team",     href: "#team"     },
  { label: "Projects",     href: "#projects" },
  { label: "Services",     href: "#services" },
  { label: "Contact Us",   href: "#contact"  },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452H17.21v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.044c.432-.816 1.487-1.676 3.062-1.676 3.274 0 3.878 2.155 3.878 4.958v6.609zM5.337 7.433a1.803 1.803 0 110-3.604 1.803 1.803 0 010 3.604zm1.603 13.019H3.733V9h3.207v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      position: "relative",
      background: "linear-gradient(180deg, #070B18 0%, #040610 100%)",
      overflow: "hidden",
    }}>
      <style suppressHydrationWarning>{FOOTER_CSS}</style>

      {/* Top gradient border */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(124,92,255,.65), rgba(91,124,255,.45), transparent)",
        boxShadow: "0 0 28px 2px rgba(124,92,255,.22)",
        animation: "ft-glow 5s ease-in-out infinite",
      }} />

      {/* Background aurora blobs */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-10%", left: "-8%",
        width: 560, height: 560,
        background: "radial-gradient(circle, rgba(124,92,255,.10) 0%, transparent 65%)",
        filter: "blur(120px)", pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-10%", right: "-8%",
        width: 440, height: 440,
        background: "radial-gradient(circle, rgba(59,130,246,.08) 0%, transparent 65%)",
        filter: "blur(120px)", pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translateX(-50%)",
        width: 300, height: 200,
        background: "radial-gradient(ellipse, rgba(124,92,255,.06) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      {/* ── Main wrapper ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 28px 0" }}>

        {/* 4-column grid */}
        <div className="ft-grid">

          {/* Brand column */}
          <div className="ft-brand-col">
            {/* Logo */}
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none", marginBottom: 18 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 13, flexShrink: 0,
                background: "rgba(255,255,255,.07)",
                border: "1px solid rgba(255,255,255,.13)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,.15)",
              }}>
                <Image
                  src="/logo-transparent.png"
                  alt="Qoala"
                  width={25}
                  height={25}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{
                fontWeight: 800, fontSize: 22, color: "#fff",
                letterSpacing: "-0.5px",
                textShadow: "0 0 28px rgba(255,255,255,.14)",
              }}>Qoala</span>
            </a>

            {/* Tagline */}
            <p style={{
              fontSize: 13.5, color: "#3d4f6a", lineHeight: 1.75,
              maxWidth: 270, marginBottom: 30,
            }}>
              Turning ideas into intelligent products — full-stack web, GenAI systems, and smart automation.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="ft-social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="ft-col-head">Services</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SERVICES_LIST.map(label => (
                <a key={label} href="#services" className="ft-link">{label}</a>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <p className="ft-col-head">Company</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {COMPANY_LINKS.map(l => (
                <a key={l.label} href={l.href} className="ft-link">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <p className="ft-col-head">Get in touch</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="mailto:qoala.connect@gmail.com" className="ft-link" style={{ wordBreak: "break-word" }}>
                qoala.connect@gmail.com
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="ft-link">
                WhatsApp Us
              </a>
              <a href="#contact" className="ft-link">Start a Project</a>
            </div>

            {/* CTA pill */}
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 24,
              padding: "10px 20px", borderRadius: 999,
              background: "linear-gradient(135deg, #6D6BFF, #9B6BFF)",
              color: "#fff", fontSize: 13, fontWeight: 600,
              textDecoration: "none", letterSpacing: "-0.01em",
              boxShadow: "0 0 28px rgba(124,92,255,.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              whiteSpace: "nowrap",
            }}>
              Hire the team
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 6h7M6 2.5 9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div aria-hidden="true" style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,.055) 20%, rgba(255,255,255,.055) 80%, transparent)",
        }} />

        {/* Bottom bar */}
        <div className="ft-bottom">
          <p style={{ fontSize: 12.5, color: "#253044", margin: 0 }}>
            © {year} Qoala Connect. All rights reserved.
          </p>

          <p style={{ fontSize: 12.5, color: "#253044", margin: 0 }}>
            Made with{" "}
            <span style={{ color: "#7c5cff", fontSize: 13 }}>♥</span>
            {" "}in Lucknow
          </p>

          <a href="#home" className="ft-backtop">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 9.5V2.5M2.5 6 6 2.5 9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
