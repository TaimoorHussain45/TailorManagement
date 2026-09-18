import { addCustomerStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import InputField from "@/components/ui/InputField";
import { AppTheme } from "@/constants/theme";
import { getCustomerById, updateCustomer } from "@/services/customer";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, Save } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditCustomer() {
  const theme = useTheme<AppTheme>();
  const styles = addCustomerStyles(theme);
  const db = useSQLiteContext();
  const { customerId } = useLocalSearchParams<{ customerId?: string }>();
  const numericId = Number(customerId);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId || !Number.isInteger(numericId)) {
      setError("Customer ID is missing or invalid.");
      setLoading(false);
      return;
    }
    getCustomerById(db, numericId).then((response) => {
      if (!response.success) setError(response.error);
      else if (!response.data) setError("Customer not found.");
      else
        setForm({
          name: response.data.name,
          phone: response.data.phone,
          address: response.data.address ?? "",
          notes: response.data.notes ?? "",
        });
      setLoading(false);
    });
  }, [customerId, db, numericId]);

  const save = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and phone are required.");
      return;
    }
    setSaving(true);
    setError(null);
    const response = await updateCustomer(db, numericId, form);
    setSaving(false);
    if (!response.success) {
      setError(response.error);
      return;
    }
    router.replace({
      pathname: "/(tabs)/customer/viewCustomer",
      params: { customerId: String(numericId) },
    });
  };

  if (loading)
    return (
      <View style={styles.safeArea}>
        <Heading eyebrow="CUSTOMER" title="Loading..." />
      </View>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <IconButton
          icon={ArrowLeft}
          iconColor={theme.colors.black}
          backgroundColor={theme.colors.white}
          onPress={() => router.back()}
        />
        <Heading
          eyebrow="EDIT CUSTOMER"
          title={form.name || "Customer"}
          titleColor={theme.colors.black}
        />
      </View>
      <View style={styles.InputContainer}>
        <InputField
          label="Full name"
          value={form.name}
          onChangeText={(value) =>
            setForm((current) => ({ ...current, name: value }))
          }
        />
        <InputField
          label="Phone number"
          value={form.phone}
          onChangeText={(value) =>
            setForm((current) => ({ ...current, phone: value }))
          }
        />
        <InputField
          label="Address"
          value={form.address}
          onChangeText={(value) =>
            setForm((current) => ({ ...current, address: value }))
          }
        />
        <InputField
          label="Special notes"
          value={form.notes}
          multiline
          numberOfLines={5}
          style={styles.messageBox}
          onChangeText={(value) =>
            setForm((current) => ({ ...current, notes: value }))
          }
        />
        {error ? (
          <Text style={{ color: theme.colors.red }}>{error}</Text>
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
