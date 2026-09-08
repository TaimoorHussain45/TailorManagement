import { Plus } from "lucide-react-native";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  size?: number;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const IconButton = ({
  size = 48,
  iconSize = 24,
  iconColor = "#fff",
  backgroundColor = "#B86449",
  icon: Icon = Plus,
  style,
  onPress,
  ...rest
}: IconButtonProps) => {
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
          backgroundColor,
        },
        style,
      ]}
      {...rest}
    >
      <Icon size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
