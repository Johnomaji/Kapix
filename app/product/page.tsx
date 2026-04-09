import type { Metadata } from "next";
import ProductPageWrapper from "@/components/product-page-wrapper";

export const metadata: Metadata = {
  title: "Kapix Platform — Live Intelligence Dashboard",
  description: "Real-time credit scoring, fraud detection, risk assessment and transaction monitoring — powered by the Kapix AI engine.",
};

export default function ProductPage() {
  return <ProductPageWrapper />;
}
