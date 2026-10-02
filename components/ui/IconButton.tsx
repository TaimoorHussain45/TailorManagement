import { Metrics } from "@/constants/metrics";
import type { AppTheme } from "@/constants/theme";
import type { IconButtonProps } from "@/types/types";
import { Plus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";

export const IconButton = ({
  size = 48,
  iconSize = 24,
  iconColor,
  borderColor,
  backgroundColor,
  text,
  icon: Icon = Plus,
  style,
  onPress,
  ...rest
}: IconButtonProps) => {
  const theme = useTheme<AppTheme>();
  const resolvedIconColor = iconColor ?? theme.colors.black;
  const resolvedBackgroundColor =
    backgroundColor ?? theme.colors.cardBackground;
  const borderTheme = borderColor ?? theme.colors.borderColor;

  const styles = iconButtonStyles(
    size,
    Boolean(text),
    resolvedBackgroundColor,
    borderTheme,
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, styles.size, styles.appearance, style]}
      {...rest}
    >
      {!text ? (
        <Icon size={iconSize} color={resolvedIconColor} />
      ) : (
        <Typography variant="body2" numberOfLines={1}>
          {text}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const iconButtonStyles = (
  size: number,
  hasText: boolean,
  backgroundColor: string,
  borderColor: string,
) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      shadowRadius: 4,
    },
    size: hasText
      ? { height: size, paddingHorizontal: Metrics.spacingMedium }
      : { width: size, height: size },
    appearance: {
      borderRadius: size / 2,
      backgroundColor,
      borderColor,
    },
  });
