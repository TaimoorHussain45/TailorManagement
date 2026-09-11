import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import type { AuthContentStyles } from "@/types/types";
import { StyleSheet } from "react-native";

export const fingerPrintLogostyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.charcoal,
      borderRadius: 100,
      width: 200,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.colors.borderColor,
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
      borderColor: theme.colors.clayRose,
    },
    fingerPrintContainer: {
      backgroundColor: theme.colors.TealGreen,
      elevation: 7,
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
      backgroundColor: theme.colors.background,
      borderWidth: 0.5,
      borderColor: theme.colors.borderColor,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 8,
      margin: 10,
      elevation: 4,
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
export const authContentStyle = (theme: AppTheme, borderColor?: string) =>
  StyleSheet.create<AuthContentStyles>({
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 20,
    },
    authLogo: {
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      width: 200,
      height: 200,
      alignSelf: "center",
      borderRadius: 100,
      borderColor: borderColor ?? theme.colors.borderColor,
      backgroundColor: theme.colors.authLogo,
    },
    content: {
      padding: Metrics.spacingMedium,
    },
    semiTitle: {
      fontFamily: Fonts.semiBold,
      fontSize: Metrics.fontSizeMedium,
      paddingVertical: Metrics.spacingRegular,
    },
    title: {
      fontFamily: Fonts.bold,
      lineHeight: 30,
      maxWidth: 260,
      alignSelf: "center",
      paddingVertical: Metrics.spacingSmall,
    },
    description: {
      paddingVertical: Metrics.spacingMedium,
    },
  });
export const navLogoStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    image: {
      width: 40,
      height: 80,
      resizeMode: "center",
    },
    textWrap: {
      flexDirection: "column",
      justifyContent: "center",
      marginTop: 0,
      paddingTop: 0,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: Metrics.fontSizeMedium,
      lineHeight: 20,
      marginBottom: 0,
      paddingBottom: 0,
    },
    subtitle: {
      fontFamily: Fonts.regular,
      fontSize: Metrics.fontSizeRegular,
      lineHeight: 16,
      marginTop: 0,
      paddingTop: 0,
    },
  });
export const registerStyle = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
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
      backgroundColor: theme.colors.transparent,
    },
  });
