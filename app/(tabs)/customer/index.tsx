import { CustomerStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import CustomerCard from "@/components/ui/CustomerCard";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import SearchBar from "@/components/ui/SearchBar";
import { AppTheme } from "@/constants/theme";
import { getAllCustomers } from "@/services/customer";
import type { Customer } from "@/types/types";
import { router, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ChevronRightIcon, Phone, Plus } from "lucide-react-native";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Customers = () => {
  const theme = useTheme<AppTheme>();
  const styles = CustomerStyles(theme);
  const db = useSQLiteContext();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getAllCustomers(db).then((response) => {
        if (active) {
          setCustomers(response.data ?? []);
        }
      });
      return () => {
        active = false;
      };
    }, [db]),
  );
  console.log(customers);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading
            eyebrow="THE PEOPLE YOU SERVE"
            title="Customers"
            titleColor={theme.colors.black}
          />
          <IconButton onPress={() => router.push("/customer/addCustomer")} />
        </View>
        <View style={styles.inputContainer}>
          <SearchBar placeholder="Search by Name or Phone" />
        </View>

        <FlatList
          data={customers}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.usersCards}
          renderItem={({ item }) => (
            <CustomerCard
              name={item.name}
              text={item.address ?? "No address"}
              icon={<ChevronRightIcon color={theme.colors.textSecondary} />}
              leftIcon={<Phone color={theme.colors.textSecondary} size={14} />}
              phone={item.phone}
              onPress={() =>
                router.push({
                  pathname: "/customer/viewCustomer",
                  params: { customerId: String(item.id) },
                })
              }
            />
          )}
        />

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
