"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState(user?.profile || {
    age: "", weight: "", height: "", gender: "male", conditions: [], goal: "Maintain healthy weight",
  });
  const [saved, setSaved] = useState(false);

  const conditions = ["None", "Diabetes", "High Cholesterol", "Hypertension", "Lactose Intolerant", "Gluten Intolerant", "Heart Disease"];

  const handleCondition = (c) => {
    setForm((f) => ({
      ...f,
      conditions: f.conditions?.includes(c) ? f.conditions.filter((x) => x !== c) : [...(f.conditions || []), c],
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>👤 Health Profile</h2>
      <p style={{ marginBottom: 32 }}>Set up your health profile for personalized AI recommendations</p>

      <form onSubmit={handleSave} style={{ maxWidth: 600 }}>
        <div className="card" style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 20 }}>📋 Basic Information</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="input-group">
              <label>Age</label>
              <input className="input-field" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="28" />
            </div>
            <div className="input-group">
              <label>Gender</label>
              <select className="input-field" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Weight (kg)</label>
              <input className="input-field" type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="65" />
            </div>
            <div className="input-group">
              <label>Height (cm)</label>
              <input className="input-field" type="number" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} placeholder="168" />
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 20 }}>🏥 Health Conditions</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {conditions.map((c) => (
              <button type="button" key={c} onClick={() => handleCondition(c)} className={`badge ${form.conditions?.includes(c) ? "badge-success" : ""}`}
                style={{ cursor: "pointer", padding: "8px 16px", border: form.conditions?.includes(c) ? "none" : "1px solid var(--border-color)", background: form.conditions?.includes(c) ? undefined : "var(--bg-tertiary)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 16 }}>🎯 Health Goal</h4>
          <select className="input-field" style={{ width: "100%" }} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
            <option>Maintain healthy weight</option>
            <option>Lose weight</option>
            <option>Gain muscle</option>
            <option>Manage diabetes</option>
            <option>Lower cholesterol</option>
            <option>General wellness</option>
          </select>
        </div>

        <button className="btn btn-primary btn-lg" type="submit" style={{ width: "100%" }}>
          {saved ? "✅ Saved!" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
