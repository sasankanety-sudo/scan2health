export const mockProducts = [
  { id: 1, name: "Organic Oats", brand: "Nature's Best", barcode: "8901234567890", category: "Cereals", image: "🌾", nutrition: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6, sugar: 0.5, sodium: 2 }, healthScore: 92, tags: ["High Fiber", "Low Sugar", "Whole Grain"] },
  { id: 2, name: "Greek Yogurt", brand: "FitLife", barcode: "8901234567891", category: "Dairy", image: "🥛", nutrition: { calories: 59, protein: 10, carbs: 3.6, fat: 0.7, fiber: 0, sugar: 3.2, sodium: 36 }, healthScore: 88, tags: ["High Protein", "Low Fat", "Probiotic"] },
  { id: 3, name: "Chocolate Cookies", brand: "Yummy Treats", barcode: "8901234567892", category: "Snacks", image: "🍪", nutrition: { calories: 502, protein: 5.4, carbs: 64, fat: 25, fiber: 2.8, sugar: 32, sodium: 340 }, healthScore: 25, tags: ["High Sugar", "High Fat", "Processed"] },
  { id: 4, name: "Brown Rice", brand: "Farm Fresh", barcode: "8901234567893", category: "Grains", image: "🍚", nutrition: { calories: 370, protein: 7.9, carbs: 77, fat: 2.9, fiber: 3.5, sugar: 0.7, sodium: 7 }, healthScore: 85, tags: ["Whole Grain", "Gluten Free", "Low Fat"] },
  { id: 5, name: "Cola Drink", brand: "FizzPop", barcode: "8901234567894", category: "Beverages", image: "🥤", nutrition: { calories: 42, protein: 0, carbs: 10.6, fat: 0, fiber: 0, sugar: 10.6, sodium: 6 }, healthScore: 12, tags: ["High Sugar", "Artificial", "No Nutrition"] },
  { id: 6, name: "Mixed Nuts", brand: "NutriCrunch", barcode: "8901234567895", category: "Snacks", image: "🥜", nutrition: { calories: 607, protein: 20, carbs: 21, fat: 54, fiber: 7, sugar: 4.2, sodium: 3 }, healthScore: 78, tags: ["Healthy Fats", "High Protein", "Natural"] },
  { id: 7, name: "Whole Wheat Bread", brand: "Baker's Choice", barcode: "8901234567896", category: "Bakery", image: "🍞", nutrition: { calories: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7, sugar: 6, sodium: 400 }, healthScore: 72, tags: ["Whole Grain", "High Fiber"] },
  { id: 8, name: "Orange Juice", brand: "FreshSqueeze", barcode: "8901234567897", category: "Beverages", image: "🍊", nutrition: { calories: 45, protein: 0.7, carbs: 10.4, fat: 0.2, fiber: 0.2, sugar: 8.4, sodium: 1 }, healthScore: 65, tags: ["Vitamin C", "Natural Sugar"] },
  { id: 9, name: "Instant Noodles", brand: "QuickBite", barcode: "8901234567898", category: "Ready to Eat", image: "🍜", nutrition: { calories: 458, protein: 8.3, carbs: 56, fat: 22, fiber: 1.9, sugar: 3.6, sodium: 1820 }, healthScore: 18, tags: ["High Sodium", "Processed", "Low Nutrition"] },
  { id: 10, name: "Almond Milk", brand: "PlantPure", barcode: "8901234567899", category: "Dairy Alt", image: "🥛", nutrition: { calories: 15, protein: 0.6, carbs: 0.3, fat: 1.1, fiber: 0.2, sugar: 0, sodium: 70 }, healthScore: 82, tags: ["Low Calorie", "Plant Based", "Lactose Free"] },
  { id: 11, name: "Protein Bar", brand: "PowerFuel", barcode: "8901234567900", category: "Supplements", image: "💪", nutrition: { calories: 210, protein: 20, carbs: 25, fat: 7, fiber: 3, sugar: 8, sodium: 180 }, healthScore: 70, tags: ["High Protein", "Post Workout"] },
  { id: 12, name: "Potato Chips", brand: "CrunchMax", barcode: "8901234567901", category: "Snacks", image: "🥔", nutrition: { calories: 536, protein: 7, carbs: 53, fat: 35, fiber: 4.4, sugar: 0.3, sodium: 570 }, healthScore: 20, tags: ["High Fat", "High Sodium", "Fried"] },
  { id: 13, name: "Green Tea", brand: "ZenLeaf", barcode: "8901234567902", category: "Beverages", image: "🍵", nutrition: { calories: 1, protein: 0.2, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 1 }, healthScore: 95, tags: ["Antioxidants", "Zero Calorie", "Natural"] },
  { id: 14, name: "Salmon Fillet", brand: "Ocean Fresh", barcode: "8901234567903", category: "Seafood", image: "🐟", nutrition: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, sodium: 59 }, healthScore: 90, tags: ["Omega-3", "High Protein", "Brain Health"] },
  { id: 15, name: "White Sugar", brand: "SweetLife", barcode: "8901234567904", category: "Condiments", image: "🧂", nutrition: { calories: 387, protein: 0, carbs: 100, fat: 0, fiber: 0, sugar: 100, sodium: 1 }, healthScore: 5, tags: ["Pure Sugar", "Empty Calories", "Avoid"] },
];

