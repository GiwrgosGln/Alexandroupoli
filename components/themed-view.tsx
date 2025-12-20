import { useTheme } from "@/context/theme-context";
import { View, ViewProps } from "react-native";

type ThemedViewProps = ViewProps & {
  backgroundColor?: "background" | "surface" | "card";
};

export default function ThemedView({
  style,
  backgroundColor = "background",
  ...props
}: ThemedViewProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[{ backgroundColor: colors[backgroundColor] }, style]}
      {...props}
    />
  );
}
