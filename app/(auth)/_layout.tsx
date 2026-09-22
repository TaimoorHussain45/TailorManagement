import { Stack, router } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isRegistered = await getItemAsync("isRegistered");

        if (isRegistered === "true") {
          router.replace("/(auth)/login");
        } else {
          router.replace("/(auth)/register");
        }
      } catch (error) {
        console.error("Failed to initialize app:", error);

        router.replace("/(auth)/register");
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default RootLayout;
