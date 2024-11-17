"use client"
import { useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* Icon to toggle the dropdown */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2 focus:outline-none"
      >
        <FaMoon size={20}  style={{color: theme === 'light' || theme === 'system' ? 'black' : 'white'}} />
      </button>

      {/* Dropdown options */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
            <button
            onClick={() => handleThemeChange("system")}
            className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            System
          </button>
          <button
            onClick={() => handleThemeChange("light")}
            className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            Dark
          </button>
          
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
