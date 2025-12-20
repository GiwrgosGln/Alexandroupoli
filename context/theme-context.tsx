import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

const THEME_STORAGE_KEY = "theme";

export const palette = {
  success: "#B9F8CF",
  successVariant: "#00A65A",
  error: "#FFC9C9",
  errorVariant: "#E7004E",
};

const lightColors = {
  primary: "#007AFF",
  primaryVariant: "#0051D5",
  secondary: "#007AFF",
  secondaryVariant: "#0051D5",
  background: "#F2F2F7",
  surface: "#FFFFFF",
  text: "#000000",
  card: "#FFFFFF",
  border: "#E5E5E5",
  success: palette.success,
  successVariant: palette.successVariant,
  error: palette.error,
  errorVariant: palette.errorVariant,
};

export type ThemeColors = typeof lightColors;

const darkColors: ThemeColors = {
  primary: "#0A84FF",
  primaryVariant: "#409CFF",
  secondary: "#0A84FF",
  secondaryVariant: "#409CFF",
  background: "#000000",
  surface: "#1C1C1E",
  text: "#FFFFFF",
  card: "#1C1C1E",
  border: "#38383A",
  success: palette.success,
  successVariant: palette.successVariant,
  error: palette.error,
  errorVariant: palette.errorVariant,
};

type ThemeContextType = {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [manualTheme, setManualTheme] = useState<"light" | "dark" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((savedTheme) => {
        if (savedTheme === "light" || savedTheme === "dark") {
          setManualTheme(savedTheme);
        }
      })
      .finally(() => {
        setIsLoading(false);
        SplashScreen.hideAsync();
      });
  }, []);

  const isDark = manualTheme
    ? manualTheme === "dark"
    : systemColorScheme === "dark";

  const toggleTheme = async () => {
    const newTheme = isDark ? "light" : "dark";
    setManualTheme(newTheme);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const value = useMemo(
    () => ({
      colors: isDark ? darkColors : lightColors,
      isDark,
      toggleTheme,
    }),
    [isDark]
  );

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
