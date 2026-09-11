import { addCustomerStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import InputField from "@/components/ui/InputField";
import { AppTheme } from "@/constants/theme";
import { addCustomer } from "@/services/customer";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const AddCustomer = () => {
  const theme = useTheme<AppTheme>();
  const styles = addCustomerStyles(theme);
  const db = useSQLiteContext();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    notes: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onAddCustomer = async () => {
    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      setError("Name and phone are required.");
      return;
    }
    setLoading(true);
    setError(null);
    const payload = {
      name: formData.name,
      phone: formData.phoneNumber,
      notes: formData.notes,
      address: formData.address,
    };
    try {
      const res = await addCustomer(db, payload);
      console.log("Data", res.data);

      router.push(`/customer/upperMeasurement?customerId=${res}`);
    } catch (error) {
      console.error(error);
    } finally {
      setFormData(null);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ArrowLeft size={30} onPress={() => router.back()} />
        <Heading
          eyebrow="NEW CUSTOMER"
          title="Customer details"
          titleColor={theme.colors.black}
        />
      </View>
      <View style={styles.InputContainer}>
        <InputField
          label="Full name"
          placeholder="e.g. John Smith"
          value={formData.name}
          onChangeText={(text) => onChange("name", text)}
          error={!formData.name}
          errorMessage="Name is required*"
        />
        <InputField
          label="Phone  number"
          placeholder="+92300000329"
          value={formData.phoneNumber}
          onChangeText={(text) => onChange("phoneNumber", text)}
          error={!formData.phoneNumber}
          errorMessage="Phone Number is required*"
        />
        <InputField
          label="Address"
          placeholder="Street no 4 "
          value={formData.address}
          onChangeText={(text) => onChange("address", text)}
        />
        <InputField
          label="special Notes"
          placeholder="How did they find your atelier"
          multiline
          numberOfLines={16}
          value={formData.notes}
          style={styles.messageBox}
          onChangeText={(text) => onChange("notes", text)}
        />
        <CustomButton
          text={loading ? "loading..." : "Save and Continue"}
          icon={ArrowRight}
          iconSize={24}
          iconPosition="right"
          backgroundColor={theme.colors.TealGreen}
          style={styles.customBtn}
          onPress={onAddCustomer}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCustomer;
