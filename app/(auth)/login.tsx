import FingerPrintLogo from "@/components/auth/FingerPrintLogo";
import CustomButton from "@/components/ui/CustomButton";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { validateBiometricAvailability } from "@/utils/biometric";
import * as LocalAuthentication from "expo-local-authentication";
import { ArrowRight } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyle } from "./style";

const Login = () => {
  const theme = useTheme<AppTheme>();
  const style = loginStyle(theme);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async () => {
    const isValid = await validateBiometricAvailability();
    if (!isValid) return;

    setIsUnlocking(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your fingerprint to unlock",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });
    setIsUnlocking(false);

    // if (result.success) {
    //   router.replace("/(tabs)"); // adjust to your actual post-login route
    // }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.logo}>
        <FingerPrintLogo />
      </View>
      <View style={style.content}>
        <Typography
          align="center"
          color={theme.colors.textPrimary}
          style={style.semiTitle}
        >
          READY WHEN YOU ARE
        </Typography>
        <Typography align="center" style={style.title}>
          Your worktable is locked.
        </Typography>
        <Typography align="center" variant="body2" color="#6B6B6B">
          Biometric unlock is ready. A small layer of privacy for the people who
          trust you with their fit.
        </Typography>
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
    </SafeAreaView>
  );
};

export default Login;
