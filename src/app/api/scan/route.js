import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function POST(request) {
  const { barcode } = await request.json();

  // Check local mock data first
  const local = mockProducts.find((p) => p.barcode === barcode);
  if (local) return NextResponse.json({ success: true, source: "local", product: local });

  // Try OpenFoodFacts
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
    const data = await res.json();
    if (data.status === 1 && data.product) {
      const p = data.product;
      return NextResponse.json({
        success: true,
        source: "openfoodfacts",
        product: {
          name: p.product_name || "Unknown",
          brand: p.brands || "Unknown",
          barcode,
          nutrition: {
            calories: p.nutriments?.["energy-kcal_100g"] || 0,
            protein: p.nutriments?.proteins_100g || 0,
            carbs: p.nutriments?.carbohydrates_100g || 0,
            fat: p.nutriments?.fat_100g || 0,
            fiber: p.nutriments?.fiber_100g || 0,
            sugar: p.nutriments?.sugars_100g || 0,
            sodium: Math.round((p.nutriments?.sodium_100g || 0) * 1000),
          },
        },
      });
    }
  } catch {}

  return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
}
