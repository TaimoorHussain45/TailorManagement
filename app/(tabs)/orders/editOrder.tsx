import { addOrderStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import InputField from "@/components/ui/InputField";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { getOrderById, updateOrder } from "@/services/orders";
import type { OrderStatus } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, Check, Save } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const statuses: OrderStatus[] = [
  "Pending",
  "In Progress",
  "Completed",
  "Delayed",
];

export default function EditOrder() {
  const theme = useTheme<AppTheme>();
  const styles = addOrderStyles(theme);
  const db = useSQLiteContext();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const numericId = Number(orderId);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    quantity: "1",
  });
  const [status, setStatus] = useState<OrderStatus>("Pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || !Number.isInteger(numericId)) {
      setError("Order ID is missing or invalid.");
      setLoading(false);
      return;
    }
    getOrderById(db, numericId).then((response) => {
      if (!response.success) setError(response.error);
      else if (!response.data) setError("Order not found.");
      else {
        const order = response.data;
        setCustomerId(order.customer_id);
        setForm({
          title: order.title,
          description: order.description ?? "",
          dueDate: order.due_date ?? "",
          quantity: String(order.quantity),
        });
        setStatus(order.status);
      }
      setLoading(false);
    });
  }, [db, numericId, orderId]);

  const save = async () => {
    const quantity = Number(form.quantity);
    if (
      !form.title.trim() ||
      !customerId ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      setError("Title, customer, and a valid quantity are required.");
      return;
    }
    setSaving(true);
    setError(null);
    const response = await updateOrder(db, numericId, {
      customer_id: customerId,
      title: form.title.trim(),
      description: form.description,
      due_date: form.dueDate,
      quantity,
      status,
      progress: status === "Completed" ? 100 : 0,
    });
    setSaving(false);
    if (!response.success) {
      setError(response.error);
      return;
    }
    router.replace({
      pathname: "/(tabs)/orders/viewOrder",
      params: { orderId: String(numericId) },
    });
  };

  if (loading)
    return (
      <View style={styles.safeArea}>
        <Typography variant="h2">Loading order...</Typography>
      </View>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <CustomButton
            text=""
            icon={ArrowLeft}
            backgroundColor={theme.colors.white}
            iconColor={theme.colors.black}
            onPress={() => router.back()}
          />
          <Heading
            eyebrow="EDIT ORDER"
            title={form.title || "Order"}
            titleColor={theme.colors.black}
          />
        </View>
        <View style={styles.form}>
          <InputField
            label="Order title"
            value={form.title}
            onChangeText={(value) =>
              setForm((current) => ({ ...current, title: value }))
            }
          />
          <InputField
            label="Description"
            value={form.description}
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
            onChangeText={(value) =>
              setForm((current) => ({ ...current, description: value }))
            }
          />
          <View style={styles.row}>
            <InputField
              label="Due date"
              value={form.dueDate}
              containerStyle={styles.halfField}
              onChangeText={(value) =>
                setForm((current) => ({ ...current, dueDate: value }))
              }
            />
            <InputField
              label="Quantity"
              value={form.quantity}
              keyboardType="number-pad"
              containerStyle={styles.halfField}
              onChangeText={(value) =>
                setForm((current) => ({ ...current, quantity: value }))
              }
            />
          </View>
        </View>
        <Typography variant="h4">STATUS</Typography>
        <View style={styles.buttons}>
          {statuses.map((option) => (
            <CustomButton
              key={option}
              text={option}
              icon={status === option ? Check : undefined}
              iconPosition="right"
              backgroundColor={
                status === option
                  ? theme.colors.TealGreen
                  : theme.colors.cardBackground
              }
              textColor={
                status === option
                  ? theme.colors.white
                  : theme.colors.textPrimary
              }
              style={styles.statusButton}
              onPress={() => setStatus(option)}
            />
          ))}
        </View>
        {error ? (
          <Typography variant="caption" color={theme.colors.red}>
            {error}
          </Typography>
        ) : null}
        <CustomButton
          text="Save changes"
          icon={Save}
          iconPosition="right"
          backgroundColor={theme.colors.TealGreen}
          loading={saving}
          onPress={() => void save()}
        />
      </View>
    </SafeAreaView>
  );
}
