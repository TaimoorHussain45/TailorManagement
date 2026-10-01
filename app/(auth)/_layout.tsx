import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="onboarding" screenOptions={{ headerShown: false }} />
  );
}
