import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export async function validateBiometricAvailability() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    Alert.alert("Not supported", "This device has no fingerprint sensor.");
    return false;
  }

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isEnrolled) {
    Alert.alert(
      "No fingerprint set up",
      "Set up a fingerprint in your device settings first.",
    );
    return false;
  }

  return true;
}
