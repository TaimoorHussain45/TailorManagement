import { AppTheme } from "@/constants/theme";
import type { CustomerCardProps } from "@/types/types";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";
import { customerCardStyles } from "./style";

const CustomerCard = ({
  name,
  text,
  phone,
  leftIcon,
  icon,
  onPress,
}: CustomerCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = customerCardStyles(theme);
  const firstLetter = name?.trim().charAt(0).toUpperCase();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.customerLogo}>
        <Typography style={styles.logoText}>{firstLetter}</Typography>
      </View>
      <View style={styles.details}>
        <View style={styles.content}>
          <Typography color={theme.colors.black}>{name}</Typography>
          <Typography color={theme.colors.textPrimary} variant="caption">
            Last Fitted 8 oct
          </Typography>
        </View>
        {leftIcon && (
          <View style={styles.phoneRow}>
            <View>{leftIcon}</View>
            <Typography>{phone}</Typography>
          </View>
        )}
      </View>
      <View>{icon}</View>
    </TouchableOpacity>
  );
};

export default CustomerCard;
