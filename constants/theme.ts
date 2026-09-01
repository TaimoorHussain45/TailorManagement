import {
  MD3Colors,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";

export type ThemeColors = typeof MD3Colors & {
  // Backgrounds
  background: string;
  surface: string;
  surfaceElevated: string;
  card: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Borders / dividers
  border: string;
  borderStrong: string;

  // Brand / accent
  primary: string;
  primarySoft: string;
  accent: string;
  accentSoft: string;

  // Highlight
  highlight: string;
  highlightSoft: string;

  // Status
  success: string;
  successSoft: string;
  warning: string;
  danger: string;
  statusMuted: string;

  // Tab bar / icons
  tabActive: string;
  tabInactive: string;

  // Inputs
  inputBackground: string;
  inputBorder: string;
  placeholder: string;
};

export type AppTheme = MD3Theme & {
  colors: ThemeColors;
};

export type AppColors = {
  light: ThemeColors;
  dark: ThemeColors;
};

export const Colors: AppColors = {
  light: {
    ...MD3Colors,

    // Backgrounds
    background: "#FCFAF6",
    surface: "#FCFAF6",
    surfaceElevated: "#FFFFFF",
    card: "#FFFFFF",

    paper: "#F6F1E8",
    surfaceMuted: "#F0EBE1",
    cream: "#EFE6D7",

    // Text
    textPrimary: "#243430",
    textSecondary: "#77817A",
    textMuted: "#9A9F98",

    // Borders / dividers
    border: "#E3DCCF",
    borderStrong: "#D9D0C1",

    // Brand / accent
    primary: "#1F5D58",
    primarySoft: "#DCEBE4",

    accent: "#B86449",
    accentSoft: "#F2DED4",

    // Highlight
    highlight: "#C79A54",
    highlightSoft: "#EFE2C8",

    // Status
    success: "#5F8065",
    successSoft: "#D7E1D5",

    warning: "#9A6A25",
    danger: "#B86449",
    statusMuted: "#E9E5DC",

    // Tab bar / icons
    tabActive: "#1F5D58",
    tabInactive: "#9A9F98",

    // Inputs
    inputBackground: "#F0EBE1",
    inputBorder: "#D9D0C1",
    placeholder: "#9A9F98",
  },

  dark: {
    ...MD3Colors,

    // Backgrounds
    background: "#171817",
    surface: "#222421",
    surfaceElevated: "#2A2D29",
    card: "#222421",

    // Atelier backgrounds
    paper: "#171817",
    surfaceMuted: "#2A2D29",
    charcoal: "#2B2821",

    // Text
    textPrimary: "#F0E9DD",
    textSecondary: "#92968D",
    textMuted: "#777970",

    // Borders / dividers
    border: "#45443F",
    borderStrong: "#D8C8AD",

    // Brand / accent
    primary: "#C79F65",
    primarySoft: "#3A3328",

    accent: "#CA846E",
    accentSoft: "#382A26",

    // Highlight
    highlight: "#D9B47A",
    highlightSoft: "#3A3328",

    // Status
    success: "#8BB69D",
    successSoft: "#28372F",

    warning: "#D5A65A",
    danger: "#CA846E",
    statusMuted: "#AEB2A9",

    // Tab bar / icons
    tabActive: "#D9B47A",
    tabInactive: "#777970",

    // Inputs
    inputBackground: "#111312",
    inputBorder: "#44443F",
    placeholder: "#777970",
  },
};

export type ThemeName = keyof typeof Colors;

export const lightTheme: AppTheme = {
  ...MD3LightTheme,
  colors: Colors.light,
};

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,
  colors: Colors.dark,
};

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
