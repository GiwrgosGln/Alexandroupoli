import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { useTheme } from "@/context/theme-context";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Event } from "../types";

export default function EventCard({ event }: { event: Event }) {
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.card}>
      {/* Image Section */}
      <ThemedView style={styles.imageContainer}>
        <Image source={{ uri: event.image }} style={styles.image} />

        {/* Category Badge */}
        <ThemedView style={styles.categoryBadge}>
          <ThemedText style={styles.categoryText}>{event.category}</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Content Section */}
      <ThemedView style={styles.content} backgroundColor="card">
        {/* Title */}
        <ThemedText style={styles.title} numberOfLines={1}>
          {event.title}
        </ThemedText>

        {/* Date - Time */}
        <ThemedView style={styles.row} backgroundColor="card">
          <Ionicons name="time-outline" size={16} color={colors.text} />
          <ThemedText style={styles.infoText}>
            {event.date.month} {event.date.day} - {event.time}
          </ThemedText>
        </ThemedView>

        {/* Location */}
        <ThemedView style={styles.row} backgroundColor="card">
          <Ionicons name="location-outline" size={16} color={colors.text} />
          <ThemedText style={styles.infoText}>{event.location}</ThemedText>
        </ThemedView>

        {/* Footer: Status & Actions */}
        <ThemedView style={styles.footer} backgroundColor="card">
          <ThemedText style={[styles.statusText, { color: colors.primary }]}>
            UPCOMING
          </ThemedText>
          <ThemedView style={styles.actions} backgroundColor="card">
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={20} color={colors.text} />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
    flexDirection: "row",
    height: 160,
  },
  imageContainer: {
    width: 140,
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(30, 30, 30, 0.75)",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  categoryText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
});
