import { AppTheme } from "@/types/types";
import { ShoppingBag } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { orderDetailCard } from "./styles";

interface OrderDetailCardProps {
  quantity: number;
  progress: string;
  description?: string | null;
}

const OrderDetailCard = ({
  quantity,
  progress,
  description,
}: OrderDetailCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = orderDetailCard(theme);

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeaderTight}>
        <ShoppingBag size={21} color={theme.colors.primary} />
        <Typography variant="h4">Order Details</Typography>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Typography variant="caption">QUANTITY</Typography>

          <Typography variant="h3" style={styles.statValue}>
            {quantity}
          </Typography>
        </View>

        <View style={styles.statBox}>
          <Typography variant="caption">PROGRESS</Typography>

          <Typography variant="h4" style={styles.statValue}>
            {progress}
          </Typography>
        </View>
      </View>

      <View style={styles.descriptionBlock}>
        <Typography variant="caption" style={styles.descriptionLabel}>
          DESCRIPTION
        </Typography>

        <Typography variant="body1">
          {description ?? "No description provided."}
        </Typography>
      </View>
    </View>
  );
};

export default OrderDetailCard;
