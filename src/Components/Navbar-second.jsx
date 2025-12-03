import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { ThemeContext } from "./ThemeContext.jsx";
function Navbar({ title, link, button }) {
  const { dark } = useContext(ThemeContext); 

  return (
    <nav className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 z-50 border-1 border-b border-gray-200 dark:border-gray-700 shadow-md fixed w-full  ">
      
      <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:h-16 gap-3 sm:gap-6 px-4 sm:px-6 py-3 sm:py-0">
        <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
           EV Station Finder
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <h1 className="text-sm sm:text-lg font-semibold">
            {title}
          </h1>
          <Link
            to={link}
            className="bg-blue-700 dark:bg-blue-400 hover:bg-blue-800 dark:hover:bg-blue-500 p-2 px-6 rounded-xl text-sm font-bold transition text-center"
          >
            {button}
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
