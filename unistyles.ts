import { StyleSheet } from "react-native-unistyles";

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

export const lightTheme = {
  colors: {
    typography: "#000000",
    background: "#F2F2F7",
    primary: "#007AFF",
    card: "#FFFFFF",
    border: "#E5E5E5",
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },

  fonts: {
    regular: "UbuntuBold",
  },
} as const;

export const darkTheme = {
  colors: {
    typography: "#ffffff",
    background: "#000000",
    primary: "#0A84FF",
    card: "#1C1C1E",
    border: "#38383A",
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },

  fonts: {
    regular: "UbuntuBold",
  },
} as const;

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  breakpoints,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    adaptiveThemes: true,
  },
});
