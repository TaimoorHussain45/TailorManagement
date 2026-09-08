import { CustomerStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import CustomerCard from "@/components/ui/CustomerCard";
import { IconButton } from "@/components/ui/IconButton";
import SearchBar from "@/components/ui/SearchBar";
import Typography from "@/components/ui/Typography";
import { dummyUsers } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { ChevronRightIcon, Phone, Plus } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const Customers = () => {
  const theme = useTheme<AppTheme>();
  const styles = CustomerStyles(theme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography variant="h3" color={theme.colors.black}>
            Customer
          </Typography>
          <IconButton onPress={() => router.push("/customer/addCustomer")} />
        </View>
        <View style={styles.inputContainer}>
          <SearchBar placeholder="Search by Name or Phone" />
        </View>
        <View style={styles.usersCards}>
          {dummyUsers.map((customer, index) => (
            <CustomerCard
              key={index}
              customerName={customer.customerName}
              title={customer.title}
              text={customer.text}
              icon={<ChevronRightIcon color={theme.colors.textSecondary} />}
              leftIcon={<Phone color={theme.colors.textSecondary} size={14} />}
              phoneNumber={customer.phoneNumber}
            />
          ))}
        </View>
        <View style={styles.addButton}>
          <CustomButton
            style={styles.userButton}
            text="Add a new customer"
            onPress={() => router.push("/customer/addCustomer")}
            iconPosition="left"
            icon={Plus}
            iconColor={theme.colors.textSecondary}
            textColor={theme.colors.textSecondary}
            iconSize={20}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Customers;
