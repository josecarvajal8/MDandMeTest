import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerComments: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  containerCommentInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.common.white,
    borderRadius: 10,
    padding: 16,
  },
  buttonComment: {
    borderRadius: 10,
    backgroundColor: Colors.dark_purple,
    padding: 4,
  },
  commentInput: {
    flex: 1,
  },
});
