import { AppTheme } from "@/constants/theme";
import type { InputFieldProps } from "@/types";
import { TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";
import { inputFieldStyle } from "./style";

const InputField = ({
  label,
  error,
  containerStyle,
  inputStyle,
  style,
  ...rest
}: InputFieldProps) => {
  const theme = useTheme<AppTheme>();
  const styles = inputFieldStyle(theme);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <TextInput
        placeholderTextColor={theme.colors.textSecondary}
        style={[styles.input, error && styles.inputError, inputStyle, style]}
        {...rest}
      />
      {error && (
        <Typography variant="body2" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};
export default InputField;
