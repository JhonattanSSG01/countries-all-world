"use client";

import { useTheme } from "next-themes";
import React from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    if (!mounted) return null;

  return (
    <header className="py-8 px-10 mb-10 flex justify-between items-center shadow-md light">
      <h2 className="text-xl font-bold">Where in the world?</h2>
      <button
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={theme === "dark" ? "white" : "black"}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
        </svg>
        <span className="text-lg capitalize">dark mode</span>
      </button>
    </header>
  );
};

export default Header;
