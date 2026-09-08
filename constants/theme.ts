import type { MD3Theme } from "react-native-paper";
import { MD3Colors } from "react-native-paper";

export type ThemeColors = typeof MD3Colors &
  Record<string, string | [string, string]> & {
    white: string;
    black: string;
    charcoal: string;
    slate: string;
    gunmetal: string;
    offWhite: string;
    background: string;
    authLogo: string;
    textPrimary: string;
    textSecondary: string;
    divider: string;
    tabBarBackground: string;
    progressFillStart: string;
    progressFillEnd: string;
    taskFilterActiveBg: string;
    containerInvite: string;
    green: string;
    cardBackground: string;
    borderColor: string;
    clayRose: string;
    TealGreen: string;
    red: string;
    accentGold: string;
    SageGreen: string;
    onColor: string;
  };

export type AppTheme = MD3Theme & {
  colors: ThemeColors;
};

export type AppColors = {
  light: ThemeColors;
  dark: ThemeColors;
};

const commonColors = {
  offWhite: "#ffffff",
  darkBlack: "#000000",
  clayRose: "#CA846F",
  red: "#b86449",
  borderColor: "#c8bba7",
};

// In your theme constants file
export const colors: AppColors = {
  light: {
    ...MD3Colors,
    ...commonColors,
    charcoal: "#efe6d7",
    softBlack: "#FFFFFF",
    slate: "#F3F4F6",
    graphiteGray: "#F3F4F6",
    gunmetal: "#EEF2F7",
    GunmetalGray: "#EEF2F7",
    white: "#FFFFFF",
    black: "#000000",
    cardBackground: "#fcfaf6",
    background: "#F6F1E8",
    textPrimary: "#000000",
    textColor: "#111827",
    textSecondary: "#6e7972",
    authLogo: "#efe6d7",
    tabBarBackground: "#F6F1E8",
    TealGreen: "#1F5D58",
    divider: "#E5E7EB",
    progressFillStart: "#6485d9",
    progressFillEnd: "#3cc79f",
    accentGold: "#C09754",
    taskFilterActiveBg: "#f8fafc",
    containerInvite: "#13141a",
    green: "#34D399",
    borderColor: "#E3D9C9",
    SageGreen: "#e7efe7",
    onColor: "#e7efe7",
  },
  dark: {
    ...MD3Colors,
    ...commonColors,
    charcoal: "#171817",
    cardBackground: "#222421",
    slate: "#475569",
    graphiteGray: "#475569",
    accentGold: "#C09754",
    gunmetal: "#475569",
    GunmetalGray: "#475569",
    textPrimary: "#FFFFFF",
    textColor: "#F9FAFB",
    white: "#000000",
    black: "#ffffff",
    background: "#171817",
    textSecondary: "#92968d",
    authLogo: "#2b2821",
    labelText: "#94A3B8",
    TealGreen: "#c79f65",
    divider: "#334155",
    progressFillStart: "#6485d9",
    progressFillEnd: "#3cc79f",
    taskFilterActiveBg: "#17142b",
    containerInvite: "#13141a",
    green: "#34D399",
    borderColor: "#d8c8ad33",
    tabBarBackground: "#171817",
    SageGreen: "#2f4137",
    onColor: "#2f4137",
  },
};

export const Colors = colors;

/** Active group card on Home — use with `useColorScheme()` to pick `.light` or `.dark`. Replaced */

export const Fonts = {
  regular: "PoppinsRegular",
  medium: "PoppinsMedium",
  semiBold: "PoppinsSemiBold",
  bold: "PoppinsBold",
  extraBold: "PoppinsExtraBold",
  light: "PoppinsLight",
  extraLight: "PoppinsExtraLight",
  italic: "PoppinsItalic",
  mediumItalic: "PoppinsMediumItalic",
  semiBoldItalic: "PoppinsSemiBoldItalic",
  boldItalic: "PoppinsBoldItalic",
  extraBoldItalic: "PoppinsExtraBoldItalic",
  lightItalic: "PoppinsLightItalic",
  extraLightItalic: "PoppinsExtraLightItalic",
} as const;

export type FontKey = keyof typeof Fonts;
