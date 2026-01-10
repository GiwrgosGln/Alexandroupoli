import { useUser } from "@/features/users/api/get-user";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, SplashScreen, Tabs } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { data: user, isLoading: isUserLoading } = useUser({ userId: userId! });

  useEffect(() => {
    if (isLoaded && isSignedIn && !isUserLoading && user) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded, isSignedIn, isUserLoading, user]);

  if (!isLoaded || (isSignedIn && isUserLoading)) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
