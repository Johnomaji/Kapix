"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import KapixNG from "./product-dashboard";
import Link from "next/link";
import { Lock, ArrowRight, BarChart2, Shield, CreditCard, Code } from "lucide-react";

type AuthStatus = "loading" | "guest" | "authed";

export default function ProductPageWrapper() {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const auth = localStorage.getItem("kapix_auth");
    setStatus(auth ? "authed" : "guest");
  }, []);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#060A12",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            border: "2px solid rgba(0,212,170,0.15)",
            borderTopColor: "#00D4AA",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (status === "authed") {
    return <KapixNG />;
  }

  // Guest: blurred preview + login overlay
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Full dashboard rendered as non-interactive preview */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          userSelect: "none",
          filter: "blur(3px)",
          opacity: 0.45,
        }}
      >
        <KapixNG />
      </div>

      {/* Dark overlay behind the modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(6,10,18,0.55)",
          zIndex: 30,
        }}
      />

      {/* Centered login prompt */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 40,
          padding: "16px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(10,14,23,0.96)",
            border: "1px solid rgba(0,212,170,0.22)",
            borderRadius: 22,
            padding: "44px 48px",
            maxWidth: 468,
            width: "100%",
            textAlign: "center",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,212,170,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg,transparent,#00D4AA 40%,#00D4AA 60%,transparent)",
            }}
          />

          {/* Lock icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "rgba(0,212,170,0.08)",
              border: "1px solid rgba(0,212,170,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 22px",
            }}
          >
            <Lock size={24} color="#00D4AA" />
          </motion.div>

          <h2
            style={{
              fontFamily: "var(--font-jakarta),'Plus Jakarta Sans',sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 10,
            }}
          >
            Unlock the Full Dashboard
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm),'DM Sans',system-ui,sans-serif",
              fontSize: 14,
              color: "#8891A5",
              lineHeight: 1.65,
              marginBottom: 28,
            }}
          >
            Sign in to access real-time credit intelligence, fraud detection,
            risk monitoring, and the complete Kapix AI suite.
          </p>

          {/* Preview feature grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 28,
            }}
          >
            {[
              { icon: CreditCard, label: "Credit Scoring" },
              { icon: Shield, label: "Fraud Centre" },
              { icon: BarChart2, label: "Risk Engine" },
              { icon: Code, label: "API Console" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontFamily: "var(--font-dm),'DM Sans',system-ui,sans-serif",
                  fontSize: 12,
                  color: "#6B7694",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon size={13} color="rgba(0,212,170,0.6)" />
                {label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link
              href="/login"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "13px 24px",
                borderRadius: 11,
                background: "#00D4AA",
                color: "#060A12",
                fontFamily:
                  "var(--font-jakarta),'Plus Jakarta Sans',sans-serif",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.9")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              Sign In to Continue <ArrowRight size={15} />
            </Link>
            <Link
              href="/signup"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "13px 24px",
                borderRadius: 11,
                background: "transparent",
                color: "#8891A5",
                border: "1px solid rgba(255,255,255,0.09)",
                fontFamily:
                  "var(--font-jakarta),'Plus Jakarta Sans',sans-serif",
                fontWeight: 500,
                fontSize: 13,
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.18)";
                el.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.09)";
                el.style.color = "#8891A5";
              }}
            >
              Create a Free Account
            </Link>
          </div>

          {/* Trust note */}
          <p
            style={{
              marginTop: 20,
              fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
              fontSize: 9.5,
              color: "#4A5268",
              letterSpacing: "0.04em",
            }}
          >
            SOC 2 Type II · CBN Compliant · 256-bit Encryption
          </p>
        </motion.div>
      </div>
    </div>
  );
}
