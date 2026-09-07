import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";

import { StyleSheet } from "react-native";

export const homeStyle = (theme: AppTheme) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    container: {},
    customerCard: {
      flexDirection: "column",
      gap: Metrics.spacingTiny,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: Metrics.fontSizeRegular,
      color: theme.colors.red,
      textTransform: "uppercase",
    },
    gretting: {
      fontStyle: "italic",
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    customerButton: {
      minHeight: 10,
      paddingHorizontal: 4,
      backgroundColor: "transparent",
    },
    customerButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

export const orderCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: "47%",
      height: 150,
      padding: 10,
      borderRadius: 16,
      backgroundColor: theme.colors.cardBackground,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 8,
      marginVertical: 10,
      elevation: 4,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
    iconWrap: {
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
    title: {},
    paragraph: {
      fontSize: 12,

      lineHeight: 17,
    },
  });

export const WelcomeCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 190,
      padding: 14,
      borderRadius: 16,
      backgroundColor: theme.colors.TealGreen,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 6,
      marginVertical: 10,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    weekLabel: {
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1.2,
      color: theme.colors.textSecondary,
    },
    headline: {
      fontStyle: "italic",
      color: theme.colors.white,
      padding: Metrics.spacingMedium,
    },
    countBlock: {
      alignItems: "flex-start",
    },
    subLabel: {},
    progressWrapper: {
      marginTop: "auto",
      gap: 4,
    },
    progressRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20,
    },
    progressLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    progressValue: {
      fontSize: Metrics.fontSizeMedium,
      fontFamily: Fonts.medium,
      color: theme.colors.white,
    },
    progressTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: "rgba(255,255,255,0.25)",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 3,
      backgroundColor: "red",
    },
    footerConatiner: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
