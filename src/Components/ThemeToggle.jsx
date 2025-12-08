import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";
import { FaSun, FaMoon } from "react-icons/fa";
function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDark(!dark)} 
      className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer"
    >
          {dark ? <FaSun className="t-400 text-lg" /> : <FaMoon className="text-black text-lg dark:text-white" />}
    </button>
  );
}

export default ThemeToggle;
