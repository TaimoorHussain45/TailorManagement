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
      backgroundColor: theme.colors.measurementTrack,
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
    toolContainerUpper: { backgroundColor: theme.colors.SageGreen },
    toolContainerLower: { backgroundColor: theme.colors.borderColor },
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
    continueButtonUpper: { width: "70%" },
    continueButtonLower: { width: "100%" },
    upperActive: { backgroundColor: theme.colors.TealGreen },
    upperInactive: { backgroundColor: theme.colors.transparent },
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
      borderColor: theme.colors.checkboxBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    radioOuterSelected: {
      backgroundColor: theme.colors.checkboxSelected,
      borderColor: theme.colors.checkboxSelected,
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

export const updateRecordStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.background },
    content: { gap: 12, padding: 20, paddingBottom: 32 },
    header: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    recordCard: {
      alignItems: "center",
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      borderRadius: 20,
      borderWidth: 1,
      flexDirection: "row",
      gap: 12,
      padding: 16,
    },
    recordIcon: {
      alignItems: "center",
      backgroundColor: theme.colors.SageGreen,
      borderRadius: 18,
      height: 38,
      justifyContent: "center",
      width: 38,
    },
    recordInfo: { flex: 1, gap: 2 },
    status: {
      backgroundColor: theme.colors.SageGreen,
      borderColor: theme.colors.accentGold,
      borderRadius: 16,
      borderWidth: 1,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    notes: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      borderRadius: 14,
      borderWidth: 1,
      color: theme.colors.textPrimary,
      minHeight: 100,
      padding: 14,
      textAlignVertical: "top",
    },
    feelings: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Metrics.spacingTiny,
    },
    feelingButton: {
      flex: 1,
      minHeight: 44,
      borderRadius: 22,
      paddingHorizontal: 4,
    },
    feelingButtonSelected: {
      backgroundColor: theme.colors.SageGreen,
      borderColor: theme.colors.accentGold,
    },
    feelingButtonUnselected: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.borderColor,
    },
    history: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 18,
      gap: 12,
      marginTop: 12,
      padding: 16,
    },
    historyRow: { flexDirection: "row", justifyContent: "space-between" },
    saveButton: { marginTop: 16, borderRadius: 26 },
    laterButton: {
      backgroundColor: theme.colors.transparent,
      justifyContent: "center",
      alignItems: "center",
      bottom: Metrics.spacingMedium,
    },
  });
export const measurementCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      borderColor: theme.colors.borderColor,
      borderRadius: 18,
      borderWidth: 1,
      padding: 14,
    },
    headingRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: 10,
    },
    icon: {
      alignItems: "center",
      borderRadius: 16,
      height: 34,
      justifyContent: "center",
      width: 34,
    },
    headingContent: {
      flex: 1,
      gap: 2,
    },
    divider: {
      height: 1,
      marginVertical: 12,
    },
    measurements: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    measurement: {
      gap: 2,
      minWidth: 58,
    },
    valueRow: {
      alignItems: "baseline",
      flexDirection: "row",
      gap: 3,
    },
  });
