import { AppTheme } from "@/types/types";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";
import { measurementRowStyles } from "./style";

export const MeasurementRow = ({
  label,
  value,
}: {
  label: string;
  value: number | null | undefined;
}) => {
  const theme = useTheme<AppTheme>();
  const style = measurementRowStyles(theme);
  return (
    <View style={style.measurementRow}>
      <Typography variant="body1">{label}</Typography>
      <View style={style.measurementValueBadge}>
        <Typography variant="body1" style={style.measurementValueText}>
          {value ?? "-"} in
        </Typography>
      </View>
    </View>
  );
};
