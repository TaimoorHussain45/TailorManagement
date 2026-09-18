import { AppTheme } from "@/constants/theme";
import { router, Tabs } from "expo-router";
import type { EventArg, NavigationProp, ParamListBase } from "@react-navigation/native";
import { ClipboardList, Home, Settings, Users } from "lucide-react-native";

import { useTheme } from "react-native-paper";

function resetTabStackOnPress(
  navigation: NavigationProp<ParamListBase>,
  tabName: string,
  event: EventArg<"tabPress", true, undefined>,
  href: "/(tabs)/customer" | "/(tabs)/orders",
) {
  const tabRoute = navigation.getState().routes.find((route) => route.name === tabName);
  const nestedState = tabRoute?.state;

  if (!nestedState) {
    return;
  }

  const activeNestedRoute = nestedState.routes[nestedState.index ?? 0];

  if (activeNestedRoute?.name !== "index") {
    event.preventDefault();
    router.replace(href);
  }
}

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
        listeners={({ navigation }) => ({
          tabPress: (event) =>
            resetTabStackOnPress(navigation, "customer", event, "/(tabs)/customer"),
        })}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) =>
            resetTabStackOnPress(navigation, "orders", event, "/(tabs)/orders"),
        })}
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
