import { upperMeasurementStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import { IconButton } from "@/components/ui/IconButton";
import { MeasurementInput } from "@/components/ui/MeasurementInput";
import Typography from "@/components/ui/Typography";
import { lowerFields, upperFields } from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { ArrowLeft, ArrowRight, CircleAlert, Ruler } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const UpperMeasurement = () => {
  const theme = useTheme<AppTheme>();
  const [isUpper, setIsUpper] = useState(false);
  const styles = upperMeasurementStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={ArrowLeft}
          iconColor={theme.colors.black}
          backgroundColor={theme.colors.white}
          onPress={() => router.back()}
        />
        <View style={styles.caresoul}>
          <TouchableOpacity
            style={[
              styles.upper,
              {
                backgroundColor: isUpper
                  ? theme.colors.TealGreen
                  : "transparent",
              },
            ]}
            onPress={() => setIsUpper((prev) => !prev)}
          />
          <TouchableOpacity
            style={[
              styles.upper,
              {
                backgroundColor: isUpper
                  ? theme.colors.TealGreen
                  : "transparent",
              },
            ]}
            onPress={() => setIsUpper((prev) => !prev)}
          />
        </View>
      </View>
      <Typography variant="h4">ALI KHAN . NEW FITTING</Typography>
      <Typography variant="h3">
        {!isUpper ? "Upper body" : "Lower body"}
      </Typography>
      <Typography variant="caption">
        A close, comfortable fit starts with these six lines.
      </Typography>
      <View
        style={[
          styles.toolContainer,
          {
            backgroundColor: isUpper
              ? theme.colors.borderColor
              : theme.colors.SageGreen,
          },
        ]}
      >
        <Ruler size={24} color={theme.colors.TealGreen} />
        <Typography
          variant="caption"
          color={theme.colors.textSecondary}
          style={{ width: "80%" }}
        >
          Measure snugly, never tight. Record in inches.
        </Typography>
        <CircleAlert size={20} color={theme.colors.textSecondary} />
      </View>

      <View>
        <Typography variant="h4">BODY MEASUREMENTS</Typography>
        <View style={styles.inputContainer}>
          {!isUpper
            ? upperFields.map((element, index) => (
                <MeasurementInput key={index} label={element.label} unit="in" />
              ))
            : lowerFields.map((element, index) => (
                <MeasurementInput key={index} label={element.label} unit="in" />
              ))}
        </View>
        <Typography variant="h4">STYLE AND OPTIONS</Typography>
        

        <View style={styles.btn}>
          <CustomButton
            text={isUpper ? "Continue to lower body" : "Save measurement"}
            icon={ArrowRight}
            iconSize={24}
            iconPosition="right"
            backgroundColor={theme.colors.TealGreen}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpperMeasurement;
