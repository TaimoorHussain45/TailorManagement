import CheckBox from "@/components/customer/checkBox";
import { upperMeasurementStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { MeasurementInput } from "@/components/ui/MeasurementInput";
import Typography from "@/components/ui/Typography";
import {
    lowerFields,
    lowerStyleOptions,
    upperFields,
    upperStyleOptions,
} from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { ArrowLeft, ArrowRight, CircleAlert, Ruler } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const UpperMeasurement = () => {
  const theme = useTheme<AppTheme>();
  const [isUpper, setIsUpper] = useState(false);
  const styles = upperMeasurementStyles(theme);
  const handleUpper = () => {
    setIsUpper((prev) => !prev);
  };
  const handleMeasurement = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={ArrowLeft}
          iconColor={theme.colors.black}
          backgroundColor={theme.colors.white}
          onPress={() => router.back()}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Heading
          eyebrow="ALI KHAN . NEW FITTING"
          title={!isUpper ? "Upper body" : "Lower body"}
        />
        <Typography variant="caption">
          A close, comfortable fit starts with these six lines.
        </Typography>
        <View
          style={[
            styles.toolContainer,
            isUpper ? styles.toolContainerLower : styles.toolContainerUpper,
          ]}
        >
          <Ruler size={24} color={theme.colors.TealGreen} />
          <Typography
            variant="caption"
            color={theme.colors.textSecondary}
            style={styles.toolText}
          >
            Measure snugly, never tight. Record in inches.
          </Typography>
          <CircleAlert size={20} color={theme.colors.textSecondary} />
        </View>

        <View>
          <Typography variant="h4">BODY MEASUREMENTS</Typography>
          <View style={styles.inputContainer}>
            {!isUpper
              ? upperFields.map((element) => (
                  <MeasurementInput
                    key={element.key}
                    label={element.label}
                    unit={element.unit}
                  />
                ))
              : lowerFields.map((element) => (
                  <MeasurementInput
                    key={element.key}
                    label={element.label}
                    unit={element.unit}
                  />
                ))}
          </View>
          <Typography variant="h4">STYLE AND OPTIONS</Typography>
          <View style={styles.optionsContainer}>
            {!isUpper
              ? upperStyleOptions.map((element) => (
                  <View key={element.title}>
                    <Typography
                      variant="caption"
                      color={theme.colors.black}
                      style={styles.optionTitle}
                    >
                      {element.title}
                    </Typography>
                    <View style={styles.bottomGarment}>
                      {element.options.map((option) => (
                        <CheckBox key={option} options={option} />
                      ))}
                    </View>
                  </View>
                ))
              : lowerStyleOptions.map((element) => (
                  <View key={element.key}>
                    <Typography
                      variant="caption"
                      color={theme.colors.black}
                      style={styles.optionTitle}
                    >
                      {element.title}
                    </Typography>
                    <View style={styles.bottomGarment}>
                      {element.options.map((option) => (
                        <CheckBox key={option} options={option} />
                      ))}
                    </View>
                  </View>
                ))}
          </View>

          <View style={styles.btn}>
            {isUpper && (
              <CustomButton
                text="Back"
                textColor={theme.colors.black}
                style={styles.backButton}
                onPress={handleUpper}
              />
            )}

            <CustomButton
              text={!isUpper ? "Continue to lower body" : "Save measurement"}
              icon={ArrowRight}
              iconSize={24}
              iconPosition="right"
              style={
                isUpper
                  ? styles.continueButtonUpper
                  : styles.continueButtonLower
              }
              backgroundColor={theme.colors.TealGreen}
              onPress={isUpper ? handleMeasurement : handleUpper}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.caresoul}>
        <TouchableOpacity
          style={[
            styles.upper,
            !isUpper ? styles.upperActive : styles.upperInactive,
          ]}
          onPress={() => setIsUpper((prev) => !prev)}
        />
        <TouchableOpacity
          style={[
            styles.upper,
            isUpper ? styles.upperActive : styles.upperInactive,
          ]}
          onPress={() => setIsUpper((prev) => !prev)}
        />
      </View>
    </SafeAreaView>
  );
};

export default UpperMeasurement;
