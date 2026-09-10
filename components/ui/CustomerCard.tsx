import { AppTheme } from "@/constants/theme";
import type { CustomerCardProps } from "@/types";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";
import { customerCardStyles } from "./style";

const CustomerCard = ({
  customerName,
  title,
  text,
  phoneNumber,
  leftIcon,
  icon,
  onPress,
}: CustomerCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = customerCardStyles(theme);
  const firstLetter = customerName?.trim().charAt(0).toUpperCase();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.customerLogo}>
        <Typography style={styles.logoText}>{firstLetter}</Typography>
      </View>
      <View style={styles.details}>
        <View style={styles.content}>
          <Typography color={theme.colors.black}>{title}</Typography>
          <Typography color={theme.colors.textPrimary} variant="caption">
            {text}
          </Typography>
        </View>
        {leftIcon && (
          <View style={styles.phoneRow}>
            <View>{leftIcon}</View>
            <Typography>{phoneNumber}</Typography>
          </View>
        )}
      </View>
      <View>{icon}</View>
    </TouchableOpacity>
  );
};

export default CustomerCard;
