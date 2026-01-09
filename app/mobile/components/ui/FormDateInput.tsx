import { ThemedText } from "@/components/themed-text";
import { DateTimePickerModal } from "@/components/ui/DateTimePickerModal";
import { Colors } from "@/constants/theme";
import { CalendarDays } from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface FormDateInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  accentColor?: string;
}

export function FormDateInput({
  label,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  containerStyle,
  accentColor = Colors.light.textSecondary,
}: FormDateInputProps) {
  const [isPickerVisible, setPickerVisible] = useState(false);

  // robust formatting for YYYY-MM-DD in local time
  const formattedDate = value
    ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(value.getDate()).padStart(2, "0")}`
    : "";

  const handleConfirm = (date: Date) => {
    onChange(date);
    setPickerVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Pressable
        style={styles.inputWrapper}
        onPress={() => setPickerVisible(true)}
      >
        <ThemedText
          style={[
            styles.inputText,
            !value && { color: Colors.light.textSecondary },
          ]}
        >
          {value ? formattedDate : placeholder}
        </ThemedText>
        <CalendarDays size={20} color={accentColor} style={styles.inputIcon} />
      </Pressable>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        date={value || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  inputWrapper: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingRight: 40,
  },
  inputText: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: "System",
  },
  inputIcon: {
    position: "absolute",
    right: 12,
    top: 15,
  },
});
