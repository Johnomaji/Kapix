import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

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
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 pb-20 pt-32 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-[10%] h-[700px] w-[900px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse 50% 50%, rgba(0,212,170,0.05) 0%, rgba(37,99,235,0.03) 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div
          className="mb-11 inline-flex items-center gap-2 rounded-full border px-[1.1rem] py-[0.4rem] font-mono text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-[var(--kapix-emerald)]"
          style={{ background: "rgba(0,212,170,0.08)", borderColor: "rgba(0,212,170,0.12)" }}
        >
          <span className="hero-dot h-1.5 w-1.5 rounded-full bg-[var(--kapix-emerald)]" />
          AI-Powered Financial Intelligence
        </div>

        <h1
          className="font-display font-extrabold leading-[0.95] tracking-[-0.04em] max-w-[900px]"
          style={{ fontSize: "clamp(3.25rem, 8vw, 7rem)" }}
        >
          AI that <span className="relative inline-block text-[var(--kapix-emerald)]">
            sees
            <span
              className="absolute bottom-[0.08em] left-0 right-0 h-[3px] rounded-sm opacity-40"
              style={{ background: "var(--kapix-emerald)" }}
            />
          </span>
          <br />ahead.
        </h1>

        <p
          className="mt-9 max-w-[580px] font-body leading-[1.7] text-[var(--kapix-silver)]"
          style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)" }}
        >
          Real-time credit scoring, risk assessment, fraud detection, and decision automation — engineered for the world&apos;s most demanding financial institutions.
        </p>

        <div className="mt-12 flex flex-col items-center gap-3.5 sm:flex-row">
          <Button size="lg">Explore the Platform</Button>
          <Button variant="ghost" size="lg">Read Documentation</Button>
        </div>

        <div className="mt-20">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--kapix-ghost)]">
            Trusted by forward-thinking institutions
          </p>
          <div className="mt-6 flex items-center justify-center gap-12 opacity-35">
            {["Apex Capital", "NovaBank", "Meridian Finance", "ArkVentures"].map((name) => (
              <span key={name} className="font-display font-bold text-sm tracking-wide text-[var(--kapix-mist)]">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="relative h-10 w-px overflow-hidden" style={{ background: "linear-gradient(transparent, var(--kapix-ghost))" }}>
            <div
              className="absolute left-0 w-px"
              style={{
                height: "100%",
                background: "linear-gradient(transparent, var(--kapix-emerald))",
                animation: "scrollDown 2s ease-in-out infinite",
                top: "-100%",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <div
        className="relative z-10 grid grid-cols-2 lg:grid-cols-4"
        style={{
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          background: "var(--surface)",
          backdropFilter: "blur(16px)",
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="relative py-11 px-8 text-center"
            style={i < metrics.length - 1 ? { borderRight: "1px solid var(--border-color)" } : {}}
          >
            <div
              className="font-display font-bold leading-none tracking-tight"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                background: "linear-gradient(180deg, #fff 40%, var(--kapix-mist))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {m.val}
            </div>
            <div className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-[var(--kapix-ghost)]">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* ─── CAPABILITIES ─── */}
      <section id="platform" className="relative z-10 px-14 py-28 text-center max-sm:px-6">
        <div className="mb-16">
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--kapix-emerald)]">
            Core Platform
          </span>
          <h2
            className="mt-3 font-display font-bold tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Built by experts.<br />Powered by precision.
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] font-body leading-[1.7] text-[var(--kapix-mist)]">
            Enterprise-grade AI systems that transform raw financial data into real-time, high-confidence decisions at scale.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-2">
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              className="group relative overflow-hidden rounded-2xl p-10 text-left transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                boxShadow: "none",
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,170,0.25), transparent)" }}
              />
              <div className="mb-6 flex items-start justify-between">
                <div
                  className="flex h-13 w-13 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,212,170,0.08)",
                    border: "1px solid rgba(0,212,170,0.08)",
                  }}
                >
                  {cap.icon}
                </div>
                <span className="font-mono text-[0.65rem] tracking-[0.06em] text-[var(--kapix-ghost)]">
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
                className="mt-5 inline-block rounded px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-[0.04em] text-[var(--kapix-emerald)]"
                style={{ background: "rgba(0,212,170,0.08)" }}
              >
                {cap.tag}
              </span>
            </div>
          ))}
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
        <div className="mb-16 text-center">
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--kapix-emerald)]">
            How It Works
          </span>
          <h2
            className="mt-3 font-display font-bold leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            From data to decision<br />in milliseconds.
          </h2>
        </div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 md:grid-cols-3">
          {howSteps.map((step, i) => (
            <div
              key={step.num}
              className="px-10 py-10"
              style={i < howSteps.length - 1 ? { borderRight: "1px solid var(--border-color)" } : {}}
            >
              <div
                className="mb-5 font-display text-5xl font-extrabold leading-none"
                style={{
                  background: "linear-gradient(180deg, rgba(0,212,170,0.2), transparent)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {step.num}
              </div>
              <h3 className="mb-2.5 font-display text-[1.05rem] font-semibold">{step.title}</h3>
              <p className="font-body text-[0.9rem] leading-[1.65] text-[var(--kapix-mist)]">{step.desc}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--kapix-emerald)]" />
                {i < howSteps.length - 1 && (
                  <div
                    className="h-px flex-1"
                    style={{ background: "linear-gradient(90deg, var(--kapix-emerald), transparent)" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTELLIGENCE ─── */}
      <section id="intelligence" className="relative z-10 px-14 py-28 max-sm:px-6">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--kapix-emerald)]">
              Intelligence Layer
            </span>
            <h2
              className="mt-3 font-display font-bold leading-[1.1]"
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
                  <div className="font-display text-3xl font-bold text-[var(--kapix-emerald)]">{stat.val}</div>
                  <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.06em] text-[var(--kapix-ghost)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard preview */}
          <div
            className="overflow-hidden rounded-[18px]"
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
              {/* Sparkline */}
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
        className="relative z-10 px-14 py-28 text-center max-sm:px-6"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="mb-16">
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--kapix-emerald)]">
            Technical Architecture
          </span>
          <h2
            className="mt-3 font-display font-bold leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Engineered for the<br />highest demands.
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] font-body leading-[1.7] text-[var(--kapix-mist)]">
            Every layer of the Kapix stack is purpose-built for financial-grade performance, security, and compliance.
          </p>
        </div>

        <div
          className="mx-auto grid max-w-[1100px] overflow-hidden rounded-2xl border grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: "var(--border-color)" }}
        >
          {archItems.map((item, i) => (
            <div
              key={item.title}
              className="p-9 text-left transition-colors hover:bg-[var(--surface-2)]"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid var(--border-color)" : "none",
                borderBottom: i < 3 ? "1px solid var(--border-color)" : "none",
              }}
            >
              <span className="mb-4 block font-mono text-2xl">{item.icon}</span>
              <h4 className="mb-1.5 font-display text-[0.95rem] font-semibold">{item.title}</h4>
              <p className="font-body text-[0.825rem] leading-[1.55] text-[var(--kapix-mist)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section
        className="relative z-10 px-14 py-28 max-sm:px-6"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="relative mx-auto max-w-[800px] text-center">
          <p
            className="relative font-body italic leading-[1.6] text-[var(--kapix-silver)]"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
          >
            <span
              className="absolute -top-2 -left-8 font-display text-8xl font-extrabold leading-none opacity-20"
              style={{ color: "var(--kapix-emerald)" }}
            >
              &ldquo;
            </span>
            Decisions in milliseconds. Confidence in every one. Kapix represents the next generation of financial intelligence — built not to impress, but to perform.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[var(--kapix-emerald)]" />
            <div>
              <div className="font-display text-[0.85rem] font-semibold text-[var(--kapix-silver)]">
                Kapix Engineering Team
              </div>
              <div className="font-mono text-[0.65rem] tracking-[0.04em] text-[var(--kapix-ghost)]">
                Founding Vision Statement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section id="team" className="relative z-10 px-14 py-28 text-center max-sm:px-6">
        <div className="mb-16">
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--kapix-emerald)]">
            Leadership
          </span>
          <h2
            className="mt-3 font-display font-bold leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            The team behind<br />the engine.
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] font-body leading-[1.7] text-[var(--kapix-mist)]">
            Deep expertise across AI research, quantitative finance, and enterprise systems engineering. Finance minds. AI engineers. One mission.
          </p>
        </div>

        <div className="mx-auto grid max-w-[960px] grid-cols-2 gap-5 md:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-2xl px-6 py-10 text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border-color)" }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, var(--kapix-emerald), var(--kapix-blue))" }}
              />
              <div
                className="mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full font-display text-lg font-bold tracking-wide text-[var(--kapix-emerald)]"
                style={{
                  background: "rgba(0,212,170,0.08)",
                  border: "2px solid rgba(0,212,170,0.12)",
                }}
              >
                {member.initials}
              </div>
              <div className="font-display text-[0.95rem] font-semibold">{member.name}</div>
              <div className="mt-1 font-body text-[0.8rem] text-[var(--kapix-mist)]">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section
        className="relative z-10 px-14 py-28 text-center max-sm:px-6"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <div className="mb-16">
          <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--kapix-emerald)]">
            Questions
          </span>
          <h2
            className="mt-3 font-display font-bold leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Frequently asked.
          </h2>
        </div>

        <div className="mx-auto max-w-[720px] text-left">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-b py-7"
              style={{ borderColor: "var(--border-color)" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-[1.05rem] font-semibold transition-colors hover:text-[var(--kapix-emerald)]">
                {faq.q}
                <span className="ml-4 flex-shrink-0 text-xl font-light text-[var(--kapix-ghost)] transition-all group-open:text-[var(--kapix-emerald)]">
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-[0.925rem] leading-[1.7] text-[var(--kapix-mist)]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        id="contact"
        className="relative z-10 overflow-hidden px-14 py-28 text-center max-sm:px-6"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse, rgba(0,212,170,0.06), rgba(37,99,235,0.03) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <h2
          className="relative font-display font-bold leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
        >
          Ready to see what<br />
          <span className="text-[var(--kapix-emerald)]">precision</span> looks like?
        </h2>
        <p className="relative mx-auto mt-5 max-w-[480px] font-body leading-[1.7] text-[var(--kapix-mist)]">
          Join the institutions that trust Kapix for their most critical financial decisions.
        </p>
        <Button size="lg" className="relative mt-10" asChild>
          <Link href="/signup">Request a Demo</Link>
        </Button>
        <div className="relative mt-6 flex items-center justify-center gap-1.5 font-mono text-[0.65rem] tracking-[0.04em] text-[var(--kapix-ghost)]">
          <span className="h-1 w-1 rounded-full bg-[var(--kapix-emerald)]" />
          No commitment required — see it in action first
        </div>
      </section>

      <Footer />
    </div>
  );
}
