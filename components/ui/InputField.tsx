import { AppTheme } from "@/constants/theme";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";
import { inputFieldStyle } from "./style";

interface InputFieldProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
}

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
