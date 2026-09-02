import { AppTheme } from "@/constants/theme";
import { Fingerprint } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { finerPrintLogostyle } from "./style";
const FingerPrintLogo = () => {
  const theme = useTheme<AppTheme>();
  const styles = finerPrintLogostyle(theme);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.fingerPrintContainer}>
          <Fingerprint size={48} color="#ffffff" />
        </View>
      </View>
    </View>
  );
};

export default FingerPrintLogo;
