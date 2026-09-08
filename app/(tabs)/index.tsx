import NavLogo from "@/components/auth/NavLogo";
import OrderCard from "@/components/home/orderCard";
import { homeStyle } from "@/components/home/styles";
import WelcomeCard from "@/components/home/welcomeCard";
import CustomButton from "@/components/ui/CustomButton";
import CustomerCard from "@/components/ui/CustomerCard";
import Typography from "@/components/ui/Typography";
import { dummyCustomers, homeCardsData } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { getFormattedDate, getGreeting } from "@/utils/formattedDate";
import { router } from "expo-router";
import { ChevronRight, ChevronRightIcon } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme<AppTheme>();
  const styles = homeStyle(theme);
  const date = new Date();
  const currentDate = getFormattedDate(date);
  let message = getGreeting(date);
  console.log(currentDate);

  return (
    <ScrollView
      style={{ flex: 1, margin: 15 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <NavLogo />
      </View>
      <View style={styles.container}>
        <Typography style={styles.title} color={theme.colors.red}>
          {currentDate}
        </Typography>
        <Typography
          color={theme.colors.black}
          variant="h1"
          style={styles.gretting}
        >
          {message}
        </Typography>
      </View>
      <View>
        <WelcomeCard />
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
      <View style={styles.customerButtonContainer}>
        <Typography variant="body2">Recent Activity</Typography>
        <CustomButton
          text="View customers"
          onPress={() => router.replace("/(tabs)/customer")}
          textColor={theme.colors.primary}
          backgroundColor="transparent"
          style={styles.customerButton}
          icon={ChevronRight}
          iconSize={20}
          iconPosition="right"
        />
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
    </ScrollView>
  );
}
