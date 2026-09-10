import { AppTheme } from "@/constants/theme";
import type { CheckBoxProps } from "@/types";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { checkBoxStyles } from "./style";

const CheckBox = ({ options, selected = false, onPress }: CheckBoxProps) => {
  const [isSelected, setIsSelected] = useState(selected);
  const theme = useTheme<AppTheme>();
  const styles = checkBoxStyles(theme);

  const handlePress = () => {
    setIsSelected((previous) => !previous);
    onPress?.();
  };

  return (
    <View>
      <TouchableOpacity style={styles.optionRow} onPress={handlePress}>
        <View
          style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
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
