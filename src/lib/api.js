const OPENFOODFACTS_API = "https://world.openfoodfacts.org/api/v2";

export async function lookupBarcode(barcode) {
  try {
    const res = await fetch(`${OPENFOODFACTS_API}/product/${barcode}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (data.status === 1 && data.product) {
      const p = data.product;
      return {
        success: true,
        product: {
          name: p.product_name || "Unknown Product",
          brand: p.brands || "Unknown Brand",
          barcode,
          image: p.image_url || null,
          category: p.categories_tags?.[0]?.replace("en:", "") || "General",
          nutrition: {
            calories: p.nutriments?.["energy-kcal_100g"] || 0,
            protein: p.nutriments?.proteins_100g || 0,
            carbs: p.nutriments?.carbohydrates_100g || 0,
            fat: p.nutriments?.fat_100g || 0,
            fiber: p.nutriments?.fiber_100g || 0,
            sugar: p.nutriments?.sugars_100g || 0,
            sodium: Math.round((p.nutriments?.sodium_100g || 0) * 1000),
          },
          ingredients: p.ingredients_text || "Not available",
          nutriscore: p.nutriscore_grade || "unknown",
        },
      };
    }
    return { success: false, error: "Product not found" };
  } catch {
    return { success: false, error: "Failed to fetch product data" };
  }
}

export async function searchProducts(query) {
  try {
    const res = await fetch(
      `${OPENFOODFACTS_API}/search?search_terms=${encodeURIComponent(query)}&page_size=10&fields=product_name,brands,code,image_url,nutriments,categories_tags`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return {
      success: true,
      products: (data.products || []).map((p) => ({
        name: p.product_name || "Unknown",
        brand: p.brands || "Unknown",
        barcode: p.code,
        image: p.image_url || null,
        category: p.categories_tags?.[0]?.replace("en:", "") || "General",
        nutrition: {
          calories: p.nutriments?.["energy-kcal_100g"] || 0,
          protein: p.nutriments?.proteins_100g || 0,
          carbs: p.nutriments?.carbohydrates_100g || 0,
          fat: p.nutriments?.fat_100g || 0,
          fiber: p.nutriments?.fiber_100g || 0,
          sugar: p.nutriments?.sugars_100g || 0,
          sodium: Math.round((p.nutriments?.sodium_100g || 0) * 1000),
        },
      })),
    };
  } catch {
    return { success: false, error: "Search failed" };
  }
}
