import { AppTheme } from "@/types/types";
import { getFormattedDate } from "@/utils/formattedDate";
import { CalendarDays, Phone, User } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { userCardStyles } from "./style";

interface UserCardProps {
  customerName: string;
  phoneNumber: string;
  dueDate?: string | null;
  createdAt?: string;
}

const UserCard = ({
  customerName,
  phoneNumber,
  dueDate,
  createdAt,
}: UserCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = userCardStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <View style={styles.avatarBadge}>
          <User size={21} color={theme.colors.onSecondaryContainer} />
        </View>

        <View>
          <Typography variant="caption">CUSTOMER</Typography>
          <Typography variant="h4">{customerName}</Typography>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Phone size={18} color={theme.colors.onSurfaceVariant} />
        <Typography variant="body1">{phoneNumber}</Typography>
      </View>

      <View style={styles.infoRowLast}>
        <CalendarDays size={18} color={theme.colors.onSurfaceVariant} />
        {dueDate && (
          <Typography variant="body1">
            Delivery Date: {dueDate ?? "No due date"}
          </Typography>
        )}
        {createdAt && (
          <Typography variant="body1">
            Customer Since {getFormattedDate(new Date(createdAt))}
          </Typography>
        )}
      </View>
    </View>
  );
};

export default UserCard;
