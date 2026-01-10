import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "@app_theme";

export const themeStorage = {
  getTheme: async (): Promise<"light" | "dark" | null> => {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return theme as "light" | "dark" | null;
    } catch (error) {
      console.error("Error reading theme from storage:", error);
      return null;
    }
  },

  setTheme: async (theme: "light" | "dark"): Promise<void> => {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error("Error saving theme to storage:", error);
    }
  },

  removeTheme: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(THEME_KEY);
    } catch (error) {
      console.error("Error removing theme from storage:", error);
    }
  },
};
