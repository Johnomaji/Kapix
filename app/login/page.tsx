"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KapixMark } from "@/components/icons/kapix-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_EMAIL = "demo@kapix.io";
const DEMO_PASSWORD = "Kapix2026!";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      if (typeof window !== "undefined") {
        localStorage.setItem("kapix_auth", JSON.stringify({ email, name: "Ugbefu Andrew", role: "CEO" }));
      }
      router.push("/product");
    } else {
      setError("Invalid email or password. Use the demo credentials below.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col noise-overlay">
      <div className="grid-bg" />

      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4"
        style={{
          background: "radial-gradient(ellipse 50% 50%, rgba(0,212,170,0.05) 0%, rgba(37,99,235,0.03) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-2.5">
          <KapixMark className="h-7 w-7" />
          <span className="font-display font-bold text-lg text-foreground" style={{ letterSpacing: "-0.02em" }}>
            Kapix
          </span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Card */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div
          className="relative w-full max-w-[420px] rounded-2xl p-10"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{ background: "linear-gradient(90deg, transparent, var(--kapix-emerald), transparent)" }}
          />

          <div className="mb-8 text-center">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.12)" }}
            >
              <KapixMark className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>
              Welcome back
            </h1>
            <p className="mt-2 font-body text-sm text-[var(--kapix-mist)]">
              Sign in to your Kapix account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@institution.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="font-mono text-[0.65rem] text-[var(--kapix-emerald)] transition-opacity hover:opacity-80"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div
                className="rounded-lg px-4 py-3 font-body text-sm"
                style={{ background: "rgba(240,68,68,0.08)", border: "1px solid rgba(240,68,68,0.18)", color: "#F04444" }}
              >
                {error}
              </div>
            )}

            <Button type="submit" className="w-full mt-2" size="lg" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div
            className="mt-5 rounded-lg px-4 py-3"
            style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.10)" }}
          >
            <p className="font-mono text-[0.6rem] text-[var(--kapix-emerald)] font-semibold uppercase tracking-widest mb-1.5">Demo Credentials</p>
            <p className="font-mono text-[0.7rem] text-[var(--kapix-mist)]">Email: <span className="text-foreground">demo@kapix.io</span></p>
            <p className="font-mono text-[0.7rem] text-[var(--kapix-mist)]">Password: <span className="text-foreground">Kapix2026!</span></p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "var(--border-color)" }} />
            <span className="font-mono text-[0.6rem] text-[var(--kapix-ghost)] tracking-wider">OR</span>
            <div className="h-px flex-1" style={{ background: "var(--border-color)" }} />
          </div>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-[var(--kapix-mist)]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[var(--kapix-emerald)] transition-opacity hover:opacity-80"
              >
                Get started
              </Link>
            </p>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-6 flex items-center gap-1.5 font-mono text-[0.6rem] text-[var(--kapix-ghost)] tracking-wider absolute bottom-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--kapix-emerald)]" />
          SOC 2 Type II · PCI DSS Compliant · 256-bit Encryption
        </div>
      </main>
    </div>
  );
}
