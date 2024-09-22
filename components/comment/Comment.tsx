import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Comment as IComment } from "@/models/post";
import { TypoBase } from "../typography";
import { styles } from "./styles";
import { Colors } from "@/constants/Colors";
import { timeAgo } from "@/utils/utilities";
import { useToggle } from "@/hooks/useToggle";

interface CommentData extends IComment {
  replies?: IComment[];
}

interface CommentProps {
  data: CommentData;
  isReply?: boolean;
}
const ListOfReplies: React.FC<{ replies: IComment[] }> = ({ replies }) => {
  return (
    <View style={{ ...styles.container, paddingLeft: 16 }}>
      {replies.map((reply) => (
        <Comment key={reply.id} data={reply} isReply={true} />
      ))}
    </View>
  );
};
export const Comment: React.FC<CommentProps> = ({ data, isReply = false }) => {
  const { display_name, text, created_at, replies = [] } = data;
  const { state: showReplies, handlers } = useToggle(false);
  return (
    <View style={styles.container}>
      <TypoBase
        size="caption"
        fontStyle="semibold"
        style={{ color: Colors.common.white }}
      >
        {`@${display_name}`}
      </TypoBase>
      <TypoBase style={{ color: Colors.common.white }}>{text}</TypoBase>
      {!isReply && (
        <View style={styles.containerReplyButtons}>
          {replies.length ? (
            <TouchableOpacity onPress={handlers.toggle}>
              <TypoBase
                size="caption"
                fontStyle="bold"
                style={{ color: Colors.common.white }}
              >
                {!showReplies ? "Replies" : "Hide replies"}
              </TypoBase>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity onPress={handlers.toggle}>
            <TypoBase
              size="caption"
              fontStyle="bold"
              style={{ color: Colors.common.white }}
            >
              {"Reply"}
            </TypoBase>
          </TouchableOpacity>
        </View>
      )}
      {showReplies && <ListOfReplies replies={replies} />}
      <TypoBase
        size="caption"
        fontStyle="regular"
        style={
          isReply ? { ...styles.timeAgo, textAlign: "left" } : styles.timeAgo
        }
      >
        {timeAgo(new Date(created_at))}
      </TypoBase>
    </View>
  );
};
