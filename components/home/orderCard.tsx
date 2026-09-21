import { AppTheme } from "@/constants/theme";
import type { OrderCardProps } from "@/types/types";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { orderCardStyles } from "./styles";
const OrderCard = ({
  icon,
  title,
  paragraph,

  onPress,
}: OrderCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = orderCardStyles(theme);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>{icon}</View>
      </View>
      <Typography variant="h2" color={theme.colors.textPrimary}>
        {title}
      </Typography>
      <Typography variant="caption" color={theme.colors.textSecondary}>
        {paragraph}
      </Typography>
    </TouchableOpacity>
  );
};

export default OrderCard;
