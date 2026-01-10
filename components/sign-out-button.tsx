import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.button}>
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme) => ({
  button: {
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: theme.colors.card,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: theme.colors.error,
    fontWeight: "600",
    fontSize: 16,
  },
}));
