import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addOrder" />
      <Stack.Screen name="viewOrder" />
      <Stack.Screen name="editOrder" />
    </Stack>
  );
}
