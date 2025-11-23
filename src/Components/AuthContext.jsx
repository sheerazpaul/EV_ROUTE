import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load stored login data
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // LOGIN — API: /core/api/token/
  const login = async (user, password) => {
    try {
      setLoading(true);

      const res = await fetch("https://api.hirahues.com/core/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (!res.ok) throw new Error("Invalid email or password");

      const data = await res.json();

      // Save token
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);

      // For now, store email as user (API does not return user info)
      localStorage.setItem("user", JSON.stringify({user: user}));

      setUser({ user: user });
      setLoading(false);

      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  // SIGNUP — API: /core/register/
  const registerUser = async (firstName, lastName, username, email, password) => {
  try {
    setLoading(true)
    const res = await fetch("https://api.hirahues.com/core/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, username, email, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" }
    }
    return { success: true }
  } catch (err) {
    setLoading(false)
    return { success: false, message: err.message }
  };
};


  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
