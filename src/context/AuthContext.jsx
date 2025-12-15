import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
// import { auth } from "../firebase"; 
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

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

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

/* =========================
Auth Provider
========================= */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const clearError = useCallback(() => setError(""), []);

    const updateAuth = useCallback((token, cleanUser) => {
        const userData = {
            ...cleanUser,
            isAdmin: cleanUser.role === "admin",
        };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return userData;
    }, []); // Wrapped updateAuth in useCallback

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
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser({ ...parsedUser, isAdmin: parsedUser.role === 'admin' });
            } catch (e) {
                console.error("Error parsing stored user:", e);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    /* =========================
    LOGIN (Refined)
    ========================= */
    const login = useCallback(async (email, password) => {
        setError("");
        try {
            const res = await api.post("/auth/login", { email, password });
            const backendUser = res.data.data;
            const token = backendUser.token;
            if (!token) {
                throw new Error("Token missing from backend");
            }
            const { token: _, ...cleanUser } = backendUser;
            return updateAuth(token, cleanUser);
        } catch (err) {
            const message = err.response?.data?.message || "Login failed. Please check your credentials.";
            setError(message);
            throw new Error(message);
        }
    }, [updateAuth]);


    /* =========================
    REGISTER (Refined)
    ========================= */
    const register = useCallback(async (name, email, password) => {
        setError("");
        try {
            const res = await api.post("/auth/register", { name, email, password });
            const backendUser = res.data.data;
            const token = backendUser.token;

            if (!token) {
                throw new Error("Token missing from backend");
            }
            
            const { token: _, ...cleanUser } = backendUser;

            return updateAuth(token, cleanUser);
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed. Please try again.";
            setError(message);
            throw new Error(message);
        }
    }, [updateAuth]);

    /* =========================
    LOGOUT
    ========================= */
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        localStorage.removeItem('foodyham_cart'); 
        setUser(null);
    }, []);

    /* =========================
    UPDATE PROFILE (NEW IMPLEMENTATION)
    ========================= */
    const updateProfile = async (profileData) => {
        setError("");
        try {

            const res = await api.put("/auth/profile", profileData);

            if (res.data.success) {
                const updatedUser = res.data.data;
                const token = localStorage.getItem("token") || updatedUser.token; // Keep old token or use new one if sent

                if (!token) {
                    throw new Error("Authentication token is missing.");
                }

                const { token: _, ...cleanUser } = updatedUser;
                const userData = { ...cleanUser, isAdmin: cleanUser.role === "admin" };
                
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                
                return userData;
            } else {
                throw new Error(res.data.message || "Failed to update profile.");
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Failed to update profile due to an error.";
            setError(message);
            throw new Error(message);
        }
    };

    /* =========================
    CHANGE PASSWORD (FIXED IMPLEMENTATION)
    ========================= */
    const changePassword = async (currentPassword, newPassword) => {
        setError("");
        try {
            const res = await api.put("/auth/password", {
                currentPassword,
                newPassword,
            });

            if (res.data.success) {
                return true; 
            } else {
                throw new Error(res.data.message || "Failed to change password.");
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Failed to change password due to an error.";
            setError(message);
            throw new Error(message);
        }
    };

    /* =========================
    GOOGLE SIGN-IN (NEW IMPLEMENTATION)
    ========================= */
    const googleSignIn = useCallback(async () => {
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            // 1. Authenticate with Firebase
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // 2. Send Firebase ID Token to your backend for verification
            const idToken = await user.getIdToken();
            const response = await api.post('/auth/google', {
                token: idToken
            });
            
            // 3. Handle response from your backend (which returns your internal JWT and user data)
            const backendUser = response.data.data;
            const token = backendUser.token;
            
            if (!token) {
                throw new Error("Internal token missing after Google login.");
            }
            
            const { token: _, ...cleanUser } = backendUser;
            return updateAuth(token, cleanUser);
        } catch (err) {
            // Check if error is from Firebase popup (user closed it)
            if (err.code === 'auth/popup-closed-by-user') {
                setError("Google sign-in was closed.");
            } else {
                // Handle backend errors or other Firebase errors
                const message = err.response?.data?.message || err.message || "Google Sign-In failed.";
                setError(message);
                throw new Error(message);
            }
        }
    }, [updateAuth]);


    /* =========================
    CONTEXT VALUE
    ========================= */
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                clearError,
                updateProfile, 
                changePassword,
                googleSignIn, 
            }}
        >
            {!loading && children}
            {loading && <div className="text-center py-20 text-gray-500">Loading application...</div>}
        </AuthContext.Provider>
    );
};