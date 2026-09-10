import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addCustomer" />
      <Stack.Screen name="upperMeasurement" />
      <Stack.Screen name="viewCustomer" />
      <Stack.Screen name="updateRecord" />
    </Stack>
  );
}
