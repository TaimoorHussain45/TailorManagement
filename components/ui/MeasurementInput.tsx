import { AppTheme } from "@/constants/theme";
import type { MeasurementInputProps } from "@/types";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import { measurementInputStyles } from "./style";
import Typography from "./Typography";

export const MeasurementInput = ({
  label,
  unit = "in",
  selected = true,
  labelTextColor = "#2B2B2B",
  cardBackgroundColor,
  valueColor = "#1F4E8C",
  unitColor = "#8A8A8A",
  dividerColor = "#D9D3C7",
  borderRadius = 12,
  style,
  value,
  onChangeText,
  keyboardType = "numeric",
  ...rest
}: MeasurementInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme<AppTheme>();
  const styles = measurementInputStyles(theme);
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.labelChip]}>
        <Typography style={styles.labelText}>{label}</Typography>
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          style={[styles.valueText]}
          {...rest}
        />
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        <Typography color={theme.colors.textSecondary} variant="h4">
          {unit}
        </Typography>
      </View>
    </View>
  );
};
