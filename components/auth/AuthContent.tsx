import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import type { AuthContentProps } from "@/types/types";
import { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { authContentStyle } from "./style";

const AuthContent = ({
  icon,
  eyebrow = "READY WHEN YOU ARE",
  title = "Your worktable is locked.",
  description = "Biometric unlock is ready. A small layer of privacy for the people who trust you with their fit.",
  eyebrowColor,
  titleColor,
  descriptionColor,
  borderColor,
  iconInnerColor,
  accentColor,
}: AuthContentProps) => {
  const theme = useTheme<AppTheme>();
  const styles = useMemo(
    () => authContentStyle(theme, borderColor),
    [borderColor, theme],
  );
  return (
    <View style={styles.container}>
      <View style={styles.authLogo}>{icon}</View>
      <View style={styles.content}>
        <Typography
          align="center"
          color={eyebrowColor ?? theme.colors.textPrimary}
          style={styles.semiTitle}
        >
          {eyebrow}
        </Typography>
        <Typography
          align="center"
          variant="h2"
          color={titleColor ?? theme.colors.textPrimary}
          style={styles.title}
        >
          {title}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          color={descriptionColor ?? theme.colors.textSecondary}
          style={styles.description}
        >
          {description}
        </Typography>
      </View>
    </View>
  );
};

export default AuthContent;
