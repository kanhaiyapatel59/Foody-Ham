import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

/* =========================
   Axios Instance
========================= */
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   Auth Context
========================= */
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

/* =========================
   Auth Provider
========================= */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     INIT AUTH (ON APP LOAD)
  ========================= */
  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (!storedUser || !storedToken || storedToken === "undefined") {
        setLoading(false);
        return;
      }

      setUser(JSON.parse(storedUser));
      setLoading(false);
    };

    initAuth();
  }, []);

  /* =========================
     LOGIN (FIXED)
  ========================= */
  const login = async (email, password) => {
    setError("");

    const res = await api.post("/auth/login", { email, password });

    const backendUser = res.data.data;
    const token = backendUser.token;

    if (!token) {
      throw new Error("Token missing from backend");
    }

    // ✅ STORE TOKEN PROPERLY
    localStorage.setItem("token", token);

    // ❌ REMOVE token from user object
    const { token: _, ...cleanUser } = backendUser;

    const userData = {
      ...cleanUser,
      isAdmin: cleanUser.role === "admin",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  /* =========================
     REGISTER (FIXED)
  ========================= */
  const register = async (name, email, password) => {
    setError("");

    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    const backendUser = res.data.data;
    const token = backendUser.token;

    if (!token) {
      throw new Error("Token missing from backend");
    }

    localStorage.setItem("token", token);

    const { token: _, ...cleanUser } = backendUser;

    const userData = {
      ...cleanUser,
      isAdmin: cleanUser.role === "admin",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError: () => setError(""),
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
