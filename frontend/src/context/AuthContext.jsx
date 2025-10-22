// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      const res = await api.post(
        "/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error("❌ Register error:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
