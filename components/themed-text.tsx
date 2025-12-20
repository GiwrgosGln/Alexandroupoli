import { useTheme } from "@/context/theme-context";
import { Text, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
  color?: "text" | "primary" | "secondary" | "success" | "error";
};

export default function ThemedText({
  style,
  color = "text",
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();

  return <Text style={[{ color: colors[color] }, style]} {...props} />;
}
