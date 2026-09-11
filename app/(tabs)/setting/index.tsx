import { settingStyle } from "@/components/settings/styles";
import CustomButton from "@/components/ui/CustomButton";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { themeOptions } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { clearSession } from "@/services/session";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, LogOut } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const theme = useTheme<AppTheme>();
  const styles = settingStyle(theme);
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    try {
      const res = await clearSession(db);
      console.log("Response", res);
      router.replace("/(auth)/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
        text={loading ? "loading..." : "Log out"}
        icon={LogOut}
        iconPosition="left"
        iconSize={18}
        textColor={theme.colors.black}
        backgroundColor="transparent"
        style={styles.themeRow}
        onPress={onLogout}
      />
    </SafeAreaView>
  );
};

export default Settings;
