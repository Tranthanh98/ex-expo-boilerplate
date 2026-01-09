import { CommunityFilters } from "@/components/community/CommunityFilters";
import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { CommunityQuickScanCard } from "@/components/community/CommunityQuickScanCard";
import { CommunitySearchBar } from "@/components/community/CommunitySearchBar";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export default function CommunityScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState("Nearby");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <CommunityHeader />

      <CommunitySearchBar />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CommunityFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Card 1: Lost Pet */}
        <CommunityPostCard
          type="LOST"
          user={{
            name: "Somchai K.",
            time: "15 mins ago", // ideally relative time from date-fns helper
            avatar:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAz8AWPQaR9CMnQDVyw59KZqRw2yjg6Auu2HVuVF2aa00yLFk8T6sbWHZ2ywOXxSRnxsJdKhVO5XjU-0Cvy1YUJbLovWMB6uuBxdDWSzn5GfRDIofbMI9RG4T8ME4f8sxPdmlQ4sJ0c0WIQ7LLZM04hJBAdP8S6uvRrH3iVQuU7UN4OBkom-keCBtAKOuCPB1XRjoS5qxhfIuZsUtkKWZer8KHm4SjJzvNoXHJp0nyVpLMMPFH9-96RNNCWKR_ZHqCIy7XJoZ4VMaY",
          }}
          pet={{
            name: "Buddy",
            breed: "Golden Retriever • Male", // Could be split/translated
            distance: "0.5km",
            description:
              "Last seen near Central Park running towards the lake. He is wearing a blue collar and is very friendly. Please help!",
            location: "Sukhumvit Soi 11, Bangkok",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuB2BA4Mv2j--xMjYqp9zN6pWmK-BaW2MYmk3wgILVMBmKuQ2PWrqyfcR1v2rSnEMGtY34b7pyiaoe4fwy2m-6bENepiyNbXKvG4Cb6kidXmRnEuIxAfBpj0cMK-kpmGWk1GY1BttWMziM9VLDfP6_MuntXancmcLwTqEx-9OTcT910O31jjSmyntGfvkn7LlKls_nn3h9lU9kYOTJOHG7x8U3syaw_z-y1YKp2KDm5saqu2owS9VXIpLczX3R4b7oYzZFF6HziREBk",
          }}
        />

        {/* Card 2: Adoption Pet */}
        <CommunityPostCard
          type="ADOPTION"
          user={{
            name: "Happy Paws Shelter",
            time: "2 hours ago",
            avatar:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuA-JH8g4pGbKvEnmGqPix3RkP2iyZM-zHMvYbFbuMphvL57Bs7S29qIJ_qzbs-2PaAkg4ySfSsB7kmC2zPESP78eS2pWJqs0tc6_jokYKLlvLtolUsS3qe5CDmQT9UWfaBym1QjC2D2RN95c6mefF-pCQDemoox2DjPOC5oioi2aiQlC0e7KKBNqIG4RO2ODHWOeY4oj-hvUj5vsNzFAUrxlxSASwHnqW2M-yMUyW0OswdwFLls6I72HwcZoOrQ_pGhgjXLh-yE6xA",
          }}
          pet={{
            name: "Luna",
            breed: "British Shorthair • Female",
            distance: "2.0km",
            description:
              "Luna needs a forever home. Fully vaccinated, playful, and loves to cuddle. Ideal for apartment living.",
            location: "Sathorn, Bangkok",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCamNtXEDxjlI-yxE--M0YZ0KgQGJ1x3VxuiCS3HgQlkXt0JgjR0MA0y30hEDSdnpEI0EOlNkrx941gn0nOxYYpyXtyhzRJ_VbOUaRGchlrk1a6hCfVWyfz3C93YqunCiW1lHbZnUznfmTrmfF2XwX1g1lf2szTMktYtSNDTMnYp8jN7k-ocGRZbVDmQ3AJnfdwmPGKEfuEFX7GWhBh4UqlYrgysA-BJeq-ksFVcGDsosoGo_Z81K5eLeytCgUusg_pnfrrigBF9Ig",
          }}
        />

        {/* Card 3: Found Pet (Quick Scan) */}
        <CommunityQuickScanCard
          pet={{
            name: "Charlie",
            // "Pug • 3.5km away" -> simplified here for demo, can be constructed
            description: "Pug • 3.5km away",
            missingTime: "Missing since yesterday evening...",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuD85K56Ocb3sH_S1BtSKnkHkpAYjxQs8i3wJkIpKCWghU5gPZmGu9NxHUwUJmzQMUnHQ9-5q4OgyS3qqb9o1TyG0en4j-bTQJgkOxVQiAsy6qvquD9-feg2hYymf1bCvQiYp1yZSsgc5iqrP2kIZvyGHiRJPdZNV3ODIdZwFA2C6-QhBsJsYyic9PuntLpyAhjXQdLGoYhZz_gaIgWcVUmnIXlZkTQYmBOdiyFaLyLXao1NxgNp4uni-4T_LmeKeQvlyTLL1zgT_co",
          }}
        />

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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
