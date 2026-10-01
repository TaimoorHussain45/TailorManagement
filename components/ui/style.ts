import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const customerCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: Metrics.spacingMedium,
      padding: Metrics.spacingSmall,
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      elevation: 1,
      borderRadius: Metrics.radiusLarge,
    },
    content: {
      flexDirection: "column",
      justifyContent: "center",
      gap: Metrics.spacingTiny,
    },
    customerLogo: {
      width: 48,
      height: 48,
      borderRadius: Metrics.radiusMedium,
      backgroundColor: theme.colors.customerLogoBackground,
      justifyContent: "center",
      alignItems: "center",
    },
    logoText: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.customerLogoText,
    },
    details: {
      flex: 1,
      gap: 2,
    },
    phoneRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
  });
export const inputFieldStyle = (theme: AppTheme) =>
  StyleSheet.create({
    wrapper: {
      gap: 6,
      marginVertical: Metrics.spacingSmall,
    },
    label: {
      color: theme.colors.textPrimary,
      margin: 0,
      padding: 0,
    },
    input: {
      height: 50,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      paddingHorizontal: 12,
      fontSize: Metrics.spacingMedium,
      color: theme.colors.textPrimary,
      backgroundColor: theme.colors.cardBackground,
      margin: 0,
      padding: 0,
    },
    inputError: {
      borderColor: theme.colors.red,
    },
    errorText: {
      color: theme.colors.red,
    },
  });
export const measurementInputStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: 3,
      width: "48%",
      marginVertical: Metrics.spacingSmall,
    },
    labelChip: {
      alignSelf: "flex-start",
    },
    labelText: {
      fontSize: Metrics.fontSizeSmall,
      fontFamily: Fonts.semiBold,
      color: theme.colors.textPrimary,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.5,
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: theme.colors.cardBackground,
    },
    valueText: {
      flex: 1,
      fontSize: Metrics.fontSizeXLarge,
      fontFamily: Fonts.bold,
      padding: 0,
      color: theme.colors.textPrimary,
    },
    divider: {
      width: 1,
      height: 20,
      marginHorizontal: 12,
    },
    errorText: {},
    unitText: {
      fontSize: 14,
    },
  });
export const measurementRowStyles = (theme: AppTheme) =>
  StyleSheet.create({
    measurementRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 4,
    },
    measurementValueBadge: {
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
    },
    measurementValueText: {
      fontWeight: "600",
    },
  });
