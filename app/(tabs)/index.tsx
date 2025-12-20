import { SignOutButton } from "@/components/sign-out-button";
import ThemedView from "@/components/themed-view";
import { useTheme } from "@/context/theme-context";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors, toggleTheme, isDark } = useTheme();

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
