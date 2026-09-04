import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const registerStyle = (theme: AppTheme) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      marginHorizontal: Metrics.spacingMedium,
      paddingBottom: Metrics.spacingMedium,
    },
    logo: {},
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    authButton: {
      marginVertical: 20,
    },
    content: {
      paddingVertical: 20,
    },
  });
export const loginStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 20,
      marginHorizontal: Metrics.spacingMedium,
    },
    logo: {},
    authLogo: {
      justifyContent: "center",
      alignItems: "center",
    },

    authButton: {},
    signInRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      lineHeight: 32,
      padding: 0,
      margin: 0,
      bottom: 15,
    },
    signInButton: {
      minHeight: 10,
      paddingHorizontal: 4,
      backgroundColor: "transparent",
    },
  });
