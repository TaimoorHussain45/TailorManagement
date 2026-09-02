import { AppTheme } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "../ui/Typography";
import { authCardStyles } from "./style";

type AuthCardProps = {
  icon: React.ReactNode;
  title: string;
  paragraph: string;
};

const AuthCard = ({ icon, title, paragraph }: AuthCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = authCardStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>{icon}</View>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="caption" color="#6B6B6B">
        {paragraph}
      </Typography>
    </View>
  );
};

export default AuthCard;
