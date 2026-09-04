import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const orderCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: "40%",
      height: 150,
      padding: 10,
      borderRadius: 16,
      backgroundColor: theme.colors.cardBackgroud,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 8,
      margin: 10,
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
