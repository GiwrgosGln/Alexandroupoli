import { SignOutButton } from "@/components/sign-out-button";
import { useUser } from "@/features/users/api/get-user";
import { useAuth } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export default function HomeScreen() {
  const { data: user } = useUser({ userId: useAuth().userId! });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{user?.username}</Text>
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
