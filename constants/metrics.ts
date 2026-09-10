// src/constants/metrics.ts
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const Metrics = {
  // Screen
  screenWidth: width,
  screenHeight: height,

  // Spacing
  spacingTiny: 4,
  spacingSmall: 8,
  spacingRegular: 10,
  spacingMedium: 16,
  spacingLarge: 24,
  spacingXLarge: 32,

  // Border radius
  radiusSmall: 6,
  radiusMedium: 12,
  radiusLarge: 20,
  radiusCircle: 50,

  // Opacity
  activeOpacity: 0.7,
  disabledOpacity: 0.5,

  // Component sizes
  buttonHeight: 48,
  inputHeight: 50,

  // iconSizes
  iconSmall: 16,
  iconMedium: 22,
  iconLarge: 32,

  fontSizeSmall: 12,
  fontSizeRegular: 14,
  fontSizeMedium: 16,
  fontSizeLarge: 18,
  fontSizeXLarge: 20,
  fontSizeXXLarge: 36,
};

export const isIOS = () => {
  return Platform.OS === "ios";
};
