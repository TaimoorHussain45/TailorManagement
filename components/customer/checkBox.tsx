import { AppTheme } from "@/constants/theme";
import type { CheckBoxProps } from "@/types/types";
import { Check } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { checkBoxStyles } from "./style";

const CheckBox = ({ options, selected = false, onPress }: CheckBoxProps) => {
  const theme = useTheme<AppTheme>();
  const styles = checkBoxStyles(theme);

  const handlePress = () => {
    onPress?.();
  };

  return (
    <View>
      <TouchableOpacity style={styles.optionRow} onPress={handlePress}>
        <View
          style={[styles.radioOuter, selected && styles.radioOuterSelected]}
        >
          <Check size={10} color={theme.colors.white} />
        </View>
        <Typography
          style={styles.optionText}
          color={theme.colors.black}
          variant="body1"
        >
          {options}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;
