"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KapixMark } from "@/components/icons/kapix-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "kapix_auth",
        JSON.stringify({ email: form.email, name: `${form.firstName} ${form.lastName}`, role: "USER" })
      );
    }
    router.push("/product");
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
          className="relative w-full max-w-[460px] rounded-2xl p-10"
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
              Create your account
            </h1>
            <p className="mt-2 font-body text-sm text-[var(--kapix-mist)]">
              Start making smarter financial decisions today
            </p>
          </div>

          {/* Metrics strip */}
          <div
            className="mb-8 grid grid-cols-3 rounded-xl"
            style={{ background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.08)" }}
          >
            {[
              { val: "12ms", label: "Avg Latency" },
              { val: "99.97%", label: "Uptime" },
              { val: "2.4B+", label: "Scored" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="py-4 text-center"
                style={i < 2 ? { borderRight: "1px solid rgba(0,212,170,0.08)" } : {}}
              >
                <div className="font-display text-base font-bold text-[var(--kapix-emerald)]">{stat.val}</div>
                <div className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-[var(--kapix-ghost)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="Ada" autoComplete="given-name" value={form.firstName} onChange={set("firstName")} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Lovelace" autoComplete="family-name" value={form.lastName} onChange={set("lastName")} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ada@institution.com"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                placeholder="Apex Capital, NovaBank…"
                autoComplete="organization"
                value={form.institution}
                onChange={set("institution")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                value={form.password}
                onChange={set("password")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
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

            <p className="font-body text-[0.8rem] leading-[1.6] text-[var(--kapix-ghost)]">
              By creating an account you agree to our{" "}
              <a href="#" className="text-[var(--kapix-emerald)] hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-[var(--kapix-emerald)] hover:underline">Privacy Policy</a>.
            </p>

            <Button type="submit" className="w-full" size="md" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-[var(--kapix-mist)]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--kapix-emerald)] transition-opacity hover:opacity-80"
              >
                Sign in
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
