"use client";

import { mockAdminStats } from "@/lib/mockData";

export default function ReportsPage() {
  const weeklyData = [
    { day: "Mon", scans: 1240 }, { day: "Tue", scans: 1580 },
    { day: "Wed", scans: 1320 }, { day: "Thu", scans: 1890 },
    { day: "Fri", scans: 2100 }, { day: "Sat", scans: 980 },
    { day: "Sun", scans: 720 },
  ];
  const maxScans = Math.max(...weeklyData.map((d) => d.scans));

  const monthlyUsers = [
    { month: "Jan", users: 8200 }, { month: "Feb", users: 9100 },
    { month: "Mar", users: 10400 }, { month: "Apr", users: 12847 },
  ];
  const maxUsers = Math.max(...monthlyUsers.map((d) => d.users));

  return (
    <div>
      <h2 style={{ marginBottom: 32 }}>📈 Reports & Analytics</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Weekly Scans Bar Chart */}
        <div className="card">
          <h4 style={{ marginBottom: 24 }}>📊 Weekly Scans</h4>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 200 }}>
            {weeklyData.map((d) => (
              <div key={d.day} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: 8, color: "var(--text-muted)" }}>
                  {d.scans}
                </div>
                <div style={{
                  height: `${(d.scans / maxScans) * 160}px`,
                  background: "var(--accent-gradient)",
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.5s ease",
                  minHeight: 20,
                }} />
                <div style={{ fontSize: "0.8rem", marginTop: 8, fontWeight: 600 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Users */}
        <div className="card">
          <h4 style={{ marginBottom: 24 }}>👥 Monthly User Growth</h4>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 200 }}>
            {monthlyUsers.map((d) => (
              <div key={d.month} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: 8, color: "var(--text-muted)" }}>
                  {d.users.toLocaleString()}
                </div>
                <div style={{
                  height: `${(d.users / maxUsers) * 160}px`,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  borderRadius: "6px 6px 0 0",
                  transition: "height 0.5s ease",
                  minHeight: 20,
                }} />
                <div style={{ fontSize: "0.8rem", marginTop: 8, fontWeight: 600 }}>{d.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Scanned Products */}
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>🔥 Most Scanned Products</h4>
          {[
            { name: "Instant Noodles", scans: 4521 },
            { name: "Cola Drink", scans: 3890 },
            { name: "Chocolate Cookies", scans: 3456 },
            { name: "Green Tea", scans: 3210 },
            { name: "Greek Yogurt", scans: 2890 },
          ].map((p, i) => (
            <div key={p.name} style={{
              display: "flex", justifyContent: "space-between", padding: "12px 0",
              borderBottom: "1px solid var(--border-color)",
            }}>
              <span><span style={{ fontWeight: 700, marginRight: 8, color: "var(--accent)" }}>#{i + 1}</span>{p.name}</span>
              <span style={{ fontWeight: 600 }}>{p.scans.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Category Breakdown */}
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>📦 Category Distribution</h4>
          {mockAdminStats.topCategories.map((cat) => (
            <div key={cat.name} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{cat.name}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  {Math.round((cat.count / mockAdminStats.totalScans) * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(cat.count / mockAdminStats.topCategories[0].count) * 100}%` }} />
              </div>
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
