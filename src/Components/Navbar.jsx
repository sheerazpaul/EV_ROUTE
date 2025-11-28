import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
function Navbar({ scrollToSection, refs }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authRedirectGuard } = useAuth();
  const { navbarButtonVisibility } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   authRedirectGuard(navigate);
  // }, []);
  return (
    <nav
      className="w-full  px-5 py-3 flex items-center justify-between shadow-md fixed
      bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 z-50
    "
    >
      <Link to="/">
        <div className="text-xl font-bold">EV Route</div>
      </Link>
      <div className="hidden md:flex space-x-8 font-medium">
        <Link
          className="hover:text-blue-400 transition"
          onClick={() => scrollToSection(refs.featureRef)}
        >
          Features
        </Link>
        <Link
          className="hover:text-blue-400 transition"
          onClick={() => scrollToSection(refs.aboutRef)}
        >
          About
        </Link>
        <Link
          className="hover:text-blue-400 transition"
          onClick={() => scrollToSection(refs.faqRef)}
        >
          FAQ
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <ThemeToggle />
        {!navbarButtonVisibility() && (
          <>
            <Link
              to="/register"
              className="h-10 w-24 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="h-10 w-24 dark:bg-gray-600 bg-blue-600 rounded-lg font-semibold dark:hover:bg-gray-800 transition flex justify-center items-center"
            >
              Login
            </Link>
          </>
        )}
          {navbarButtonVisibility() && (
        <button
          onClick={() => navigate("/dashboard/home")}
          className="h-10 w-24 dark:bg-gray-600 bg-blue-600 rounded-lg font-semibold dark:hover:bg-gray-800 transition flex justify-center items-center"
        >
          Dashboard
        </button>
      )}
      </div>
    
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {menuOpen && (
        <div
          className="absolute top-16 left-0 w-full bg-white dark:bg-[#111] text-black dark:text-white
          flex flex-col items-center gap-4 py-5 text-lg font-medium border-t border-gray-700 md:hidden z-50 transition-colors duration-300
        "
        >
          <Link
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition"
          >
            Features
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition"
          >
            About
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition"
          >
            FAQ
          </Link>
          <div className="flex flex-col gap-3 w-3/4">
            {!navbarButtonVisibility() && (
              <>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="h-10 w-full bg-blue-500 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="h-10 w-full bg-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition flex justify-center items-center"
                >
                  Login
                </Link>
              </>
            )}
            {navbarButtonVisibility() && (
              <div className="flex justify-center items-center">
              <button
                onClick={() => navigate("/dashboard/home")}
                className="h-10 w-24 dark:bg-gray-600 bg-blue-600 rounded-lg font-semibold dark:hover:bg-gray-800  "
              >
                Dashboard
              </button>
              </div>
            )}
            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
