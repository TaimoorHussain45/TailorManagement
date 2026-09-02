import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const registerStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    logo: {
      justifyContent: "center",
      alignItems: "center",
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
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
      flex: 1,
      padding: 20,
      margin: 20,
    },
    logo: {
      justifyContent: "center",
      alignItems: "center",
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
    },
    title: {
      fontSize: Metrics.fontSizeXXLarge,
      fontFamily: Fonts.semiBold,
    },
    semiTitle: {
      fontSize: Metrics.fontSizeSmall,
      fontFamily: Fonts.bold,
    },
    authButton: {
      position: "absolute",
      right: 20,
      bottom: 80,
      width: "100%",
    },
    content: {
      paddingVertical: 20,
    },
  });
