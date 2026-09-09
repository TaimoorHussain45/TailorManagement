import OrdersCard from "@/components/orders/ordersCard";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { ordersData } from "@/constants/data";
import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/constants/theme";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const theme = useTheme<AppTheme>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Typography color={theme.colors.red}>THE WORK IN MOTION</Typography>
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: theme.colors.textPrimary }]}
          >
            Orders
          </Text>
        </View>
        <View>
          <IconButton />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={ordersData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          persistentScrollbar
          indicatorStyle="black"
          renderItem={({ item }) => <OrdersCard order={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: Metrics.spacingSmall,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontWeight: "700",
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    gap: Metrics.spacingXLarge,
    paddingBottom: Metrics.spacingXLarge,
  },
});
