import OrdersCard from "@/components/orders/ordersCard";
import { ordersScreenStyles } from "@/components/orders/styles";
import Heading from "@/components/ui/Heading";
import { ordersData } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const theme = useTheme<AppTheme>();
  const styles = ordersScreenStyles(theme);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Heading eyebrow="THE WORK IN MOTION" title="Orders" />
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
          indicatorStyle={theme.colors.scrollIndicatorStyle}
          renderItem={({ item }) => <OrdersCard order={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
