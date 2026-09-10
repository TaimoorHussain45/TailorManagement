import type { LucideIcon } from "lucide-react-native";
import type { ComponentType, ReactNode } from "react";
import type {
    StyleProp,
    TextInputProps,
    TextStyle,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";
import type { MD3Theme, TextProps as PaperTextProps } from "react-native-paper";
import { MD3Colors } from "react-native-paper";

export type FieldType = {
  key: string;
  label: string;
  unit: string;
};

export type RadioGroupType = {
  key: string;
  title: string;
  options: string[];
};

export type StyleOptionType = "radio" | "dropdown" | "checkbox";

export type StyleOptionGroup = {
  title: string;
  type: StyleOptionType;
  options: string[];
};

export type OrderStatus = "In Progress" | "Pending" | "Completed" | "Delayed";

export interface OrderCardData {
  id: string;
  customerName: string;
  status: OrderStatus;
  title: string;
  dueDate: string;
  progress: number;
}

export interface OrdersCardProps {
  order: OrderCardData;
}

export type MeasurementValue = {
  label: string;
  value: string;
  unit?: string;
};

export type MeasurementData = {
  date: string;
  description: string;
  measurements: MeasurementValue[];
};

export type MeasurementCardProps = {
  data: MeasurementData;
  onPress?: () => void;
};

export type AuthCardProps = {
  icon: ReactNode;
  title: string;
  paragraph: string;
};

export type AuthContentProps = {
  icon?: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  eyebrowColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  iconInnerColor?: string;
  accentColor?: string;
};

export type CheckBoxProps = {
  options: string;
  selected?: boolean;
  onPress?: () => void;
};

export type OrderCardProps = {
  icon: ReactNode;
  title: string;
  paragraph: string;
  rightTitle: string;
};

export type CustomButtonProps = {
  text: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderStyle?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconSize?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type CustomerCardProps = {
  customerName: string;
  title: string;
  text: string;
  phoneNumber?: string;
  leftIcon?: ReactNode;
  icon?: ReactNode;
  onPress: () => void;
};

export type HeadingProps = {
  eyebrow: string;
  title: string;
  eyebrowColor?: string;
  titleColor?: string;
  titleStyle?: StyleProp<TextStyle>;
};

export interface IconButtonProps extends TouchableOpacityProps {
  size?: number;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  icon?: ComponentType<{ size?: number; color?: string }>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export interface InputFieldProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
}

export interface MeasurementInputProps extends Omit<TextInputProps, "style"> {
  label: string;
  unit?: string;
  selected?: boolean;
  labelBackgroundColor?: string;
  labelBorderColor?: string;
  labelTextColor?: string;
  cardBackgroundColor?: string;
  valueColor?: string;
  unitColor?: string;
  dividerColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export interface SearchBarProps extends TextInputProps {
  iconSize?: number;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "iconText";

export interface TypographyProps extends Omit<
  PaperTextProps<never>,
  "variant"
> {
  variant?: TypographyVariant;
  children: ReactNode;
  color?: string;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  align?: "auto" | "left" | "right" | "center" | "justify";
  onPress?: () => void;
}

export type AuthContentStyles = {
  container: ViewStyle;
  authLogo: ViewStyle;
  content: ViewStyle;
  semiTitle: TextStyle;
  title: TextStyle;
  description: TextStyle;
};

export type ThemeColors = typeof MD3Colors &
  Record<string, string | [string, string]> & {
    white: string;
    black: string;
    charcoal: string;
    slate: string;
    gunmetal: string;
    offWhite: string;
    background: string;
    authLogo: string;
    textPrimary: string;
    textSecondary: string;
    divider: string;
    tabBarBackground: string;
    progressFillStart: string;
    progressBar: string;
    progressFillEnd: string;
    taskFilterActiveBg: string;
    containerInvite: string;
    green: string;
    cardBackground: string;
    borderColor: string;
    clayRose: string;
    TealGreen: string;
    red: string;
    accentGold: string;
    SageGreen: string;
    onColor: string;
    warmRust: string;
    softPeach: string;
  };

export type AppTheme = MD3Theme & {
  colors: ThemeColors;
};

export type AppColors = {
  light: ThemeColors;
  dark: ThemeColors;
};

export type FontKey = string;
