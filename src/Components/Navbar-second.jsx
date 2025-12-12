import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { ThemeContext } from "./ThemeContext.jsx";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar({ title, link, button }) {
  const { dark } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 z-50 border-b border-gray-200 dark:border-gray-700 shadow-md fixed w-full">
      <div className="flex justify-between items-center w-full sm:h-16 px-4 sm:px-6 py-3 sm:py-0">
        <Link to="/" className="text-xl sm:text-2xl font-bold">EV Station Finder</Link>
        <button
          className="sm:hidden p-2 rounded-md text-gray-900 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>
        <div className="hidden sm:flex flex-row items-center gap-4">
          <ThemeToggle />
          <h1 className="text-lg font-semibold">{title}</h1>
          <Link
            to={link}
            className="bg-blue-700 dark:bg-blue-400 hover:bg-blue-800 dark:hover:bg-blue-500 p-2 px-6 rounded-xl text-sm font-bold transition text-center text-white dark:text-gray-900"
          >
            {button}
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center gap-2 px-4 pb-3 bg-white dark:bg-black">
          <ThemeToggle />
          <h1 className="text-sm font-semibold">{title}</h1>
          <Link
            to={link}
            className="bg-blue-700 dark:bg-blue-400 hover:bg-blue-800 dark:hover:bg-blue-500 p-2 px-6 rounded-xl text-sm font-bold text-center w-full"
          >
            {button}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
