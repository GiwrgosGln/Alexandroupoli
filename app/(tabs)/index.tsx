import { SignOutButton } from "@/components/sign-out-button";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
