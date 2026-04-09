"use client";

import { useState } from "react";
import Link from "next/link";
import { KapixMark } from "./icons/kapix-mark";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Platform", href: "/#platform" },
  { label: "Intelligence", href: "/#intelligence" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Team", href: "/#team" },
  { label: "Product", href: "/product" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex h-[72px] items-center justify-between px-14 max-sm:px-6"
        style={{
          background: "color-mix(in srgb, var(--background) 80%, transparent)",
          backdropFilter: "blur(28px) saturate(1.5)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <KapixMark className="h-7 w-7" />
          <span
            className="font-display font-bold text-lg tracking-tight text-foreground"
            style={{ letterSpacing: "-0.02em" }}
          >
            Kapix
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-9">
          {navLinks.map((item) =>
            item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link
                key={item.label}
                href={item.href}
                className="relative font-display text-sm font-medium text-[var(--kapix-mist)] transition-colors hover:text-foreground
                  after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[var(--kapix-emerald)]
                  after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="relative font-display text-sm font-medium text-[var(--kapix-mist)] transition-colors hover:text-foreground
                  after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[var(--kapix-emerald)]
                  after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100"
              >
                {item.label}
              </a>
            )
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden md:block font-display text-sm font-medium text-[var(--kapix-mist)] transition-colors hover:text-foreground"
          >
            Log In
          </Link>
          <Button size="sm" render={<Link href="/signup" />} className="hidden md:inline-flex">
            Get Started
          </Button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-[var(--border-color)]"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className="h-[2px] w-5 rounded-full bg-current transition-all duration-300 origin-center"
              style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
            />
            <span
              className="h-[2px] w-5 rounded-full bg-current transition-all duration-300"
              style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }}
            />
            <span
              className="h-[2px] w-5 rounded-full bg-current transition-all duration-300 origin-center"
              style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          background: "color-mix(in srgb, var(--background) 96%, transparent)",
          backdropFilter: "blur(24px)",
          paddingTop: "72px",
        }}
        onClick={() => setOpen(false)}
      >
        <div
          className="flex h-full flex-col px-6 pt-8 pb-10"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((item, i) =>
              item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-4 font-display text-lg font-semibold transition-colors hover:bg-[var(--surface)] hover:text-[var(--kapix-emerald)]"
                  style={{
                    transitionDelay: `${i * 40}ms`,
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateX(-12px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease, background 0.2s, color 0.2s",
                  }}
                >
                  {item.label}
                  <span className="text-[var(--kapix-ghost)] text-base">→</span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-4 font-display text-lg font-semibold transition-colors hover:bg-[var(--surface)] hover:text-[var(--kapix-emerald)]"
                  style={{
                    transitionDelay: `${i * 40}ms`,
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateX(-12px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease, background 0.2s, color 0.2s",
                  }}
                >
                  {item.label}
                  <span className="text-[var(--kapix-ghost)] text-base">→</span>
                </a>
              )
            )}
          </nav>

          <div
            className="mt-6 h-px"
            style={{ background: "var(--border-color)" }}
          />

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl border px-4 py-3.5 text-center font-display text-sm font-medium transition-colors hover:border-[var(--kapix-emerald)] hover:text-[var(--kapix-emerald)]"
              style={{ borderColor: "var(--border-color)" }}
            >
              Log In
            </Link>
            <Button size="lg" render={<Link href="/signup" onClick={() => setOpen(false)} />}>
              Get Started
            </Button>
          </div>

          <div className="mt-auto pt-8 flex items-center justify-between">
            <a
              href="mailto:ugbefu@usekapix.com"
              className="font-mono text-[0.62rem] tracking-wider text-[var(--kapix-ghost)] hover:text-[var(--kapix-emerald)] transition-colors"
            >
              ugbefu@usekapix.com
            </a>
            <a
              href="https://usekapix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.62rem] tracking-wider text-[var(--kapix-ghost)] hover:text-[var(--kapix-emerald)] transition-colors"
            >
              usekapix.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
