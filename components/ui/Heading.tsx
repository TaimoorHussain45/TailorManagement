import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import type { HeadingProps } from "@/types";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const Heading = ({
  eyebrow,
  title,
  eyebrowColor,
  titleColor,
  titleStyle,
}: HeadingProps) => {
  const theme = useTheme<AppTheme>();

  return (
    <View style={styles.container}>
      <Typography variant="h4" color={eyebrowColor ?? theme.colors.red}>
        {eyebrow}
      </Typography>
      <Typography
        variant="h3"
        color={titleColor ?? theme.colors.textPrimary}
        style={titleStyle}
      >
        {title}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
});

export default Heading;
