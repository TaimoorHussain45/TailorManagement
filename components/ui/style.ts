import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const customerCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      backgroundColor: theme.colors.cardBackground,
      elevation: 5,
      borderRadius: 20,
      marginVertical: Metrics.spacingRegular,
    },
    content: {
      flexDirection: "column",
      justifyContent: "center",
    },
    customerLogo: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#E8DED1",
      justifyContent: "center",
      alignItems: "center",
    },
    logoText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#B5651D",
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
    unitText: {
      fontSize: 14,
    },
  });
