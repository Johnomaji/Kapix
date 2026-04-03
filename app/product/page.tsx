import type { Metadata } from "next";
import KapixNG from "@/components/product-dashboard";

export const metadata: Metadata = {
  title: "Kapix Platform — Live Intelligence Dashboard",
  description: "Real-time credit scoring, fraud detection, risk assessment and transaction monitoring — powered by the Kapix AI engine.",
};

export default function ProductPage() {
  return <KapixNG />;
}
