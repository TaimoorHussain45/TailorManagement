import { addCustomerStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import InputField from "@/components/ui/InputField";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const AddCustomer = () => {
  const theme = useTheme<AppTheme>();
  const styles = addCustomerStyles(theme);

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
        <InputField label="Full name" placeholder="e.g. John Smith" />
        <InputField label="Phone  number" placeholder="+92300000329" />
        <InputField
          label="special Notes"
          placeholder="How did they find your atelier"
          multiline
          numberOfLines={16}
          style={styles.messageBox}
        />
        <CustomButton
          text="Save and Continue"
          icon={ArrowRight}
          iconSize={24}
          iconPosition="right"
          backgroundColor={theme.colors.TealGreen}
          style={styles.customBtn}
          onPress={() => router.push("/customer/upperMeasurement")}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCustomer;
