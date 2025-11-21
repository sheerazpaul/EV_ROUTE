import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Garage from "./pages/Garage";
import DashboardPage from "./Components/DashboardPage";
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
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      <Route
        path="/signUp"
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
      
  
      <Route path="/dashboard" element={<Dashboard />}>
        
        <Route path="home" element={<DashboardPage />} />
        <Route path="garage" element={<Garage />} />

      </Route>
 \
    </Routes>
  );
}

export default App;
