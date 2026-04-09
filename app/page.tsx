import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/count-up";

const metrics = [
  { val: "12ms", label: "Avg Decision Latency" },
  { val: "99.97%", label: "Uptime SLA" },
  { val: "2.4B+", label: "Transactions Scored" },
  { val: "94.6%", label: "Fraud Detection Rate" },
];

const capabilities = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Real-Time Credit Scoring",
    desc: "Continuous credit assessment powered by multi-dimensional data fusion. Score any entity — individual, SME, or corporate — in milliseconds with fully explainable AI outputs and regulatory-compliant audit trails.",
    tag: "12ms avg response",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Fraud Detection & Prevention",
    desc: "Adaptive neural networks that identify anomalous patterns across transaction streams in real time. Multi-layered detection catches threats before they materialise — reducing false positives by 73% over rule-based systems.",
    tag: "94.6% detection rate",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 11-6.219-8.56"/><path d="M22 3L12 13l-3-3"/>
      </svg>
    ),
    title: "Dynamic Risk Assessment",
    desc: "Quantify, decompose, and monitor portfolio risk in real time. Dynamic models adjust to market shifts, counterparty changes, and macro-economic signals — providing continuous risk surfaces rather than static snapshots.",
    tag: "Continuous monitoring",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
    title: "Decision Automation",
    desc: "Configurable decision engines that automate complex workflows — from loan origination to regulatory compliance to portfolio rebalancing. Every decision comes with a full audit trail, confidence score, and override capability.",
    tag: "Zero manual bottlenecks",
  },
];

const howSteps = [
  {
    num: "01",
    title: "Ingest & Normalise",
    desc: "Connect any data source — transaction feeds, credit bureaus, market data, alternative data signals. Kapix normalises and enriches incoming data in real time through our unified data layer.",
  },
  {
    num: "02",
    title: "Analyse & Score",
    desc: "Proprietary AI models evaluate hundreds of dimensions simultaneously — credit risk, fraud probability, compliance flags, market exposure. Every score includes an explanation vector for full transparency.",
  },
  {
    num: "03",
    title: "Decide & Act",
    desc: "Configurable decision rules execute instantly based on model outputs. Approve, decline, escalate, or route — with full audit trails. Your business logic, powered by our intelligence layer.",
  },
];

const archItems = [
  { icon: "⚡", title: "Sub-15ms Latency", desc: "Edge-deployed inference engines deliver decisions faster than network round-trip times." },
  { icon: "🔐", title: "Bank-Grade Security", desc: "End-to-end encryption, SOC 2 Type II compliant, with zero-trust architecture throughout." },
  { icon: "📊", title: "Explainable AI", desc: "Every decision includes feature attribution and confidence intervals. No black boxes." },
  { icon: "🌐", title: "Multi-Region Deploy", desc: "Deploy across AWS, GCP, or on-premise. Data residency controls for every jurisdiction." },
  { icon: "🔄", title: "Continuous Learning", desc: "Models retrain on live data with human-in-the-loop validation and automated drift detection." },
  { icon: "🔌", title: "API-First Design", desc: "RESTful and gRPC APIs with SDKs in Python, Node, Go, and Java. Integrate in hours, not months." },
];

const team = [
  { initials: "UA", name: "Ugbefu Andrew", role: "Chief Executive Officer" },
  { initials: "CO", name: "Chris Oji", role: "Co-Founder" },
  { initials: "SA", name: "Sharon Adima", role: "Co-Founder" },
  { initials: "FO", name: "Faith Obi", role: "Co-Founder" },
];

