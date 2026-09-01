import AuthCard from "@/components/auth/AuthCard";
import FingerPrintLogo from "@/components/auth/FingerPrintLogo";
import Typography from "@/components/ui/Typography";
import { authCardsData } from "@/constants/data";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lock = () => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.logo}>
        <FingerPrintLogo />
      </View>
      <View>
        <Typography align="center" color="red" variant="h4">
          PRIVATE BY DESIGN{" "}
        </Typography>
        <Typography align="center" variant="h2">
          Unlock your worktable faster
        </Typography>
        <Typography align="center" variant="body1" color="#6B6B6B">
          Use your fingerprint or face to open AtelierOS. Your biometric data
          never leaves this device.
        </Typography>
      </View>
      <View style={style.cardContainer}>
        {authCardsData.map((element, index) => {
          const Icon = element.icon;
          return (
            <AuthCard
              key={index}
              icon={<Icon />}
              title={element.title}
              paragraph={element.paragraph}
            />
          );
        })}
      </View>
      <View></View>
    </SafeAreaView>
  );
};
export default lock;
const style = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    margin: 20,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
