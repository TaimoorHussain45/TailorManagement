// components/AddButton.tsx

import { AppTheme } from "@/constants/theme";
import { Plus } from "lucide-react-native";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface AddButtonProps extends PressableProps {
  size?: number;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
}

export const AddButton = ({
  size = 48,
  iconSize = 24,
  iconColor,
  backgroundColor,
  style,
  ...rest
}: AddButtonProps) => {
  const theme = useTheme<AppTheme>();
  const styles = addButtonStyle(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor ?? "#B86449",
          opacity: pressed ? 0.8 : 1,
        },
        typeof style === "function" ? undefined : style,
      ]}
      {...rest}
    >
      <Plus size={iconSize} color={iconColor ?? theme.colors.white} />
    </Pressable>
  );
};

const addButtonStyle = (theme: AppTheme) =>
  StyleSheet.create({
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
