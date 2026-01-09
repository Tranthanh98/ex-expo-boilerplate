import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export const AuthInput = ({
  label,
  icon,
  rightIcon,
  isPassword,
  style,
  ...props
}: AuthInputProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.card,
            borderColor: isFocused ? theme.primary : theme.border,
          },
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, { color: theme.text }, style]}
          placeholderTextColor={theme.textSecondary + "80"}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword ? (
          <Pressable
            style={styles.rightIconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color={theme.textSecondary} />
            ) : (
              <Eye size={20} color={theme.textSecondary} />
            )}
          </Pressable>
        ) : (
          rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  inputWrapper: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  rightIconContainer: {
    padding: 4,
  },
});
