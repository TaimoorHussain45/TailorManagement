import { Metrics } from "@/constants/metrics";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";

const checkBox = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity style={styles.optionRow}>
      <View
        style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}
      >
        <Check size={10} color="#ffffff" />
      </View>
      <Typography style={styles.optionText}>{option}</Typography>
    </TouchableOpacity>
  );
};

export default checkBox;

const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  optionCard: {
    flexGrow: 1,
    minWidth: "45%",
    backgroundColor: "#FBF8F1",
    borderWidth: 1,
    borderColor: "#E4DCC9",
    borderRadius: Metrics.radiusMedium,
    padding: 14,
  },
  optionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1B1B16",
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#B7AF9B",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    backgroundColor: "#1F4B43",
    borderColor: "#1F4B43",
  },
  optionText: {
    fontSize: 13,
    color: "#3A3730",
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: Metrics.spacingLarge,
    marginBottom: Metrics.spacingLarge,
  },
});
