import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dummy Data
const CATEGORIES = [
  { id: "1", name: "All", icon: "grid-outline" },
  { id: "2", name: "Concerts", icon: "musical-notes-outline" },
  { id: "3", name: "Art", icon: "color-palette-outline" },
  { id: "4", name: "Sports", icon: "football-outline" },
];

const EVENTS = [
  {
    id: "1",
    title: "Jazz in the Park",
    date: { month: "OCT", day: "24" },
    category: "Music",
    time: "TODAY, 5:00 PM",
    location: "Central Park • 0.5 mi away",
    image:
      "data:image/jpeg;base64,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",
    attendees: 12,
    buttonText: "Book Now",
    isBookable: true,
  },
  {
    id: "2",
    title: "Modern Art Opening",
    date: { month: "OCT", day: "24" },
    category: "Art",
    time: "TONIGHT, 7:30 PM",
    location: "The Tate Gallery • 1.2 mi away",
    image:
      "https://images.unsplash.com/photo-1721133073235-e4b5facb27fa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D",
    attendees: 0,
    buttonText: "View Details",
    isBookable: false,
  },
];

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {EVENTS.map((event) => (
        <View key={event.id} style={styles.card}>
          {/* Image Section */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: event.image }} style={styles.image} />

            {/* Date Badge */}
            <View style={styles.dateBadge}>
              <Text style={styles.dateMonth}>{event.date.month}</Text>
              <Text style={styles.dateDay}>{event.date.day}</Text>
            </View>

            {/* Category Badge */}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
          </View>

          {/* Content Section */}
          <View style={styles.content}>
            {/* Time */}
            <View style={styles.row}>
              <Ionicons name="time" size={16} color="#4A90E2" />
              <Text style={styles.timeText}>{event.time}</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>{event.title}</Text>

            {/* Location */}
            <View style={styles.row}>
              <Ionicons name="location-sharp" size={16} color="#666" />
              <Text style={styles.locationText}>{event.location}</Text>
            </View>

            {/* Footer: Attendees & Button */}
            <View style={styles.footer}>
              {/* Attendees Stack (Simplified) */}
              <View style={styles.attendeesContainer}>
                <View
                  style={[
                    styles.avatar,
                    { zIndex: 3, backgroundColor: "#FFD700" },
                  ]}
                />
                <View
                  style={[
                    styles.avatar,
                    { marginLeft: -10, zIndex: 2, backgroundColor: "#FF6347" },
                  ]}
                />
                <View
                  style={[
                    styles.avatar,
                    {
                      marginLeft: -10,
                      zIndex: 1,
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={{ fontSize: 10, fontWeight: "bold", color: "#555" }}
                  >
                    +{event.attendees}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>{event.buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dateBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: "700",
    color: "#333",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
  },
  categoryBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(30, 30, 30, 0.6)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  timeText: {
    color: "#4A90E2",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 8,
    marginTop: 4,
  },
  locationText: {
    color: "#666",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  attendeesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  bookButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#2D9CDB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
