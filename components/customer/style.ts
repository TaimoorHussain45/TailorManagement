import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const CustomerStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
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
export const addCustomerStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      margin: 0,
      padding: 0,
      gap: 10,
      alignItems: "center",
      marginHorizontal: Metrics.spacingTiny,
    },
    InputContainer: {
      margin: Metrics.spacingMedium,
    },
    messageBox: {
      // maxHeight: 300,
      height: 80,
    },
    image: {
      width: 40,
      height: 80,
      resizeMode: "contain",
    },
    customBtn: {
      marginVertical: Metrics.spacingMedium,
    },
  });
export const upperMeasurementStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
    },
    scrollContent: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    upper: {
      width: 60,
      height: 6,
      borderRadius: Metrics.radiusMedium,
      borderWidth: 1,
      backgroundColor: "#D9D0C1",
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginVertical: Metrics.spacingTiny,
    },
    bottomStyle: {
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 10,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    btn: {
      marginVertical: Metrics.spacingSmall,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    toolContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "nowrap",
      padding: 10,
      gap: 10,
      borderRadius: Metrics.radiusLarge,
      marginVertical: Metrics.spacingSmall,
    },
    caresoul: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 5,
      position: "absolute",
      right: "30%",
      top: 40,
    },
    toolText: {
      width: "80%",
    },
    optionsContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 10,
    },
    optionTitle: {
      fontSize: Metrics.fontSizeSmall,
      fontFamily: Fonts.semiBold,
    },
    bottomGarment: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      borderRadius: Metrics.spacingSmall,
      paddingHorizontal: Metrics.spacingTiny,
      paddingVertical: Metrics.spacingSmall,
      elevation: Metrics.spacingTiny,
      marginVertical: Metrics.spacingSmall,
    },
    backButton: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      borderWidth: 2,
    },
  });
export const checkBoxStyles = (theme: AppTheme) =>
  StyleSheet.create({
    optionsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 8,
    },

    optionRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 8,
    },
    radioOuter: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 1.5,
      borderColor: "#B7AF9B",
      alignItems: "center",
      justifyContent: "center",
    },
    radioOuterSelected: {
      backgroundColor: "#1F4B43",
      borderColor: "#1F4B43",
    },
    optionText: {
      fontSize: 13,
    },
    footer: {
      flexDirection: "row",
      gap: 12,
      marginTop: Metrics.spacingLarge,
      marginBottom: Metrics.spacingLarge,
    },
  });
