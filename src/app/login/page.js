"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      let result;
      if (isLogin) {
        result = login(email, password);
      } else {
        if (!name) { setError("Name is required"); setLoading(false); return; }
        result = signup(name, email, password);
      }

      if (result.success) {
        const dest = result.user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
        router.push(dest);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 60%)",
      padding: 24,
    }}>
      <div className="animate-fade" style={{
        width: "100%", maxWidth: 440, background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)", borderRadius: "var(--radius-xl)",
        padding: 40, boxShadow: "var(--shadow-lg)",
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 32,
        }}>
          <span style={{ fontSize: "2rem" }}>🔬</span>
          <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem" }}>
            SmartScan AI
          </span>
        </Link>

        <h2 style={{ textAlign: "center", marginBottom: 8 }}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p style={{ textAlign: "center", marginBottom: 28, fontSize: "0.9rem" }}>
          {isLogin ? "Sign in to your account" : "Start your health journey"}
        </p>

        {error && (
          <div style={{
            padding: "12px 16px", borderRadius: "var(--radius-md)",
            background: "#fee2e2", color: "#dc2626", fontSize: "0.9rem",
            marginBottom: 20, textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input className="input-field" type="text" placeholder="John Doe"
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input className="input-field" type="email" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input className="input-field" type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={loading}
            style={{ width: "100%", marginTop: 8 }}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }}
            style={{
              background: "none", border: "none", color: "var(--accent)",
              fontWeight: 600, cursor: "pointer", fontSize: "0.9rem",
            }}>
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>

        <div style={{
          marginTop: 28, padding: "16px", borderRadius: "var(--radius-md)",
          background: "var(--bg-tertiary)", fontSize: "0.82rem", color: "var(--text-muted)",
          textAlign: "center", lineHeight: 1.8,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--text-secondary)" }}>Demo Credentials</div>
          <div>Admin: admin@smartscan.ai / admin123</div>
          <div>User: user@smartscan.ai / user123</div>
        </div>
      </div>
    </div>
  );
}
