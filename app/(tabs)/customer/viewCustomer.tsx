import MeasurementCard from "@/components/customer/MeasurementCard";
import UserCard from "@/components/customer/userCard";
import OrdersCard from "@/components/orders/ordersCard";
import { updateMeasurementStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { deleteCustomerById, getCustomerById } from "@/services/customer";
import { getMeasurement } from "@/services/measurement";
import { getOrdersByCustomerId } from "@/services/orders";
import type { Customer, Measurement, OrderRecord } from "@/types/types";
import { getFormattedDate } from "@/utils/formattedDate";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import {
  ArrowLeft,
  MoveUpRight,
  Pencil,
  Shirt,
  Trash,
} from "lucide-react-native";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewCustomer() {
  const theme = useTheme<AppTheme>();
  const styles = updateMeasurementStyles(theme);
  const db = useSQLiteContext();
  const { customerId, id } = useLocalSearchParams<{
    customerId?: string;
    id?: string;
  }>();
  const resolvedId = customerId ?? id;
  const numericId = Number(resolvedId);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCustomer = useCallback(async () => {
    if (!resolvedId || !Number.isInteger(numericId) || numericId < 1) {
      setLoadError("Customer ID is missing or invalid.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(null);
    const [customerResponse, measurementResponse, orderResponse] =
      await Promise.all([
        getCustomerById(db, numericId),
        getMeasurement(db, numericId),
        getOrdersByCustomerId(db, numericId),
      ]);

    if (
      !customerResponse.success ||
      !measurementResponse.success ||
      !orderResponse.success
    ) {
      setLoadError("Unable to load this customer. Please try again.");
      setLoading(false);
      return;
    }
    if (!customerResponse.data) {
      setLoadError("Customer not found.");
      setCustomer(null);
      setLoading(false);
      return;
    }

    setCustomer(customerResponse.data);
    setMeasurements(measurementResponse.data);
    setOrders(orderResponse.data);
    setLoading(false);
  }, [db, numericId, resolvedId]);

  useFocusEffect(
    useCallback(() => {
      void loadCustomer();
    }, [loadCustomer]),
  );

  const onDelete = () => {
    Alert.alert(
      "Delete customer?",
      "This will permanently delete the customer and related records.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            const response = await deleteCustomerById(db, numericId);
            setIsDeleting(false);
            if (!response.success) {
              Alert.alert("Delete failed", response.error);
              return;
            }
            router.replace("/(tabs)/customer");
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Loading customer...</Typography>
      </View>
    );
  }

  if (loadError || !customer) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Unable to open customer</Typography>
        <Typography variant="caption">
          {loadError ?? "Customer not found."}
        </Typography>
        <CustomButton text="Try again" onPress={() => void loadCustomer()} />
      </View>
    );
  }

  const latestMeasurement = measurements[0];
  console.log("ids...", latestMeasurement, customer.id);
  const measurementData = {
    date: latestMeasurement
      ? getFormattedDate(new Date(latestMeasurement.created_at))
      : "No record",
    description: latestMeasurement
      ? "Upper and lower body record"
      : "No measurements saved yet",
    measurements: latestMeasurement
      ? [
          {
            label: "Shirt length",
            value: String(latestMeasurement.shirt_length),
            unit: "in",
          },
          {
            label: "Chest",
            value: String(latestMeasurement.chest),
            unit: "in",
          },
          {
            label: "Shalwar length",
            value: String(latestMeasurement.shalwar_length),
            unit: "in",
          },
        ]
      : [],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.navBar}>
          <View style={styles.header}>
            <IconButton
              icon={ArrowLeft}
              iconColor={theme.colors.black}
              backgroundColor={theme.colors.white}
              onPress={() => router.back()}
            />
            <Heading
              eyebrow="CUSTOMER PROFILE"
              title={customer.name}
              titleColor={theme.colors.black}
            />
          </View>
          <View style={styles.header}>
            <IconButton
              icon={Pencil}
              iconColor={theme.colors.black}
              backgroundColor={theme.colors.white}
              onPress={() =>
                router.replace({
                  pathname: "/(tabs)/customer/editCustomer",
                  params: { customerId: String(customer.id) },
                })
              }
            />
            <IconButton
              icon={Trash}
              iconColor={theme.colors.black}
              backgroundColor={theme.colors.white}
              disabled={isDeleting}
              onPress={onDelete}
            />
          </View>
        </View>
        <View style={styles.details}>
          <UserCard
            customerName={customer.name}
            phoneNumber={customer.phone}
            createdAt={customer.created_at}
          />
          {latestMeasurement ? (
            <>
              <MeasurementCard data={measurementData} />

              <CustomButton
                text="Update measurement"
                icon={MoveUpRight}
                iconPosition="right"
                iconSize={17}
                textColor={theme.colors.black}
                style={styles.measurementBtn}
                onPress={() =>
                  router.replace({
                    pathname: "/(tabs)/customer/updateRecord",
                    params: {
                      customerId: String(customer.id),
                      measurementId: String(latestMeasurement.id),
                    },
                  })
                }
              />
            </>
          ) : (
            <>
              <Typography variant="caption">
                No Measurement record for this customer.
              </Typography>
              <CustomButton
                text="Create Order"
                icon={MoveUpRight}
                iconPosition="right"
                iconSize={17}
                textColor={theme.colors.black}
                style={styles.measurementBtn}
                onPress={() =>
                  router.replace({
                    pathname: "/(tabs)/customer/upperMeasurement",
                    params: { customerId: String(customer.id) },
                  })
                }
              />
            </>
          )}
          <Typography variant="h4">ORDERS</Typography>
          {orders.length === 0 ? (
            <>
              <Typography variant="caption">
                No orders for this customer.
              </Typography>
              <CustomButton
                text="Create Order"
                icon={MoveUpRight}
                iconPosition="right"
                iconSize={17}
                textColor={theme.colors.black}
                style={styles.measurementBtn}
                onPress={() =>
                  router.replace({
                    pathname: "/(tabs)/orders/addOrder",
                    params: {
                      customerId: String(customer.id),
                      measurementId: String(latestMeasurement.id),
                    },
                  })
                }
              />
            </>
          ) : (
            orders.map((order) => (
              <OrdersCard
                key={order.id}
                order={order}
                icon={<Shirt size={24} color={theme.colors.TealGreen} />}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
