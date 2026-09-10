import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const OrdersCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      backgroundColor: theme.colors.cardBackground,
      padding: Metrics.spacingMedium,
      elevation: Metrics.spacingTiny,
      borderRadius: Metrics.radiusLarge,
    },
    setFlex: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    status: {
      backgroundColor: theme.colors.softPeach,
      width: "30%",
      height: 60,
      borderRadius: Metrics.radiusLarge,
      paddingHorizontal: Metrics.spacingTiny,
      justifyContent: "center",
      alignContent: "center",
    },
    statusTitle: {
      fontSize: Metrics.fontSizeSmall,
      fontFamily: Fonts.bold,
    },
    title: {
      paddingVertical: Metrics.spacingMedium,
    },
    dueDate: {
      flexDirection: "row",
      gap: Metrics.spacingTiny,
      justifyContent: "space-between",
    },
    progressTrack: {
      height: 6,
      backgroundColor: theme.colors.borderColor,
      borderRadius: Metrics.radiusLarge,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.colors.TealGreen,
      borderRadius: Metrics.radiusCircle,
    },
    recordButton: {
      backgroundColor: "transparent",
      fontSize: Metrics.fontSizeMedium,
      fontFamily: Fonts.semiBold,
    },
  });
export const updateMeasurementStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: 20,
    },
    navBar: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    details: {
      gap: 8,
      marginTop: 32,
    },
    measurementBtn: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      marginVertical: Metrics.spacingMedium,
    },
  });
