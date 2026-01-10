import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="language-selection"
        options={{
          title: "Language",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
