import React, { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, View } from "react-native";

export const LayoutGradient: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LinearGradient
      colors={[Colors.light_purple, Colors.soft_purple]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.root}>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
});
