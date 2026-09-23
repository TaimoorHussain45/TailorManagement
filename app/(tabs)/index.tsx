import NavLogo from "@/components/auth/NavLogo";
import OrderCard from "@/components/home/orderCard";
import { homeStyle } from "@/components/home/styles";
import WelcomeCard from "@/components/home/welcomeCard";
import CustomButton from "@/components/ui/CustomButton";
import CustomerCard from "@/components/ui/CustomerCard";
import Typography from "@/components/ui/Typography";
import { homeCardsData } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { useDashboardData } from "@/hooks/dashboardHook";
import { getFormattedDate, getGreeting } from "@/utils/formattedDate";
import { getCardTitle } from "@/utils/getCardTitle";
import { router } from "expo-router";
import { ChevronRight, ChevronRightIcon } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme<AppTheme>();
  const styles = homeStyle(theme);

  const { data, loading } = useDashboardData();

  const currentDate = getFormattedDate(new Date());
  const greeting = getGreeting(new Date());

  const cards = homeCardsData.map((card) => ({
    ...card,
    title: getCardTitle(card.key, card.title, data, loading),
  }));

  const hasRecentActivity = Boolean(
    data?.recentActivity && data.recentActivity.length > 0,
  );

  const handleViewCustomers = () => {
    router.push("/(tabs)/customer");
  };

  const handleCustomerPress = (customerId: number) => {
    console.log("working....");
    router.push({
      pathname: "/(tabs)/customer/viewCustomer",
      params: {
        customerId: String(customerId),
      },
    });
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <NavLogo />

      <View style={styles.container}>
        <Typography style={styles.title} color={theme.colors.red}>
          {currentDate}
        </Typography>

        <Typography
          color={theme.colors.black}
          variant="h1"
          style={styles.gretting}
        >
          {greeting}
        </Typography>
      </View>

      <WelcomeCard
        fittingsThisWeek={data?.fittingsThisWeek ?? 0}
        weekPlannedPercent={data?.weekPlannedPercent ?? 0}
      />

      {/* Dashboard Cards */}
      <View style={styles.cardContainer}>
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <OrderCard
              key={card.key}
              icon={<Icon color={theme.colors.TealGreen} />}
              title={card.title}
              paragraph={card.paragraph}
              rightTitle={card.rightOrder}
              onPress={card.onPress}
            />
          );
        })}
      </View>

      {/* Recent Activity Header */}
      <View style={styles.customerButtonContainer}>
        <Typography variant="body2">Recent Activity</Typography>

        <CustomButton
          text="View customers"
          onPress={handleViewCustomers}
          textColor={theme.colors.primary}
          backgroundColor="transparent"
          style={styles.customerButton}
          icon={ChevronRight}
          iconSize={20}
          iconPosition="right"
          disabled={!hasRecentActivity}
        />
      </View>

      {/* Recent Activity */}
      {!loading && !hasRecentActivity ? (
        <View style={styles.emptyContainer}>
          <Typography variant="h4">No recent activity yet.</Typography>
        </View>
      ) : (
        <View style={styles.customerCard}>
          {data?.recentActivity.map((activity) => (
            <CustomerCard
              key={activity.customerId}
              name={activity.customerName}
              text={`Last Fitted ${getFormattedDate(
                new Date(activity.lastUpdated),
              )}`}
              icon={<ChevronRightIcon color={theme.colors.textSecondary} />}
              onPress={() => handleCustomerPress(activity.customerId)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
