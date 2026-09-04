import NavLogo from "@/components/auth/NavLogo";
import OrderCard from "@/components/home/orderCard";
import CustomerCard from "@/components/ui/CustomerCard";
import Typography from "@/components/ui/Typography";
import { dummyCustomers, homeCardsData } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { getFormattedDate } from "@/utils/formattedDate";
import { ChevronRightIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyle } from "./style";

export default function HomeScreen() {
  const theme = useTheme<AppTheme>();
  const styles = homeStyle(theme);
  const date = new Date();
  const currentDate = getFormattedDate(date);
  console.log(currentDate);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <NavLogo />
      </View>
      <View style={styles.container}>
        <Typography style={styles.title} color={theme.colors.red}>
          {currentDate}
        </Typography>
      </View>
      <View style={styles.cardContainer}>
        {homeCardsData.map((element, index) => {
          const Icon = element.icon;
          return (
            <OrderCard
              key={index}
              icon={<Icon color={theme.colors.TealGreen} />}
              title={element.title}
              paragraph={element.paragraph}
              rightTitle={element.rightOrder}
            />
          );
        })}
      </View>
      <View style={styles.customerCard}>
        {dummyCustomers.map((customer, index) => (
          <CustomerCard
            key={index}
            customerName={customer.customerName}
            title={customer.title}
            text={customer.text}
            icon={<ChevronRightIcon color={theme.colors.textSecondary} />}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
