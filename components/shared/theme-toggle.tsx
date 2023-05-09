"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

// import { Button } from "@/components/ui/button"
// import { Icons } from "@/components/icons"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <BsFillSunFill className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <BsFillMoonFill className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
