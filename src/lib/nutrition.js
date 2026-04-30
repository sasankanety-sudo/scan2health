export function classifyNutrition(nutrition) {
  const issues = [];
  const good = [];

  if (nutrition.sugar > 15) issues.push({ nutrient: "Sugar", level: "High", detail: `${nutrition.sugar}g — exceeds recommended limit`, severity: "avoid" });
  else if (nutrition.sugar > 5) issues.push({ nutrient: "Sugar", level: "Moderate", detail: `${nutrition.sugar}g — within moderate range`, severity: "moderate" });
  else good.push({ nutrient: "Sugar", detail: `${nutrition.sugar}g — excellent, low sugar` });

  if (nutrition.sodium > 600) issues.push({ nutrient: "Sodium", level: "High", detail: `${nutrition.sodium}mg — very high sodium`, severity: "avoid" });
  else if (nutrition.sodium > 300) issues.push({ nutrient: "Sodium", level: "Moderate", detail: `${nutrition.sodium}mg — moderate sodium`, severity: "moderate" });
  else good.push({ nutrient: "Sodium", detail: `${nutrition.sodium}mg — low sodium, great!` });

  if (nutrition.fat > 20) issues.push({ nutrient: "Fat", level: "High", detail: `${nutrition.fat}g — high fat content`, severity: "avoid" });
  else if (nutrition.fat > 10) issues.push({ nutrient: "Fat", level: "Moderate", detail: `${nutrition.fat}g — moderate fat`, severity: "moderate" });
  else good.push({ nutrient: "Fat", detail: `${nutrition.fat}g — low fat content` });

  if (nutrition.protein >= 10) good.push({ nutrient: "Protein", detail: `${nutrition.protein}g — good protein source` });
  if (nutrition.fiber >= 5) good.push({ nutrient: "Fiber", detail: `${nutrition.fiber}g — high in fiber` });

  const avoidCount = issues.filter((i) => i.severity === "avoid").length;
  let verdict = "safe";
  if (avoidCount >= 2) verdict = "avoid";
  else if (avoidCount === 1 || issues.length >= 2) verdict = "moderate";

  return { issues, good, verdict };
}

export function getHealthScoreColor(score) {
  if (score >= 75) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

export function getVerdictInfo(verdict) {
  const map = {
    safe: { label: "Safe to Consume", color: "#10b981", bg: "#d1fae5", icon: "✅" },
    moderate: { label: "Consume in Moderation", color: "#f59e0b", bg: "#fef3c7", icon: "⚠️" },
    avoid: { label: "Best to Avoid", color: "#ef4444", bg: "#fee2e2", icon: "🚫" },
  };
  return map[verdict] || map.moderate;
}

export function generateDoctorResponse(message, profile) {
  const lower = message.toLowerCase();
  if (lower.includes("sugar") || lower.includes("diabetes"))
    return "Based on health guidelines, you should limit daily sugar intake to under 25g. Avoid processed foods with added sugars. Choose whole fruits over juices, and opt for foods with a glycemic index below 55.";
  if (lower.includes("sodium") || lower.includes("salt") || lower.includes("blood pressure"))
    return "To manage sodium intake, aim for less than 2,300mg per day. Avoid instant noodles, processed meats, and canned soups. Use herbs and spices for flavoring instead of salt.";
  if (lower.includes("protein"))
    return `For your profile, I recommend ${profile?.weight ? Math.round(profile.weight * 0.8) : 50}-${profile?.weight ? Math.round(profile.weight * 1.2) : 75}g of protein daily. Great sources include eggs, Greek yogurt, lean meats, lentils, and nuts.`;
  if (lower.includes("weight") || lower.includes("lose") || lower.includes("gain"))
    return "For healthy weight management, focus on a balanced diet with adequate protein, plenty of vegetables, and whole grains. Aim for a moderate caloric deficit of 300-500 calories if losing weight. Regular exercise is equally important.";
  if (lower.includes("cholesterol"))
    return "To manage cholesterol, reduce saturated fats (red meat, full-fat dairy), increase fiber intake (oats, beans), eat fatty fish twice weekly for omega-3s, and exercise regularly. Avoid trans fats completely.";
  return "That's a great question! I recommend focusing on whole, unprocessed foods, staying hydrated, and maintaining regular meal times. Would you like specific advice on any nutrient or health condition?";
}
