import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const AuthButton = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
}: AuthButtonProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === "primary"
          ? { backgroundColor: theme.primary }
          : styles.secondaryButton,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.text} />
      ) : (
        <>
          <ThemedText
            style={[
              styles.text,
              variant === "secondary" && { color: theme.textSecondary },
            ]}
          >
            {title}
          </ThemedText>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
