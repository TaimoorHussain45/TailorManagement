import UserCard from "@/components/customer/userCard";
import OrderDetailCard from "@/components/orders/orderDetailCard";
import { OrdersCardStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import { IconButton } from "@/components/ui/IconButton";
import { MeasurementRow } from "@/components/ui/measurementRow";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { getMeasurementById } from "@/services/measurement";
import { deleteOrderById, getOrderById } from "@/services/orders";
import type { Measurement, OrderRecord } from "@/types/types";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, Pencil, Ruler, Trash } from "lucide-react-native";
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

    if (!response.success) {
      setError(response.error);
    } else if (!response.data) {
      setError("Order not found.");
    } else {
      setOrder(response.data);

      if (response.data.measurement_id) {
        const measurementResponse = await getMeasurementById(
          db,
          response.data.measurement_id,
        );

        if (measurementResponse.success) {
          setMeasurement(measurementResponse.data);
        }
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

          if (!response.success) {
            Alert.alert("Delete failed", response.error);
          } else {
            router.replace("/(tabs)/orders");
          }
        },
      },
    ]);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Loading order...</Typography>
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Unable to open order</Typography>
        <Typography variant="caption">{error ?? "Order not found."}</Typography>
        <CustomButton text="Try again" onPress={() => void loadOrder()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <IconButton icon={ArrowLeft} onPress={() => router.back()} />

            <View style={styles.headerTitleWrap}>
              <Typography variant="caption" style={styles.orderIdLabel}>
                ORDER #{order.id}
              </Typography>

              <Typography
                variant="h4"
                style={styles.orderTitle}
                numberOfLines={1}
              >
                {order.title}
              </Typography>
            </View>
          </View>

          <View style={styles.headerActions}>
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

        {/* <View style={styles.card}>
          <View style={styles.statusRow}>
            <View style={styles.statusLeft}>
              {isCompleted ? (
                <CheckCircle2 size={22} color={theme.colors.primary} />
              ) : (
                <Clock3 size={22} color={theme.colors.primary} />
              )}

              <Typography variant="h4" style={styles.statusValue}>
                {order.status}
              </Typography>
            </View>

            <View style={styles.statusBadge}>
              <Typography variant="caption" style={styles.statusBadgeText}>
                {progress}%
              </Typography>
            </View>
          </View>

          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View> */}

        <UserCard
          customerName={order.customerName}
          phoneNumber={order.phoneNumber}
          dueDate={order.due_date}
        />

        <OrderDetailCard
          quantity={order.quantity}
          progress={order.status}
          description={order.description}
        />

        <View style={styles.cardNoMargin}>
          <View style={styles.sectionHeaderTight}>
            <Ruler size={21} color={theme.colors.primary} />
            <Typography variant="h4">Measurements</Typography>
          </View>

          {measurement ? (
            <View style={styles.measurementList}>
              <MeasurementRow label="Chest" value={measurement.chest} />
              <MeasurementRow
                label="Shirt Length"
                value={measurement.shirt_length}
              />
              <MeasurementRow
                label="Shalwar Length"
                value={measurement.shalwar_length}
              />
              <MeasurementRow label="Shoulder" value={measurement.shoulder} />
              <MeasurementRow label="Sleeve" value={measurement.sleeve} />
              <MeasurementRow label="Collar" value={measurement.collar} />
            </View>
          ) : (
            <Typography variant="body2">
              No measurement linked to this order.
            </Typography>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
