import Link from "next/link";
import { KapixMark } from "./icons/kapix-mark";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Platform: [
    { label: "Credit Scoring",      href: "/#platform" },
    { label: "Fraud Detection",     href: "/#platform" },
    { label: "Risk Assessment",     href: "/#platform" },
    { label: "Decision Automation", href: "/#platform" },
    { label: "API Reference",       href: "https://usekapix.com/docs" },
  ],
  Company: [
    { label: "About",    href: "/#team" },
    { label: "Team",     href: "/#team" },
    { label: "Careers",  href: "mailto:ugbefu@usekapix.com?subject=Careers%20at%20Kapix" },
    { label: "Press",    href: "mailto:ugbefu@usekapix.com?subject=Press%20Inquiry" },
    { label: "Blog",     href: "https://usekapix.com/blog" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "https://usekapix.com/privacy" },
    { label: "Terms of Service",  href: "https://usekapix.com/terms" },
    { label: "Security",          href: "/#architecture" },
    { label: "Compliance",        href: "/#architecture" },
  ],
};

export function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{ borderTop: "1px solid var(--border-color)" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-14 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] max-sm:px-6">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <KapixMark className="h-6 w-6" />
            <span className="font-display font-bold text-lg text-foreground" style={{ letterSpacing: "-0.02em" }}>
              Kapix
            </span>
          </Link>
          <p className="mt-4 max-w-[270px] font-body text-sm leading-relaxed text-[var(--kapix-mist)]">
            AI-driven financial intelligence for the world&apos;s most demanding decisions. Built by experts. Powered by precision.
          </p>

          {/* Contact */}
          <div className="mt-6 flex flex-col gap-2">
            <a
              href="mailto:ugbefu@usekapix.com"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-wide text-[var(--kapix-ghost)] transition-colors hover:text-[var(--kapix-emerald)]"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3 flex-shrink-0 fill-current opacity-60">
                <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l5 3.125 5-3.125V4a1 1 0 00-1-1H4zm9 2.383L8 8.42 3 5.383V12a1 1 0 001 1h8a1 1 0 001-1V5.383z" />
              </svg>
              ugbefu@usekapix.com
            </a>
            <a
              href="https://usekapix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-wide text-[var(--kapix-ghost)] transition-colors hover:text-[var(--kapix-emerald)]"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3 flex-shrink-0 fill-current opacity-60">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm-.5 1.026v2.456a6.98 6.98 0 00-2.963 1.228L2.868 3.04A6.977 6.977 0 017.5 1.026zm1 0a6.977 6.977 0 014.632 2.014L11.463 4.71A6.98 6.98 0 008.5 3.482V1.026zm-6.132 2.6l1.672 1.671A6.96 6.96 0 002.5 8H1.026a6.977 6.977 0 011.342-4.374zm10.264 0A6.977 6.977 0 0114.974 8H13.5a6.96 6.96 0 00-1.51-3.703l1.642-1.671zM2.5 9h1.474a6.96 6.96 0 001.51 3.703L3.842 14.374A6.977 6.977 0 012.5 9zm9 0h1.474a6.977 6.977 0 01-1.342 4.374L10.013 12.7A6.96 6.96 0 0011.5 9zM5.537 5.537A5.978 5.978 0 018 4.5a5.978 5.978 0 012.463.537A5.978 5.978 0 0111.5 8a5.978 5.978 0 01-.537 2.463A5.978 5.978 0 018 11.5a5.978 5.978 0 01-2.463-.537A5.978 5.978 0 014.5 8a5.978 5.978 0 011.037-2.463z" />
              </svg>
              usekapix.com
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="mb-5 font-display text-xs font-semibold tracking-widest text-[var(--kapix-mist)] uppercase">
              {heading}
            </h4>
            <ul className="space-y-2.5">
              {links.map(({ label, href }) => {
                const isExternal = href.startsWith("http") || href.startsWith("mailto:");
                return (
                  <li key={label}>
                    {isExternal ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-body text-sm text-[var(--kapix-mist)] transition-colors hover:text-[var(--kapix-emerald)]"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="font-body text-sm text-[var(--kapix-mist)] transition-colors hover:text-[var(--kapix-emerald)]"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-14 py-6 max-sm:px-6"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <span className="font-mono text-[10px] tracking-wider text-[var(--kapix-mist)]">
          © 2026 Kapix Technologies Ltd. All rights reserved.
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--kapix-emerald)]" style={{ boxShadow: "0 0 6px rgba(0,212,170,0.6)" }} />
          <span className="font-mono text-[10px] tracking-wider text-[var(--kapix-mist)]">
            Systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
