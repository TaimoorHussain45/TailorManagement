import AuthCard from "@/components/auth/AuthCard";
import AuthContent from "@/components/auth/AuthContent";
import FingerPrintLogo from "@/components/auth/FingerPrintLogo";
import NavLogo from "@/components/auth/NavLogo";
import { registerStyle } from "@/components/auth/style";
import CustomButton from "@/components/ui/CustomButton";
import { authCardsData } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { validateBiometricAvailability } from "@/utils/biometric";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const theme = useTheme<AppTheme>();
  const style = registerStyle(theme);
  const handleBiometricAuth = async () => {
    const isValid = await validateBiometricAvailability();
    if (!isValid) return;

    setIsAuthenticating(true);
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
    <SafeAreaView style={style.safeArea}>
      <ScrollView
        style={style.scrollView}
        contentContainerStyle={style.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
      >
        <View style={style.logo}>
          <NavLogo />
        </View>
        <View>
          <AuthContent
            icon={<FingerPrintLogo />}
            eyebrow="PRIVATE BY DESIGN"
            title="Unlock your worktable faster"
            description="Use your fingerprint or face to open AtelierOS. Your biometric data never leaves this device."
            eyebrowColor={theme.colors.clayRose}
            titleColor={theme.colors.textPrimary}
            descriptionColor={theme.colors.textSecondary}
            borderColor={theme.colors.borderColor}
            iconInnerColor={theme.colors.white}
          />
        </View>
        <View style={style.cardContainer}>
          {authCardsData.map((element, index) => {
            const Icon = element.icon;
            return (
              <AuthCard
                key={index}
                icon={<Icon color={theme.colors.TealGreen} />}
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default Register;
