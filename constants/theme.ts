import type { MD3Theme } from "react-native-paper";
import { MD3Colors } from "react-native-paper";

export type ThemeColors = typeof MD3Colors & {
  white: string;
  black: string;
  charcoal: string;
  slate: string;
  gunmetal: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;
  redAccent: string;
  surface: string;
  success: string;
  warning: string;
  info: string;
  border: string;
  mint: string;
  focusBorder: string;
  textTertiary: string;
  gradientStart: string;
  gradientEnd: string;
  cardBorder: string;
  glowBg: string;
  glowBorder: string;
  activeLabel: string;
  headingText: string;
  secondaryText: string;
  captionText: string;
  avatarSurface: string;
  pillSurface: string;
  progressTrack: string;
  progressAccent: string;
  ctaBorder: string;
  ctaSurface: string;
  ctaBg: string;
  ctaText: string;
  avatarBorder: string;
  overflowAvatarBg: string;
  moreAvatarBg: string;
  shadowColor: string;
  screenGradientTop: string;
  screenGradientBottom: string;
  fabGradient: [string, string];
  fabPlus: string;
  errorText: string;
  logo: string;
  titleText: string;
  notificationSurface: string;
  notificationBorder: string;
  notificationIcon: string;
  notificationDot: string;
  avatarBackground: string;
  purpleAccent: string;
  purpleAvatar: string;
  avatarRed: string;
  avatarYellow: string;
  avatarTeal: string;
  successBg: string;
  textMuted: string;
  borderPrimary: string;
  borderSecondary: string;
  bgCard: string;
  bgInvite: string;
  iconBg: string;
  gradient: [string, string];
  tagBg: string;
  roleBg: string;
  onlineBorder: string;
  labelInvite: string;
  codeText: string;
  progressFillStart: string;
  progressFillEnd: string;
  taskFilterActiveBg: string;
  containerInvite: string;
  green: string;
  greendim: string;
  greenCard: string;
  deleteRed: string;
  modalSurface: string;
  modalCard: string;
  modalMuted: string;
  modalBorder: string;
  modalInputBg: string;
  modalBackdrop: string;
  lightOverlay: string;
  darkBlack: string;
  offWhite: string;
  error: string;
  surfaceAlt: string;
  errorBgDark: string;
  borderStrong: string;
  primary: string;
  dangerSoft: string;
  successSoft: string;
  errorSoft: string;
  card: string;
  cardAlt: string;
  borderColor: string;
  sheetBackground: string;
  gray500: string;
  baseBackground: [string, string];

  softBlack?: string;
  graphiteGray?: string;
  GunmetalGray?: string;
  textColor?: string;
  labelText?: string;
  redish?: string;
  cardBackground?: string;
  mintGreen?: string;
  borderFocus?: string;
  title?: string;
  location?: string;
  caption?: string;
  avatarBg?: string;
  pillBg?: string;
  cardProgressTrack?: string;
  purplePrimary?: string;
  secondaryAvatar1?: string;
  secondaryAvatar2?: string;
  secondaryAvatar3?: string;
  screenGradientStart?: string;
  screenGradientEnd?: string;
  loadingErrorText?: string;
  bellBackground?: string;
  bellBorder?: string;
  bellIcon?: string;
  bellDot?: string;
  avatarBackground?: string;
  notificationSurface?: string;
  notificationBorder?: string;
  notificationIcon?: string;
  notificationDot?: string;
  overflowAvatarBg?: string;
  moreAvatarBg?: string;
  ctaBg?: string;
};

export type AppTheme = MD3Theme & {
  colors: ThemeColors;
};

export type AppColors = {
  light: ThemeColors;
  dark: ThemeColors;
};

const commonColors = {
  offWhite: "#FFFFFF",
  darkBlack: "#000000",
  success: "#22c55e",
  slate: "#334155",
  graphiteGray: "#334155",
  progressAccent: "#34D399",
  textSecondary: "#6B7280",
  modalMuted: "#6B7280",
  borderStrong: "#CBD5E1",
  primary: "#10B981",
  dangerSoft: "#FEE2E2",
  successSoft: "#DCFCE7",
  errorSoft: "#FEE2E2",
  card: "#FFFFFF",
  cardAlt: "#F8FAFC",
  borderColor: "#E5E7EB",
  baseBackground: ["#F0FDF4", "#34D399"] as [string, string],
};

