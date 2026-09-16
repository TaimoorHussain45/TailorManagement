import CheckBox from "@/components/customer/checkBox";
import { measurementFormStyles } from "@/components/customer/style";
import { MeasurementInput } from "@/components/ui/MeasurementInput";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { FieldType, StyleOptionGroup } from "@/types/types";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

type MeasurementFormProps = {
  fields: FieldType[];
  styleOptions: Pick<StyleOptionGroup, "title" | "options">[];
  measurements: Record<string, string>;
  styleSelections: Record<string, string>;
  showValidationErrors?: boolean;
  onMeasurementChange: (key: string, value: string) => void;
  onStyleSelect: (category: string, option: string) => void;
};

export const MeasurementForm = ({
  fields,
  styleOptions,
  measurements,
  styleSelections,
  showValidationErrors = false,
  onMeasurementChange,
  onStyleSelect,
}: MeasurementFormProps) => {
  const theme = useTheme<AppTheme>();
  const styles = measurementFormStyles(theme);

  return (
    <View>
      <Typography variant="h4">BODY MEASUREMENTS</Typography>
      <View style={styles.inputContainer}>
        {fields.map((field) => (
          <MeasurementInput
            key={field.key}
            label={field.label}
            unit={field.unit}
            value={measurements[field.key]}
            onChangeText={(value) => onMeasurementChange(field.key, value)}
            error={showValidationErrors && !measurements[field.key]}
            errorMessage={`${field.label} is required*`}
          />
        ))}
      </View>

      <Typography variant="h4">STYLE AND OPTIONS</Typography>
      <View style={styles.optionsContainer}>
        {styleOptions.map((group) => (
          <View key={group.title}>
            <Typography
              variant="caption"
              color={theme.colors.black}
              style={styles.optionTitle}
            >
              {group.title}
            </Typography>
            <View style={styles.optionGroup}>
              {group.options.map((option) => (
                <CheckBox
                  key={option}
                  options={option}
                  selected={styleSelections[group.title] === option}
                  onPress={() => onStyleSelect(group.title, option)}
                />
              ))}
            </View>
            {showValidationErrors && !styleSelections[group.title] ? (
              <Typography variant="caption" color={theme.colors.error}>
                Select one option*
              </Typography>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
};
