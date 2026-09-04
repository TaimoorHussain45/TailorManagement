import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const homeStyle = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      margin: 10,
    },
    container: {
      gap: 18,
    },
    customerCard: {
      flexDirection: "column",
      gap: 20,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: Metrics.fontSizeRegular,
      color: theme.colors.red,
      textTransform: "uppercase",
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },

    iconWrap: {
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },

    paragraph: {
      fontSize: 12,

      lineHeight: 17,
    },
  });