// In your theme constants file
export const colors: AppColors = {
  light: {
    ...MD3Colors,
    ...commonColors,
    charcoal: "#2B2821",
    softBlack: "#FFFFFF",
    slate: "#F3F4F6",
    graphiteGray: "#F3F4F6",
    gunmetal: "#EEF2F7",
    GunmetalGray: "#EEF2F7",
    white: "#FFFFFF",
    black: "#000000",
    background: "#F6F1E8",
    textPrimary: "#111827",
    textColor: "#111827",
    textSecondary: "#6B7280",
    labelText: "#6B7280",
    lightOverlay: "#000000",
    divider: "#E5E7EB",
    mint: "#34D399",
    mintGreen: "#34D399",
    redAccent: "#EF4444",
    redish: "#EF4444",
    sheetBackground: "#FFFFFF",
    warning: "#F59E0B",
    info: "#3B82F6",
    border: "#E5E7EB",
    focusBorder: "#10B981",
    borderFocus: "#10B981",
    textTertiary: "#9CA3AF",
    surface: "#ffffff",
    cardBackground: "#ffffff",
    gradientStart: "#10B981",
    gradientEnd: "#f0f4ff",
    cardBorder: "rgba(52,211,153,0.25)",
    glowBg: "rgba(52,211,153,0.08)",
    glowBorder: "rgba(52,211,153,0.2)",
    activeLabel: "#059669",
    headingText: "#0D0D0D",
    title: "#0D0D0D",
    secondaryText: "rgba(0,0,0,0.5)",
    location: "rgba(0,0,0,0.5)",
    captionText: "#4B5563",
    caption: "#4B5563",
    avatarSurface: "#F3F4F6",
    avatarBg: "#F3F4F6",
    pillSurface: "rgba(0,0,0,0.06)",
    pillBg: "rgba(0,0,0,0.06)",
    progressTrack: "#D1D5DB",
    cardProgressTrack: "#D1D5DB",
    progressAccent: "#34D399",
    ctaBorder: "rgba(52,211,153,0.4)",
    ctaSurface: "rgba(52,211,153,0.15)",
    ctaBg: "rgba(52,211,153,0.15)",
    ctaText: "#059669",
    avatarBorder: "#f0f4ff",
    overflowAvatarBg: "#E5E7EB",
    moreAvatarBg: "#E5E7EB",
    shadowColor: "#34D399",
    screenGradientTop: "#e6f7f1",
    screenGradientStart: "#e6f7f1",
    screenGradientBottom: "#eef2ff",
    screenGradientEnd: "#eef2ff",
    fabGradient: ["#1EF27B", "#12B95A"] as [string, string],
    fabPlus: "#FFFFFF",
    errorText: "#1f2937",
    loadingErrorText: "#1f2937",
    logo: "#059669",
    titleText: "#0f172a",
    notificationSurface: "rgba(0,0,0,0.06)",
    bellBackground: "rgba(0,0,0,0.06)",
    notificationBorder: "rgba(0,0,0,0.1)",
    bellBorder: "rgba(0,0,0,0.1)",
    notificationIcon: "#64748b",
    bellIcon: "#64748b",
    notificationDot: "#EF4444",
    bellDot: "#EF4444",
    avatarBackground: "#e2e8f0",
    purpleAccent: "#8b5cf6",
    purplePrimary: "#8b5cf6",
    purpleAvatar: "#A78BFF",
    avatarRed: "#FF6B6B",
    secondaryAvatar1: "#FF6B6B",
    avatarYellow: "#FFD93D",
    secondaryAvatar2: "#FFD93D",
    avatarTeal: "#4ECDC4",
    secondaryAvatar3: "#4ECDC4",
    successBg: "rgba(34,197,94,0.12)",
    textMuted: "#9ca3af",
    borderPrimary: "#d1d5db",
    borderSecondary: "#e5e7eb",
    bgCard: "#f9fafb",
    bgInvite: "#f8fafc",
    iconBg: "#f3f4f6",
    gradient: ["#f8fafc", "#f1f5f9"] as [string, string],
    tagBg: "rgba(0,0,0,0.08)",
    roleBg: "rgba(139,92,246,0.12)",
    onlineBorder: "#f3f4f6",
    labelInvite: "#6b7280",
    codeText: "#111827",
    progressFillStart: "#6485d9",
    progressFillEnd: "#3cc79f",
    taskFilterActiveBg: "#f8fafc",
    containerInvite: "#13141a",
    green: "#34D399",
    greendim: "rgba(52,211,153,0.15)",
    greenCard: "rgba(52,211,153,0.06)",
    deleteRed: "#f16969",
    modalSurface: "#FFFFFF",
    modalCard: "#F3F4F6",
    modalInputBg: "#EEF2F7",
    modalBorder: "rgba(0,0,0,0.08)",
    modalBackdrop: "rgba(0,0,0,0.45)",
    error: "#EF4444",
    surfaceAlt: "#1E293B",
    errorBgDark: "rgba(239,68,68,0.10)",
    gray500: "#6B7280",
    baseBackground: ["#F0FDF4", "#34D399"] as [string, string],
  },
  dark: {
    ...MD3Colors,
    ...commonColors,
    charcoal: "#171817",
    softBlack: "#2B2821",
    slate: "#475569",
    graphiteGray: "#475569",
    gunmetal: "#475569",
    GunmetalGray: "#475569",
    textPrimary: "#F9FAFB",
    textColor: "#F9FAFB",
    white: "#000000",
    black: "#ffffff",
    background: "#171817",
    textSecondary: "#94A3B8",
    labelText: "#94A3B8",
    sheetBackground: "#0D0D0D",
    redAccent: "#F87171",
    redish: "#F87171",
    mint: "#FFFFFF1A",
    mintGreen: "#FFFFFF1A",
    warning: "#FBBF24",
    info: "#60A5FA",
    lightOverlay: "rgba(248,250,252,0.7)",
    error: "#F87171",
    surfaceAlt: "#1E293B",
    border: "#334155",
    focusBorder: "#34D399",
    borderFocus: "#34D399",
    textTertiary: "#64748B",
    cardBackground: "#000000",
    gradientStart: "#132e27",
    gradientEnd: "#0b0f1a",
    cardBorder: "#132e27",
    glowBg: "rgba(34,197,94,0.10)",
    glowBorder: "rgba(34,197,94,0.18)",
    activeLabel: "#34D399",
    headingText: "#FFFFFF",
    title: "#FFFFFF",
    secondaryText: "rgba(255,255,255,0.55)",
    location: "rgba(255,255,255,0.55)",
    captionText: "rgba(255,255,255,0.45)",
    caption: "rgba(255,255,255,0.45)",
    pillSurface: "rgba(255,255,255,0.10)",
    pillBg: "rgba(255,255,255,0.10)",
    progressTrack: "#2a2a2a",
    cardProgressTrack: "#2a2a2a",
    progressAccent: "#34D399",
    ctaBorder: "rgba(52,211,153,0.3)",
    ctaSurface: "rgba(52,211,153,0.12)",
    ctaBg: "rgba(52,211,153,0.12)",
    ctaText: "#34D399",
    avatarBorder: "#0b0f1a",
    overflowAvatarBg: "#2a2a2a",
    moreAvatarBg: "#2a2a2a",
    shadowColor: "#00ff99",
    screenGradientTop: "#020E19",
    screenGradientStart: "#020E19",
    screenGradientBottom: "#010911",
    screenGradientEnd: "#010911",
    fabGradient: ["#1EF27B", "#12B95A"] as [string, string],
    baseBackground: ["#022C22", "#064E3B"] as [string, string],
    fabPlus: "#FFFFFF",
    errorText: "#FFFFFF",
    loadingErrorText: "#FFFFFF",
    logo: "#1DD974",
    titleText: "#F7F9FC",
    notificationSurface: "#171b26",
    bellBackground: "#171b26",
    notificationBorder: "#1e222e",
    bellBorder: "#1e222e",
    notificationIcon: "#767a85",
    bellIcon: "#767a85",
    notificationDot: "#EF4444",
    bellDot: "#EF4444",
    avatarBackground: "#1E2937",
    purpleAccent: "#a78bfa",
    purplePrimary: "#a78bfa",
    purpleAvatar: "#A178FF",
    avatarRed: "#FF6B6B",
    secondaryAvatar1: "#FF6B6B",
    avatarYellow: "#FFD93D",
    secondaryAvatar2: "#FFD93D",
    avatarTeal: "#4ECDC4",
    secondaryAvatar3: "#4ECDC4",
    successBg: "rgba(76,175,80,0.2)",
    textMuted: "#a1a1aa",
    borderPrimary: "#222126",
    borderSecondary: "#262626",
    bgCard: "#1c1c26",
    bgInvite: "#13141a",
    iconBg: "#2d2a3d",
    gradient: ["#13141A", "#13141A"] as [string, string],
    tagBg: "rgba(255,255,255,0.1)",
    roleBg: "rgba(167,139,250,0.2)",
    onlineBorder: "#1a1a1c",
    labelInvite: "#71717a",
    codeText: "#f4f4f5",
    progressFillStart: "#6485d9",
    progressFillEnd: "#3cc79f",
    taskFilterActiveBg: "#17142b",
    containerInvite: "#13141a",
    green: "#34D399",
    greendim: "rgba(52,211,153,0.15)",
    greenCard: "rgba(52,211,153,0.06)",
    deleteRed: "#f16969",
    modalSurface: "#13131A",
    modalBorder: "rgba(255,255,255,0.10)",
    modalInputBg: "#262A36",
    modalBackdrop: "rgba(0,0,0,0.62)",
    errorBgDark: "rgba(248,113,113,0.15)",
    gray500: "#6B7280",
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
