import { ThemeToggle } from "@/components/theme-toggle";
import { useUser } from "@/features/users/api/get-user";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function ProfileScreen() {
  const { userId } = useAuth();
  const { data: user } = useUser({ userId: userId! });

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Unistyles!</Text>
      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: 20,
    color: theme.colors.typography,
  },
}));
