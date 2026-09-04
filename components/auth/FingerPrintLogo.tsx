import { AppTheme } from "@/constants/theme";
import { Fingerprint } from "lucide-react-native";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { fingerPrintLogostyle } from "./style";
const FingerPrintLogo = () => {
  const theme = useTheme<AppTheme>();
  const styles = useMemo(() => fingerPrintLogostyle(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.fingerPrintContainer}>
          <Fingerprint size={48} color={theme.colors.offWhite} />
        </View>
      </View>
    </View>
  );
};

export default FingerPrintLogo;
