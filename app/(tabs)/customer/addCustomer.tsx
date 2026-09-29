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
import { Text, View } from "react-native";
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

  const [errors, setErrors] = useState({
    nameError: "",
    phoneNumberError: "",
    generalError: "",
  });

  const onChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "name" && errors.nameError) {
      setErrors((prev) => ({
        ...prev,
        nameError: "",
      }));
    }

    if (key === "phoneNumber" && errors.phoneNumberError) {
      setErrors((prev) => ({
        ...prev,
        phoneNumberError: "",
      }));
    }

    if (errors.generalError) {
      setErrors((prev) => ({
        ...prev,
        generalError: "",
      }));
    }
  };

  const onAddCustomer = async () => {
    const nameError = !formData.name.trim() ? "Name is required*" : "";

    let phoneNumberError = "";

    if (!formData.phoneNumber.trim()) {
      phoneNumberError = "Phone number is required*";
    } else if (formData.phoneNumber.length !== 11) {
      phoneNumberError = "Please enter correct number*";
    }

    if (nameError || phoneNumberError) {
      setErrors({
        nameError,
        phoneNumberError,
        generalError: "",
      });

      return;
    }

    setLoading(true);

    setErrors({
      nameError: "",
      phoneNumberError: "",
      generalError: "",
    });

    const payload = {
      name: formData.name.trim(),
      phone: formData.phoneNumber.trim(),
      notes: formData.notes.trim(),
      address: formData.address.trim(),
    };

    try {
      const res = await addCustomer(db, payload);

      if (!res.success) {
        setErrors((prev) => ({
          ...prev,
          generalError: res.error,
        }));

        return;
      }

      router.replace({
        pathname: "/(tabs)/customer/upperMeasurement",
        params: {
          customerId: String(res.data.lastInsertRowId),
        },
      });
    } catch {
      setErrors((prev) => ({
        ...prev,
        generalError: "Unable to save customer. Please try again.",
      }));
    } finally {
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
          error={errors.nameError}
        />

        <InputField
          label="Phone number"
          placeholder="e.g. 03017086236"
          value={formData.phoneNumber}
          keyboardType="numeric"
          maxLength={11}
          onChangeText={(text) => onChange("phoneNumber", text)}
          error={errors.phoneNumberError}
        />

        <InputField
          label="Address"
          placeholder="Street no 4"
          value={formData.address}
          onChangeText={(text) => onChange("address", text)}
        />

        <InputField
          label="Special Notes"
          placeholder="How did they find your atelier"
          multiline
          numberOfLines={16}
          value={formData.notes}
          style={styles.messageBox}
          onChangeText={(text) => onChange("notes", text)}
        />

        {!!errors.generalError && (
          <Text
            style={{
              color: theme.colors.red,
            }}
          >
            {errors.generalError}
          </Text>
        )}

        <CustomButton
          text={loading ? "Loading..." : "Save and Continue"}
          icon={ArrowRight}
          iconSize={24}
          iconPosition="right"
          backgroundColor={theme.colors.TealGreen}
          style={styles.customBtn}
          onPress={onAddCustomer}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCustomer;
