"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { generateDoctorResponse } from "@/lib/nutrition";
import { mockDoctorMessages } from "@/lib/mockData";

export default function DoctorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState(mockDoctorMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = generateDoctorResponse(input, user?.profile);
      setMessages((m) => [...m, { role: "bot", text: response }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>🩺 AI Personal Doctor</h2>
      <p style={{ marginBottom: 24 }}>Get personalized health and nutrition advice</p>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Chat Header */}
        <div style={{ padding: "16px 24px", background: "var(--accent-gradient)", color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "1.5rem" }}>🤖</span>
          <div>
            <div style={{ fontWeight: 700 }}>Dr. SmartScan AI</div>
            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>Your personal health assistant</div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-container" style={{ minHeight: 400 }}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role === "user" ? "user" : "bot"}`}>
              {msg.text}
            </div>
          ))}
          {typing && (
            <div className="chat-msg bot" style={{ opacity: 0.6 }}>
              Thinking...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input className="input-field" style={{ flex: 1 }}
            placeholder="Ask about nutrition, diet, health..."
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
          <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Quick Prompts */}
      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["How to reduce sugar intake?", "Best protein sources?", "Managing cholesterol", "Weight loss tips"].map((q) => (
          <button key={q} className="btn btn-secondary btn-sm"
            onClick={() => { setInput(q); }}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
