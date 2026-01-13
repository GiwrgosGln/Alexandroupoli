import { formatDateToDDMMYYYY, formatTime } from "@/helpers/date-helper";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Event } from "../types";

export default function EventCard({ event }: { event: Event }) {
  const displayDate = formatDateToDDMMYYYY(event.start_date);
  const displayTime = formatTime(event.start_time);
  return (
    <View style={styles.card}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.image_url }} style={styles.image} />

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{event.category}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>

        {/* Date - Time */}
        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} />
          <Text style={styles.infoText}>
            {displayDate} {displayTime}
          </Text>
        </View>

        {/* Location */}
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        {/* Footer: Status & Actions */}
        <View style={styles.footer}>
          <Text style={styles.statusText}>UPCOMING</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.card,
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
    fontFamily: theme.fonts.regular,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.typography,
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
    fontFamily: theme.fonts.regular,
    color: theme.colors.typography,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
}));
