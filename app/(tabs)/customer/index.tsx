import { CustomerStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import CustomerCard from "@/components/ui/CustomerCard";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import SearchBar from "@/components/ui/SearchBar";
import Typography from "@/components/ui/Typography";
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
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const response = await getAllCustomers(db);

      if (!response.success) {
        setLoadError(
          typeof response.error === "string"
            ? response.error
            : "Unable to load customers. Please try again.",
        );
        setCustomers([]);
        return;
      }

      setCustomers(response.data);
    } catch (error) {
      console.error("loadCustomers failed:", error);
      setLoadError("Unable to load customers. Please try again.");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      loadCustomers();
    }, [loadCustomers]),
  );

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Loading customers...</Typography>
      </View>
    );
  }

  if (loadError) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">Unable to load customers</Typography>
        <Typography variant="caption">{loadError}</Typography>
        <CustomButton text="Try again" onPress={() => loadCustomers()} />
      </View>
    );
  }

  if (customers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Typography variant="h2">No customer yet!</Typography>
        <Typography variant="caption">Please add customer</Typography>
        <CustomButton
          text="Add customer"
          onPress={() => router.push("/customer/addCustomer")}
        />
      </View>
    );
  }

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
