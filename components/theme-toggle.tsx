import React from "react";
import { Pressable, Text } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const ThemeToggle = () => {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        // 1. Turn off Adaptive Mode (Disable Autopilot)
        UnistylesRuntime.setAdaptiveThemes(false);

        // 2. Now you are free to switch the theme manually!
        const currentTheme = UnistylesRuntime.themeName;
        const nextTheme = currentTheme === "light" ? "dark" : "light";

        UnistylesRuntime.setTheme(nextTheme);
      }}
    >
      <Text style={styles.text}>
        Switch to {UnistylesRuntime.themeName === "light" ? "Dark" : "Light"}{" "}
        Mode
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.primary, // Uses your theme color
    alignItems: "center",
    marginTop: theme.margins.lg,
  },
  text: {
    color: "#ffffff", // Always white for contrast on the button
    fontWeight: "bold",
  },
}));
