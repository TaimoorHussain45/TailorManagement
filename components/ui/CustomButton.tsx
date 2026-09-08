import { AppTheme } from "@/constants/theme";
import type { LucideIcon } from "lucide-react-native";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";

type CustomButtonProps = {
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
  style?: ViewStyle;
};

const CustomButton = ({
  text,
  onPress,
  backgroundColor = "transparent",
  textColor = "#FFFFFF",
  iconColor,
  icon: Icon,
  iconPosition = "left",
  iconSize = 20,
  disabled = false,
  loading = false,
  style,
}: CustomButtonProps) => {
  const theme = useTheme<AppTheme>();
  const isDisabled = disabled || loading;
  const resolvedIconColor = iconColor ?? textColor;

  const renderIcon = () => {
    if (!Icon) return null;

    return <Icon size={iconSize} color={resolvedIconColor} strokeWidth={2} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.TealGreen,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={styles.btnContent}>
          {iconPosition === "left" && renderIcon()}

          <Typography variant="h4" color={textColor}>
            {text}
          </Typography>

          {iconPosition === "right" && renderIcon()}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
