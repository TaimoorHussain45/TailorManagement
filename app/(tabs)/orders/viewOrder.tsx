import { OrdersCardStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { getMeasurementById } from "@/services/measurement";
import { deleteOrderById, getOrderById } from "@/services/orders";
import type { Measurement, OrderRecord } from "@/types/types";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, Pencil, Trash } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewOrder() {
  const theme = useTheme<AppTheme>();
  const styles = OrdersCardStyles(theme);
  const db = useSQLiteContext();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const numericId = Number(orderId);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrder = useCallback(async () => {
    if (!orderId || !Number.isInteger(numericId) || numericId < 1) {
      setError("Order ID is missing or invalid.");
      setLoading(false);
      return;
    }
    setLoading(true);
    const response = await getOrderById(db, numericId);
    if (!response.success) setError(response.error);
    else if (!response.data) setError("Order not found.");
    else {
      setOrder(response.data);
      if (response.data.measurement_id) {
        const measurementResponse = await getMeasurementById(
          db,
          response.data.measurement_id,
        );
        if (measurementResponse.success)
          setMeasurement(measurementResponse.data);
      }
      setError(null);
    }
    setLoading(false);
  }, [db, numericId, orderId]);

  useFocusEffect(
    useCallback(() => {
      void loadOrder();
    }, [loadOrder]),
  );

  const remove = () =>
    Alert.alert("Delete order?", "This will permanently delete this order.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await deleteOrderById(db, numericId);
          if (!response.success) Alert.alert("Delete failed", response.error);
          else router.replace("/(tabs)/orders");
        },
      },
    ]);

  if (loading)
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Loading order...</Typography>
      </View>
    );
  if (error || !order)
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Unable to open order</Typography>
        <Typography variant="caption">{error ?? "Order not found."}</Typography>
        <CustomButton text="Try again" onPress={() => void loadOrder()} />
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <IconButton icon={ArrowLeft} onPress={() => router.back()} />
            <Heading
              eyebrow={`ORDER AT-${order.id}`}
              title={order.title}
              titleColor={theme.colors.black}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon={Pencil}
              onPress={() =>
                router.push({
                  pathname: "/orders/editOrder",
                  params: { orderId: String(order.id) },
                })
              }
            />
            <IconButton icon={Trash} onPress={remove} />
          </View>
        </View>
        <View style={{ gap: 12, marginTop: 28 }}>
          <Typography variant="h3">{order.customerName}</Typography>
          <Typography variant="body1">{order.phoneNumber}</Typography>
          <Typography variant="body1">Status: {order.status}</Typography>
          <Typography variant="body1">
            Due: {order.due_date ?? "No due date"}
          </Typography>
          <Typography variant="body1">Quantity: {order.quantity}</Typography>
          <Typography variant="body1">Progress: {order.progress}%</Typography>
          <Typography variant="body2">
            {order.description ?? "No description"}
          </Typography>
          <Typography variant="h4">MEASUREMENT</Typography>
          <Typography variant="caption">
            {measurement
              ? `Chest ${measurement.chest ?? "-"} in · Shirt ${measurement.shirt_length ?? "-"} in · Shalwar ${measurement.shalwar_length ?? "-"} in`
              : "No measurement linked."}
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
