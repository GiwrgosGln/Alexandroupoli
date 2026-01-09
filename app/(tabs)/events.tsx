import { ThemeColors, useTheme } from "@/context/theme-context";
import { useEvents } from "@/features/events/api/get-events";
import EventCard from "@/features/events/components/event-card";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function EventsScreen() {
  const { colors } = useTheme();
  const { data: events } = useEvents();

  // Initialize styles with the current theme colors
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events?.map((event) => (
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
