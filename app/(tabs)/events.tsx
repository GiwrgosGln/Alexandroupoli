import { useEvents } from "@/features/events/api/get-events";
import EventCard from "@/features/events/components/event-card";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function EventsScreen() {
  const { data: events } = useEvents();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events?.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: 20,
    backgroundColor: theme.colors.background,
    paddingTop: 60,
  },
}));
