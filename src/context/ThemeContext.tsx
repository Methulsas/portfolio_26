import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeName = "dark" |  "midnight" | "red";

export const themes: { id: ThemeName; label: string; swatch: string }[] = [
  { id: "dark", label: "Dark", swatch: "#7c5cff" },
  { id: "midnight", label: "Midnight Blue", swatch: "#3b82f6" },
  { id: "red", label: "Red", swatch: "#ef4444" },
];

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
