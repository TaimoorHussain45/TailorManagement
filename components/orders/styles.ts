import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";
export const OrdersCardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      backgroundColor: theme.colors.cardBackground,
      padding: Metrics.spacingMedium,
      elevation: Metrics.spacingTiny,
      borderRadius: Metrics.radiusLarge,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    setFlex: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    status: {
      backgroundColor: theme.colors.softPeach,
      width: "30%",
      height: 60,
      borderRadius: Metrics.radiusLarge,
      paddingHorizontal: Metrics.spacingTiny,
      justifyContent: "center",
      alignContent: "center",
    },
    statusTitle: {
      fontSize: Metrics.fontSizeSmall,
      fontFamily: Fonts.bold,
    },
    title: {
      paddingVertical: Metrics.spacingMedium,
    },
    dueDate: {
      flexDirection: "row",
      gap: Metrics.spacingTiny,
      justifyContent: "space-between",
    },
    progressTrack: {
      height: 6,
      backgroundColor: theme.colors.borderColor,
      borderRadius: Metrics.radiusLarge,
      overflow: "hidden",
      marginVertical: Metrics.spacingTiny,
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.colors.TealGreen,
      borderRadius: Metrics.radiusCircle,
    },
    recordButton: {},
    recordActions: {
      marginVertical: 10,
    },
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerTitleWrap: {
      marginLeft: 8,
    },
    orderIdLabel: {
      letterSpacing: 1,
      fontWeight: "600",
    },
    orderTitle: {
      marginTop: 2,
      maxWidth: 180,
    },
    headerActions: {
      flexDirection: "row",
      gap: 4,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      elevation: 2,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
    },
    cardNoMargin: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 18,
      elevation: 2,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statusLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    statusValue: {
      textTransform: "capitalize",
    },
    statusBadge: {
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    statusBadgeText: {
      color: theme.colors.onPrimaryContainer,
      fontWeight: "700",
    },
    progressBarTrack: {
      height: 8,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 10,
      marginTop: 18,
      overflow: "hidden",
    },
    progressBarFill: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 10,
    },
    sectionHeaderTight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 18,
    },
    avatarBadge: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.secondaryContainer,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 12,
    },
    infoRowLast: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    measurementList: {
      gap: 12,
    },
  });
export const updateMeasurementStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      padding: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: Metrics.spacingMedium,
      gap: Metrics.spacingSmall,
    },
    navBar: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    details: {
      gap: 8,
      marginTop: 32,
    },
    measurementBtn: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      marginVertical: Metrics.spacingMedium,
    },
  });

export const ordersScreenStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: { flex: 1, padding: Metrics.spacingMedium },
    header: { flexDirection: "row", justifyContent: "space-between" },
    listContainer: { flex: 1 },
    listContent: {
      gap: Metrics.spacingXLarge,
      paddingBottom: Metrics.spacingXLarge,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export const addOrderStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: Metrics.spacingMedium,
      paddingBottom: Metrics.spacingXLarge,
      gap: Metrics.spacingMedium,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: Metrics.spacingSmall,
    },
    backButton: {
      width: 48,
      paddingHorizontal: 0,
      backgroundColor: theme.colors.white,
    },
    form: {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      borderRadius: Metrics.radiusMedium,
      padding: Metrics.spacingMedium,
    },
    descriptionInput: {
      height: 100,
      paddingTop: Metrics.spacingSmall,
      textAlignVertical: "top",
    },
    row: {
      flexDirection: "row",
      gap: Metrics.spacingSmall,
    },
    halfField: {
      flex: 1,
      marginTop: Metrics.spacingTiny,
    },
    dateContainer: {
      width: "60%",
    },
    dateFieldLabel: {
      marginBottom: Metrics.spacingSmall,
    },
    dateField: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      borderRadius: Metrics.radiusMedium,
      paddingHorizontal: Metrics.spacingSmall,
      paddingVertical: Metrics.spacingSmall,

      height: 50,
    },
    dateLabel: {
      marginBottom: Metrics.spacingSmall,
    },
    statusSection: {
      gap: Metrics.spacingSmall,
    },
    buttons: {
      flexDirection: "row",
      gap: Metrics.spacingSmall,
      flexWrap: "wrap",
    },
    statusButton: {
      width: "48%",
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      paddingHorizontal: Metrics.spacingSmall,
    },
    statusButtonSelected: {
      borderColor: theme.colors.TealGreen,
    },
    saveButton: {
      marginTop: Metrics.spacingSmall,
    },
  });

export const orderDetailCard = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      elevation: 2,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 10,
    },
    statsRow: {
      flexDirection: "row",
      gap: 12,
    },
    statBox: {
      flex: 1,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 14,
      padding: 14,
    },
    statValue: {
      marginTop: 4,
    },
    descriptionBlock: {
      marginTop: 18,
    },
    descriptionLabel: {
      marginBottom: 6,
    },

    sectionHeaderTight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 18,
    },
  });
