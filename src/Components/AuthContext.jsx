import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TOKEN_URL,
  SIGN_UP_URL,
  REFRESH_URL,
  RESET_PASSWORD,
} from "../api.config.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const forgotPassword = async (email, frontend_url) => {
    try {
      setLoading(true);

      const res = await fetch(`${RESET_PASSWORD}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, frontend_url }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          (data && (data.detail || data.message || JSON.stringify(data))) ||
          "Password reset failed";
        setLoading(false);
        return { success: false, message };
      }

      setLoading(false);
      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    } catch (err) {
      setLoading(false);
      return {
        success: false,
        message: err.message || "Forgot password failed",
      };
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAccess = localStorage.getItem("access");
    const savedRefresh = localStorage.getItem("refresh");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    if (savedAccess) setAccess(savedAccess);
    if (savedRefresh) setRefresh(savedRefresh);

    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    try {
      setLoading(true);

      const res = await fetch(`${TOKEN_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: identifier, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          (data && (data.detail || data.message || JSON.stringify(data))) ||
          "Invalid credentials";
        setLoading(false);
        return { success: false, message };
      }

      if (data.access) {
        localStorage.setItem("access", data.access);
        setAccess(data.access);
      }

      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
        setRefresh(data.refresh);
      }

      const userObj = data.user || { identifier };
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.message || "Login failed" };
    }
  };

  const signup = async (firstName, lastName, username, email, password) => {
    try {
      setLoading(true);

      const res = await fetch(`${SIGN_UP_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          (data && (data.detail || data.message || JSON.stringify(data))) ||
          "Registration failed";
        setLoading(false);
        return { success: false, message };
      }

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.message || "Signup failed" };
    }
  };

  const refreshAccessToken = async () => {
    try {
      const savedRefresh = localStorage.getItem("refresh");
      if (!savedRefresh) return null;

      const res = await fetch(`${REFRESH_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: savedRefresh }),
      });

      if (!res.ok) {
        logout();
        return null;
      }

      const data = await res.json();
      if (data.access) {
        localStorage.setItem("access", data.access);
        setAccess(data.access);
        return data.access;
      }

      logout();
      return null;
    } catch {
      logout();
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const authFetch = async (url, options = {}) => {
    let token = access || localStorage.getItem("access");
    const headers = { ...(options.headers || {}) };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    let res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        headers["Authorization"] = `Bearer ${newAccess}`;
        res = await fetch(url, { ...options, headers });
      }
    }

    return res;
  };
  const authRedirectGuard = (navigate) => {
    const hasUser = localStorage.getItem("user");
    const hasToken = localStorage.getItem("access");

    if (hasUser && hasToken) {
      navigate("/dashboard/home", { replace: true });
      navigate("/reset", { replace: true });
    } else {
      navigate("/login", { replace: true });
      return null;
    }
  };
  const navbarButtonVisibility = () => {
    const hasUser = localStorage.getItem("user");
    const hasToken = localStorage.getItem("access");
    return hasUser && hasToken;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        access,
        refresh,
        loading,
        login,
        signup,
        logout,
        authFetch,
        forgotPassword,
        authRedirectGuard,
        navbarButtonVisibility,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
