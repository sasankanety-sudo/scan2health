"use client";

import { useState, useEffect } from "react";
import { getHealthScoreColor } from "@/lib/nutrition";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("smartscan-cart") || "[]");
    setCart(saved);
  }, []);

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("smartscan-cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("smartscan-cart", "[]");
  };

  const avgScore = cart.length ? Math.round(cart.reduce((a, p) => a + (p.healthScore || 0), 0) / cart.length) : 0;
  const totalCalories = cart.reduce((a, p) => a + (p.nutrition?.calories || 0), 0);

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>🛒 Smart Cart</h2>
      <p style={{ marginBottom: 32 }}>See the overall health impact of your shopping</p>

      {cart.length > 0 && (
        <div className="stats-grid" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-icon green">🛒</div>
            <div className="stat-info"><h3>{cart.length}</h3><p>Items</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">⭐</div>
            <div className="stat-info"><h3 style={{ color: getHealthScoreColor(avgScore) }}>{avgScore}</h3><p>Avg Health Score</p></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">🔥</div>
            <div className="stat-info"><h3>{totalCalories}</h3><p>Total Calories</p></div>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🛒</div>
          <h3>Your cart is empty</h3>
          <p style={{ marginTop: 8 }}>Scan products and add them to see health analysis</p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {cart.map((p, i) => (
              <div key={i} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: "2rem" }}>{p.image}</span>
                  <div>
                    <h4>{p.name}</h4>
                    <p style={{ fontSize: "0.85rem" }}>{p.brand} • {p.nutrition?.calories} kcal</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontWeight: 700, fontSize: "1.2rem", color: getHealthScoreColor(p.healthScore) }}>
                    {p.healthScore}
                  </span>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}
