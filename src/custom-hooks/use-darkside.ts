import { useState, useEffect } from "react";
import useIsMounted from "./use-is-mounted";

export default function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme);
  const isMounted = useIsMounted();
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    if (isMounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme, isMounted]);

  return [colorTheme, setTheme] as const;
}
