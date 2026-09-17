import OrdersCard from "@/components/orders/ordersCard";
import { ordersScreenStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { getAllOrders } from "@/services/orders";
import type { OrderRecord } from "@/types/types";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const theme = useTheme<AppTheme>();
  const styles = ordersScreenStyles(theme);
  const db = useSQLiteContext();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const response = await getAllOrders(db);
      console.log("response", response);

      if (!response.success) {
        setLoadError(
          typeof response.error === "string"
            ? response.error
            : "Unable to load oders. Please try again.",
        );
        setOrders([]);
        return;
      }

      setOrders(response.data);
    } catch (error) {
      console.error("loadCustomers failed:", error);
      setLoadError("Unable to load oders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      loadCustomers();
    }, [loadCustomers]),
  );
  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Loading customers...</Typography>
      </View>
    );
  }

  if (loadError) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Unable to load customers</Typography>
        <Typography variant="caption">{loadError}</Typography>
        <CustomButton text="Try again" onPress={() => loadCustomers()} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Heading eyebrow="THE WORK IN MOTION" title="Orders" />
        </View>
      </View>
      <View></View>
      <View style={styles.listContainer}>
        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          persistentScrollbar
          indicatorStyle={theme.colors.scrollIndicatorStyle}
          renderItem={({ item }) => <OrdersCard order={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
