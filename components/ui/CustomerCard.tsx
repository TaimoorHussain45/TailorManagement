import { AppTheme } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Typography from "./Typography";
import { customerCardStyles } from "./style";

interface CustomerCardProps {
  customerName: string;
  title: string;
  text: string;
  phoneNumber?: string;
  leftIcon?: React.ReactNode;
  icon?: React.ReactNode;
}

const CustomerCard = ({
  customerName,
  title,
  text,
  phoneNumber,
  leftIcon,
  icon,
}: CustomerCardProps) => {
  const theme = useTheme<AppTheme>();
  const styles = customerCardStyles(theme);
  const firstLetter = customerName?.trim().charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.customerLogo}>
        <Typography style={styles.logoText}>{firstLetter}</Typography>
      </View>
      <View style={styles.details}>
        <View style={styles.content}>
          <Typography color={theme.colors.black}>{title}</Typography>
          <Typography color={theme.colors.textPrimary} variant="caption">
            {text}
          </Typography>
        </View>
        {leftIcon && (
          <View style={styles.phoneRow}>
            <View>{leftIcon}</View>
            <Typography>{phoneNumber}</Typography>
          </View>
        )}
      </View>
      <View>{icon}</View>
    </View>
  );
};

export default CustomerCard;
