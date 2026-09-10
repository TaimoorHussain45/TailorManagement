import MeasurementCard from "@/components/customer/MeasurementCard";
import OrdersCard from "@/components/orders/ordersCard";
import { updateMeasurementStyles } from "@/components/orders/styles";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { singleMeasurementData, singleOrdersData } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { ArrowLeft, Ellipsis, MoveUpRight } from "lucide-react-native";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewCustomer = () => {
  const theme = useTheme<AppTheme>();
  const styles = updateMeasurementStyles(theme);
  //   const { customerName, title, text, phoneNumber } = useLocalSearchParams<{
  //     customerName?: string;
  //     title?: string;
  //     text?: string;
  //     phoneNumber?: string;
  //   }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <View style={styles.header}>
          <IconButton
            icon={ArrowLeft}
            iconColor={theme.colors.black}
            backgroundColor={theme.colors.white}
            onPress={() => router.back()}
          />
          <Heading
            eyebrow="CUSTOMER PROFILE"
            title={"Customer"}
            titleColor={theme.colors.black}
          />
        </View>
        <View>
          <IconButton
            icon={Ellipsis}
            iconColor={theme.colors.black}
            backgroundColor={theme.colors.white}
          />
        </View>
      </View>
      <View style={styles.details}>
        <MeasurementCard data={singleMeasurementData} />
        <OrdersCard order={singleOrdersData} />
      </View>
      <View>
        <CustomButton
          text="Update measurement"
          icon={MoveUpRight}
          iconPosition="right"
          iconSize={17}
          textColor={theme.colors.black}
          style={styles.measurementBtn}
          onPress={() => router.push("/customer/updateRecord")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewCustomer;
