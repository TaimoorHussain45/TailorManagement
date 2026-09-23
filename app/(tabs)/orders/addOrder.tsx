import { addOrderStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import InputField from "@/components/ui/InputField";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { addOrder, type NewOrder } from "@/services/orders";
import type { OrderStatus } from "@/types/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, Calendar, Check, Save } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [dueDate, setDueDate] = useState(new Date());
  const [quantity, setQuantity] = useState("1");
  const [status, setStatus] = useState<OrderStatus>("Pending");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
    console.log(dueDate.toDateString);
    const payload: NewOrder = {
      customer_id: numericCustomerId,
      measurement_id:
        numericMeasurementId !== null && !Number.isNaN(numericMeasurementId)
          ? numericMeasurementId
          : null,
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate.toISOString(),
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
            <View style={[styles.dateContainer]}>
              <Typography variant="body2">Due date</Typography>
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
            <CustomButton
              text="pending"
              icon={status && Check}
              iconPosition="right"
              iconSize={16}
              backgroundColor={theme.colors.TealGreen}
              style={[styles.statusButton, { width: "100%" }]}
              onPress={() => setStatus("Pending")}
            />
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
