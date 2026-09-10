import { settingStyle } from "@/components/settings/styles";
import CustomButton from "@/components/ui/CustomButton";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { themeOptions } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { ArrowLeft, LogOut } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const theme = useTheme<AppTheme>();
  const styles = settingStyle(theme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <IconButton
          icon={ArrowLeft}
          iconColor={theme.colors.textPrimary}
          backgroundColor="transparent"
          onPress={() => router.back()}
        />
        <Typography variant="h2" color={theme.colors.textPrimary}>
          Settings
        </Typography>
      </View>

      <Typography variant="h4" color={theme.colors.textSecondary}>
        APPEARANCE
      </Typography>
      <View style={styles.card}>
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <CustomButton
              key={option.mode}
              text={option.label}
              icon={Icon}
              iconPosition="left"
              iconSize={18}
              textColor={theme.colors.black}
              backgroundColor={"transparent"}
              style={styles.themeRow}
            />
          );
        })}
      </View>

      <Typography variant="h4" color={theme.colors.textSecondary}>
        ACCOUNT
      </Typography>

      <CustomButton
        text="Log out"
        icon={LogOut}
        iconPosition="left"
        iconSize={18}
        textColor={theme.colors.black}
        backgroundColor="transparent"
        style={styles.themeRow}
      />
    </SafeAreaView>
  );
};

export default Settings;
