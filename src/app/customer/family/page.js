"use client";

import { useState } from "react";
import { mockFamilyMembers } from "@/lib/mockData";

export default function FamilyPage() {
  const [members, setMembers] = useState(mockFamilyMembers);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", relation: "", avatar: "🧑", conditions: [] });

  const addMember = (e) => {
    e.preventDefault();
    setMembers([...members, { ...form, id: Date.now(), age: Number(form.age) }]);
    setForm({ name: "", age: "", relation: "", avatar: "🧑", conditions: [] });
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h2>👨‍👩‍👧 Family Profiles</h2>
          <p style={{ marginTop: 4 }}>Manage health profiles for your family members</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          + Add Member
        </button>
      </div>

      {showAdd && (
        <div className="card animate-slide-up" style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 16 }}>Add Family Member</h4>
          <form onSubmit={addMember} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="input-group">
              <label>Name</label>
              <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Age</label>
              <input className="input-field" type="number" required value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Relation</label>
              <input className="input-field" required value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} placeholder="e.g. Spouse, Child" />
            </div>
            <div className="input-group">
              <label>Avatar</label>
              <select className="input-field" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })}>
                {["🧑", "👨", "👩", "👦", "👧", "👴", "👵"].map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "span 2", display: "flex", gap: 12 }}>
              <button className="btn btn-primary" type="submit">Add Member</button>
              <button className="btn btn-secondary" type="button" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {members.map((m) => (
          <div key={m.id} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>{m.avatar}</div>
            <h3>{m.name}</h3>
            <p style={{ marginTop: 4 }}>{m.relation} • Age {m.age}</p>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
              {m.conditions.map((c) => (
                <span key={c} className={`badge ${c === "None" ? "badge-success" : "badge-warning"}`}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
