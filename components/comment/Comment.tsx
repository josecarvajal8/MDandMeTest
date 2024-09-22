import React from "react";
import { View } from "react-native";
import { Comment as IComment } from "@/models/post";
import { TypoBase } from "../typography";
import { styles } from "./styles";
import { Colors } from "@/constants/Colors";
import { timeAgo } from "@/utils/utilities";

interface CommentProps {
  data: IComment;
}

export const Comment: React.FC<CommentProps> = ({ data }) => {
  const { display_name, text, created_at } = data;
  return (
    <View style={styles.container}>
      <TypoBase
        size="caption"
        fontStyle="semibold"
        style={{ color: Colors.common.white }}
      >{`@${display_name}`}</TypoBase>
      <TypoBase style={{ color: Colors.common.white }}>{text}</TypoBase>
      <TypoBase
        size="caption"
        fontStyle="regular"
        style={styles.timeAgo}
      >
        {timeAgo(new Date(created_at))}
      </TypoBase>
    </View>
  );
};
