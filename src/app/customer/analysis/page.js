"use client";

import { useState, useEffect } from "react";
import { mockProducts } from "@/lib/mockData";
import { classifyNutrition, getHealthScoreColor, getVerdictInfo } from "@/lib/nutrition";
import HealthScore from "@/components/HealthScore";
import Link from "next/link";

export default function AnalysisPage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("smartscan-analysis");
    if (saved) {
      setProduct(JSON.parse(saved));
    } else {
      setProduct(mockProducts[0]);
    }
  }, []);

  if (!product) return <div style={{ padding: 40, textAlign: "center" }}>Loading analysis...</div>;

  const analysis = classifyNutrition(product.nutrition);
  const verdict = getVerdictInfo(analysis.verdict);

  return (
    <div>
      <h2 style={{ marginBottom: 32 }}>🔬 Nutrition Analysis</h2>

      {/* Product Header */}
      <div className="card" style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
        <span style={{ fontSize: "3.5rem" }}>{product.image}</span>
        <div style={{ flex: 1 }}>
          <h3>{product.name}</h3>
          <p style={{ margin: "4px 0" }}>{product.brand} • {product.category}</p>
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            {product.tags?.map((t) => <span key={t} className="badge badge-info">{t}</span>)}
          </div>
        </div>
        <HealthScore score={product.healthScore} />
      </div>

      {/* Verdict */}
      <div style={{ padding: 20, borderRadius: "var(--radius-lg)", background: verdict.bg, border: `2px solid ${verdict.color}`, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: "2rem" }}>{verdict.icon}</span>
        <div>
          <h4 style={{ color: verdict.color }}>{verdict.label}</h4>
          <p style={{ fontSize: "0.9rem", color: verdict.color, opacity: 0.8 }}>
            Based on nutrition analysis of this product
          </p>
        </div>
      </div>

      {/* Nutrition Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>📊 Nutrition per 100g</h4>
          {Object.entries(product.nutrition).map(([key, val]) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border-color)" }}>
              <span style={{ textTransform: "capitalize", fontWeight: 500 }}>{key}</span>
              <span style={{ fontWeight: 700 }}>{val}{key === "sodium" ? "mg" : key === "calories" ? " kcal" : "g"}</span>
            </div>
          ))}
        </div>

        <div>
          {/* Good nutrients */}
          {analysis.good.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <h4 style={{ marginBottom: 12, color: "var(--success)" }}>✅ Good</h4>
              {analysis.good.map((g) => (
                <div key={g.nutrient} style={{ padding: "8px 0", fontSize: "0.9rem" }}>
                  <strong>{g.nutrient}:</strong> {g.detail}
                </div>
              ))}
            </div>
          )}

          {/* Issues */}
          {analysis.issues.length > 0 && (
            <div className="card">
              <h4 style={{ marginBottom: 12, color: "var(--danger)" }}>⚠️ Concerns</h4>
              {analysis.issues.map((i) => (
                <div key={i.nutrient} style={{ padding: "8px 0", fontSize: "0.9rem" }}>
                  <span className={`badge badge-${i.severity === "avoid" ? "danger" : "warning"}`} style={{ marginRight: 8 }}>{i.level}</span>
                  <strong>{i.nutrient}:</strong> {i.detail}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/customer/scan" className="btn btn-secondary">← Scan Another</Link>
        <button className="btn btn-primary" onClick={() => {
          const cart = JSON.parse(localStorage.getItem("smartscan-cart") || "[]");
          cart.push(product);
          localStorage.setItem("smartscan-cart", JSON.stringify(cart));
          alert("Added to Smart Cart!");
        }}>Add to Cart 🛒</button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
