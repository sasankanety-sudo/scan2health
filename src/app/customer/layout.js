"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function CustomerLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && user.role !== "customer") router.push("/admin/dashboard");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</div>
          <p style={{ marginTop: 16, color: "var(--text-muted)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: "none", background: "none", border: "none", fontSize: "1.4rem", color: "var(--text-primary)", cursor: "pointer" }}
            className="mobile-menu-btn">
            ☰
          </button>
          <span className="topbar-title">Welcome, {user.name} 👋</span>
        </div>
        <div className="topbar-actions">
          <span style={{ fontSize: "1.5rem" }}>{user.avatar}</span>
        </div>
      </div>
      <main className="main-content animate-fade">
        {children}
      </main>
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}