const faqs = [
  {
    q: "What types of financial institutions can use Kapix?",
    a: "Kapix is designed for banks, fintechs, insurance companies, investment firms, and any organisation that makes high-volume financial decisions. Our platform scales from startup to enterprise with the same performance guarantees.",
  },
  {
    q: "How quickly can Kapix be integrated?",
    a: "Most integrations go live within 2–4 weeks. Our API-first architecture and pre-built SDKs in Python, Node, Go, and Java mean your engineering team can connect in hours. The remaining time is spent on model calibration and business rule configuration.",
  },
  {
    q: "Is Kapix compliant with financial regulations?",
    a: "Yes. Kapix is built with regulatory compliance at its core. We support GDPR, PCI DSS, and local data residency requirements. Every AI decision includes a full explainability report for audit purposes.",
  },
  {
    q: "What makes Kapix different from legacy risk platforms?",
    a: "Legacy platforms rely on static rules and batch processing. Kapix uses adaptive AI that learns continuously from live data — delivering decisions 47× faster with higher accuracy. Our models evaluate 186 dimensions per transaction versus the industry average of 12–15.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground noise-overlay">
      <div className="grid-bg" />
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative z-10 min-h-screen flex items-center px-14 pt-24 pb-16 max-sm:px-6 overflow-hidden">
        {/* Background ambient glows */}
        <div
          className="pointer-events-none absolute right-[5%] top-[10%] h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="pointer-events-none absolute left-[5%] bottom-[15%] h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">

            {/* ── Left: Content ── */}
            <div className="anim-fade-up">
              <div
                className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.07em] text-[var(--kapix-emerald)]"
                style={{ background: "rgba(0,212,170,0.08)", borderColor: "rgba(0,212,170,0.14)" }}
              >
                <span className="hero-dot h-1.5 w-1.5 rounded-full bg-[var(--kapix-emerald)]" />
                AI-Powered Financial Intelligence
              </div>

              <h1
                className="font-display font-extrabold leading-[0.93] tracking-[-0.04em]"
                style={{ fontSize: "clamp(3.25rem, 8vw, 6.5rem)" }}
              >
                AI that{" "}
                <span className="relative inline-block text-[var(--kapix-emerald)]">
                  sees
                  <span
                    className="absolute bottom-[0.06em] left-0 right-0 h-[3px] rounded-sm opacity-40"
                    style={{ background: "var(--kapix-emerald)" }}
                  />
                </span>
                <br />ahead.
              </h1>

              <p
                className="mt-8 max-w-[520px] font-body leading-[1.72] text-[var(--kapix-silver)]"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
              >
                Real-time credit scoring, risk assessment, fraud detection, and decision automation — engineered for the world&apos;s most demanding financial institutions.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button size="lg">Explore the Platform</Button>
                <Button variant="ghost" size="lg">Read Documentation</Button>
              </div>

              <div
                className="mt-14 pt-10 border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--kapix-ghost)]">
                  Trusted by forward-thinking institutions
                </p>
                <div className="mt-5 flex items-center flex-wrap gap-8 opacity-38">
                  {["Apex Capital", "NovaBank", "Meridian Finance", "ArkVentures"].map((name) => (
                    <span key={name} className="font-display font-bold text-sm tracking-wide text-[var(--kapix-mist)]">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Floating dashboard mock ── */}
            <div className="relative hidden lg:block">
              {/* Floating metric chips */}
              <div className="hero-chip hero-chip-1" style={{ top: "-18px", right: "16px" }}>
                <span className="hero-chip-dot" />
                12ms decision latency
              </div>
              <div className="hero-chip hero-chip-2" style={{ bottom: "80px", left: "-32px" }}>
                <span className="hero-chip-dot" />
                94.6% fraud accuracy
              </div>
              <div className="hero-chip hero-chip-3" style={{ top: "38%", right: "-28px" }}>
                <span className="hero-chip-dot" />
                2.4B+ scored
              </div>

              {/* Main dashboard card */}
              <div className="hero-dashboard-card">
                <div className="hero-dash-header">
                  <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
                  <div className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                  <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span className="ml-3 font-mono text-[0.58rem] tracking-[0.04em] text-[var(--kapix-ghost)]">
                    Kapix Intelligence Dashboard
                  </span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Risk Score", val: "0.023", color: "var(--kapix-emerald)", change: "▼ Low Exposure", up: true },
                      { label: "Throughput", val: "84K/sec", color: "", change: "▲ 12.4% vs baseline", up: true },
                      { label: "Fraud Alerts", val: "7", color: "", change: "▲ 2 flagged for review", up: false },
                      { label: "Model Accuracy", val: "98.2%", color: "", change: "▲ 0.3% vs last week", up: true },
                    ].map((card) => (
                      <div key={card.label} className="hero-metric-mini">
                        <div className="font-mono text-[0.5rem] uppercase tracking-[0.06em] text-[var(--kapix-ghost)]">
                          {card.label}
                        </div>
                        <div
                          className="mt-1.5 font-display text-[1.5rem] font-bold leading-none"
                          style={card.color ? { color: card.color } : {}}
                        >
                          {card.val}
                        </div>
                        <div
                          className="mt-1 font-mono text-[0.52rem] font-medium"
                          style={{ color: card.up ? "var(--kapix-emerald)" : "#ef4444" }}
                        >
                          {card.change}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hero-sparkline-box">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[0.5rem] uppercase tracking-[0.06em] text-[var(--kapix-ghost)]">
                        Transaction Volume — Last 24h
                      </span>
                      <span className="font-mono text-[0.55rem] text-[var(--kapix-emerald)]">LIVE</span>
                    </div>
                    <svg viewBox="0 0 400 32" preserveAspectRatio="none" className="h-8 w-full">
                      <defs>
                        <linearGradient id="heroSg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D4AA" stopOpacity=".25" />
                          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,24 L20,20 L40,22 L60,16 L80,18 L100,12 L120,14 L140,8 L160,10 L180,6 L200,9 L220,4 L240,7 L260,10 L280,6 L300,8 L320,3 L340,5 L360,2 L380,4 L400,1" fill="none" stroke="#00D4AA" strokeWidth="1.5" />
                      <path d="M0,24 L20,20 L40,22 L60,16 L80,18 L100,12 L120,14 L140,8 L160,10 L180,6 L200,9 L220,4 L240,7 L260,10 L280,6 L300,8 L320,3 L340,5 L360,2 L380,4 L400,1 L400,32 L0,32 Z" fill="url(#heroSg)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <div
        className="relative z-10"
        style={{
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          background: "var(--surface)",
        }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="metric-cell"
              style={i < metrics.length - 1 ? { borderRight: "1px solid var(--border-color)" } : {}}
            >
              <div
                className="font-display font-bold leading-none tracking-tight tabular-nums"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  background: "linear-gradient(180deg, #fff 30%, var(--kapix-mist))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <CountUp value={m.val} duration={1600} />
              </div>
              <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[var(--kapix-ghost)]">
                {m.label}
              </div>
              <div className="metric-accent-bar" />
            </div>
          ))}
        </div>
      </div>

      {/* ─── CAPABILITIES ─── */}
      <section id="platform" className="relative z-10 px-14 py-28 max-sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <span className="section-pill">
              <span className="section-pill-dot" />
              Core Platform
            </span>
            <h2
              className="mt-4 font-display font-bold tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Built by experts.<br />Powered by precision.
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] font-body leading-[1.7] text-[var(--kapix-mist)]">
              Enterprise-grade AI systems that transform raw financial data into real-time, high-confidence decisions at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.num}
                className="group relative overflow-hidden rounded-2xl p-10 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {/* Animated top line */}
                <div className="cap-top-line" />

                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(ellipse at 50% 100%, rgba(0,212,170,0.04), transparent 70%)",
                  }}
                />
                <div className="mb-6 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(0,212,170,0.08)",
                      border: "1px solid rgba(0,212,170,0.1)",
                    }}
                  >
                    {cap.icon}
                  </div>
                  <span className="font-mono text-[0.62rem] tracking-[0.06em] text-[var(--kapix-ghost)]">
                    {cap.num}
                  </span>
                </div>
                <h3 className="mb-2.5 font-display text-lg font-semibold" style={{ letterSpacing: "-0.01em" }}>
                  {cap.title}
                </h3>
                <p className="font-body text-[0.925rem] leading-[1.65] text-[var(--kapix-mist)]">
                  {cap.desc}
                </p>
                <span
                  className="mt-5 inline-block rounded-md px-2.5 py-1 font-mono text-[0.58rem] font-medium tracking-[0.04em] text-[var(--kapix-emerald)]"
                  style={{ background: "rgba(0,212,170,0.08)" }}
                >
                  {cap.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        className="relative z-10 px-14 py-28 max-sm:px-6"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <span className="section-pill">
              <span className="section-pill-dot" />
              How It Works
            </span>
            <h2
              className="mt-4 font-display font-bold leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              From data to decision<br />in milliseconds.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {howSteps.map((step, i) => (
              <div
                key={step.num}
                className="relative px-10 py-10"
                style={i < howSteps.length - 1 ? { borderRight: "1px solid var(--border-color)" } : {}}
              >
                {/* Step number */}
                <div
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-bold"
                  style={{
                    background: "rgba(0,212,170,0.08)",
                    border: "1px solid rgba(0,212,170,0.18)",
                    color: "var(--kapix-emerald)",
                  }}
                >
                  {step.num}
                </div>
                <h3 className="mb-3 font-display text-[1.05rem] font-semibold">{step.title}</h3>
                <p className="font-body text-[0.9rem] leading-[1.68] text-[var(--kapix-mist)]">{step.desc}</p>

                {/* Connecting arrow */}
                {i < howSteps.length - 1 && (
                  <div
                    className="absolute right-0 top-[3.5rem] translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full z-10"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid rgba(0,212,170,0.3)",
                      color: "var(--kapix-emerald)",
                      fontSize: "0.6rem",
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTELLIGENCE ─── */}
      <section id="intelligence" className="relative z-10 px-14 py-28 max-sm:px-6">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="section-pill">
              <span className="section-pill-dot" />
              Intelligence Layer
            </span>
            <h2
              className="mt-4 font-display font-bold leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Financial intelligence for the world&apos;s most{" "}
              <span className="text-[var(--kapix-emerald)]">demanding</span> decisions.
            </h2>
            <p className="mt-5 font-body leading-[1.7] text-[var(--kapix-mist)]">
              Kapix processes billions of data signals through proprietary AI models — delivering actionable intelligence with latency measured in milliseconds, not minutes. Our platform is engineered for enterprises that cannot afford to wait.
            </p>
            <div className="mt-10 flex gap-12">
              {[
                { val: "47×", label: "Faster Than Legacy" },
                { val: "3.2M", label: "Models Deployed" },
                { val: "186", label: "Data Dimensions" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-display text-3xl font-bold tabular-nums"
                    style={{
                      background: "linear-gradient(135deg, var(--kapix-emerald), #4AE8C8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <CountUp value={stat.val} duration={1800} />
                  </div>
                  <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-[var(--kapix-ghost)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard preview */}
          <div
            className="overflow-hidden rounded-[20px]"
            style={{ background: "var(--surface)", border: "1px solid var(--border-color)" }}
          >
            <div
              className="flex items-center gap-2 px-5 py-[0.85rem]"
              style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border-color)" }}
            >
              <div className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <div className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <div className="h-2 w-2 rounded-full bg-[#10b981]" />
              <span className="ml-3 font-mono text-[0.6rem] tracking-[0.04em] text-[var(--kapix-ghost)]">
                Kapix Intelligence Dashboard
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6">
              {[
                { label: "Risk Score", val: "0.023", valColor: "var(--kapix-emerald)", change: "▼ Low Exposure", up: true },
                { label: "Throughput", val: "84K/sec", change: "▲ 12.4% vs baseline", up: true },
                { label: "Fraud Alerts", val: "7", change: "▲ 2 flagged for review", up: false },
                { label: "Model Accuracy", val: "98.2%", change: "▲ 0.3% vs last week", up: true },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl p-5"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border-color)" }}
                >
                  <div className="font-mono text-[0.55rem] uppercase tracking-[0.06em] text-[var(--kapix-ghost)]">
                    {card.label}
                  </div>
                  <div
                    className="mt-1.5 font-display text-[1.6rem] font-bold"
                    style={card.valColor ? { color: card.valColor } : {}}
                  >
                    {card.val}
                  </div>
                  <div
                    className="mt-0.5 font-mono text-[0.6rem] font-medium"
                    style={{ color: card.up ? "var(--kapix-emerald)" : "#ef4444" }}
                  >
                    {card.change}
                  </div>
                </div>
              ))}
              <div
                className="col-span-2 rounded-xl p-5"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border-color)" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.06em] text-[var(--kapix-ghost)]">
                    Transaction Volume — Last 24h
                  </span>
                  <span className="font-mono text-[0.6rem] text-[var(--kapix-emerald)]">LIVE</span>
                </div>
                <svg viewBox="0 0 400 32" preserveAspectRatio="none" className="h-8 w-full">
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D4AA" stopOpacity=".25" />
                      <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,24 L20,20 L40,22 L60,16 L80,18 L100,12 L120,14 L140,8 L160,10 L180,6 L200,9 L220,4 L240,7 L260,10 L280,6 L300,8 L320,3 L340,5 L360,2 L380,4 L400,1" fill="none" stroke="#00D4AA" strokeWidth="1.5" />
                  <path d="M0,24 L20,20 L40,22 L60,16 L80,18 L100,12 L120,14 L140,8 L160,10 L180,6 L200,9 L220,4 L240,7 L260,10 L280,6 L300,8 L320,3 L340,5 L360,2 L380,4 L400,1 L400,32 L0,32 Z" fill="url(#sg)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARCHITECTURE ─── */}
      <section
        id="architecture"
        className="relative z-10 px-14 py-28 max-sm:px-6"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <span className="section-pill">
              <span className="section-pill-dot" />
              Technical Architecture
            </span>
            <h2
              className="mt-4 font-display font-bold leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Engineered for the<br />highest demands.
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] font-body leading-[1.7] text-[var(--kapix-mist)]">
              Every layer of the Kapix stack is purpose-built for financial-grade performance, security, and compliance.
            </p>
          </div>

          <div
            className="grid overflow-hidden rounded-2xl border grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ borderColor: "var(--border-color)" }}
          >
            {archItems.map((item, i) => (
              <div
                key={item.title}
                className="arch-item group p-9 transition-colors hover:bg-[var(--surface-2)]"
                style={{
                  borderRight: (i + 1) % 3 !== 0 ? "1px solid var(--border-color)" : "none",
                  borderBottom: i < 3 ? "1px solid var(--border-color)" : "none",
                }}
              >
                <div className="arch-icon-badge">{item.icon}</div>
                <h4 className="mb-1.5 font-display text-[0.95rem] font-semibold">{item.title}</h4>
                <p className="font-body text-[0.825rem] leading-[1.55] text-[var(--kapix-mist)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section
        className="relative z-10 px-14 py-28 max-sm:px-6"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="relative mx-auto max-w-[820px] text-center">
          <div
            className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.16)" }}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-[var(--kapix-emerald)]">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p
            className="font-body italic leading-[1.65] text-[var(--kapix-silver)]"
            style={{ fontSize: "clamp(1.2rem, 2.3vw, 1.65rem)" }}
          >
            Decisions in milliseconds. Confidence in every one. Kapix represents the next generation of financial intelligence — built not to impress, but to perform.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div
              className="h-px w-10"
              style={{ background: "linear-gradient(90deg, transparent, var(--kapix-emerald))" }}
            />
            <div>
              <div className="font-display text-[0.85rem] font-semibold text-[var(--kapix-silver)]">
                Kapix Engineering Team
              </div>
              <div className="font-mono text-[0.62rem] tracking-[0.04em] text-[var(--kapix-ghost)]">
                Founding Vision Statement
              </div>
            </div>
            <div
              className="h-px w-10"
              style={{ background: "linear-gradient(90deg, var(--kapix-emerald), transparent)" }}
            />
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section
        id="team"
        className="relative z-10 overflow-hidden px-14 py-32 max-sm:px-6"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        {/* Background orbs */}
        <div className="team-bg-orb team-bg-orb-1" />
        <div className="team-bg-orb team-bg-orb-2" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="mb-20 text-center">
            <span className="section-pill">
              <span className="section-pill-dot" />
              Leadership
            </span>
            <h2
              className="mt-4 font-display font-bold leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              The team behind<br />the engine.
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] font-body leading-[1.7] text-[var(--kapix-mist)]">
              Deep expertise across AI research, quantitative finance, and enterprise systems engineering. Finance minds. AI engineers. One mission.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="team-photo-card"
                style={{ animationDelay: `${i * 0.13}s` }}
              >
                {/* Photo */}
                <div className="team-photo-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/team${i + 1}.jpg`}
                    alt={member.name}
                    className="team-photo-img"
                  />
                  <div className="team-photo-overlay" />
                </div>

                {/* Info */}
                <div className="team-card-info">
                  <div className="team-card-name">{member.name}</div>
                  <div className="team-card-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section
        className="relative z-10 px-14 py-28 max-sm:px-6"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 text-center">
            <span className="section-pill">
              <span className="section-pill-dot" />
              Questions
            </span>
            <h2
              className="mt-4 font-display font-bold leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Frequently asked.
            </h2>
          </div>

          <div className="mx-auto max-w-[760px]">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-b py-7"
                style={{ borderColor: "var(--border-color)" }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.05rem] font-semibold transition-colors hover:text-[var(--kapix-emerald)]">
                  {faq.q}
                  <span
                    className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full font-light text-lg transition-all"
                    style={{
                      background: "rgba(0,212,170,0.06)",
                      border: "1px solid rgba(0,212,170,0.12)",
                      color: "var(--kapix-ghost)",
                    }}
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline text-[var(--kapix-emerald)]">−</span>
                  </span>
                </summary>
                <p className="mt-4 font-body text-[0.925rem] leading-[1.72] text-[var(--kapix-mist)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / CONTACT ─── */}
      <section
        id="contact"
        className="relative z-10 overflow-hidden px-14 py-32 max-sm:px-6"
      >
        <div className="cta-glow-ring" />
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,170,0.2) 50%, transparent)" }}
        />

        <div className="relative mx-auto max-w-[1200px]">
          {/* Heading */}
          <div className="mb-16 text-center">
            <span className="section-pill">
              <span className="section-pill-dot" />
              Get Started
            </span>
            <h2
              className="mt-4 font-display font-bold leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
            >
              Ready to see what<br />
              <span
                style={{
                  background: "linear-gradient(135deg, var(--kapix-emerald) 0%, #4AE8C8 60%, #2563EB 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                precision
              </span>{" "}looks like?
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-body leading-[1.7] text-[var(--kapix-mist)]">
              Join the institutions that trust Kapix for their most critical financial decisions.
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 max-w-[860px] mx-auto">
            {/* Demo request */}
            <div
              className="group flex flex-col items-center rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border-color)" }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.12)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold">Request a Demo</h3>
              <p className="mt-2 font-body text-[0.82rem] leading-relaxed text-[var(--kapix-mist)]">
                See Kapix in action with a live walkthrough tailored to your use case.
              </p>
              <Button size="sm" className="mt-6 w-full" render={<Link href="/signup" />}>
                Book Demo
              </Button>
            </div>

            {/* Email */}
            <div
              className="group flex flex-col items-center rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border-color)" }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.12)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold">Send an Email</h3>
              <p className="mt-2 font-body text-[0.82rem] leading-relaxed text-[var(--kapix-mist)]">
                Reach us directly. We respond to every enquiry within one business day.
              </p>
              <a
                href="mailto:ugbefu@usekapix.com"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 font-display text-sm font-medium transition-colors hover:border-[var(--kapix-emerald)] hover:text-[var(--kapix-emerald)]"
                style={{ borderColor: "var(--border-color)" }}
              >
                ugbefu@usekapix.com
              </a>
            </div>

            {/* Website */}
            <div
              className="group flex flex-col items-center rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border-color)" }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.12)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold">Visit Our Website</h3>
              <p className="mt-2 font-body text-[0.82rem] leading-relaxed text-[var(--kapix-mist)]">
                Explore our full product suite, documentation, and case studies online.
              </p>
              <a
                href="https://usekapix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 font-display text-sm font-medium transition-colors hover:border-[var(--kapix-emerald)] hover:text-[var(--kapix-emerald)]"
                style={{ borderColor: "var(--border-color)" }}
              >
                usekapix.com
              </a>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-1.5 font-mono text-[0.62rem] tracking-[0.04em] text-[var(--kapix-ghost)]">
            <span className="h-1 w-1 rounded-full bg-[var(--kapix-emerald)]" />
            No commitment required — see it in action first
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
