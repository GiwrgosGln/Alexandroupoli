import { SignOutButton } from "@/components/sign-out-button";
import { useUser } from "@/features/users/api/get-user";
import { useUpdateUser } from "@/features/users/api/update-user";
import { themeStorage } from "@/lib/theme-storage";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from "react-native-unistyles";

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { userId } = useAuth();
  const { theme } = useUnistyles();
  const router = useRouter();

  // Mutation
  const updateUserMutation = useUpdateUser();

  // Query
  const { data: user } = useUser({ userId: userId! });

  // Local state for push notifications toggle
  const [localNotifications, setLocalNotifications] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    if (user) {
      setLocalNotifications(user.opt_in_events_push);
    }
  }, [user]);

  const toggleTheme = async () => {
    UnistylesRuntime.setAdaptiveThemes(false);
    const currentTheme = UnistylesRuntime.themeName;
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    UnistylesRuntime.setTheme(nextTheme);

    // Save locally
    await themeStorage.setTheme(nextTheme);

    // Save to server
    updateUserMutation.mutate({
      userId: userId!,
      data: { theme: nextTheme },
    });
  };

  const handleToggleNotifications = (value: boolean) => {
    // UI state update
    setLocalNotifications(value);

    // Server state update
    updateUserMutation.mutate(
      {
        userId: userId!,
        data: {
          opt_in_events_push: value,
          opt_in_events_email: value,
        },
      },
      {
        onError: () => {
          // Revert UI state on error if server update fails
          setLocalNotifications(!value);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: user?.image_url }} style={styles.profileImage} />
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("profile.preferences")}</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              console.log("Account pressed");
            }}
          >
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="account-outline"
                size={22}
                color="#64748B"
              />
              <Text style={styles.rowLabel}>{t("profile.account")}</Text>
            </View>
            <View style={styles.rowRight}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#C7C7CC"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="weather-night"
                size={22}
                color="#64748B"
              />
              <Text style={styles.rowLabel}>{t("profile.dark_mode")}</Text>
            </View>
            <Switch
              value={UnistylesRuntime.themeName === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={22}
                color="#64748B"
              />
              <Text style={styles.rowLabel}>
                {t("profile.push_notifications")}
              </Text>
            </View>
            <Switch
              value={localNotifications ?? user?.opt_in_events_push ?? false}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              router.push("/profile/language-selection");
            }}
          >
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="translate"
                size={22}
                color="#64748B"
              />
              <Text style={styles.rowLabel}>{t("profile.language")}</Text>
            </View>
            <View style={styles.rowRight}>
              {/* Optional: Make the current language display dynamic */}
              <Text style={styles.rowValue}>
                {i18n.language === "el" ? "Ελληνικά" : "English"}
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#C7C7CC"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("profile.support")}</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={22}
                color="#64748B"
              />
              <Text style={styles.rowLabel}>{t("profile.help_center")}</Text>
            </View>
            <View style={styles.rowRight}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#C7C7CC"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons
                name="star-outline"
                size={22}
                color="#64748B"
              />
              <Text style={styles.rowLabel}>{t("profile.rate_app")}</Text>
            </View>
            <View style={styles.rowRight}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#C7C7CC"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <SignOutButton />
    </SafeAreaView>
  );
}

// ... styles remain unchanged
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "column",
    gap: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: rt.fontScale * 20,
    fontWeight: "bold",
    color: theme.colors.typography,
  },
  email: {
    fontSize: rt.fontScale * 16,
    color: theme.colors.typography,
    fontWeight: "400",
    opacity: 0.6,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: rt.fontScale * 13,
    color: theme.colors.typography,
    opacity: 0.5,
    marginBottom: 8,
    marginLeft: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 50,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowLabel: {
    fontSize: rt.fontScale * 16,
    color: theme.colors.typography,
  },
  rowValue: {
    fontSize: rt.fontScale * 16,
    color: theme.colors.typography,
    opacity: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginLeft: 50,
  },
}));
