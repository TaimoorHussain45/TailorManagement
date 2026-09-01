import { Fingerprint } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
const FingerPrintLogo = () => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFE6D7",
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E3D9C9",
    borderWidth: 2,
  },
  subContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 60,
    borderStyle: "dashed",
    borderColor: "red",
  },
  fingerPrintContainer: {
    backgroundColor: "#1F5D58",
    borderRadius: 30,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
