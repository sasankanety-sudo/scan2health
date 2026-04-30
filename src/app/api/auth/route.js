import { NextResponse } from "next/server";

const users = [
  { id: 1, email: "admin@smartscan.ai", password: "admin123", name: "Admin User", role: "admin" },
  { id: 2, email: "user@smartscan.ai", password: "user123", name: "Sarah Johnson", role: "customer" },
];

export async function POST(request) {
  const body = await request.json();
  const { action, email, password, name } = body;

  if (action === "login") {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    const { password: _, ...userData } = user;
    return NextResponse.json({ success: true, user: userData });
  }

  if (action === "signup") {
    const exists = users.find((u) => u.email === email);
    if (exists) return NextResponse.json({ success: false, error: "Email exists" }, { status: 400 });
    const newUser = { id: Date.now(), email, name, role: "customer" };
    return NextResponse.json({ success: true, user: newUser });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
