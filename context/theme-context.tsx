import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "system";
type ColorScheme = "light" | "dark";

type ThemeContextValue = {
  /** What the user picked in Settings: "light" | "dark" | "system" */
  themeMode: ThemeMode;
  /** The actual scheme to render — "system" resolved against the OS value */
  colorScheme: ColorScheme;
  setThemeMode: (mode: ThemeMode) => void;
  isReady: boolean;
};

const STORAGE_KEY = "@tailor_management/theme_mode";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeContextProvider({ children }: PropsWithChildren) {
  const systemScheme = useSystemColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [isReady, setIsReady] = useState(false);

  // Load the saved preference once on app start.
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setThemeModeState(saved);
        }
      } catch (error) {
        console.log("Failed to load theme preference", error);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(STORAGE_KEY, mode).catch((error) =>
      console.log("Failed to save theme preference", error),
    );
  };

  const colorScheme: ColorScheme = useMemo(() => {
    if (themeMode === "system") {
      return systemScheme === "dark" ? "dark" : "light";
    }
    return themeMode;
  }, [themeMode, systemScheme]);

  const value = useMemo(
    () => ({ themeMode, colorScheme, setThemeMode, isReady }),
    [themeMode, colorScheme, isReady],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useAppTheme must be used within a ThemeContextProvider");
  }
  return ctx;
}
