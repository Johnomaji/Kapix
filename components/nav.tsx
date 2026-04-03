"use client";

import Link from "next/link";
import { KapixMark } from "./icons/kapix-mark";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex h-[72px] items-center justify-between px-14 max-sm:px-6"
      style={{
        background: "color-mix(in srgb, var(--background) 80%, transparent)",
        backdropFilter: "blur(28px) saturate(1.5)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <KapixMark className="h-7 w-7" />
        <span
          className="font-display font-bold text-lg tracking-tight text-foreground"
          style={{ letterSpacing: "-0.02em" }}
        >
          Kapix
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex gap-9">
        {["Platform", "Intelligence", "Architecture", "Team"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative font-display text-sm font-medium text-[var(--kapix-mist)] transition-colors hover:text-foreground
              after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[var(--kapix-emerald)]
              after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100"
          >
            {item}
          </a>
        ))}
        <Link
          href="/product"
          className="relative font-display text-sm font-medium text-[var(--kapix-mist)] transition-colors hover:text-foreground
            after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-px after:bg-[var(--kapix-emerald)]
            after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100"
        >
          Product
        </Link>
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
        <Button asChild size="sm">
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
