import type { AppTheme } from "@/constants/theme";
import { Fonts } from "@/constants/theme";
import type { TypographyProps } from "@/types";
import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  children,
  color,
  align = "left",
  style,
  padding,
  paddingHorizontal,
  paddingVertical,
  onPress,
  ...props
}) => {
  const theme = useTheme<AppTheme>();
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "h1":
        return styles.h1;
      case "h2":
        return styles.h2;
      case "h3":
        return styles.h3;
      case "h4":
        return styles.h4;
      case "body1":
        return styles.body1;
      case "body2":
        return styles.body2;
      case "caption":
        return styles.caption;
      case "button":
        return styles.button;
      case "iconText":
        return styles.iconText;
      default:
        return styles.body1;
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        {
          color: color ?? theme.colors.textPrimary,
          textAlign: align,
          padding: padding,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
        },
        style,
      ]}
      {...props}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: Fonts.extraBold,
  },
  h2: {
    fontSize: 28,
    fontFamily: Fonts.bold,
  },
  h3: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
  },
  h4: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  body1: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  body2: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  caption: {
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  button: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  iconText: {
    fontSize: 8,
    fontFamily: Fonts.regular,
  },
});

export default Typography;
