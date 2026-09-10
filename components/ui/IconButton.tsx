import type { AppTheme } from "@/constants/theme";
import type { IconButtonProps } from "@/types";
import { Plus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

export const IconButton = ({
  size = 48,
  iconSize = 24,
  iconColor,
  backgroundColor,
  icon: Icon = Plus,
  style,
  onPress,
  ...rest
}: IconButtonProps) => {
  const theme = useTheme<AppTheme>();
  const resolvedIconColor = iconColor ?? theme.colors.white;
  const resolvedBackgroundColor = backgroundColor ?? theme.colors.red;

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
          shadowColor: theme.colors.shadow,
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
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
