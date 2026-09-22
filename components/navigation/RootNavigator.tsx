import { Stack } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "react-native-paper";

import { AppTheme } from "@/constants/theme";
import { hasActiveSession } from "@/services/session";

type AuthRoute = "(auth)/login" | "(auth)/register";

export default function RootNavigator() {
  const db = useSQLiteContext();
  const theme = useTheme<AppTheme>();

  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [authRoute, setAuthRoute] = useState<AuthRoute>("(auth)/register");

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1. Check if there is an active SQLite session
        const activeSession = await hasActiveSession(db);

        if (activeSession) {
          setAuthed(true);
          return;
        }

        // 2. No active session → check biometric registration
        const isRegistered = await getItemAsync("isRegistered");

        if (isRegistered === "true") {
          setAuthRoute("(auth)/login");
        } else {
          setAuthRoute("(auth)/register");
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      } finally {
        setChecking(false);
      }
    };

    initializeAuth();
  }, [db]);

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
      {authed ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name={authRoute} />
      )}
    </Stack>
  );
}
