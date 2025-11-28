import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
         
            <Login />
        
        }
      />

      <Route
        path="/register"
        element={
        
            <SignUp />
          
        }
      />

      <Route
        path="/forgot"
        element={
          
            <ForgotPassword />
       
        }
      />
       <Route path="/reset" element={
        <MainLayout>
        <Resetpassword />
        </MainLayout>
        } />

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
      <Route path="*" element={<Navigate to="/login"  />} />
    </Routes>
  );
}

export default App;
