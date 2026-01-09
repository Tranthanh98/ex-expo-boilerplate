import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { ProfilePremiumCard } from "@/components/profile/ProfilePremiumCard";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />
        <ProfileStats />
        <ProfilePremiumCard />
        <ProfileMenu />

        {/* Spacer for bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    // padding handled by components or global if needed
  },
});
