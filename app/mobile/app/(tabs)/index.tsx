import HomeAlerts from "@/components/home/HomeAlerts";
import HomeHeader from "@/components/home/HomeHeader";
import PetList from "@/components/home/PetList";
import TaskList from "@/components/home/TaskList";
import { Colors } from "@/constants/theme";
import { usePets } from "@/hooks/usePets";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // Get pets from local database (reactive)
  const { pets } = usePets();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refetching or allow DB subscription to update
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      >
        {/* Header Section */}
        <HomeHeader />

        {/* Pets Section */}
        <PetList pets={pets} />

        {/* Alerts Section */}
        <HomeAlerts />

        {/* Tasks Section - Uses reminders from database */}
        <TaskList />

        {/* Bottom Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
});
