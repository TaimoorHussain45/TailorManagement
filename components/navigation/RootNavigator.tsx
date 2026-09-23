import { Stack, router } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "react-native-paper";

import { AppTheme } from "@/constants/theme";
import { hasActiveSession } from "@/services/session";

type AuthScreen = "login" | "register";

export default function RootNavigator() {
  const db = useSQLiteContext();
  const theme = useTheme<AppTheme>();

  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("register");

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const activeSession = await hasActiveSession(db);

        if (activeSession) {
          setAuthed(true);
          return;
        }

        const isRegistered = await getItemAsync("isRegistered");

        if (isRegistered === "true") {
          setAuthScreen("login");
        } else {
          setAuthScreen("register");
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      } finally {
        setChecking(false);
      }
    };

    initializeAuth();
  }, [db]);

  useEffect(() => {
    if (!checking && !authed) {
      router.replace(`/(auth)/${authScreen}`);
    }
  }, [checking, authed, authScreen]);

  if (checking) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {authed ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
    </Stack>
  );
}
