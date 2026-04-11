"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

// ─── Sidebar structure ─────────────────────────────────────────────────────

const sidebarSections = [
  {
    group: "Getting Started",
    items: [
      { id: "overview",       label: "Overview" },
      { id: "quick-start",    label: "Quick Start" },
      { id: "authentication", label: "Authentication" },
    ],
  },
  {
    group: "Core APIs",
    items: [
      { id: "credit-scoring",    label: "Credit Scoring" },
      { id: "fraud-detection",   label: "Fraud Detection" },
      { id: "risk-assessment",   label: "Risk Assessment" },
      { id: "decision-engine",   label: "Decision Engine" },
    ],
  },
  {
    group: "Integration",
    items: [
      { id: "sdks",         label: "SDKs" },
      { id: "webhooks",     label: "Webhooks" },
      { id: "rate-limits",  label: "Rate Limits" },
      { id: "errors",       label: "Errors & Codes" },
    ],
  },
];

// ─── Reusable block components ────────────────────────────────────────────

function SectionHeading({ id, pill, title, sub }: { id: string; pill: string; title: string; sub?: string }) {
  return (
    <div id={id} className="mb-10 scroll-mt-28">
      <span
        className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-[var(--kapix-emerald)]"
        style={{ background: "rgba(0,212,170,0.08)", borderColor: "rgba(0,212,170,0.14)" }}
      >
        <span className="h-1 w-1 rounded-full bg-[var(--kapix-emerald)]" />
        {pill}
      </span>
      <h2
        className="font-display font-bold leading-tight"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.025em" }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-3 max-w-[600px] font-body leading-[1.7] text-[var(--kapix-mist)]">
          {sub}
        </p>
      )}
    </div>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div
      className="relative my-5 overflow-hidden rounded-xl"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border-color)" }}
    >
      {/* header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--border-color)", background: "rgba(0,0,0,0.15)" }}
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[var(--kapix-ghost)]">
          {lang}
        </span>
        <button
          onClick={copy}
          className="font-mono text-[0.6rem] tracking-wider transition-colors text-[var(--kapix-ghost)] hover:text-[var(--kapix-emerald)]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[0.8rem] leading-[1.75]">
        <code className="font-code text-[var(--kapix-silver)]">{code}</code>
      </pre>
    </div>
  );
}

function ParamRow({ name, type, required, desc }: { name: string; type: string; required?: boolean; desc: string }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
      <td className="py-3 pr-4 align-top">
        <code className="font-code text-[0.78rem] text-[var(--kapix-emerald)]">{name}</code>
        {required && (
          <span className="ml-2 rounded px-1 py-px font-mono text-[0.55rem] font-semibold uppercase tracking-wider"
            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>req</span>
        )}
      </td>
      <td className="py-3 pr-4 align-top">
        <span className="font-mono text-[0.72rem] text-[var(--kapix-ghost)]">{type}</span>
      </td>
      <td className="py-3 align-top font-body text-[0.85rem] text-[var(--kapix-mist)]">{desc}</td>
    </tr>
  );
}

function InfoBox({ type = "info", children }: { type?: "info" | "warn" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: { bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.2)", dot: "#2563EB", label: "Note" },
    warn: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.2)", dot: "#f59e0b", label: "Warning" },
    tip:  { bg: "rgba(0,212,170,0.06)", border: "rgba(0,212,170,0.18)", dot: "#00D4AA", label: "Tip" },
  }[type];

  return (
    <div
      className="my-5 rounded-xl px-5 py-4"
      style={{ background: styles.bg, border: `1px solid ${styles.border}` }}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: styles.dot }} />
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-widest" style={{ color: styles.dot }}>
          {styles.label}
        </span>
      </div>
      <div className="font-body text-[0.875rem] leading-[1.65] text-[var(--kapix-mist)]">{children}</div>
    </div>
  );
}

function EndpointBadge({ method, path }: { method: "GET" | "POST" | "DELETE"; path: string }) {
  const colors = {
    GET:    { bg: "rgba(37,99,235,0.1)",   text: "#4A90E2" },
    POST:   { bg: "rgba(0,212,170,0.08)",  text: "#00D4AA" },
    DELETE: { bg: "rgba(239,68,68,0.08)",  text: "#ef4444" },
  }[method];

  return (
    <div
      className="my-4 flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border-color)" }}
    >
      <span
        className="shrink-0 rounded-md px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-widest"
        style={{ background: colors.bg, color: colors.text }}
      >
        {method}
      </span>
      <code className="font-code text-[0.82rem] text-[var(--kapix-silver)]">{path}</code>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeId, setActiveId] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-based active section tracking
  useEffect(() => {
    const allIds = sidebarSections.flatMap((g) => g.items.map((i) => i.id));

    const observers: IntersectionObserver[] = [];

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    setActiveId(id);
    setMobileSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const Sidebar = (
    <nav className="flex flex-col gap-6">
      {sidebarSections.map((group) => (
        <div key={group.group}>
          <p className="mb-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[var(--kapix-ghost)]">
            {group.group}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="w-full rounded-lg px-3 py-2 text-left font-body text-[0.875rem] transition-colors"
                  style={{
                    background: activeId === item.id ? "rgba(0,212,170,0.08)" : "transparent",
                    color: activeId === item.id ? "var(--kapix-emerald)" : "var(--kapix-mist)",
                    borderLeft: activeId === item.id ? "2px solid var(--kapix-emerald)" : "2px solid transparent",
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground noise-overlay">
      <div className="grid-bg" />
      <Nav />

      {/* ─── Page header ─── */}
      <div
        className="relative z-10 px-14 pt-32 pb-14 max-sm:px-6"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/4"
          style={{
            background: "radial-gradient(ellipse 60% 60%, rgba(0,212,170,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px]">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 font-mono text-[0.65rem] tracking-wider text-[var(--kapix-ghost)]">
            <Link href="/" className="transition-colors hover:text-[var(--kapix-emerald)]">Home</Link>
            <span>/</span>
            <span className="text-[var(--kapix-mist)]">Documentation</span>
          </div>

          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.07em] text-[var(--kapix-emerald)]"
            style={{ background: "rgba(0,212,170,0.08)", borderColor: "rgba(0,212,170,0.14)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--kapix-emerald)]" />
            API Reference v2
          </span>

          <h1
            className="font-display font-extrabold leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", letterSpacing: "-0.035em" }}
          >
            Kapix Documentation
          </h1>
          <p className="mt-4 max-w-[560px] font-body leading-[1.72] text-[var(--kapix-mist)]"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
          >
            Complete reference for the Kapix API — authentication, endpoints, request schemas, response formats, and integration guides.
          </p>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Quick Start",    id: "quick-start" },
              { label: "Authentication", id: "authentication" },
              { label: "Credit Scoring", id: "credit-scoring" },
              { label: "SDKs",           id: "sdks" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="rounded-lg border px-4 py-2 font-mono text-[0.7rem] tracking-wider transition-colors hover:border-[var(--kapix-emerald)] hover:text-[var(--kapix-emerald)]"
                style={{ borderColor: "var(--border-color)", color: "var(--kapix-mist)" }}
              >
                {label} →
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Docs layout ─── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-14 max-sm:px-4">
        <div className="flex gap-12 lg:gap-16">

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto py-10 pr-2">
            {Sidebar}
          </aside>

          {/* ── Mobile sidebar toggle ── */}
          <div className="lg:hidden w-full pt-6">
            <button
              onClick={() => setMobileSidebarOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-xl border px-4 py-3 font-body text-sm transition-colors hover:border-[var(--kapix-emerald)]"
              style={{ borderColor: "var(--border-color)" }}
            >
              <span className="text-[var(--kapix-mist)]">
                Jump to: <span className="text-foreground">
                  {sidebarSections.flatMap((g) => g.items).find((i) => i.id === activeId)?.label ?? "Overview"}
                </span>
              </span>
              <span className="text-[var(--kapix-ghost)]">{mobileSidebarOpen ? "↑" : "↓"}</span>
            </button>
            {mobileSidebarOpen && (
              <div
                className="mt-2 rounded-xl border p-5"
                style={{ background: "var(--surface)", borderColor: "var(--border-color)" }}
              >
                {Sidebar}
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <main ref={contentRef} className="min-w-0 flex-1 py-12 max-sm:py-8">

            {/* ═══ OVERVIEW ═══ */}
            <SectionHeading
              id="overview"
              pill="Overview"
              title="What is Kapix?"
              sub="Kapix is a financial intelligence platform that exposes real-time credit scoring, fraud detection, risk assessment, and decision automation via a unified REST API."
            />

            <p className="mb-5 font-body leading-[1.72] text-[var(--kapix-mist)]">
              Every API call returns a structured decision object — score, confidence, feature attribution, and a full audit trail — within single-digit milliseconds. The platform is built to be dropped into existing systems with minimal integration overhead.
            </p>

            <div
              className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                { icon: "⚡", title: "Sub-15ms",     desc: "Average end-to-end latency per request" },
                { icon: "🔐", title: "SOC 2 Type II", desc: "Certified and PCI DSS compliant" },
                { icon: "🔌", title: "REST + gRPC",   desc: "Flexible integration for every stack" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-5"
                  style={{ background: "var(--surface)", border: "1px solid var(--border-color)" }}
                >
                  <div className="mb-2 text-xl">{item.icon}</div>
                  <div className="font-display text-sm font-semibold">{item.title}</div>
                  <div className="mt-1 font-body text-[0.8rem] leading-snug text-[var(--kapix-mist)]">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ QUICK START ═══ */}
            <SectionHeading
              id="quick-start"
              pill="Quick Start"
              title="Make your first API call"
              sub="Get up and running in under five minutes. You'll need an API key — grab one from the dashboard."
            />

            <h3 className="mb-3 font-display text-base font-semibold">1. Install the SDK</h3>
            <CodeBlock lang="bash" code={`# Node.js
npm install @kapix/sdk

# Python
pip install kapix-sdk

# Go
go get github.com/kapix/kapix-go`} />

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">2. Initialise the client</h3>
            <CodeBlock lang="typescript" code={`import Kapix from "@kapix/sdk";

const client = new Kapix({
  apiKey: process.env.KAPIX_API_KEY,
  region: "af-west-1", // or "eu-west-1", "us-east-1"
});`} />

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">3. Score a credit request</h3>
            <CodeBlock lang="typescript" code={`const result = await client.credit.score({
  entity_id:   "ent_01HXYZ4A3B",
  entity_type: "individual",
  data_sources: ["bureau", "mobile_money", "transaction_history"],
});

console.log(result.score);        // 0.847
console.log(result.decision);     // "approve"
console.log(result.latency_ms);   // 11`} />

            <InfoBox type="tip">
              Set <code className="font-code text-[0.8rem]">KAPIX_API_KEY</code> in your environment rather than hardcoding it. All requests are authenticated via Bearer token — see Authentication below.
            </InfoBox>

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ AUTHENTICATION ═══ */}
            <SectionHeading
              id="authentication"
              pill="Authentication"
              title="Authenticating requests"
              sub="Kapix uses API keys transmitted as Bearer tokens in the Authorization header. All endpoints require authentication."
            />

            <CodeBlock lang="http" code={`Authorization: Bearer kpx_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`} />

            <InfoBox type="warn">
              Never expose your API key in client-side code or public repositories. Rotate keys immediately from the dashboard if a key is compromised.
            </InfoBox>

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">Key types</h3>
            <div
              className="overflow-hidden rounded-xl"
              style={{ border: "1px solid var(--border-color)" }}
            >
              <table className="w-full">
                <thead style={{ background: "var(--surface-2)" }}>
                  <tr>
                    {["Prefix", "Environment", "Usage"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-mono text-[0.6rem] uppercase tracking-widest text-[var(--kapix-ghost)]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ background: "var(--surface)" }}>
                  {[
                    { prefix: "kpx_live_", env: "Production", usage: "Live traffic, billed" },
                    { prefix: "kpx_test_", env: "Sandbox",    usage: "Free, returns synthetic data" },
                  ].map((row) => (
                    <tr key={row.prefix} style={{ borderTop: "1px solid var(--border-color)" }}>
                      <td className="px-5 py-3"><code className="font-code text-[0.78rem] text-[var(--kapix-emerald)]">{row.prefix}</code></td>
                      <td className="px-5 py-3 font-body text-[0.875rem] text-[var(--kapix-mist)]">{row.env}</td>
                      <td className="px-5 py-3 font-body text-[0.875rem] text-[var(--kapix-mist)]">{row.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ CREDIT SCORING ═══ */}
            <SectionHeading
              id="credit-scoring"
              pill="Core API"
              title="Credit Scoring"
              sub="Score any entity — individual, SME, or corporate — in real time with fully explainable AI outputs and regulatory-compliant audit trails."
            />

            <EndpointBadge method="POST" path="/v2/credit/score" />

            <h3 className="mb-3 mt-6 font-display text-base font-semibold">Request body</h3>
            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full" style={{ background: "var(--surface)" }}>
                <thead style={{ background: "var(--surface-2)" }}>
                  <tr>
                    {["Parameter", "Type", "Description"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-mono text-[0.6rem] uppercase tracking-widest text-[var(--kapix-ghost)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ParamRow name="entity_id"    type="string"   required desc="Unique identifier for the entity being scored." />
                  <ParamRow name="entity_type"  type="enum"     required desc='"individual" | "sme" | "corporate"' />
                  <ParamRow name="data_sources" type="string[]" required desc="Array of data source keys to include in the scoring run." />
                  <ParamRow name="context"      type="object"   desc="Optional metadata such as loan purpose, amount, or tenure." />
                  <ParamRow name="explain"      type="boolean"  desc="Set true to include feature attribution in the response. Default: true." />
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">Example request</h3>
            <CodeBlock lang="typescript" code={`const score = await client.credit.score({
  entity_id:   "ent_01HXYZ4A3B",
  entity_type: "individual",
  data_sources: ["bureau", "mobile_money"],
  context: {
    loan_amount:  500000,   // in minor currency units
    loan_purpose: "working_capital",
    tenure_days:  90,
  },
  explain: true,
});`} />

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">Response</h3>
            <CodeBlock lang="json" code={`{
  "score":        0.847,
  "decision":     "approve",
  "confidence":   0.94,
  "risk_band":    "A2",
  "latency_ms":   11,
  "request_id":   "req_01JXYZ9QWE",
  "explanation": {
    "top_features": [
      { "feature": "repayment_consistency", "weight": 0.31, "direction": "positive" },
      { "feature": "mobile_money_velocity", "weight": 0.24, "direction": "positive" },
      { "feature": "bureau_derogatory",     "weight": 0.18, "direction": "negative" }
    ]
  },
  "audit_id": "aud_01JXYZ9QWF"
}`} />

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ FRAUD DETECTION ═══ */}
            <SectionHeading
              id="fraud-detection"
              pill="Core API"
              title="Fraud Detection"
              sub="Detect anomalous patterns across transaction streams in real time. Multi-layered detection reduces false positives by 73% over rule-based systems."
            />

            <EndpointBadge method="POST" path="/v2/fraud/evaluate" />

            <h3 className="mb-3 mt-6 font-display text-base font-semibold">Example request</h3>
            <CodeBlock lang="typescript" code={`const result = await client.fraud.evaluate({
  transaction_id: "txn_01HABC1234",
  amount:         45000,          // minor currency units
  currency:       "NGN",
  sender_id:      "ent_01HXYZ4A3B",
  receiver_id:    "ent_01HABC5678",
  channel:        "mobile_app",
  metadata: {
    device_fingerprint: "fp_xxxx",
    ip_address:         "102.89.x.x",
    session_age_s:      120,
  },
});

// result.fraud_score  — 0.0 (clean) to 1.0 (definite fraud)
// result.action       — "allow" | "challenge" | "block"
// result.signals      — array of triggered signal names`} />

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">Response</h3>
            <CodeBlock lang="json" code={`{
  "fraud_score": 0.07,
  "action":      "allow",
  "confidence":  0.96,
  "signals":     [],
  "latency_ms":  9,
  "request_id":  "req_01JXYZABCD"
}`} />

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ RISK ASSESSMENT ═══ */}
            <SectionHeading
              id="risk-assessment"
              pill="Core API"
              title="Risk Assessment"
              sub="Quantify and decompose portfolio risk in real time. Dynamic models adjust to market shifts, counterparty changes, and macro-economic signals."
            />

            <EndpointBadge method="POST" path="/v2/risk/assess" />
            <EndpointBadge method="GET"  path="/v2/risk/portfolio/{portfolio_id}" />

            <CodeBlock lang="typescript" code={`// Assess a single exposure
const assessment = await client.risk.assess({
  exposure_id:   "exp_01HXYZ0001",
  exposure_type: "loan",
  counterparty:  "ent_01HABC5678",
  amount:        10_000_000,
  currency:      "NGN",
  tenor_days:    180,
});

// result.risk_score     — 0.0 (minimal) to 1.0 (critical)
// result.risk_category  — "low" | "medium" | "high" | "critical"
// result.var_95         — value at risk at 95% confidence
// result.expected_loss  — expected monetary loss`} />

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ DECISION ENGINE ═══ */}
            <SectionHeading
              id="decision-engine"
              pill="Core API"
              title="Decision Engine"
              sub="Automate complex multi-signal workflows. Every decision carries a full audit trail, confidence score, and override capability."
            />

            <EndpointBadge method="POST" path="/v2/decisions/run" />
            <EndpointBadge method="GET"  path="/v2/decisions/{decision_id}" />

            <CodeBlock lang="typescript" code={`const decision = await client.decisions.run({
  policy_id: "pol_loan_origination_v3",
  inputs: {
    credit_score_id: score.request_id,
    fraud_eval_id:   result.request_id,
    applicant_id:    "ent_01HXYZ4A3B",
    requested_amount: 500000,
  },
  override_window_s: 300, // allow manual override for 5 minutes
});

// decision.outcome   — "approve" | "decline" | "refer"
// decision.reason    — human-readable explanation
// decision.audit_id  — immutable audit record ID`} />

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ SDKS ═══ */}
            <SectionHeading
              id="sdks"
              pill="Integration"
              title="SDKs"
              sub="Official SDKs are available for Node.js, Python, Go, and Java. All SDKs are typed, tested, and kept in sync with the API."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { lang: "Node.js / TypeScript", pkg: "npm install @kapix/sdk",         version: "v2.4.1" },
                { lang: "Python",               pkg: "pip install kapix-sdk",           version: "v2.3.0" },
                { lang: "Go",                   pkg: "go get github.com/kapix/kapix-go", version: "v2.2.0" },
                { lang: "Java",                 pkg: "implementation 'io.kapix:sdk:2.1.0'", version: "v2.1.0" },
              ].map((sdk) => (
                <div
                  key={sdk.lang}
                  className="rounded-xl p-5"
                  style={{ background: "var(--surface)", border: "1px solid var(--border-color)" }}
                >
                  <div className="mb-1 font-display text-sm font-semibold">{sdk.lang}</div>
                  <code className="block font-code text-[0.75rem] text-[var(--kapix-emerald)]">{sdk.pkg}</code>
                  <div className="mt-3 font-mono text-[0.6rem] text-[var(--kapix-ghost)]">{sdk.version} · MIT License</div>
                </div>
              ))}
            </div>

            <InfoBox type="info">
              All SDKs auto-retry on <code className="font-code text-[0.8rem]">429</code> (rate limit) and <code className="font-code text-[0.8rem]">503</code> (service unavailable) with exponential backoff. Set <code className="font-code text-[0.8rem]">maxRetries: 0</code> to disable.
            </InfoBox>

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ WEBHOOKS ═══ */}
            <SectionHeading
              id="webhooks"
              pill="Integration"
              title="Webhooks"
              sub="Subscribe to real-time event notifications. Kapix signs every webhook payload so you can verify its authenticity."
            />

            <h3 className="mb-3 font-display text-base font-semibold">Available events</h3>
            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full" style={{ background: "var(--surface)" }}>
                <thead style={{ background: "var(--surface-2)" }}>
                  <tr>
                    {["Event", "Fired when"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-mono text-[0.6rem] uppercase tracking-widest text-[var(--kapix-ghost)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { event: "credit.score.completed", when: "A credit scoring request finishes" },
                    { event: "fraud.alert.raised",     when: "A transaction is flagged or blocked" },
                    { event: "decision.made",          when: "A decision engine policy fires" },
                    { event: "model.drift.detected",   when: "A model's accuracy drops below threshold" },
                    { event: "api_key.rotated",        when: "An API key is created or revoked" },
                  ].map((row) => (
                    <tr key={row.event} style={{ borderTop: "1px solid var(--border-color)" }}>
                      <td className="px-5 py-3"><code className="font-code text-[0.78rem] text-[var(--kapix-emerald)]">{row.event}</code></td>
                      <td className="px-5 py-3 font-body text-[0.875rem] text-[var(--kapix-mist)]">{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">Verifying signatures</h3>
            <CodeBlock lang="typescript" code={`import { createHmac, timingSafeEqual } from "crypto";

function verifyWebhook(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected,  "hex")
  );
}

// In your Express/Next.js route:
const sig = req.headers["kapix-signature"] as string;
if (!verifyWebhook(rawBody, sig, process.env.KAPIX_WEBHOOK_SECRET!)) {
  return res.status(401).json({ error: "Invalid signature" });
}`} />

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ RATE LIMITS ═══ */}
            <SectionHeading
              id="rate-limits"
              pill="Integration"
              title="Rate Limits"
              sub="Limits are applied per API key. Headers on every response tell you your current usage."
            />

            <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full" style={{ background: "var(--surface)" }}>
                <thead style={{ background: "var(--surface-2)" }}>
                  <tr>
                    {["Plan", "Requests / min", "Requests / day", "Burst"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-mono text-[0.6rem] uppercase tracking-widest text-[var(--kapix-ghost)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { plan: "Sandbox",    rpm: "60",    rpd: "5,000",    burst: "10" },
                    { plan: "Growth",     rpm: "600",   rpd: "200,000",  burst: "100" },
                    { plan: "Scale",      rpm: "3,000", rpd: "2,000,000", burst: "500" },
                    { plan: "Enterprise", rpm: "Custom", rpd: "Custom",  burst: "Custom" },
                  ].map((row) => (
                    <tr key={row.plan} style={{ borderTop: "1px solid var(--border-color)" }}>
                      <td className="px-5 py-3 font-display text-sm font-semibold">{row.plan}</td>
                      <td className="px-5 py-3 font-mono text-sm text-[var(--kapix-silver)]">{row.rpm}</td>
                      <td className="px-5 py-3 font-mono text-sm text-[var(--kapix-silver)]">{row.rpd}</td>
                      <td className="px-5 py-3 font-mono text-sm text-[var(--kapix-silver)]">{row.burst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 mt-8 font-display text-base font-semibold">Rate limit headers</h3>
            <CodeBlock lang="http" code={`X-RateLimit-Limit:     600
X-RateLimit-Remaining: 594
X-RateLimit-Reset:     1714492800
Retry-After:           12          # only present on 429 responses`} />

            <div className="my-10 h-px" style={{ background: "var(--border-color)" }} />

            {/* ═══ ERRORS ═══ */}
            <SectionHeading
              id="errors"
              pill="Reference"
              title="Errors & Codes"
              sub="All errors return a consistent JSON shape with a machine-readable code and a human-readable message."
            />

            <CodeBlock lang="json" code={`{
  "error": {
    "code":    "ENTITY_NOT_FOUND",
    "message": "No entity found with id ent_01HXYZ4A3B",
    "docs":    "https://usekapix.com/docs/errors#ENTITY_NOT_FOUND",
    "request_id": "req_01JXYZ9QWE"
  }
}`} />

            <div className="overflow-x-auto rounded-xl mt-6" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full" style={{ background: "var(--surface)" }}>
                <thead style={{ background: "var(--surface-2)" }}>
                  <tr>
                    {["HTTP", "Code", "Meaning"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-mono text-[0.6rem] uppercase tracking-widest text-[var(--kapix-ghost)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { status: "400", code: "VALIDATION_ERROR",       msg: "Request body failed schema validation" },
                    { status: "401", code: "UNAUTHORIZED",            msg: "Missing or invalid API key" },
                    { status: "403", code: "FORBIDDEN",               msg: "Key lacks permission for this endpoint" },
                    { status: "404", code: "ENTITY_NOT_FOUND",        msg: "Requested resource does not exist" },
                    { status: "409", code: "DUPLICATE_REQUEST",       msg: "Idempotency key already used" },
                    { status: "422", code: "INSUFFICIENT_DATA",       msg: "Not enough data to produce a reliable score" },
                    { status: "429", code: "RATE_LIMIT_EXCEEDED",     msg: "Too many requests — check Retry-After header" },
                    { status: "500", code: "INTERNAL_ERROR",          msg: "Unexpected server error — auto-retryable" },
                    { status: "503", code: "SERVICE_UNAVAILABLE",     msg: "Region under elevated load — auto-retryable" },
                  ].map((row) => (
                    <tr key={row.code} style={{ borderTop: "1px solid var(--border-color)" }}>
                      <td className="px-5 py-3">
                        <span
                          className="rounded px-2 py-0.5 font-mono text-[0.72rem] font-semibold"
                          style={{
                            background: row.status.startsWith("2") ? "rgba(0,212,170,0.08)" :
                                        row.status.startsWith("4") ? "rgba(245,158,11,0.08)" :
                                        "rgba(239,68,68,0.08)",
                            color: row.status.startsWith("2") ? "var(--kapix-emerald)" :
                                   row.status.startsWith("4") ? "#f59e0b" : "#ef4444",
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3"><code className="font-code text-[0.75rem] text-[var(--kapix-silver)]">{row.code}</code></td>
                      <td className="px-5 py-3 font-body text-[0.85rem] text-[var(--kapix-mist)]">{row.msg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="tip">
              Include <code className="font-code text-[0.8rem]">request_id</code> when contacting support — it lets the team pull the exact trace from our systems.
            </InfoBox>

            {/* Bottom CTA */}
            <div
              className="mt-16 rounded-2xl p-10 text-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--kapix-emerald), transparent)" }}
              />
              <span
                className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.07em] text-[var(--kapix-emerald)]"
                style={{ background: "rgba(0,212,170,0.08)", borderColor: "rgba(0,212,170,0.14)" }}
              >
                <span className="h-1 w-1 rounded-full bg-[var(--kapix-emerald)]" />
                Ready to build?
              </span>
              <h3
                className="mt-1 font-display font-bold leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", letterSpacing: "-0.025em" }}
              >
                Start with the sandbox — it&apos;s free.
              </h3>
              <p className="mx-auto mt-3 max-w-[440px] font-body text-[0.9rem] leading-[1.65] text-[var(--kapix-mist)]">
                Sandbox keys return synthetic but realistic data. Switch to a live key when you&apos;re ready to go to production.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: "var(--kapix-emerald)", color: "#060A12" }}
                >
                  Get a free API key →
                </Link>
                <a
                  href="mailto:contact@usekapix.com?subject=Enterprise%20API%20Access"
                  className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-display text-sm font-medium transition-colors hover:border-[var(--kapix-emerald)] hover:text-[var(--kapix-emerald)]"
                  style={{ borderColor: "var(--border-color)", color: "var(--kapix-mist)" }}
                >
                  Contact for Enterprise
                </a>
              </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-20" />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
