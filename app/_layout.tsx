import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...Colors.dark } }
      : {
          ...MD3LightTheme,
          colors: { ...MD3LightTheme.colors, ...Colors.light },
        };
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("@/assets/Fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("@/assets/Fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("@/assets/Fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("@/assets/Fonts/Poppins-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/register" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
