import NavLogo from "@/components/auth/NavLogo";
import { onboardingStyles } from "@/components/auth/style";
import CustomButton from "@/components/ui/CustomButton";
import Typography from "@/components/ui/Typography";
import { features } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { Ruler } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const theme = useTheme<AppTheme>();
  const styles = onboardingStyles(theme);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetStarted = async () => {
    if (isStarting) return;

    setIsStarting(true);
    setError(null);
    try {
      await setItemAsync("hasSeenOnboarding", "true");
      router.replace("/(auth)/register");
    } catch (saveError) {
      console.error("Failed to save onboarding status:", saveError);
      setError("Could not continue. Please try again.");
      setIsStarting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <NavLogo />

        <View style={styles.intro}>
          <View style={styles.iconContainer}>
            <Ruler size={44} color={theme.colors.TealGreen} />
          </View>
          <Typography
            variant="caption"
            color={theme.colors.clayRose}
            align="center"
          >
            YOUR WORKTABLE, ORGANIZED
          </Typography>
          <Typography variant="h1" align="center" style={styles.title}>
            A better fit for your business
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color={theme.colors.textSecondary}
            style={styles.description}
          >
            Manage customers, measurements, and orders together, so you can
            focus on the craft.
          </Typography>
        </View>

        <View style={styles.features}>
          {features.map(({ icon: Icon, title, description }) => (
            <View key={title} style={styles.feature}>
              <Icon size={22} color={theme.colors.TealGreen} />
              <View style={styles.featureCopy}>
                <Typography variant="h4">{title}</Typography>
                <Typography
                  variant="caption"
                  color={theme.colors.textSecondary}
                >
                  {description}
                </Typography>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          {error ? (
            <Typography
              variant="caption"
              color={theme.colors.red}
              align="center"
            >
              {error}
            </Typography>
          ) : null}
          <CustomButton
            text={isStarting ? "Getting started..." : "Get started"}
            onPress={handleGetStarted}
            disabled={isStarting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
