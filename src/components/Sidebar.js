"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const customerLinks = [
  { href: "/customer/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/customer/scan", label: "Scan Product", icon: "📷" },
  { href: "/customer/analysis", label: "Analysis", icon: "🔬" },
  { href: "/customer/doctor", label: "AI Doctor", icon: "🩺" },
  { href: "/customer/cart", label: "Smart Cart", icon: "🛒" },
  { href: "/customer/diet", label: "Diet Planner", icon: "🥗" },
  { href: "/customer/family", label: "Family", icon: "👨‍👩‍👧" },
  { href: "/customer/profile", label: "Profile", icon: "👤" },
  { href: "/customer/shop", label: "Shop", icon: "🛍️" },
];

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/rules", label: "AI Rules", icon: "🤖" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/reports", label: "Reports", icon: "📈" },
  { href: "/admin/content", label: "Content", icon: "📝" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const links = user?.role === "admin" ? adminLinks : customerLinks;

  return (
    <>
      {isOpen && <div className="sidebar-mobile-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <span style={{ fontSize: "1.6rem" }}>🔬</span>
          <span className="gradient-text">SmartScan AI</span>
        </div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${pathname === link.href ? "active" : ""}`}
              onClick={onClose}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-link"
            onClick={toggleTheme}
            style={{ width: "100%" }}
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            className="sidebar-link"
            onClick={logout}
            style={{ width: "100%", color: "var(--danger)" }}
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>
      <style jsx>{`
        .sidebar-mobile-overlay {
          display: none;
        }
        @media (max-width: 768px) {
          .sidebar-mobile-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
          }
        }
      `}</style>
    </>
  );
}
