import { AppTheme } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const theme = useTheme<AppTheme>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.textPrimary }]}
        >
          Orders
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F1E8",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: "700",
    marginBottom: 16,
  },
});