export const mockScanHistory = [
  { id: 1, productId: 1, date: "2025-04-22T10:30:00", result: "safe" },
  { id: 2, productId: 3, date: "2025-04-22T14:15:00", result: "avoid" },
  { id: 3, productId: 2, date: "2025-04-21T09:00:00", result: "safe" },
  { id: 4, productId: 5, date: "2025-04-21T16:45:00", result: "avoid" },
  { id: 5, productId: 6, date: "2025-04-20T11:20:00", result: "moderate" },
  { id: 6, productId: 13, date: "2025-04-20T08:00:00", result: "safe" },
  { id: 7, productId: 9, date: "2025-04-19T13:30:00", result: "avoid" },
  { id: 8, productId: 14, date: "2025-04-19T19:00:00", result: "safe" },
];

export const mockHealthTips = [
  { id: 1, title: "Stay Hydrated", content: "Drink at least 8 glasses of water daily. Proper hydration aids digestion and nutrient absorption.", icon: "💧", category: "General" },
  { id: 2, title: "Read Labels Carefully", content: "Always check sodium and sugar content. Many 'healthy' products contain hidden sugars.", icon: "🏷️", category: "Nutrition" },
  { id: 3, title: "Eat More Fiber", content: "Aim for 25-30g of fiber daily. It helps maintain blood sugar and cholesterol levels.", icon: "🥦", category: "Diet" },
  { id: 4, title: "Limit Processed Foods", content: "Ultra-processed foods are linked to increased health risks. Choose whole foods when possible.", icon: "🚫", category: "Diet" },
  { id: 5, title: "Balance Your Plate", content: "Fill half your plate with vegetables, quarter with protein, and quarter with whole grains.", icon: "🍽️", category: "Diet" },
];

export const mockDoctorMessages = [
  { role: "bot", text: "Hello! I'm your AI Health Assistant. Based on your profile, I can provide personalized nutrition advice. What would you like to know?" },
  { role: "bot", text: "I noticed your recent scans show some high-sodium products. For better heart health, try to keep sodium under 2,300mg per day." },
];

export const mockDietPlan = {
  breakfast: [
    { name: "Oatmeal with Berries", calories: 350, protein: 12, icon: "🥣" },
    { name: "Green Smoothie", calories: 180, protein: 5, icon: "🥤" },
    { name: "Boiled Eggs (2)", calories: 140, protein: 12, icon: "🥚" },
  ],
  lunch: [
    { name: "Grilled Chicken Salad", calories: 420, protein: 35, icon: "🥗" },
    { name: "Brown Rice Bowl", calories: 380, protein: 10, icon: "🍚" },
    { name: "Lentil Soup", calories: 230, protein: 18, icon: "🍲" },
  ],
  dinner: [
    { name: "Salmon with Vegetables", calories: 450, protein: 30, icon: "🐟" },
    { name: "Quinoa Stir Fry", calories: 350, protein: 14, icon: "🍳" },
    { name: "Mixed Bean Salad", calories: 280, protein: 16, icon: "🥗" },
  ],
  snacks: [
    { name: "Mixed Nuts (30g)", calories: 180, protein: 6, icon: "🥜" },
    { name: "Greek Yogurt", calories: 100, protein: 10, icon: "🥛" },
    { name: "Apple with Peanut Butter", calories: 200, protein: 4, icon: "🍎" },
  ],
};

export const mockFamilyMembers = [
  { id: 1, name: "Sarah Johnson", age: 28, relation: "Self", avatar: "👩‍⚕️", conditions: ["None"] },
  { id: 2, name: "Mike Johnson", age: 32, relation: "Spouse", avatar: "👨", conditions: ["High Cholesterol"] },
  { id: 3, name: "Emma Johnson", age: 5, relation: "Daughter", avatar: "👧", conditions: ["Lactose Intolerant"] },
];

export const mockAdminStats = {
  totalUsers: 12847,
  totalScans: 89432,
  activeToday: 3241,
  productsInDB: 45670,
  avgHealthScore: 68,
  topCategories: [
    { name: "Snacks", count: 23400 },
    { name: "Beverages", count: 18200 },
    { name: "Dairy", count: 15600 },
    { name: "Cereals", count: 12300 },
    { name: "Bakery", count: 9800 },
  ],
};
