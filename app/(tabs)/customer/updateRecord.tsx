import CustomButton from "@/components/ui/CustomButton";
import Heading from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { Metrics } from "@/constants/metrics";
import { AppTheme } from "@/constants/theme";
import { router } from "expo-router";
import { ArrowLeft, ChevronDown, FileText, Save } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const feelings = ["Close", "Comfortable", "Relaxed"];
const measurementHistory = [
  { date: "08 Oct 2024", label: "Current record" },
  { date: "14 Sep 2024", label: "Previous fitting" },
];

const UpdateRecord = () => {
  const theme = useTheme<AppTheme>();
  const [selectedFeeling, setSelectedFeeling] = useState("Comfortable");
  const [notes, setNotes] = useState(
    "Slight ease at the waist. Check sleeve pitch at next fitting.",
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* <View style={styles.header}>
          <IconButton
            icon={ArrowLeft}
            iconColor={theme.colors.textPrimary}
            backgroundColor="transparent"
            onPress={() => router.back()}
          />
          <View style={styles.headerText}>
            <Typography variant="h4" color={theme.colors.red}>
              SARA KHAN · 08 OCT 2024
            </Typography>
            <Typography variant="h2" color={theme.colors.textPrimary}>
              Update record
            </Typography>
          </View>
        </View> */}
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

        <View
          style={[
            styles.recordCard,
            {
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.borderColor,
            },
          ]}
        >
          <View
            style={[
              styles.recordIcon,
              { backgroundColor: theme.colors.SageGreen },
            ]}
          >
            <FileText size={20} color={theme.colors.accentGold} />
          </View>
          <View style={styles.recordInfo}>
            <Typography variant="body2" color={theme.colors.textPrimary}>
              Fitting record #03
            </Typography>
            <Typography variant="caption" color={theme.colors.textSecondary}>
              Upper + lower body measurements
            </Typography>
          </View>
          <View
            style={[
              styles.status,
              {
                backgroundColor: theme.colors.SageGreen,
                borderColor: theme.colors.accentGold,
              },
            ]}
          >
            <Typography variant="caption" color={theme.colors.accentGold}>
              Draft
            </Typography>
          </View>
        </View>

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
          style={[
            styles.notes,
            {
              color: theme.colors.textPrimary,
              borderColor: theme.colors.borderColor,
              backgroundColor: theme.colors.cardBackground,
            },
          ]}
        />

        <Typography variant="h4" color={theme.colors.textSecondary}>
          HOW DID IT FEEL?
        </Typography>
        <View style={styles.feelings}>
          {feelings.map((feeling) => {
            const isSelected = selectedFeeling === feeling;
            return (
              <CustomButton
                key={feeling}
                text={feeling}
                onPress={() => setSelectedFeeling(feeling)}
                textColor={
                  isSelected
                    ? theme.colors.accentGold
                    : theme.colors.textSecondary
                }
                backgroundColor="transparent"
                style={[
                  styles.feelingButton,
                  {
                    borderColor: isSelected
                      ? theme.colors.accentGold
                      : theme.colors.borderColor,
                    backgroundColor: isSelected
                      ? theme.colors.SageGreen
                      : "transparent",
                  },
                ]}
              />
            );
          })}
        </View>

        <View
          style={[
            styles.history,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <Typography variant="h4" color={theme.colors.accentGold}>
            MEASUREMENT HISTORY
          </Typography>
          {measurementHistory.map((record) => (
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
        <CustomButton
          text="Save updated record"
          icon={Save}
          iconPosition="right"
          iconSize={18}
          textColor={theme.colors.white}
          backgroundColor={theme.colors.accentGold}
          style={styles.saveButton}
          onPress={() => router.replace("/(tabs)/customer/upperMeasurement")}
        />
        <CustomButton
          text="Keep editing later"
          icon={ChevronDown}
          iconPosition="left"
          iconSize={16}
          textColor={theme.colors.textSecondary}
          backgroundColor="transparent"
          style={styles.laterButton}
          onPress={() => router.back()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    gap: 12,
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  headerText: {
    gap: 2,
  },
  recordCard: {
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 16,
  },
  recordIcon: {
    alignItems: "center",
    borderRadius: 18,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  recordInfo: {
    flex: 1,
    gap: 2,
  },
  status: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  notes: {
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 100,
    padding: 14,
    textAlignVertical: "top",
  },
  feelings: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Metrics.spacingTiny,
  },
  feelingButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 22,
    paddingHorizontal: 4,
  },
  history: {
    borderRadius: 18,
    gap: 12,
    marginTop: 12,
    padding: 16,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    marginTop: 16,
    borderRadius: 26,
  },
  laterButton: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default UpdateRecord;
