import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ success: true, products: mockProducts });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ success: true, product: { id: Date.now(), ...body } });
}
