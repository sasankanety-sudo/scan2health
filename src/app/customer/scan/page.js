"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/mockData";
import { classifyNutrition, getHealthScoreColor } from "@/lib/nutrition";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const [barcode, setBarcode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  const handleBarcodeScan = () => {
    if (!barcode) return;
    setScanning(true);
    setTimeout(() => {
      const found = mockProducts.find((p) => p.barcode === barcode);
      setResults(found ? [found] : []);
      setScanning(false);
    }, 800);
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    setScanning(true);
    setTimeout(() => {
      const found = mockProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(found);
      setScanning(false);
    }, 500);
  };

  const selectProduct = (product) => {
    localStorage.setItem("smartscan-analysis", JSON.stringify(product));
    router.push("/customer/analysis");
  };

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>📷 Scan Product</h2>
      <p style={{ marginBottom: 32 }}>Scan a barcode, upload an image, or search by name</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {/* Barcode Input */}
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>🔢 Enter Barcode</h4>
          <div style={{ display: "flex", gap: 12 }}>
            <input className="input-field" style={{ flex: 1 }} placeholder="e.g. 8901234567890"
              value={barcode} onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBarcodeScan()} />
            <button className="btn btn-primary" onClick={handleBarcodeScan} disabled={scanning}>
              {scanning ? "..." : "Scan"}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="card">
          <h4 style={{ marginBottom: 16 }}>🔍 Search Product</h4>
          <div style={{ display: "flex", gap: 12 }}>
            <input className="input-field" style={{ flex: 1 }} placeholder="Search by name, brand..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
            <button className="btn btn-primary" onClick={handleSearch} disabled={scanning}>
              {scanning ? "..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Camera Placeholder */}
      <div className="card" style={{ textAlign: "center", padding: 48, marginBottom: 32 }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>📱</div>
        <h4>Camera Scanning</h4>
        <p style={{ margin: "8px 0 20px" }}>Point your camera at a barcode to scan</p>
        <button className="btn btn-secondary">Enable Camera</button>
        <p style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Camera access requires HTTPS in production
        </p>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h3 style={{ marginBottom: 16 }}>Results ({results.length})</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {results.map((p) => {
              const analysis = classifyNutrition(p.nutrition);
              return (
                <div key={p.id} className="card" style={{ cursor: "pointer" }} onClick={() => selectProduct(p)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: "2.5rem" }}>{p.image}</span>
                    <div>
                      <h4>{p.name}</h4>
                      <p style={{ fontSize: "0.85rem" }}>{p.brand}</p>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: "1.3rem", fontWeight: 700, color: getHealthScoreColor(p.healthScore) }}>
                      {p.healthScore}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.map((t) => (
                      <span key={t} className={`badge badge-${analysis.verdict === "safe" ? "success" : analysis.verdict === "moderate" ? "warning" : "danger"}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Products */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 16 }}>🔥 Popular Products</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {mockProducts.slice(0, 8).map((p) => (
            <div key={p.id} className="card" style={{ cursor: "pointer", padding: 16, textAlign: "center" }} onClick={() => selectProduct(p)}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>{p.image}</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.name}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{p.brand}</div>
              <div style={{ marginTop: 8, fontWeight: 700, color: getHealthScoreColor(p.healthScore) }}>
                {p.healthScore}/100
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
