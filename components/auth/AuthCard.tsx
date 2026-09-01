import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../ui/Typography";

type AuthCardProps = {
  icon: React.ReactNode;
  title: string;
  paragraph: string;
};

const AuthCard = ({ icon, title, paragraph }: AuthCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>{icon}</View>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="caption" color="#6B6B6B">
        {paragraph}
      </Typography>
    </View>
  );
};

export default AuthCard;

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 150,
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E3D9C9",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
    margin: 10,

    // shadow (Android)
    elevation: 4,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F5EFE3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {},
  paragraph: {
    fontSize: 12,

    lineHeight: 17,
  },
});
