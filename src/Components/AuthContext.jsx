import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [loading, setLoading] = useState(true);
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

      const res = await fetch("https://api.hirahues.com/core/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: identifier, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = (data && (data.detail || data.message || JSON.stringify(data))) || "Invalid credentials";
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

      const res = await fetch("https://api.hirahues.com/core/register/", {
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
        const message = (data && (data.detail || data.message || JSON.stringify(data))) || "Registration failed";
        setLoading(false);
        return { success: false, message };
      }
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.message || "Registration failed" };
    }
  };
  const refreshAccessToken = async () => {
    try {
      if (!refresh) return null;

      const res = await fetch("https://api.hirahues.com/core/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
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
    } catch (err) {
      logout();
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    setAccess(null);
    setRefresh(null);
  };

  const authFetch = async (url, options = {}) => {
    const headers = { ...(options.headers || {}) };
    if (access) headers["Authorization"] = `Bearer ${access}`;

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
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
