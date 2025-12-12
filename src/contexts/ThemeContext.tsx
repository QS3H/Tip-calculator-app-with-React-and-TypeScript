import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Theme type definition
 */
export type Theme = "light" | "dark";

/**
 * Theme context interface
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Theme Context
 * Provides theme state and toggle function to all child components
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider Component
 *
 * Manages theme state and provides theme context to all child components.
 * Persists theme preference to localStorage and loads it on mount.
 *
 * @param props - ThemeProviderProps containing children to wrap
 * @returns ThemeContext.Provider wrapping the children
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Load theme from localStorage or default to light mode
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("tip-calculator-theme") as Theme;
      return savedTheme === "dark" ? "dark" : "light";
    }
    return "light";
  });

  // Apply theme class to document root for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("tip-calculator-theme", theme);
  }, [theme]);

  /**
   * Toggles between light and dark theme
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme context
 *
 * @returns ThemeContextType with theme and toggleTheme function
 * @throws Error if used outside ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

