import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Garage from "./pages/Garage";
import DashboardPage from "./Components/DashboardPage";
import { useAuth } from "./Components/AuthContext";

function MainLayout({ children }) {
  return (
    <div className="h-full w-full dark:bg-[#101922] overflow-x-hidden bg-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loader

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      <Route
        path="/register"
        element={
          <MainLayout>
            <SignUp />
          </MainLayout>
        }
      />

      <Route
        path="/forgot"
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />

      {/* PROTECTED DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<DashboardPage />} />
        <Route path="garage" element={<Garage />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
