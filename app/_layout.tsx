import { themeStorage } from "@/lib/theme-storage";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { UnistylesRuntime } from "react-native-unistyles";
import "../i18n";
import i18n from "../i18n";
import "../theme/unistyles";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
  });

  const [themeLoaded, setThemeLoaded] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
      },
    },
  });

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await themeStorage.getTheme();
      if (savedTheme) {
        UnistylesRuntime.setAdaptiveThemes(false);
        UnistylesRuntime.setTheme(savedTheme);
      }
      setThemeLoaded(true);
    };

    const loadLanguage = async () => {
      const language = await AsyncStorage.getItem("user-language");
      if (language) {
        i18n.changeLanguage(language);
      }
    };

    loadTheme();
    loadLanguage();
  }, []);

  useEffect(() => {
    if ((loaded || error) && themeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, themeLoaded]);

  if (!loaded && !error) {
    return null;
  }

  if (!themeLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
