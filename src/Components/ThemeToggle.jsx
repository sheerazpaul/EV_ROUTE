import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; 

function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        p-2 rounded-full 
        bg-gray-200 dark:bg-gray-800 
        text-gray-900 dark:text-gray-100
        transition-all duration-300
        hover:scale-110
      "
    >
      {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}

export default ThemeToggle;
