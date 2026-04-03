import Link from "next/link";
import { KapixMark } from "./icons/kapix-mark";

const footerLinks = {
  Platform: ["Credit Scoring", "Fraud Detection", "Risk Assessment", "Decision Automation", "API Reference"],
  Company: ["About", "Team", "Careers", "Press", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "Security", "Compliance"],
};

export function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{ borderTop: "1px solid var(--border-color)" }}
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 px-14 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div className="footer-brand">
          <div className="flex items-center gap-2.5">
            <KapixMark className="h-6 w-6" />
            <span className="font-display font-bold text-lg text-foreground" style={{ letterSpacing: "-0.02em" }}>
              Kapix
            </span>
          </div>
          <p className="mt-4 max-w-[280px] font-body text-sm leading-relaxed text-[var(--kapix-ghost)]">
            AI-driven financial intelligence for the world&apos;s most demanding decisions. Built by experts. Powered by precision.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="mb-5 font-display text-xs font-semibold tracking-widest text-[var(--kapix-mist)] uppercase">
              {heading}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-sm text-[var(--kapix-ghost)] transition-colors hover:text-[var(--kapix-emerald)]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mx-auto flex max-w-[1100px] items-center justify-between px-14 py-6"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <span className="font-mono text-[10px] tracking-wider text-[var(--kapix-ghost)]">
          © 2026 Kapix Technologies Ltd. All rights reserved.
        </span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--kapix-emerald)]" />
          <span className="font-mono text-[10px] tracking-wider text-[var(--kapix-ghost)]">
            Systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
