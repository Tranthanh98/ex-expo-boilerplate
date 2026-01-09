/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const palette = {
  // Pastel Orange Theme
  primary: "#FFAB76",
  primaryLight: "#FFD4B8",
  primaryDark: "#E67E22",

  // Neutrals
  white: "#FFFFFF",
  backgroundLight: "#FDFBF7", // Warm off-white
  backgroundDark: "#151718",

  // Text
  textLight: "#2D3436",
  textGray: "#636E72",
  textDark: "#ECEDEE",

  // Status
  success: "#81ECEC",
  warning: "#FFEAA7",
  error: "#FF7675",
  info: "#74B9FF",

  // UI
  border: "#DFE6E9",
  cardLight: "#FFFFFF",
  cardDark: "#373636ff",
};

const tintColorLight = palette.primary;
const tintColorDark = palette.primary;

export const Colors = {
  light: {
    text: palette.textLight,
    textSecondary: palette.textGray,
    background: palette.backgroundLight,
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: palette.primary,
    primaryLight: palette.primaryLight,
    primaryDark: palette.primaryDark,
    card: palette.cardLight,
    border: palette.border,
    success: "#00B894", // Darker for text/icons
    successBackground: "rgba(85, 239, 196, 0.2)",
    warning: "#FD9644",
    warningBackground: "rgba(255, 234, 167, 0.3)",
    error: palette.error,
    white: palette.white,
  },
  dark: {
    text: palette.textDark,
    textSecondary: "#9BA1A6",
    background: palette.backgroundDark,
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: palette.primary,
    primaryLight: palette.primaryLight,
    primaryDark: palette.primaryDark,
    card: palette.cardDark,
    border: "#333333",
    success: "#55EFC4",
    successBackground: "rgba(85, 239, 196, 0.1)",
    warning: "#FFEAA7",
    warningBackground: "rgba(255, 234, 167, 0.1)",
    error: palette.error,
    white: palette.white,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
