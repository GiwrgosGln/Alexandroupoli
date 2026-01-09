import { SignOutButton } from "@/components/sign-out-button";
import ThemedView from "@/components/themed-view";
import { useTheme } from "@/context/theme-context";
import { useEvents } from "@/features/events/api/get-events";
import { useUser } from "@/features/users/api/get-user";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const { userId } = useAuth();

  const { data: user, isLoading, error } = useUser({ userId: userId! });
  const { data: events } = useEvents();

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
  }, [user]);

  useEffect(() => {
    if (events) {
      console.log("Events data:", events);
    }
  }, [events]);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.toggleThemeButton,
            { backgroundColor: colors.primary },
          ]}
        >
          <Text style={[styles.toggleThemeButtonText, { color: colors.text }]}>
            Switch to {isDark ? "Light" : "Dark"} Mode
          </Text>
        </TouchableOpacity>
        <SignOutButton />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleThemeButton: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  toggleThemeButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
