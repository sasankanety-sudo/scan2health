"use client";

import { useState } from "react";

export default function ShopPage() {
  const [url, setUrl] = useState("");

  const stores = [
    { name: "Amazon", icon: "🛍️", url: "https://amazon.in", color: "#FF9900" },
    { name: "Flipkart", icon: "🛒", url: "https://flipkart.com", color: "#2874F0" },
    { name: "BigBasket", icon: "🧺", url: "https://bigbasket.com", color: "#84C225" },
    { name: "Zepto", icon: "⚡", url: "https://zeptonow.com", color: "#8B5CF6" },
    { name: "Blinkit", icon: "🟡", url: "https://blinkit.com", color: "#F8D12F" },
    { name: "JioMart", icon: "🔵", url: "https://jiomart.com", color: "#0078D4" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>🛍️ Shop Healthier</h2>
      <p style={{ marginBottom: 32 }}>Find healthier alternatives on your favorite stores</p>

      {/* URL Input */}
      <div className="card" style={{ marginBottom: 32 }}>
        <h4 style={{ marginBottom: 16 }}>🔗 Paste Product URL</h4>
        <p style={{ marginBottom: 12, fontSize: "0.9rem" }}>Paste a product URL from any store to analyze its nutrition</p>
        <div style={{ display: "flex", gap: 12 }}>
          <input className="input-field" style={{ flex: 1 }} placeholder="https://amazon.in/product/..."
            value={url} onChange={(e) => setUrl(e.target.value)} />
          <button className="btn btn-primary" onClick={() => alert("Product URL analysis coming soon!")}>
            Analyze
          </button>
        </div>
      </div>

      {/* Store Cards */}
      <h3 style={{ marginBottom: 16 }}>🏪 Popular Stores</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {stores.map((store) => (
          <a key={store.name} href={store.url} target="_blank" rel="noopener noreferrer" className="card"
            style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", textDecoration: "none" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "var(--radius-md)",
              background: `${store.color}20`, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem",
            }}>
              {store.icon}
            </div>
            <div>
              <h4>{store.name}</h4>
              <p style={{ fontSize: "0.85rem" }}>Shop on {store.name} →</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
