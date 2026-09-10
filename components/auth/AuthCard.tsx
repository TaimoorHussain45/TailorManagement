import { AppTheme } from "@/constants/theme";
import type { AuthCardProps } from "@/types";
import { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { authCardStyles } from "./style";

const AuthCard = ({ icon, title, paragraph }: AuthCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = useMemo(() => authCardStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>{icon}</View>
      <Typography variant="body2" color={theme.colors.textPrimary}>
        {title}
      </Typography>
      <Typography variant="caption" color={theme.colors.textSecondary}>
        {paragraph}
      </Typography>
    </View>
  );
};

export default AuthCard;
