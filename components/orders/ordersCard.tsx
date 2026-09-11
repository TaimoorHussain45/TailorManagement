import { AppTheme } from "@/constants/theme";
import type { OrdersCardProps } from "@/types/types";
import { router } from "expo-router";
import { CalendarDays, ChevronRight } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import CustomButton from "../ui/CustomButton";
import Typography from "../ui/Typography";
import { OrdersCardStyles } from "./styles";
const OrdersCard = ({ order }: OrdersCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = OrdersCardStyles(theme);
  const openOrder = () => router.push("/customer/viewCustomer");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={openOrder}
      style={styles.container}
    >
      <View style={[styles.setFlex]}>
        <View>
          <Typography variant="h4" color={theme.colors.red}>
            {order.id}
          </Typography>
          <Typography variant="h3" color={theme.colors.black}>
            {order.customerName}
          </Typography>
        </View>
        <View style={styles.status}>
          <Typography
            align="center"
            color={theme.colors.clayRose}
            style={styles.statusTitle}
          >
            {order.status}
          </Typography>
        </View>
      </View>
      <View style={styles.title}>
        <Typography variant="body2" color={theme.colors.textSecondary}>
          {order.title}
        </Typography>
      </View>
      <View style={styles.dueDate}>
        <View style={styles.dueDate}>
          <CalendarDays size={22} color={theme.colors.textSecondary} />
          <Typography variant="body1" color={theme.colors.textSecondary}>
            {order.dueDate}
          </Typography>
        </View>
        <View>
          <Typography variant="body1" color={theme.colors.textSecondary}>
            {order.progress}% complete
          </Typography>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${order.progress}%` }]} />
      </View>
      <View style={styles.recordActions}>
        <CustomButton
          text="Open record"
          textColor={theme.colors.warmRust}
          iconSize={20}
          iconPosition="right"
          icon={ChevronRight}
          backgroundColor={theme.colors.transparent}
          style={styles.recordButton}
          onPress={openOrder}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OrdersCard;
