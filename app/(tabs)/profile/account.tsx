import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const { user } = useUser();
  const { userId } = useAuth();

  // Username state
  const [newUsername, setNewUsername] = useState("");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateUsername = async () => {
    try {
      await user?.update({ username: newUsername });
      alert("Username updated!");
    } catch (err) {
      console.error("Error updating username:", err);
      alert(
        `Error updating username: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  };

  const updatePassword = async () => {
    try {
      await user?.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      alert("Password updated!");
    } catch (err) {
      console.error("Error updating password:", err);
      alert(`${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <SafeAreaView>
      <TextInput placeholder="New Username" onChangeText={setNewUsername} />
      <Button title="Update Username" onPress={updateUsername} />
      <TextInput
        placeholder="Current Password"
        secureTextEntry
        onChangeText={setCurrentPassword}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <Button title="Update Password" onPress={updatePassword} />
    </SafeAreaView>
  );
}
