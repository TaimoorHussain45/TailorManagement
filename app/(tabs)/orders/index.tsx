import OrdersCard from "@/components/orders/ordersCard";
import { ordersScreenStyles } from "@/components/orders/styles";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { orderProgress } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { useOrdersHook } from "@/hooks/useOrdersHook";
import { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const theme = useTheme<AppTheme>();
  const styles = ordersScreenStyles(theme);

  const [status, setStatus] = useState("All");
  const { orders, loading, loadError } = useOrdersHook();

  const filteredOrders =
    status === "All"
      ? orders
      : orders.filter((order) => order.status === status);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Loading orders...</Typography>
      </View>
    );
  }

  if (loadError) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Unable to load orders</Typography>
        <Typography variant="caption">{loadError}</Typography>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">No orders yet</Typography>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Heading eyebrow="THE WORK IN MOTION" title="Orders" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.topButton}
        contentContainerStyle={styles.topButtonContent}
      >
        {orderProgress.map((title) => (
          <IconButton
            key={title}
            text={title}
            style={styles.orderButton}
            onPress={() => setStatus(title)}
            backgroundColor={title === status ? "red" : "transparent"}
          />
        ))}
      </ScrollView>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          persistentScrollbar
          indicatorStyle={theme.colors.scrollIndicatorStyle}
          renderItem={({ item }) => <OrdersCard order={item} />}
          ListEmptyComponent={
            <Typography variant="caption">No {status} orders</Typography>
          }
        />
      </View>
    </SafeAreaView>
  );
}
