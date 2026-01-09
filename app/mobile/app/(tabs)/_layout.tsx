import AddActionSheet from "@/components/AddActionSheet";
import { ThemedText } from "@/components/themed-text";
import { BottomSheetRef } from "@/components/ui/CustomBottomSheet";
import MaskedView from "@react-native-masked-view/masked-view";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { router, Slot, usePathname } from "expo-router";
import { Handshake, House, PawPrint, Plus, User } from "lucide-react-native";
import React, { useRef } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TAB_BAR_HEIGHT = 65;
const FAB_SIZE = 50;

// Left side tabs (2 items)
// Left side tabs (2 items)
// Definitions moved inside component

// Right side tabs (2 items)
// Right side tabs (2 items)
// Definitions moved inside component

// Custom curved tab bar background with notch dipping DOWN
function CurvedTabBarBackground({
  backgroundColor,
}: {
  backgroundColor: string;
}) {
  const width = SCREEN_WIDTH - 40;
  const height = TAB_BAR_HEIGHT;
  const centerX = width / 2;
  const fabRadius = FAB_SIZE / 3;
  const gap = 2; // Giảm gap để ôm sát FAB hơn
  const notchRadius = fabRadius + gap; // 34px
  const notchDepth = 20; // Độ sâu của notch (càng lớn càng sâu)
  const curveWidth = 28; // Độ rộng của curve bên cạnh
  const borderRadius = 30;

  // Path with smoother curves using cubic bezier
  const path = `
    M ${borderRadius} 0
    L ${centerX - notchRadius - curveWidth} 0
    C ${centerX - notchRadius - curveWidth * 0.5} 0, 
      ${centerX - notchRadius - 15} ${notchDepth * 0.5}, 
      ${centerX - notchRadius} ${notchDepth}
    Q ${centerX} ${notchDepth + notchRadius * 0.6} ${
    centerX + notchRadius
  } ${notchDepth}
    C ${centerX + notchRadius + 15} ${notchDepth * 0.5},
      ${centerX + notchRadius + curveWidth * 0.5} 0,
      ${centerX + notchRadius + curveWidth} 0
    L ${width - borderRadius} 0
    Q ${width} 0 ${width} ${borderRadius}
    L ${width} ${height - borderRadius}
    Q ${width} ${height} ${width - borderRadius} ${height}
    L ${borderRadius} ${height}
    Q 0 ${height} 0 ${height - borderRadius}
    L 0 ${borderRadius}
    Q 0 0 ${borderRadius} 0
    Z
  `;

  if (!isLiquidGlassAvailable()) {
    return (
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Path d={path} fill={backgroundColor} />
      </Svg>
    );
  }

  return (
    <MaskedView
      style={StyleSheet.absoluteFill}
      maskElement={
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Path d={path} fill="black" />
        </Svg>
      }
    >
      <GlassView
        style={StyleSheet.absoluteFill}
        glassEffectStyle="regular"
        tintColor={backgroundColor}
      />
    </MaskedView>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // Define tabs here to access theme
  const leftTabs = [
    {
      name: "index",
      label: "Home",
      icon: (active: boolean) => (
        <House
          size={24}
          color={active ? theme.tabIconSelected : theme.tabIconDefault}
        />
      ),
    },
    {
      name: "pets",
      label: "Pets",
      icon: (active: boolean) => (
        <PawPrint
          size={24}
          color={active ? theme.tabIconSelected : theme.tabIconDefault}
        />
      ),
    },
  ];

  const rightTabs = [
    {
      name: "community",
      label: "Save pets",
      icon: (active: boolean) => (
        <Handshake
          size={24}
          color={active ? theme.tabIconSelected : theme.tabIconDefault}
        />
      ),
    },
    {
      name: "profile",
      label: "Profile",
      icon: (active: boolean) => (
        <User
          size={24}
          color={active ? theme.tabIconSelected : theme.tabIconDefault}
        />
      ),
    },
  ];

  const getActiveTab = () => {
    if (pathname === "/" || pathname === "/index") return "index";
    if (pathname.startsWith("/pets")) return "pets";
    if (pathname.startsWith("/community")) return "community";
    if (pathname.startsWith("/profile")) return "profile";
    return "index";
  };

  const activeTab = getActiveTab();

  const handleTabPress = (tabName: string) => {
    if (tabName === "index") {
      router.push("/");
    } else {
      router.push(`/${tabName}` as any);
    }
  };

  const actionSheetRef = useRef<BottomSheetRef>(null);

  const handleFabPress = () => {
    actionSheetRef.current?.expand();
  };

  const renderTab = (tab: (typeof leftTabs)[0]) => {
    const isActive = activeTab === tab.name;
    return (
      <Pressable
        key={tab.name}
        style={styles.tabItem}
        onPress={() => handleTabPress(tab.name)}
      >
        {tab.icon(isActive)}
        <ThemedText
          style={[
            styles.tabLabel,
            {
              color: isActive ? theme.tabIconSelected : theme.tabIconDefault,
            },
          ]}
        >
          {tab.label}
        </ThemedText>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Content */}
      <Slot />

      {/* Bottom Tab Bar */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 10) },
        ]}
      >
        {/* FAB Button - positioned ABOVE the tab bar */}
        <View style={styles.fabWrapper}>
          <Pressable style={styles.fab} onPress={handleFabPress}>
            {/* <ThemedText style={styles.fabIcon}>+</ThemedText> */}
            <Plus size={24} color="white" strokeWidth={3} />
          </Pressable>
        </View>

        {/* Tab Bar with curved notch */}
        <View style={styles.tabBarContainer}>
          <CurvedTabBarBackground
            backgroundColor={
              colorScheme === "dark"
                ? "rgba(12, 12, 12, 0.95)"
                : "rgba(230, 230, 230, 0.95)"
            }
          />

          {/* Tab Items */}
          <View style={styles.tabContent}>
            {/* Left tabs */}
            <View style={styles.tabGroup}>{leftTabs.map(renderTab)}</View>

            {/* Center spacer for FAB */}
            <View style={styles.centerSpacer} />

            {/* Right tabs */}
            <View style={styles.tabGroup}>{rightTabs.map(renderTab)}</View>
          </View>
        </View>
      </View>

      <AddActionSheet ref={actionSheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  fabWrapper: {
    position: "absolute",
    top: -FAB_SIZE / 2 - 8, // FAB floats above the tab bar
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: Colors.light.primary, // Or use theme.primary if dynamic
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  fabIcon: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "300",
  },
  tabBarContainer: {
    height: TAB_BAR_HEIGHT,
    position: "relative",
  },
  tabContent: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  tabGroup: {
    flexDirection: "row",
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    color: "#fff",
  },
  centerSpacer: {
    width: 72,
  },
});
