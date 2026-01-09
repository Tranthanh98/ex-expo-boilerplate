import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export type BottomSheetRef = {
  expand: () => void;
  close: () => void;
};

interface TooltipProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const CustomBottomSheet = forwardRef<BottomSheetRef, TooltipProps>(
  ({ children, onClose }, ref) => {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    // 0 is top of screen.
    // We want the sheet to be able to go up to "insets.top" (safe area)
    // Default open is 65% height -> top position is SCREEN_HEIGHT * 0.35
    const topSafeArea = insets.top;
    const initialSnapPoint = SCREEN_HEIGHT * 0.35; // 65% height visible (35% from top)
    const expandedSnapPoint = topSafeArea + 10; // Full height minus safe area and a bit of margin
    const closedSnapPoint = SCREEN_HEIGHT + 50;

    const translateY = useSharedValue(closedSnapPoint);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      active.value = destination !== closedSnapPoint;
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const close = useCallback(() => {
      "worklet";
      scrollTo(closedSnapPoint);
      if (onClose) {
        runOnJS(onClose)();
      }
    }, [onClose, scrollTo]);

    const expand = useCallback(() => {
      scrollTo(initialSnapPoint);
    }, [initialSnapPoint, scrollTo]);

    useImperativeHandle(ref, () => ({
      expand: () => {
        // Need to run on UI thread or trigger animation
        // Since useImperativeHandle runs on JS, modifying shared value directly triggers animation
        scrollTo(initialSnapPoint);
      },
      close: () => {
        close();
      },
    }));

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        // Limit upward movement
        if (translateY.value < expandedSnapPoint) {
          // resistance
          translateY.value =
            expandedSnapPoint + (translateY.value - expandedSnapPoint) * 0.5;
        }
      })
      .onEnd(() => {
        if (translateY.value > SCREEN_HEIGHT * 0.7) {
          close();
        } else if (translateY.value < initialSnapPoint - 100) {
          scrollTo(expandedSnapPoint);
        } else if (translateY.value > initialSnapPoint + 100) {
          close();
        } else {
          // Snap to nearest
          const distToInitial = Math.abs(translateY.value - initialSnapPoint);
          const distToExpanded = Math.abs(translateY.value - expandedSnapPoint);
          if (
            distToExpanded < distToInitial &&
            translateY.value < initialSnapPoint
          ) {
            scrollTo(expandedSnapPoint);
          } else {
            scrollTo(initialSnapPoint);
          }
        }
      });

    const backdropStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          translateY.value,
          [closedSnapPoint, initialSnapPoint],
          [0, 0.5],
          Extrapolation.CLAMP
        ),
        pointerEvents: active.value ? "auto" : "none",
      };
    });

    const sheetStyle = useAnimatedStyle(() => {
      const isClosed = translateY.value >= closedSnapPoint - 5;
      return {
        transform: [{ translateY: translateY.value }],
        opacity: isClosed ? 0 : 1,
        // Ensure it doesn't intercept touches or cast shadow when "closed"
        zIndex: isClosed ? -1 : 100,
      };
    });

    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { zIndex: 100, pointerEvents: "box-none" },
        ]}
      >
        {/* Backdrop */}
        <Animated.View
          onTouchEnd={() => {
            // Close on backdrop tap
            if (active.value) {
              runOnJS(close)();
            }
          }}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "black" },
            backdropStyle,
          ]}
        />

        {/* Sheet */}
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.sheet, { backgroundColor: theme.card }, sheetStyle]}
          >
            <View style={styles.handleContainer}>
              <View
                style={[styles.handle, { backgroundColor: theme.icon + "40" }]}
              />
            </View>
            <View style={{ flex: 1 }}>{children}</View>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  sheet: {
    padding: 16,
    height: SCREEN_HEIGHT,
    width: "100%",
    position: "absolute",
    top: 0,
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  handleContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  handle: {
    width: 60,
    height: 5,
    borderRadius: 3,
  },
});

export default CustomBottomSheet;
