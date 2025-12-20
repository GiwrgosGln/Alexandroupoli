import { ThemeColors, useTheme } from "@/context/theme-context";
import EventCard from "@/features/events/components/event-card";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

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
    title: "Στείλε το γράμμα σου στον Αϊ Βασίλη» Στο Decorum",
    date: { month: "OCT", day: "24" },
    category: "Christmas",
    time: "21:00",
    location: "Decorum Βιζβύζη 29-31",
    image:
      "https://events.alexpolis.gr/wp-content/uploads/2025/12/decorum_Xmas.jpg",
    buttonText: "Book Now",
    isBookable: false,
  },
  {
    id: "2",
    title: "ΒΡΑΔΙΑ Musical",
    date: { month: "OCT", day: "20" },
    category: "Music",
    time: "7:30",
    location: "Πνευματικό Κέντρο Ιεράς Μητρόπολης",
    image:
      "https://events.alexpolis.gr/wp-content/uploads/2025/12/A%CE%A6%CE%99%CE%A3%CE%91_%CE%9C%CE%B9%CE%BF%CF%85%CE%B6%CE%B9%CE%BA%CE%B1%CE%BB-%CE%99%CE%A3%CE%A4%CE%9F%CE%A1%CE%99%CE%9A%CE%9F-%CE%9C%CE%9F%CE%A5%CE%A3%CE%95%CE%99%CE%9F.jpg",
    buttonText: "View Details",
    isBookable: false,
  },
  {
    id: "3",
    title: "Χριστουγεννιάτικο Bazaar",
    date: { month: "OCT", day: "20" },
    category: "Christmas",
    time: "11:00 - 14:00",
    location: "Αποθήκη Νο1- Λιμάνι",
    image:
      "https://events.alexpolis.gr/wp-content/uploads/2025/12/BAZAAR-CHRISTMAS-T.jpg",
    buttonText: "View Details",
    isBookable: false,
  },
];

export default function EventsScreen() {
  const { colors } = useTheme();

  // Initialize styles with the current theme colors
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {EVENTS.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ScrollView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: colors.background,
      paddingTop: 60,
    },
  });
