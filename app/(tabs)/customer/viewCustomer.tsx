import MeasurementCard from "@/components/customer/MeasurementCard";
import OrdersCard from "@/components/orders/ordersCard";
import { updateMeasurementStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { AppTheme } from "@/constants/theme";
import { deleteCustomerById } from "@/services/customer";
import { getMeasurement } from "@/services/measurement";
import { Measurement } from "@/types/types";
import { getFormattedDate } from "@/utils/formattedDate";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, MoveUpRight, Shirt, Trash } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewCustomer = () => {
  const theme = useTheme<AppTheme>();
  const styles = updateMeasurementStyles(theme);
  const db = useSQLiteContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const [measurement, setMeasurement] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const { customerId, id, customerName, title, text, phoneNumber } =
    useLocalSearchParams<{
      customerId?: string;
      id?: string;
      customerName?: string;
      title?: string;
      text?: string;
      phoneNumber?: string;
    }>();
  const resolvedCustomerId = customerId ?? id;
  const numericCustomerId = Number(resolvedCustomerId);
  console.log("id ", customerId);
  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const response = await getMeasurement(db, numericCustomerId);

      if (!response.success) {
        setLoadError(
          response.error ?? "Unable to load customers. Please try again.",
        );
        setMeasurement([]);
        return;
      }

      setMeasurement(response.data);
    } catch (error) {
      console.error("loadCustomers failed:", error);
      setLoadError("Unable to load customers. Please try again.");
      setMeasurement([]);
    } finally {
      setLoading(false);
    }
  }, [db, numericCustomerId]);

  useFocusEffect(
    useCallback(() => {
      loadCustomers();
    }, [loadCustomers]),
  );

  const latestMeasurement = measurement[0];
  const singleMeasurementData = {
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
  const order = {
    id: "CUSTOMER-RECORD",
    customerName: customerName ?? "Customer",
    status: "Pending" as const,
    title: title ?? "Measurement record",
    description: text,
    phoneNumber,
    dueDate: "No due date",
    progress: 0,
  };

  const onDelete = () => {
    console.log("working 1");

    if (!resolvedCustomerId || Number.isNaN(numericCustomerId)) {
      Alert.alert("Unable to delete", "Customer ID is missing.");
      return;
    }
    console.log("working 2");
    Alert.alert(
      "Delete customer?",
      "This will permanently delete the customer and their measurements.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            const response = await deleteCustomerById(db, numericCustomerId);
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
  console.log("measurement", measurement);

  return (
    <SafeAreaView style={styles.safeArea}>
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
            title={customerName ?? "Customer"}
            titleColor={theme.colors.black}
          />
        </View>
        <View>
          <IconButton
            icon={Trash}
            iconColor={theme.colors.black}
            backgroundColor={theme.colors.white}
            disabled={isDeleting || !resolvedCustomerId}
            onPress={onDelete}
          />
        </View>
      </View>
      <View style={styles.details}>
        <MeasurementCard data={singleMeasurementData} />
        <OrdersCard
          order={order}
          icon={<Shirt size={24} color={theme.colors.TealGreen} />}
        />
      </View>
      {latestMeasurement ? (
        <CustomButton
          text="Update measurement"
          icon={MoveUpRight}
          iconPosition="right"
          iconSize={17}
          textColor={theme.colors.black}
          style={styles.measurementBtn}
          onPress={() =>
            router.push({
              pathname: "/customer/updateRecord",
              params: {
                customerId: String(numericCustomerId),
                measurementId: String(latestMeasurement.id),
              },
            })
          }
        />
      ) : null}
    </SafeAreaView>
  );
};

export default ViewCustomer;
