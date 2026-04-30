import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "Sarah Johnson", email: "user@smartscan.ai", role: "customer", scans: 45, status: "active" },
  { id: 2, name: "Mike Thompson", email: "mike@example.com", role: "customer", scans: 32, status: "active" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", role: "customer", scans: 67, status: "active" },
];

export async function GET() {
  return NextResponse.json({ success: true, users });
}
