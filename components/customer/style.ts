import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const CustomerStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#F6F1E8",
    },
    container: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      marginVertical: Metrics.spacingMedium,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Metrics.spacingTiny,
      alignItems: "center",
      alignContent: "center",
    },
    title: {
      fontWeight: "700",
      marginBottom: 16,
    },
    usersCards: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
    userButton: {
      backgroundColor: "transparent",
      borderStyle: "dashed",
      borderColor: theme.colors.borderColor,
      borderWidth: 4,
      height: 40,
    },
    addButton: {
      marginVertical: Metrics.spacingMedium,
    },
  });
