"use client";

import { useState } from "react";

const defaultRules = [
  { id: 1, nutrient: "Sugar", threshold: 15, unit: "g", action: "Avoid", condition: "Diabetes", active: true },
  { id: 2, nutrient: "Sodium", threshold: 600, unit: "mg", action: "Avoid", condition: "Hypertension", active: true },
  { id: 3, nutrient: "Fat", threshold: 20, unit: "g", action: "Avoid", condition: "High Cholesterol", active: true },
  { id: 4, nutrient: "Sugar", threshold: 5, unit: "g", action: "Moderate", condition: "All Users", active: true },
  { id: 5, nutrient: "Sodium", threshold: 300, unit: "mg", action: "Moderate", condition: "All Users", active: true },
  { id: 6, nutrient: "Calories", threshold: 500, unit: "kcal", action: "Warning", condition: "Weight Loss", active: false },
];

export default function RulesPage() {
  const [rules, setRules] = useState(defaultRules);
  const [showAdd, setShowAdd] = useState(false);

  const toggleRule = (id) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const addRule = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setRules([...rules, {
      id: Date.now(), nutrient: fd.get("nutrient"), threshold: Number(fd.get("threshold")),
      unit: fd.get("unit"), action: fd.get("action"), condition: fd.get("condition"), active: true,
    }]);
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2>🤖 AI Rules Control</h2>
          <p style={{ marginTop: 4 }}>Configure AI classification thresholds</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>+ Add Rule</button>
      </div>

      {showAdd && (
        <div className="card animate-slide-up" style={{ marginBottom: 24 }}>
          <form onSubmit={addRule} style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, alignItems: "end" }}>
            <div className="input-group"><label>Nutrient</label>
              <select className="input-field" name="nutrient">
                {["Sugar", "Sodium", "Fat", "Calories", "Protein", "Fiber"].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div className="input-group"><label>Threshold</label><input className="input-field" name="threshold" type="number" required /></div>
            <div className="input-group"><label>Unit</label>
              <select className="input-field" name="unit"><option>g</option><option>mg</option><option>kcal</option></select>
            </div>
            <div className="input-group"><label>Action</label>
              <select className="input-field" name="action"><option>Avoid</option><option>Moderate</option><option>Warning</option></select>
            </div>
            <div className="input-group"><label>Condition</label>
              <select className="input-field" name="condition">
                {["All Users", "Diabetes", "Hypertension", "High Cholesterol", "Weight Loss"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button className="btn btn-primary" type="submit" style={{ gridColumn: "span 5" }}>Save Rule</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Nutrient</th><th>Threshold</th><th>Action</th><th>Condition</th><th>Status</th><th>Toggle</th></tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id} style={{ opacity: r.active ? 1 : 0.5 }}>
                <td style={{ fontWeight: 600 }}>{r.nutrient}</td>
                <td>{r.threshold} {r.unit}</td>
                <td><span className={`badge badge-${r.action === "Avoid" ? "danger" : r.action === "Moderate" ? "warning" : "info"}`}>{r.action}</span></td>
                <td>{r.condition}</td>
                <td><span className={`badge badge-${r.active ? "success" : "danger"}`}>{r.active ? "Active" : "Inactive"}</span></td>
                <td>
                  <button className={`btn btn-sm ${r.active ? "btn-secondary" : "btn-primary"}`} onClick={() => toggleRule(r.id)}>
                    {r.active ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
