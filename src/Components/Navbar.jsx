import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ scrollToSection, refs }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full  text-white px-5 py-3 flex items-center justify-between shadow-md fixed bg-black">
      <Link to="/">
      <div className="text-xl font-bold">EV Route</div>
      </Link> 
      <div className="hidden md:flex space-x-8 font-medium">
        <Link className="hover:text-blue-400 transition"  onClick={() => scrollToSection(refs.featureRef)}>Features</Link>
        <Link className="hover:text-blue-400 transition"onClick={() => scrollToSection(refs.aboutRef)}>About</Link>
        <Link className="hover:text-blue-400 transition" onClick={() => scrollToSection(refs.faqRef)}>FAQ</Link>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <Link to="/signUp" className="h-10 w-24 bg-blue-500 rounded-lg font-semibold hover:bg-blue-700 transition justify-center items-center flex">
          Sign Up
        </Link>
        <Link to="/login" className="h-10 w-24 bg-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition justify-center items-center flex">
          Login
        </Link>
      </div>
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#111] flex flex-col items-center gap-4 py-5 text-lg font-medium border-t border-gray-700 md:hidden z-50">
          <Link onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">
            Features
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">
            About
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">
            FAQ
          </Link>
          <div className="flex flex-col gap-3 w-3/4">
            <Link to="/signUp" className="h-10 w-full bg-blue-500 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center">
              Sign Up
            </Link>
            <Link to="/login" className="h-10 w-full bg-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition flex justify-center items-center">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
