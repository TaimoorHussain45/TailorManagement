import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/constants/theme";
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
      marginVertical: Metrics.spacingSmall,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    btn: {
      marginVertical: Metrics.spacingSmall,
    },
    toolContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "nowrap",
      padding: 10,
      gap: 10,
      borderRadius: Metrics.radiusLarge,
    },
    caresoul: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 5,
      // alignItems: "",
    },
  });
