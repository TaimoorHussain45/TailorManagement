import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/constants/theme";
import type { SearchBarProps } from "@/types/types";
import { Search } from "lucide-react-native";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";

const SearchBar = ({
  placeholder = "Search",
  iconSize = 20,
  iconColor,
  containerStyle,
  style,
  ...rest
}: SearchBarProps) => {
  const theme = useTheme<AppTheme>();
  const styles = searchBarStyle(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      <Search
        size={iconSize}
        color={iconColor ?? String(theme.colors.textSecondary)}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={String(theme.colors.textSecondary)}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
};
export default SearchBar;
const searchBarStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      height: 60,
      borderRadius: Metrics.radiusMedium,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
    },
    input: {
      flex: 1,
      fontSize: Metrics.fontSizeMedium,
      color: theme.colors.textPrimary,
    },
  });
