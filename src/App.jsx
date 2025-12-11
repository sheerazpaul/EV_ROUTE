import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Resetpassword from "./Components/ResetPassword.jsx";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./Components/ForgotPassword";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Garage from "./pages/Garage";
import DashboardPage from "./Components/DashboardPage";
import ProtectedRoute from "./Components/ProtectedRoute"; 
import PublicRoute from "./PublicRoute.jsx";
import SettingsLayout from "./Settings/SettingLayout.jsx";
import { useState } from "react";
import { REFRESH_URL } from "./api.config.js";
// const [token, setToken] = useState(localStorage.getItem("access"));
// useEffect(() => {
//   const checkAndRefreshToken = async () => {
//     const refreshToken = localStorage.getItem("refresh");
//     try {
//       const res = await fetch(`${REFRESH_URL}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refresh: refreshToken }),
//         Authorization: `Bearer ${token}`,
//       });
//       if (res.ok) {
//         const data = await res.json();
//         localStorage.setItem("access", data.access);
//         setToken(data.access);
//         console.log("Token refreshed successfully", data.access);
//       } else {
//         console.log("Token is invalid or expired");
//       }
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//     }
//   };
// }, []);
function MainLayout({ children }) {
  return (
    <div className="h-full w-full dark:bg-[#101922] overflow-x-hidden bg-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
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
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route path="/dashboard/settings" element={<SettingsLayout />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset" element={<Resetpassword />} />
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
    </Routes>
  );
}

export default App;
