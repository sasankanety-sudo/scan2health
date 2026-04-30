"use client";

import { mockAdminStats } from "@/lib/mockData";

export default function AdminDashboard() {
  const stats = mockAdminStats;

  return (
    <div>
      <h2 style={{ marginBottom: 32 }}>📊 Admin Dashboard</h2>

      <div className="stats-grid">
        {[
          { icon: "👥", label: "Total Users", value: stats.totalUsers.toLocaleString(), color: "blue" },
          { icon: "📷", label: "Total Scans", value: stats.totalScans.toLocaleString(), color: "green" },
          { icon: "🟢", label: "Active Today", value: stats.activeToday.toLocaleString(), color: "purple" },
          { icon: "📦", label: "Products in DB", value: stats.productsInDB.toLocaleString(), color: "orange" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-info"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Popular Categories */}
        <div className="card">
          <h4 style={{ marginBottom: 20 }}>📊 Top Categories by Scans</h4>
          {stats.topCategories.map((cat, i) => (
            <div key={cat.name} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{i + 1}. {cat.name}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{cat.count.toLocaleString()}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(cat.count / stats.topCategories[0].count) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h4 style={{ marginBottom: 20 }}>📈 Platform Health</h4>
          {[
            { label: "Avg Health Score", value: `${stats.avgHealthScore}/100`, color: "var(--accent)" },
            { label: "Scan Accuracy", value: "97.3%", color: "var(--accent)" },
            { label: "API Uptime", value: "99.9%", color: "var(--accent)" },
            { label: "User Satisfaction", value: "4.8/5", color: "var(--warning)" },
          ].map((s) => (
            <div key={s.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0", borderBottom: "1px solid var(--border-color)",
            }}>
              <span style={{ color: "var(--text-secondary)" }}>{s.label}</span>
              <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
