import { CustomerStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import CustomerCard from "@/components/ui/CustomerCard";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import SearchBar from "@/components/ui/SearchBar";
import Typography from "@/components/ui/Typography";
import { AppTheme } from "@/constants/theme";
import { useCustomersHook } from "@/hooks/useCustomersHook";
import { router } from "expo-router";
import { ChevronRightIcon, Phone } from "lucide-react-native";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Customers = () => {
  const theme = useTheme<AppTheme>();
  const styles = CustomerStyles(theme);
  const {
    customers,
    loading,
    loadError,
    loadCustomers,
    visibleCustomerCount,
    setVisibleCustomerCount,
  } = useCustomersHook();
  const [searchQuery, setSearchQuery] = useState("");

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
          onPress={() => router.push("/(tabs)/customer/addCustomer")}
        />
      </View>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(normalizedQuery) ||
      customer.phone.toLowerCase().includes(normalizedQuery),
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading
            eyebrow="THE PEOPLE YOU SERVE"
            title="Customers"
            titleColor={theme.colors.black}
          />
          <IconButton
            onPress={() => router.push("/(tabs)/customer/addCustomer")}
          />
        </View>
        <View style={styles.inputContainer}>
          <SearchBar
            placeholder="Search by Name or Phone"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setVisibleCustomerCount(10);
            }}
          />
        </View>

        <FlatList
          data={filteredCustomers.slice(0, visibleCustomerCount)}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.usersCards}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            visibleCustomerCount < filteredCustomers.length ||
            visibleCustomerCount > 10 ? (
              <View style={styles.listFooter}>
                {visibleCustomerCount < filteredCustomers.length ? (
                  <TouchableOpacity
                    onPress={() =>
                      setVisibleCustomerCount((count) =>
                        Math.min(count + 10, filteredCustomers.length),
                      )
                    }
                    accessibilityRole="button"
                    style={styles.listFooterAction}
                  >
                    <Typography variant="body2" color={theme.colors.primary}>
                      See more
                    </Typography>
                  </TouchableOpacity>
                ) : null}
                {visibleCustomerCount > 10 ? (
                  <TouchableOpacity
                    onPress={() => setVisibleCustomerCount(10)}
                    accessibilityRole="button"
                    style={styles.listFooterAction}
                  >
                    <Typography variant="body2" color={theme.colors.primary}>
                      See less
                    </Typography>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null
          }
          ListEmptyComponent={
            <Typography variant="caption">No matching customers</Typography>
          }
          renderItem={({ item }) => (
            <CustomerCard
              name={item.name}
              text={item.address ?? "No address"}
              icon={<ChevronRightIcon color={theme.colors.textSecondary} />}
              leftIcon={<Phone color={theme.colors.textSecondary} size={14} />}
              phone={item.phone}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/customer/viewCustomer",
                  params: { customerId: String(item.id) },
                })
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Customers;
