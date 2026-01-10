import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "el", label: "Ελληνικά" },
];

export default function LanguageSelectionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {LANGUAGES.map((lang) => (
        <TouchableOpacity key={lang.code}>
          <Text>{lang.label}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
}));
