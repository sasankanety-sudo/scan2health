import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "var(--glass-bg)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-color)",
        padding: "0 32px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.6rem" }}>🔬</span>
          <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.3rem" }}>
            SmartScan AI
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/login" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px",
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 60%)",
        position: "relative", overflow: "hidden",
      }}>
        <div className="container animate-fade" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block", padding: "8px 20px", borderRadius: 999,
            background: "var(--accent-light)", color: "var(--accent)",
            fontSize: "0.85rem", fontWeight: 600, marginBottom: 24,
          }}>
            🚀 AI-Powered Health & Nutrition
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", marginBottom: 20, lineHeight: 1.1 }}>
            Scan. Analyze.{" "}
            <span className="gradient-text">Live Healthier.</span>
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Instantly scan food products, get AI-powered nutrition analysis,
            personalized health recommendations, and smart dietary planning.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login" className="btn btn-primary btn-lg">
              Start Scanning Free →
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 48, justifyContent: "center", marginTop: 72, flexWrap: "wrap",
          }}>
            {[
              { num: "12K+", label: "Active Users" },
              { num: "89K+", label: "Products Scanned" },
              { num: "45K+", label: "Products in Database" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="gradient-text" style={{ fontSize: "2.2rem", fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                  {s.num}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 24px", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-title">
            <h2>Powerful <span className="gradient-text">Features</span></h2>
            <p>Everything you need to make healthier food choices, powered by AI</p>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}>
            {[
              { icon: "📷", title: "Instant Barcode Scanning", desc: "Scan any food product barcode to instantly get full nutrition information and health analysis." },
              { icon: "🧠", title: "AI Nutrition Analysis", desc: "Our AI classifies nutrients as Good, Moderate, or Avoid based on your personal health profile." },
              { icon: "⭐", title: "Health Score Rating", desc: "Every product gets a 0-100 health score so you can compare and choose the healthiest options." },
              { icon: "⚠️", title: "Allergen Detection", desc: "Automatic alerts for allergens and ingredients that conflict with your health conditions." },
              { icon: "🩺", title: "AI Personal Doctor", desc: "Chat with your AI health assistant for personalized nutrition advice anytime." },
              { icon: "🛒", title: "Smart Cart", desc: "Add products to your smart cart and see the overall health impact of your shopping list." },
            ].map((f) => (
              <div key={f.title} className="glass-card" style={{ textAlign: "center", padding: 36 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{f.icon}</div>
                <h4 style={{ marginBottom: 10 }}>{f.title}</h4>
                <p style={{ fontSize: "0.9rem" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "100px 24px" }}>
        <div className="container">
          <div className="section-title">
            <h2>How It <span className="gradient-text">Works</span></h2>
            <p>Three simple steps to healthier eating</p>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40, maxWidth: 900, margin: "0 auto",
          }}>
            {[
              { step: "1", icon: "📱", title: "Scan", desc: "Point your camera at any food product barcode or search by name" },
              { step: "2", icon: "🔬", title: "Analyze", desc: "AI instantly analyzes nutrition, ingredients, and health impact" },
              { step: "3", icon: "💪", title: "Improve", desc: "Get personalized recommendations and healthier alternatives" },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "var(--accent-gradient)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2rem", margin: "0 auto 20px", color: "#fff",
                }}>
                  {s.icon}
                </div>
                <h3 style={{ marginBottom: 8 }}>
                  <span className="gradient-text">Step {s.step}: </span>{s.title}
                </h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "100px 24px", textAlign: "center",
        background: "radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.15) 0%, transparent 60%)",
      }}>
        <div className="container">
          <h2 style={{ marginBottom: 16 }}>
            Ready to <span className="gradient-text">Eat Smarter</span>?
          </h2>
          <p style={{ marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Join thousands of health-conscious users making better food choices every day.
          </p>
          <Link href="/login" className="btn btn-primary btn-lg">
            Get Started Free →
          </Link>
          <div style={{ marginTop: 24, fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Demo: admin@smartscan.ai / admin123 or user@smartscan.ai / user123
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "48px 24px", borderTop: "1px solid var(--border-color)",
        textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: "1.3rem" }}>🔬</span>
          <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>SmartScan AI</span>
        </div>
        <p>AI-powered health & nutrition assistant. Eat smarter, live healthier.</p>
        <p style={{ marginTop: 12 }}>© 2025 SmartScan AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
