"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

const DEMO_USERS = [
  {
    id: 1,
    email: "admin@smartscan.ai",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    avatar: "👨‍💼",
  },
  {
    id: 2,
    email: "user@smartscan.ai",
    password: "user123",
    name: "Sarah Johnson",
    role: "customer",
    avatar: "👩‍⚕️",
    profile: {
      age: 28,
      weight: 65,
      height: 168,
      gender: "female",
      conditions: ["None"],
      goal: "Maintain healthy weight",
    },
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("smartscan-user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("smartscan-user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { success: false, error: "Invalid credentials" };

    const userData = { ...found };
    delete userData.password;
    setUser(userData);
    localStorage.setItem("smartscan-user", JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const signup = (name, email, password) => {
    const exists = DEMO_USERS.find((u) => u.email === email);
    if (exists) return { success: false, error: "Email already exists" };

    const newUser = {
      id: Date.now(),
      email,
      name,
      role: "customer",
      avatar: "🧑",
      profile: null,
    };
    setUser(newUser);
    localStorage.setItem("smartscan-user", JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartscan-user");
    router.push("/");
  };

  const updateProfile = (profile) => {
    const updated = { ...user, profile };
    setUser(updated);
    localStorage.setItem("smartscan-user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
