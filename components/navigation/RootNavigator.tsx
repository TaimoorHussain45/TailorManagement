import { Stack, router, useSegments } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

import { AppTheme } from "@/constants/theme";
import { hasActiveSession } from "@/services/session";

type AuthScreen = "login" | "onboarding" | "register";

export default function RootNavigator() {
  const db = useSQLiteContext();
  const theme = useTheme<AppTheme>();
  const segments = useSegments();

  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("onboarding");
  const [initialRouteReady, setInitialRouteReady] = useState(false);
  const initialRouteMatched = isAtInitialRoute(segments, authed, authScreen);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const activeSession = await hasActiveSession(db);

        if (activeSession) {
          setAuthed(true);
          return;
        }

        const isRegistered = await getItemAsync("isRegistered");
        const hasSeenOnboarding = await getItemAsync("hasSeenOnboarding");

        if (isRegistered === "true") {
          setAuthScreen("login");
        } else if (hasSeenOnboarding === "true") {
          setAuthScreen("register");
        } else {
          setAuthScreen("onboarding");
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
    if (checking || initialRouteReady || initialRouteMatched) return;
    router.replace(authed ? "/(tabs)" : `/(auth)/${authScreen}`);
  }, [checking, initialRouteReady, initialRouteMatched, authed, authScreen]);

  useEffect(() => {
    if (checking || initialRouteReady || !initialRouteMatched) return;

    const frame = requestAnimationFrame(() => setInitialRouteReady(true));
    return () => cancelAnimationFrame(frame);
  }, [checking, initialRouteReady, initialRouteMatched]);

  if (checking) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        {authed ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
      {!initialRouteReady ? (
        <View
          style={[
            styles.loadingOverlay,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : null}
    </View>
  );
}

function isAtInitialRoute(
  segments: readonly string[],
  authed: boolean,
  authScreen: AuthScreen,
) {
  if (authed) {
    return segments[0] === "(tabs)";
  }
  return segments[0] === "(auth)" && segments[1] === authScreen;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
});
