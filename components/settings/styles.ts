import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/types";
import { StyleSheet } from "react-native";

export const settingStyle = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: Metrics.spacingMedium,
    },
    content: {
      gap: 12,
      padding: 20,
      paddingBottom: 32,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 8,
    },
    card: {
      borderRadius: 18,
      borderWidth: 1,
      gap: 10,
      padding: 12,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
    },
    themeRow: {
      borderRadius: 14,
      borderWidth: 1,
      paddingHorizontal: 14,
      borderColor: theme.colors.borderColor,
      backgroundColor: theme.colors.cardBackground,
    },
  });
