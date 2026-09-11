import type { AppTheme } from "@/constants/theme";
import type { IconButtonProps } from "@/types";
import { Plus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

export const IconButton = ({
  size = 48,
  iconSize = 24,
  iconColor,
  borderColor,
  backgroundColor,
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

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: resolvedBackgroundColor,
          borderColor: borderTheme,
        },
        style,
      ]}
      {...rest}
    >
      <Icon size={iconSize} color={resolvedIconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    shadowRadius: 4,
  },
});
