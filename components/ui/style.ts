import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const customerCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      backgroundColor: theme.colors.cardBackgroud,
      elevation: 5,
      borderRadius: 20,
      marginVertical: 10,
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
