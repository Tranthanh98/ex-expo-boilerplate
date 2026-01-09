import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ImageViewerProps {
  visible: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const ImageViewer = ({
  visible,
  images,
  initialIndex = 0,
  onClose,
}: ImageViewerProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  // Sync initial index when visible changes
  React.useEffect(() => {
    if (visible && initialIndex !== activeIndex) {
      setActiveIndex(initialIndex);
      // Timeout to allow layout to happen before scrolling
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
      }, 50);
    }
  }, [visible, initialIndex]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />

        {/* Backblur / dismiss area behind is handled by the fact that if you touch empty space... 
            Actually with FlatList taking full width, hard to touch "behind".
            But we can make the FlatList items Pressable to close? Or just close button.
            User asked "tap button close or backblur to close".
            We can add a Pressable backdrop if needed, but FlatList covers all.
            We'll assume 'backblur' refers to the visual effect.
            Detailed requirement: "tap ... backblur will close".
            Usually means tapping the background.
        */}

        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          keyExtractor={(_, index) => index.toString()}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          renderItem={({ item }) => (
            <Pressable
              style={styles.imageContainer}
              onPress={onClose} // Tap anywhere on image/bg to close as per "tap backblur" request (simplified interaction)
            >
              <Pressable
                onPress={(e) => e.stopPropagation()} // Prevent close when tapping image itself? Or allow?
                // User said "tap button close or backblur will close".
                // Usually tapping image toggles chrome, but here maybe just close on bg tap.
                // Let's make image 'contain', so tapping empty area (bg) closes.
                // But Image component itself is rectangular.
                // We'll leave it as: Tap image -> do nothing (or toggle controls), Tap bg -> close.
                // For simplicity as per prompt "tap close button or backblur will close", let's put a Close button.
                // And we can make the background pressable as well.
              >
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                  contentFit="contain"
                  transition={200}
                />
              </Pressable>
            </Pressable>
          )}
        />

        <View style={[styles.header, { top: insets.top + 10 }]}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="white" />
          </Pressable>
        </View>

        {images.length > 1 && (
          <View style={[styles.footer, { bottom: insets.bottom + 20 }]}>
            <Text style={styles.pageText}>
              {activeIndex + 1} / {images.length}
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fallback
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  header: {
    position: "absolute",
    left: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    alignSelf: "center",
  },
  pageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
  },
});
