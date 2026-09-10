import { AppTheme } from "@/constants/theme";
import { Tabs } from "expo-router";
import { ClipboardList, Home, Settings, Users } from "lucide-react-native";

import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme<AppTheme>();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.colors.tabBarBackground,
        },
        tabBarStyle: {
          display: "flex",
          backgroundColor: theme.colors.white,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="customer"
        options={{
          title: "Customers",
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
