import { AppTheme } from "@/constants/theme";
import type { MeasurementInputProps } from "@/types/types";
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
  error,
  errorMessage,
  ...rest
}: MeasurementInputProps) => {
  const theme = useTheme<AppTheme>();
  const resolvedLabelTextColor = labelTextColor ?? theme.colors.textPrimary;
  const resolvedValueColor = valueColor ?? theme.colors.measurementValue;
  const resolvedUnitColor = unitColor ?? theme.colors.mutedText;
  const resolvedDividerColor = dividerColor ?? theme.colors.inputDivider;
  const styles = measurementInputStyles(
    theme,
    borderRadius,
    error ? theme.colors.error : theme.colors.borderColor,
    resolvedValueColor,
    resolvedDividerColor,
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelChip}>
        <Typography color={resolvedLabelTextColor} style={styles.labelText}>
          {label}
        </Typography>
      </View>

      <View style={styles.card}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          style={styles.valueText}
          {...rest}
        />

        <View style={styles.divider} />

        <Typography color={resolvedUnitColor} variant="h4">
          {unit}
        </Typography>
      </View>

      {error && (
        <Typography variant="caption" color={theme.colors.error}>
          {errorMessage}
        </Typography>
      )}
    </View>
  );
};
