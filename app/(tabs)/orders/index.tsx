import OrdersCard from "@/components/orders/ordersCard";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { ordersData } from "@/constants/data";
import { Metrics } from "@/constants/metrics";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Heading eyebrow="THE WORK IN MOTION" title="Orders" />
        </View>
        <View></View>
        <View>
          <IconButton />
        </View>
      </View>
      <View></View>
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
    padding: Metrics.spacingMedium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    gap: Metrics.spacingXLarge,
    paddingBottom: Metrics.spacingXLarge,
  },
});
