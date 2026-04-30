"use client";

import { mockDietPlan } from "@/lib/mockData";

export default function DietPage() {
  const meals = [
    { key: "breakfast", title: "🌅 Breakfast", items: mockDietPlan.breakfast },
    { key: "lunch", title: "☀️ Lunch", items: mockDietPlan.lunch },
    { key: "dinner", title: "🌙 Dinner", items: mockDietPlan.dinner },
    { key: "snacks", title: "🍎 Snacks", items: mockDietPlan.snacks },
  ];

  const totalCal = Object.values(mockDietPlan).flat().reduce((a, m) => a + m.calories, 0);
  const totalProtein = Object.values(mockDietPlan).flat().reduce((a, m) => a + m.protein, 0);

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>🥗 Daily Diet Planner</h2>
      <p style={{ marginBottom: 32 }}>AI-recommended meals based on your health profile</p>

      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <div className="stat-card">
          <div className="stat-icon green">🔥</div>
          <div className="stat-info"><h3>{totalCal}</h3><p>Total Calories</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">💪</div>
          <div className="stat-info"><h3>{totalProtein}g</h3><p>Total Protein</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">🍽️</div>
          <div className="stat-info"><h3>4</h3><p>Meals Planned</p></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {meals.map((meal) => (
          <div key={meal.key} className="card">
            <h4 style={{ marginBottom: 16 }}>{meal.title}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {meal.items.map((item) => (
                <div key={item.name} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px", borderRadius: "var(--radius-md)", background: "var(--bg-tertiary)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {item.calories} kcal • {item.protein}g protein
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
