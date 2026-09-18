import { MeasurementForm } from "@/components/customer/MeasurementForm";
import { updateRecordStyles } from "@/components/customer/style";
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
import {
  getMeasurementById,
  NewMeasurement,
  updateMeasurement,
} from "@/services/measurement";
import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ArrowLeft, FileText, Save } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// All measurement + style fields for this screen, combined once so we
// don't rebuild these arrays on every render/validation check.
const ALL_FIELDS = [...upperFields, ...lowerFields];
const ALL_STYLE_OPTIONS = [...upperStyleOptions, ...lowerStyleOptions];

const MEASUREMENT_HISTORY = [
  { date: "08 Oct 2024", label: "Current record" },
  { date: "14 Sep 2024", label: "Previous fitting" },
];

const UpdateRecord = () => {
  const theme = useTheme<AppTheme>();
  const styles = updateRecordStyles(theme);
  const db = useSQLiteContext();
  const { customerId, measurementId } = useLocalSearchParams<{
    measurementId?: string;
    customerId?: string;
  }>();
  const measurementIdNum = Number(measurementId);
  const customerIdNum = Number(customerId);

  const [notes, setNotes] = useState(
    "Slight ease at the waist. Check sleeve pitch at next fitting.",
  );
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [styleSelections, setStyleSelections] = useState<
    Record<string, string>
  >({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!measurementId || Number.isNaN(measurementIdNum)) return;

    const loadRecord = async () => {
      const response = await getMeasurementById(db, measurementIdNum);
      if (!response.success || !response.data) return;

      const record = response.data;

      setMeasurements({
        shirtLength: String(record.shirt_length),
        chest: String(record.chest),
        shoulder: String(record.shoulder),
        sleeveLength: String(record.sleeve),
        collar: String(record.collar),
        gheraDamen: String(record.ghera),
        shalwarLength: String(record.shalwar_length),
        paonchaWidth: String(record.paoncha_width),
      });

      setStyleSelections({
        "Collar / Ban Style": record.collar_style ?? "",
        "Cuff / Sleeve End": record.cuff_style ?? "",
        "Pocket Configuration": record.pocket_config ?? "",
        "Bottom Garment Type": record.bottom_type ?? "",
        "Waist / Belt Attachment": record.waist_attachment ?? "",
      });
    };

    void loadRecord();
  }, [db, measurementId, measurementIdNum]);

  const onMeasurementChange = (key: string, value: string) => {
    setShowValidationErrors(false);
    setSaveError("");
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const onStyleSelect = (category: string, option: string) => {
    setShowValidationErrors(false);
    setSaveError("");
    setStyleSelections((prev) => ({ ...prev, [category]: option }));
  };

  const isFormComplete = () => {
    const allMeasurementsFilled = ALL_FIELDS.every(
      (field) => measurements[field.key],
    );
    const allStylesSelected = ALL_STYLE_OPTIONS.every(
      (group) => styleSelections[group.title],
    );
    return allMeasurementsFilled && allStylesSelected;
  };

  const saveUpdatedRecord = async () => {
    if (isSaving) return;

    if (!isFormComplete()) {
      setShowValidationErrors(true);

      return;
    }

    if (customerIdNum === null) {
      setSaveError(
        "Could not determine which customer this record belongs to.",
      );
      //console.log("work 4");
      return;
    }

    const payload: NewMeasurement = {
      customer_id: customerIdNum,
      shirt_length: Number(measurements.shirtLength),
      chest: Number(measurements.chest),
      shoulder: Number(measurements.shoulder),
      sleeve: Number(measurements.sleeveLength),
      collar: Number(measurements.collar),
      ghera: Number(measurements.gheraDamen),
      shalwar_length: Number(measurements.shalwarLength),
      paoncha_width: Number(measurements.paonchaWidth),
      ghera_style: styleSelections["Ghera / Damen Style"],
      collar_style: styleSelections["Collar / Ban Style"],
      cuff_style: styleSelections["Cuff / Sleeve End"],
      pocket_config: styleSelections["Pocket Configuration"],
      bottom_type: styleSelections["Bottom Garment Type"],
      waist_attachment: styleSelections["Waist / Belt Attachment"],
    };
    // console.log("work 5");
    setIsSaving(true);
    setSaveError("");
    try {
      // console.log("work 6");
      const result = await updateMeasurement(db, measurementIdNum, payload);
      // console.log(result);
      if (!result.success) {
        setSaveError(result.error);
        return;
      }
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Failed to update measurement:", error);
      setSaveError("Could not save measurements. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconButton
            icon={ArrowLeft}
            iconColor={theme.colors.black}
            backgroundColor={theme.colors.white}
            onPress={() => router.back()}
          />
          <Heading
            eyebrow="CUSTOMER PROFILE"
            title="Customer"
            titleColor={theme.colors.black}
          />
        </View>

        <View style={styles.recordCard}>
          <View style={styles.recordIcon}>
            <FileText size={20} color={theme.colors.accentGold} />
          </View>
          <View style={styles.recordInfo}>
            <Typography variant="body2" color={theme.colors.textPrimary}>
              Fitting record
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Upper + lower body measurements
            </Typography>
          </View>
          <View style={styles.status}>
            <Typography variant="caption" color={theme.colors.accentGold}>
              Draft
            </Typography>
          </View>
        </View>

        <MeasurementForm
          fields={ALL_FIELDS}
          styleOptions={ALL_STYLE_OPTIONS}
          measurements={measurements}
          styleSelections={styleSelections}
          showValidationErrors={showValidationErrors}
          onMeasurementChange={onMeasurementChange}
          onStyleSelect={onStyleSelect}
        />

        <Typography variant="h4" color={theme.colors.textSecondary}>
          FIT NOTES
        </Typography>
        <Typography variant="body2" color={theme.colors.textPrimary}>
          Notes for the next fitting
        </Typography>
        <TextInput
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add notes for the next fitting"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.notes}
        />

        <View style={styles.history}>
          <Typography variant="h4" color={theme.colors.accentGold}>
            MEASUREMENT HISTORY
          </Typography>
          {MEASUREMENT_HISTORY.map((record) => (
            <View key={record.date} style={styles.historyRow}>
              <Typography variant="caption" color={theme.colors.textPrimary}>
                {record.date}
              </Typography>
              <Typography variant="caption" color={theme.colors.textSecondary}>
                {record.label}
              </Typography>
            </View>
          ))}
        </View>

        {saveError ? (
          <Typography variant="caption" color={theme.colors.error}>
            {saveError}
          </Typography>
        ) : null}

        <CustomButton
          text={isSaving ? "loading ..." : "Save updated record"}
          icon={Save}
          iconPosition="right"
          iconSize={18}
          textColor={theme.colors.white}
          backgroundColor={theme.colors.accentGold}
          style={styles.saveButton}
          loading={isSaving}
          onPress={saveUpdatedRecord}
        />
        <CustomButton
          text="Keep editing later"
          icon={ArrowLeft}
          iconPosition="left"
          iconSize={16}
          textColor={theme.colors.textSecondary}
          backgroundColor={theme.colors.transparent}
          style={styles.laterButton}
          onPress={() => router.back()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateRecord;
