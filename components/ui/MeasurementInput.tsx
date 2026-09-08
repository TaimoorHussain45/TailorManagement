import { Metrics } from "@/constants/metrics";
import { AppTheme, Fonts } from "@/constants/theme";
import { useState } from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";

interface MeasurementInputProps extends Omit<TextInputProps, "style"> {
  label: string;
  unit?: string;
  selected?: boolean;
  labelBackgroundColor?: string;
  labelBorderColor?: string;
  labelTextColor?: string;
  cardBackgroundColor?: string;
  valueColor?: string;
  unitColor?: string;
  dividerColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const MeasurementInput = ({
  label,
  unit = "in",
  selected = true,
  labelTextColor = "#2B2B2B",
  cardBackgroundColor = "#FBF8F3",
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
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.labelChip]}>
        <Text style={[styles.labelText, { color: labelTextColor }]}>
          {label}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBackgroundColor,
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
          style={[styles.valueText, { color: valueColor }]}
          {...rest}
        />
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
        <Text style={[styles.unitText, { color: unitColor }]}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 3,
    width: "48%",
    marginVertical: Metrics.spacingSmall,
  },
  labelChip: {
    alignSelf: "flex-start",
  },
  labelText: {
    fontSize: Metrics.fontSizeSmall,
    fontFamily: Fonts.semiBold,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  valueText: {
    flex: 1,
    fontSize: Metrics.fontSizeXLarge,
    fontFamily: Fonts.bold,
    padding: 0,
  },
  divider: {
    width: 1,
    height: 20,
    marginHorizontal: 12,
  },
  unitText: {
    fontSize: 14,
  },
});
