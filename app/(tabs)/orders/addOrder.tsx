import { addOrderStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import InputField from "@/components/ui/InputField";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { addOrder, type NewOrder } from "@/services/orders";
import type { OrderStatus } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, Check, Save } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const statuses: OrderStatus[] = [
  "Pending",
  "In Progress",
  "Completed",
  "Delayed",
];

const AddOrder = () => {
  const { customerId, customerName, measurementId } = useLocalSearchParams<{
    customerId?: string;
    customerName?: string;
    measurementId?: string;
  }>();
  const theme = useTheme<AppTheme>();
  const styles = addOrderStyles(theme);
  const db = useSQLiteContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [status, setStatus] = useState<OrderStatus>("Pending");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saveOrder = async () => {
    const numericCustomerId = Number(customerId);
    const numericMeasurementId = measurementId ? Number(measurementId) : null;
    const numericQuantity = Number(quantity);

    if (!title.trim()) {
      setError("Order title is required.");
      return;
    }
    if (!customerId || Number.isNaN(numericCustomerId)) {
      setError("Customer information is missing.");
      return;
    }
    if (!Number.isInteger(numericQuantity) || numericQuantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    const payload: NewOrder = {
      customer_id: numericCustomerId,
      measurement_id:
        numericMeasurementId !== null && !Number.isNaN(numericMeasurementId)
          ? numericMeasurementId
          : null,
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate.trim(),
      quantity: numericQuantity,
      status,
      progress: status === "Completed" ? 100 : 0,
    };

    setIsSaving(true);
    setError(null);
    try {
      const response = await addOrder(db, payload);
      setIsSaving(false);
      if (!response.success) {
        setError(response.error);
        return;
      }
      router.replace("/(tabs)/orders");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <CustomButton
            text=""
            icon={ArrowLeft}
            iconColor={theme.colors.black}
            backgroundColor={theme.colors.white}
            style={styles.backButton}
            onPress={() => router.back()}
          />
          <Heading
            eyebrow="NEW ORDER"
            title={customerName || "Create order"}
            titleColor={theme.colors.black}
          />
        </View>

        <View style={styles.form}>
          <Typography variant="h4" color={theme.colors.textSecondary}>
            ORDER DETAILS
          </Typography>
          <InputField
            label="Order title"
            placeholder="e.g. Kameez Shalwar"
            value={title}
            onChangeText={setTitle}
            error={Boolean(error && !title.trim())}
            errorMessage="Order title is required*"
          />
          <InputField
            label="Description"
            placeholder="Add order details"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
          />
          <View style={styles.row}>
            <InputField
              label="Due date"
              placeholder="e.g. 20 Oct 2026"
              value={dueDate}
              onChangeText={setDueDate}
              containerStyle={styles.halfField}
            />
            <InputField
              label="Quantity"
              placeholder="1"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="number-pad"
              containerStyle={styles.halfField}
            />
          </View>
        </View>

        <View style={styles.statusSection}>
          <Typography variant="h4" color={theme.colors.textSecondary}>
            STATUS
          </Typography>
          <View style={styles.buttons}>
            {statuses.map((option) => {
              const selected = status === option;
              return (
                <CustomButton
                  key={option}
                  text={option}
                  icon={selected ? Check : undefined}
                  iconPosition="right"
                  iconSize={16}
                  textColor={
                    selected ? theme.colors.white : theme.colors.textPrimary
                  }
                  backgroundColor={
                    selected
                      ? theme.colors.TealGreen
                      : theme.colors.cardBackground
                  }
                  style={[
                    styles.statusButton,
                    selected && styles.statusButtonSelected,
                  ]}
                  onPress={() => setStatus(option)}
                />
              );
            })}
          </View>
        </View>

        {error ? (
          <Typography variant="caption" color={theme.colors.red}>
            {error}
          </Typography>
        ) : null}

        <CustomButton
          text="Save order"
          icon={Save}
          iconPosition="right"
          textColor={theme.colors.white}
          backgroundColor={theme.colors.TealGreen}
          loading={isSaving}
          style={styles.saveButton}
          onPress={saveOrder}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddOrder;
