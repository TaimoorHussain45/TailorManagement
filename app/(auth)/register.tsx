import AuthCard from "@/components/auth/AuthCard";
import FingerPrintLogo from "@/components/auth/FingerPrintLogo";
import CustomButton from "@/components/ui/CustomButton";
import Typography from "@/components/ui/Typography";
import { authCardsData } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { ArrowRight } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyle } from "./style";

const Register = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const theme = useTheme<AppTheme>();
  const style = registerStyle(theme);
  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    setIsAuthenticating(true);
    if (!hasHardware) {
      Alert.alert("Not supported", "This device has no fingerprint sensor.");
      return;
    }
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert(
        "No fingerprint set up",
        "Set up a fingerprint in your device settings first.",
      );
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your fingerprint to register",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });
    if (result.success) {
      await setItemAsync("isRegistered", "true");
      router.replace("/login");
      console.log("working");
    }
    setIsAuthenticating(false);
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={style.logo}>
        <FingerPrintLogo />
      </View>
      <View style={style.content}>
        <Typography align="center" color="red" variant="h4">
          PRIVATE BY DESIGN{" "}
        </Typography>
        <Typography align="center" variant="h2">
          Unlock your worktable faster
        </Typography>
        <Typography align="center" variant="body1" color="#6B6B6B">
          Use your fingerprint or face to open AtelierOS. Your biometric data
          never leaves this device.
        </Typography>
      </View>
      <View style={style.cardContainer}>
        {authCardsData.map((element, index) => {
          const Icon = element.icon;
          return (
            <AuthCard
              key={index}
              icon={<Icon />}
              title={element.title}
              paragraph={element.paragraph}
            />
          );
        })}
      </View>
      <View style={style.authButton}>
        <CustomButton
          text={isAuthenticating ? "loading..." : "Register  biometries"}
          icon={ArrowRight}
          iconSize={24}
          iconPosition="right"
          onPress={handleBiometricAuth}
        />
      </View>
    </SafeAreaView>
  );
};
export default Register;
