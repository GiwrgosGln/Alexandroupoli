import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function HelpCenterScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>{t("help_center.welcome_message")}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
