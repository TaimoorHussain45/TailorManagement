import { MeasurementForm } from "@/components/customer/MeasurementForm";
import { upperMeasurementStyles } from "@/components/customer/style";
import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import {
  lowerFields,
  lowerStyleOptions,
  upperFields,
  upperStyleOptions,
} from "@/constants/data";
import { AppTheme } from "@/constants/theme";
import { getCustomerById } from "@/services/customer";
import { addMeasurement, type NewMeasurement } from "@/services/measurement";
import { Customer } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, ArrowRight, CircleAlert, Ruler } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const UpperMeasurement = () => {
  const theme = useTheme<AppTheme>();
  const db = useSQLiteContext();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [styleSelections, setStyleSelections] = useState<
    Record<string, string>
  >({});
  const [isUpper, setIsUpper] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const styles = upperMeasurementStyles(theme);

  const { customerId } = useLocalSearchParams<{ customerId: string }>();

  useEffect(() => {
    const id = Number(customerId);
    if (!customerId || Number.isNaN(id)) {
      return;
    }
    getCustomerById(db, id).then((response) => {
      if (response.success) setCustomer(response.data);
    });
  }, [customerId, db]);

  const onMeasurementChange = (key: string, value: string) => {
    setSaveError("");
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const onStyleSelect = (category: string, option: string) => {
    setSaveError("");
    setStyleSelections((prev) => ({ ...prev, [category]: option }));
  };

  const hasEmptyField = (fields: { key: string }[]) =>
    fields.some((item) => !measurements[item.key]);
  const hasMissingStyleOption = (
    groups: { title: string; options: string[] }[],
  ) => groups.some((group) => !styleSelections[group.title]);

  const onContinueToLower = () => {
    if (
      hasEmptyField(upperFields) ||
      hasMissingStyleOption(upperStyleOptions)
    ) {
      setShowValidationErrors(true);
      return;
    }
    setShowValidationErrors(false);
    setIsUpper(true);
  };

  const onBackToUpper = () => {
    setShowValidationErrors(false);
    setIsUpper(false);
  };

  const handleMeasurement = async () => {
    if (isSaving) return;
    if (
      hasEmptyField(lowerFields) ||
      hasMissingStyleOption(lowerStyleOptions)
    ) {
      setShowValidationErrors(true);
      return;
    }
    const payload: NewMeasurement = {
      customer_id: Number(customerId),
      shirt_length: Number(measurements.shirtLength),
      chest: Number(measurements.chest),
      shoulder: Number(measurements.shoulder),
      sleeve: Number(measurements.sleeveLength),
      collar: Number(measurements.collar),
      ghera: Number(measurements.gheraDamen),
      shalwar_length: Number(measurements.shalwarLength),
      paoncha_width: Number(measurements.paonchaWidth),
      collar_style: styleSelections["Collar / Ban Style"],
      cuff_style: styleSelections["Cuff / Sleeve End"],
      pocket_config: styleSelections["Pocket Configuration"],
      bottom_type: styleSelections["Bottom Garment Type"],
      waist_attachment: styleSelections["Waist / Belt Attachment"],
    };
    setIsSaving(true);
    setSaveError("");
    try {
      const response = await addMeasurement(db, payload);
      if (!response.success) {
        setSaveError(response.error);
        return;
      }
      router.push("/(tabs)");
    } catch (error) {
      console.error("Failed to save measurement:", error);
      setSaveError("Could not save measurements. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
          eyebrow={
            customer
              ? `${customer.name.toUpperCase()} · NEW FITTING`
              : "NEW FITTING"
          }
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
          <MeasurementForm
            fields={isUpper ? lowerFields : upperFields}
            styleOptions={isUpper ? lowerStyleOptions : upperStyleOptions}
            measurements={measurements}
            styleSelections={styleSelections}
            showValidationErrors={showValidationErrors}
            onMeasurementChange={onMeasurementChange}
            onStyleSelect={onStyleSelect}
          />
          <View style={styles.btn}>
            {isUpper && (
              <CustomButton
                text="Back"
                textColor={theme.colors.black}
                style={styles.backButton}
                onPress={onBackToUpper}
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
              loading={isSaving}
              onPress={isUpper ? handleMeasurement : onContinueToLower}
            />
          </View>

          {saveError ? (
            <Typography variant="caption" color={theme.colors.error}>
              {saveError}
            </Typography>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.caresoul}>
        <View
          style={[
            styles.upper,
            !isUpper ? styles.upperActive : styles.upperInactive,
          ]}
        />
        <View
          style={[
            styles.upper,
            isUpper ? styles.upperActive : styles.upperInactive,
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default UpperMeasurement;
