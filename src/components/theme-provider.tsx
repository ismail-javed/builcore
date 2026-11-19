import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
export type AccentColor = "blue" | "green" | "purple" | "red" | "orange" | "yellow";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultAccentColor?: AccentColor;
  storageKey?: string;
  accentStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (accentColor: AccentColor) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  accentColor: "blue",
  setTheme: () => null,
  setAccentColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccentColor = "blue",
  storageKey = "theme-buildcore",
  accentStorageKey = "accent-color-buildcore",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const [accentColor, setAccentColor] = useState<AccentColor>(
    () =>
      (localStorage.getItem(accentStorageKey) as AccentColor) ||
      defaultAccentColor,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.remove(
      "accent-blue",
      "accent-green",
      "accent-purple",
      "accent-red",
      "accent-orange",
      "accent-yellow",
    );

    root.classList.add(`accent-${accentColor}`);

    const applyTheme = () => {
      root.classList.remove("light", "dark");
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();

    let mediaQuery: MediaQueryList | null = null;
    let cleanup: (() => void) | null = null;

    if (theme === "system") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        cleanup = () => mediaQuery?.removeEventListener("change", handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        cleanup = () => mediaQuery?.removeListener(handleChange);
      }
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [theme, accentColor]);

  const value = {
    theme,
    accentColor,
    setTheme: (next: Theme) => {
      setTheme(next);
      localStorage.setItem(storageKey, next);
    },
    setAccentColor: (next: AccentColor) => {
      setAccentColor(next);
      localStorage.setItem(accentStorageKey, next);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
