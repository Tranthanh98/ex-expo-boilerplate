import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface DateTimePickerModalProps {
  isVisible: boolean;
  mode: "date" | "time";
  date: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

// Helper function to validate and return a valid Date
const isValidDate = (d: any): d is Date => {
  return d instanceof Date && !isNaN(d.getTime());
};

export function DateTimePickerModal({
  isVisible,
  mode,
  date,
  onConfirm,
  onCancel,
  ...props
}: DateTimePickerModalProps) {
  const { t } = useTranslation();

  // Ensure we always have a valid date, fallback to current date if invalid
  const validDate = isValidDate(date) ? date : new Date();
  const [tempDate, setTempDate] = useState(validDate);

  useEffect(() => {
    if (isVisible) {
      setTempDate(validDate);
    }
  }, [isVisible, validDate]);

  const onAndroidChange = (event: any, selectedDate?: Date) => {
    // On Android, dismissing gives no date, touching outside might give undefined.
    // event.type === "set" means user picked a date.
    // event.type === "dismissed" means user cancelled.
    if (event.type === "set" && selectedDate) {
      onConfirm(selectedDate);
    } else {
      onCancel();
    }
  };

  const onIOSChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const confirmIOS = () => {
    onConfirm(tempDate);
  };

  if (!isVisible) return null;

  if (Platform.OS === "android") {
    return (
      <DateTimePicker
        value={validDate}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onAndroidChange}
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
      />
    );
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.modalOverlay} onPress={onCancel}>
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalToolbar}>
            <TouchableOpacity onPress={onCancel}>
              <ThemedText style={styles.modalBtnCancel}>
                {t("cancel")}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmIOS}>
              <ThemedText style={styles.modalBtnDone}>
                {t("confirm")}
              </ThemedText>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={
              tempDate instanceof Date && !isNaN(tempDate.getTime())
                ? tempDate
                : new Date()
            }
            mode={mode}
            display={mode === "date" ? "inline" : "spinner"}
            onChange={onIOSChange}
            style={styles.iosPicker}
            textColor={Colors.light.text}
            themeVariant="light"
            minimumDate={props.minimumDate}
            maximumDate={props.maximumDate}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 16,
    width: "100%",
  },
  modalToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalBtnCancel: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: "500",
  },
  modalBtnDone: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: "700",
  },
  iosPicker: {
    alignSelf: "center",
    width: "100%",
  },
});
