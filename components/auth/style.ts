import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const finerPrintLogostyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.charcoal,
      borderRadius: 100,
      width: 200,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#E3D9C9",
      borderWidth: 2,
    },
    subContainer: {
      width: 120,
      height: 120,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderRadius: 60,
      borderStyle: "dashed",
      borderColor: "red",
    },
    fingerPrintContainer: {
      backgroundColor: "#1F5D58",
      borderRadius: 30,
      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
    },
  });
export const authCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: "45%",
      height: 150,
      padding: 8,
      borderRadius: 16,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#E3D9C9",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 8,
      margin: 10,

      // shadow (Android)
      elevation: 4,
    },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: "#F5EFE3",
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
