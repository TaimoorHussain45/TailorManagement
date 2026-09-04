import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import React from "react";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import { navLogoStyle } from "./style";

const NavLogo = () => {
  const theme = useTheme<AppTheme>();
  const styles = navLogoStyle(theme);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/navLogo.png")}
        style={styles.image}
      />
      <View style={styles.textWrap}>
        <Typography color={theme.colors.textPrimary} style={styles.title}>
          TM APPAREL
        </Typography>
        <Typography
          variant="body2"
          color={theme.colors.textSecondary}
          style={styles.subtitle}
        >
          Every Stitch, Organized
        </Typography>
      </View>
    </View>
  );
};

export default NavLogo;
