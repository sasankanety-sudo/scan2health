"use client";

import { getHealthScoreColor } from "@/lib/nutrition";

export default function HealthScore({ score, size = 140 }) {
  const color = getHealthScoreColor(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="health-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120">
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke="var(--border-color)"
          strokeWidth="8"
        />
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div style={{ textAlign: "center" }}>
        <div className="score" style={{ color }}>{score}</div>
        <div className="label">Health Score</div>
      </div>
    </div>
  );
}
