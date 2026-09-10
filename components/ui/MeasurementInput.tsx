import { AppTheme } from "@/constants/theme";
import type { MeasurementInputProps } from "@/types";
import { TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import { measurementInputStyles } from "./style";
import Typography from "./Typography";

export const MeasurementInput = ({
  label,
  unit = "in",
  selected = true,
  labelTextColor,
  cardBackgroundColor,
  valueColor,
  unitColor,
  dividerColor,
  borderRadius = 12,
  style,
  value,
  onChangeText,
  keyboardType = "numeric",
  ...rest
}: MeasurementInputProps) => {
  const theme = useTheme<AppTheme>();
  const styles = measurementInputStyles(theme);
  const resolvedLabelTextColor = labelTextColor ?? theme.colors.textPrimary;
  const resolvedValueColor = valueColor ?? theme.colors.measurementValue;
  const resolvedUnitColor = unitColor ?? theme.colors.mutedText;
  const resolvedDividerColor = dividerColor ?? theme.colors.inputDivider;
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.labelChip]}>
        <Typography color={resolvedLabelTextColor} style={styles.labelText}>
          {label}
        </Typography>
      </View>

      <View
        style={[
          styles.card,
          {
            borderRadius,
            borderColor: theme.colors.borderColor,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={[styles.valueText, { color: resolvedValueColor }]}
          {...rest}
        />
        <View
          style={[styles.divider, { backgroundColor: resolvedDividerColor }]}
        />
        <Typography color={resolvedUnitColor} variant="h4">
          {unit}
        </Typography>
      </View>
    </View>
  );
};
