import OrdersCard from "@/components/orders/ordersCard";
import { ordersScreenStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import SearchBar from "@/components/ui/SearchBar";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleOrderCount, setVisibleOrderCount] = useState(5);
  const { orders, loading, loadError } = useOrdersHook();

  const statusFilteredOrders =
    status === "All"
      ? orders
      : orders.filter((order) => order.status === status);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredOrders = statusFilteredOrders.filter((order) =>
    [
      String(order.id),
      order.customerName,
      order.phoneNumber,
      order.title,
      order.description ?? "",
    ].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );

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
            onPress={() => {
              setStatus(title);
              setVisibleOrderCount(5);
            }}
            backgroundColor={title === status ? "red" : "transparent"}
          />
        ))}
      </ScrollView>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search by customer, phone, order, or description"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setVisibleOrderCount(5);
          }}
        />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredOrders.slice(0, visibleOrderCount)}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          persistentScrollbar
          indicatorStyle={theme.colors.scrollIndicatorStyle}
          ListFooterComponent={
            visibleOrderCount < filteredOrders.length ? (
              <CustomButton
                text="See more"
                onPress={() =>
                  setVisibleOrderCount((count) =>
                    Math.min(count + 5, filteredOrders.length),
                  )
                }
                style={{ marginTop: 8 }}
              />
            ) : null
          }
          renderItem={({ item }) => <OrdersCard order={item} />}
          ListEmptyComponent={
            <Typography variant="caption">
              {normalizedQuery
                ? "No matching orders"
                : `No ${status} orders`}
            </Typography>
          }
        />
      </View>
    </SafeAreaView>
  );
}
