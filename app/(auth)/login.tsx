import AuthContent from "@/components/auth/AuthContent";
import FingerPrintLogo from "@/components/auth/FingerPrintLogo";
import NavLogo from "@/components/auth/NavLogo";
import { loginStyle } from "@/components/auth/style";
import CustomButton from "@/components/ui/CustomButton";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { validateBiometricAvailability } from "@/utils/biometric";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const theme = useTheme<AppTheme>();
  const style = loginStyle(theme);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async () => {
    setIsUnlocking(true);
    try {
      const isValid = await validateBiometricAvailability();
      if (!isValid) return;

      const isRegistered = await getItemAsync("isRegistered");

      if (isRegistered !== "true") {
        console.warn("")
        router.replace("/register");
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Scan your fingerprint to unlock",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
      });

      if (!result.success) {
        console.warn("Biometric authentication failed:", result.error);
        return;
      }
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Biometric authentication error:", error);
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.logo}>
        <NavLogo />
      </View>
      <View>
        <AuthContent
          icon={<FingerPrintLogo />}
          eyebrow="READY WHEN YOU ARE"
          title={"Your worktable\nis locked."}
          description="Biometric unlock is ready. A small layer of privacy for the people who trust you with their fit."
          eyebrowColor={theme.colors.textPrimary}
          titleColor={theme.colors.textPrimary}
          descriptionColor={theme.colors.textSecondary}
          borderColor={theme.colors.borderColor}
          iconInnerColor={theme.colors.white}
        />
      </View>
      <View style={style.authButton}>
        <CustomButton
          text={isUnlocking ? "Unlocking..." : "Unlock"}
          icon={ArrowRight}
          iconSize={24}
          iconPosition="right"
          onPress={handleUnlock}
          disabled={isUnlocking}
        />
      </View>
      <View style={style.signInRow}>
        <Typography variant="body2" color={theme.colors.textSecondary}>
          Not registered?
        </Typography>
        <CustomButton
          text="Register"
          onPress={() => router.replace("/register")}
          textColor={theme.colors.primary}
          backgroundColor="transparent"
          style={style.signInButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
