"use client";

import { useState } from "react";
import { mockHealthTips } from "@/lib/mockData";

export default function ContentPage() {
  const [tips, setTips] = useState(mockHealthTips);
  const [showAdd, setShowAdd] = useState(false);

  const addTip = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setTips([...tips, {
      id: Date.now(),
      title: fd.get("title"),
      content: fd.get("content"),
      icon: fd.get("icon"),
      category: fd.get("category"),
    }]);
    setShowAdd(false);
    e.target.reset();
  };

  const deleteTip = (id) => setTips(tips.filter((t) => t.id !== id));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2>📝 Content Management</h2>
          <p style={{ marginTop: 4 }}>Manage health tips and AI doctor templates</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>+ Add Tip</button>
      </div>

      {showAdd && (
        <div className="card animate-slide-up" style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 16 }}>Add Health Tip</h4>
          <form onSubmit={addTip} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="input-group"><label>Title</label><input className="input-field" name="title" required /></div>
              <div className="input-group"><label>Icon (emoji)</label><input className="input-field" name="icon" defaultValue="💡" /></div>
            </div>
            <div className="input-group">
              <label>Content</label>
              <textarea className="input-field" name="content" rows="3" required style={{ resize: "vertical" }} />
            </div>
            <div className="input-group">
              <label>Category</label>
              <select className="input-field" name="category">
                <option>General</option><option>Nutrition</option><option>Diet</option><option>Exercise</option><option>Mental Health</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-primary" type="submit">Save Tip</button>
              <button className="btn btn-secondary" type="button" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
        {tips.map((tip) => (
          <div key={tip.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: "1.8rem" }}>{tip.icon}</span>
                <div>
                  <h4>{tip.title}</h4>
                  <span className="badge badge-info" style={{ marginTop: 4 }}>{tip.category}</span>
                </div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTip(tip.id)}>✕</button>
            </div>
            <p style={{ marginTop: 12, fontSize: "0.9rem" }}>{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
