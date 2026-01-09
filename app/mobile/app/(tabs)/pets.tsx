import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { usePets } from "@/hooks/usePets";
import { Settings } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import { PetCard } from "@/components/pets/PetCard";
import { PetFilters } from "@/components/pets/PetFilters";
import { PetStats } from "@/components/pets/PetStats";

export default function PetsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("all");
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  // Fetch pets from database
  const { pets, isLoading } = usePets();

  // Filter pets based on selected filter
  const filteredPets = useMemo(() => {
    if (activeFilter === "all") {
      return pets;
    }
    return pets.filter(
      (pet) => pet.species.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [pets, activeFilter]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: theme.background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.welcomeText}>
            {t("welcome_back")}
          </ThemedText>
          <ThemedText type="title">{t("my_pets")}</ThemedText>
        </View>
        <Pressable style={styles.settingsButton}>
          <Settings size={24} color={Colors.light.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Section */}
        <PetStats totalPets={pets.length} />

        {/* Filters */}
        <View style={styles.filterSection}>
          <PetFilters activeFilter={activeFilter} onSelect={setActiveFilter} />
        </View>

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
          </View>
        )}

        {/* Empty State */}
        {!isLoading && filteredPets.length === 0 && (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              {activeFilter === "all"
                ? t("no_pets_yet")
                : t("no_pets_in_category") || `No ${activeFilter}s yet`}
            </ThemedText>
          </View>
        )}

        {/* Pets Grid */}
        <View style={styles.grid}>
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </View>

        {/* Spacer for Bottom Tab Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
