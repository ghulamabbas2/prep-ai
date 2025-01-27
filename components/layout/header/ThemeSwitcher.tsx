"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === "light" ? (
        <Icon
          icon={"il:brightness"}
          fontSize={22}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <Icon
          icon={"il:moon"}
          fontSize={22}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
}
