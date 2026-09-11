import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import RootNavigator from "@/components/navigation/RootNavigator";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SQLiteProvider } from "expo-sqlite";
import { initSchema } from "./database/schema";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
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
    <SQLiteProvider databaseName="TailorManagement.db" onInit={initSchema}>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider
          value={{
            ...navigationTheme,
            colors: {
              primary: String(navigationTheme.colors.primary),
              background: String(navigationTheme.colors.background),
              card: String(navigationTheme.colors.card),
              text: String(navigationTheme.colors.text),
              border: String(navigationTheme.colors.border),
              notification: String(navigationTheme.colors.notification),
            },
          }}
        >
          <RootNavigator />
        </ThemeProvider>
      </PaperProvider>
    </SQLiteProvider>
  );
}
