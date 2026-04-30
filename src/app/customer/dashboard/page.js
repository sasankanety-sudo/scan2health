"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { mockProducts, mockScanHistory, mockHealthTips } from "@/lib/mockData";
import { getHealthScoreColor } from "@/lib/nutrition";
import HealthScore from "@/components/HealthScore";
import Link from "next/link";

export default function CustomerDashboard() {
  const { user } = useAuth();

  const recentScans = mockScanHistory.slice(0, 5).map((s) => ({
    ...s,
    product: mockProducts.find((p) => p.id === s.productId),
  }));

  const avgScore = Math.round(
    mockProducts.slice(0, 8).reduce((a, p) => a + p.healthScore, 0) / 8
  );

  return (
    <div>
      <div className="stats-grid">
        {[
          { icon: "📷", label: "Total Scans", value: recentScans.length, color: "green" },
          { icon: "⭐", label: "Avg Health Score", value: avgScore, color: "blue" },
          { icon: "🛒", label: "Cart Items", value: 3, color: "purple" },
          { icon: "👨‍👩‍👧", label: "Family Members", value: 3, color: "orange" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {/* Health Score Card */}
        <div className="card" style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <HealthScore score={avgScore} />
          <div>
            <h3>Your Health Score</h3>
            <p style={{ margin: "8px 0" }}>Based on your recent scans and diet</p>
            <Link href="/customer/scan" className="btn btn-primary btn-sm">Scan New Product</Link>
          </div>
        </div>

        {/* Health Tip */}
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>💡 Health Tip of the Day</h4>
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>{mockHealthTips[0].icon}</div>
          <h4>{mockHealthTips[0].title}</h4>
          <p style={{ fontSize: "0.9rem", marginTop: 8 }}>{mockHealthTips[0].content}</p>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3>📋 Recent Scans</h3>
          <Link href="/customer/scan" className="btn btn-secondary btn-sm">View All</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recentScans.map((scan) => (
            <div key={scan.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderRadius: "var(--radius-md)",
              background: "var(--bg-tertiary)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "1.5rem" }}>{scan.product?.image}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{scan.product?.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{scan.product?.brand}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className={`badge badge-${scan.result === "safe" ? "success" : scan.result === "moderate" ? "warning" : "danger"}`}>
                  {scan.result === "safe" ? "✅ Safe" : scan.result === "moderate" ? "⚠️ Moderate" : "🚫 Avoid"}
                </span>
                <span style={{ fontWeight: 700, color: getHealthScoreColor(scan.product?.healthScore || 0) }}>
                  {scan.product?.healthScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
