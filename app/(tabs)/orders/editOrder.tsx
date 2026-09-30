import { addOrderStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import InputField from "@/components/ui/InputField";
import Typography from "@/components/ui/Typography";
import { ORDER_STAGES } from "@/constants/data";
import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/constants/theme";
import { getOrderById, updateOrder } from "@/services/orders";
import type { OrderStatus } from "@/types/types";
import { getProgress } from "@/utils/grtProgress";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, Calendar, Check, Save } from "lucide-react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

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
    quantity: "1",
  });
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
          quantity: String(order.quantity),
        });
        if (order.due_date) {
          const parsed = new Date(order.due_date);
          if (!Number.isNaN(parsed.getTime())) {
            setDueDate(parsed);
          }
        }
        setStatus(order.status);
      }
      setLoading(false);
    });
  }, [db, numericId, orderId]);

  const editOrder = async () => {
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
    try {
      const response = await updateOrder(db, numericId, {
        title: form.title.trim(),
        description: form.description,
        due_date: dueDate.toISOString(),
        quantity,
        status,
        progress: getProgress(status),
      });
      if (!response.success) {
        setError(response.error);
        return;
      }
      router.replace({
        pathname: "/(tabs)/orders",
        params: { orderId: String(numericId) },
      });
      Toast.show({
        type: "success",
        text1: "Order Updated successfully 👋",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
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
          <IconButton icon={ArrowLeft} onPress={() => router.back()} />

          <Heading
            eyebrow="EDIT ORDER"
            title={form.title || "Order"}
            titleColor={theme.colors.black}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
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
              <View style={styles.dateContainer}>
                <Typography variant="body2" style={styles.dateLabel}>
                  Due date
                </Typography>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dateField}
                >
                  <Typography variant="body2">
                    {dueDate.toDateString()}
                  </Typography>
                  <Calendar size={22} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (event.type === "set" && selectedDate) {
                        setDueDate(selectedDate);
                      }
                    }}
                  />
                )}
              </View>
            </View>
            <View>
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
          <Typography variant="h4" paddingVertical={Metrics.spacingSmall}>
            STATUS
          </Typography>
          <View style={styles.buttons}>
            {ORDER_STAGES.map((option, index) => (
              <CustomButton
                key={index}
                text={option.status}
                icon={status === option.status ? Check : undefined}
                iconPosition="right"
                backgroundColor={
                  status === option.status
                    ? theme.colors.TealGreen
                    : theme.colors.cardBackground
                }
                textColor={
                  status === option.status
                    ? theme.colors.white
                    : theme.colors.textPrimary
                }
                style={styles.statusButton}
                onPress={() => setStatus(option.status)}
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
            onPress={editOrder}
            style={styles.saveButton}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
