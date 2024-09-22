import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  timeAgo:{
    color: Colors.common.white,
    textAlign: "right",
    width: "100%",
  },
  containerReplyButtons:{
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
