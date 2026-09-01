import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Typography from "./Typography";

type AppButtonProps = {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  iconColor: string;
  iconSize?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const CustomButton = ({
  text,
  onPress,
  backgroundColor = "#1F5D58",
  textColor = "#FFFFFF",
  icon: Icon,
  iconPosition = "left",
  iconColor,
  iconSize = 20,
  disabled = false,
  loading = false,
  style,
}: AppButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {iconPosition === "left" && Icon && (
            <Icon
              size={iconSize}
              color={iconColor ?? textColor}
              strokeWidth={2}
            />
          )}

          <Typography variant="body2" color="#ffffff">
            {text}
          </Typography>

          {iconPosition === "right" && Icon && (
            <Icon
              size={iconSize}
              color={iconColor ?? textColor}
              strokeWidth={2}
            />
          )}
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

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
