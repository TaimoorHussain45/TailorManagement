import { AppTheme } from "@/constants/theme";
import type { MeasurementCardProps } from "@/types/types";
import { ChevronRight, Ruler } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { measurementCardStyles } from "./style";

const MeasurementCard = ({ data, onPress }: MeasurementCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = measurementCardStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
      onPress={onPress}
    >
      <View style={styles.headingRow}>
        <View
          style={[styles.icon, { backgroundColor: theme.colors.SageGreen }]}
        >
          <Ruler size={18} color={theme.colors.accentGold} />
        </View>
        <View style={styles.headingContent}>
          <Typography variant="body2" color={theme.colors.textPrimary}>
            Latest fitting · {data.date}
          </Typography>
          <Typography variant="caption" color={theme.colors.textSecondary}>
            {data.description}
          </Typography>
        </View>
        <ChevronRight size={18} color={theme.colors.textSecondary} />
      </View>
      <View
        style={[styles.divider, { backgroundColor: theme.colors.divider }]}
      />
      <View style={styles.measurements}>
        {data.measurements.map((measurement) => (
          <View key={measurement.label} style={styles.measurement}>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              {measurement.label}
            </Typography>
            <View style={styles.valueRow}>
              <Typography variant="body1" color={theme.colors.textPrimary}>
                {measurement.value}
              </Typography>
              {measurement.unit && (
                <Typography variant="caption" color={theme.colors.textPrimary}>
                  {measurement.unit}
                </Typography>
              )}
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default MeasurementCard;
