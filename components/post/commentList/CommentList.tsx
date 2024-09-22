import { Comment } from "@/components/comment";
import { TypoBase } from "@/components/typography";
import { Colors } from "@/constants/Colors";
import { Post } from "@/models/post";
import { Feather } from "@expo/vector-icons";
import React, { FC, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { styles } from "./styles";

export const CommentsList: FC<{
  comments: Post["comments"];
  onComment: (commentValue: string, commentId?: number | null) => void;
}> = ({ comments, onComment }) => {
  const commentsValues = Object.values(comments);
  const commentsArray = useMemo(() => {
    const mainComments = commentsValues.filter((comment) => !comment.parent_id);
    return mainComments.map((comment) => {
      const replies = commentsValues.filter(
        (child) => child.parent_id === comment.id
      );
      return {
        ...comment,
        replies,
      };
    });
  }, [comments]);
  const separator = () => <View style={{ height: 16 }} />;
  const [commentValue, setCommentValue] = useState<string>("");
  const [replyId, setReplyId] = useState<number | null>(null);
  const refInput = React.useRef<TextInput>(null);
  const userIsBeingReplied =
    replyId !== null ? comments[replyId].display_name : null;
  useEffect(() => {
    if (replyId !== null) {
      refInput.current?.focus();
    }
  }, [replyId]);

  return (
    <View style={styles.containerComments}>
      {commentsArray.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separator}
          data={commentsArray}
          renderItem={({ item }) => (
            <Comment data={item} setReplyId={(id) => setReplyId(id)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      ) : (
        <TypoBase fontStyle="bold" style={{ color: Colors.common.white }}>
          {"No comments yet"}
        </TypoBase>
      )}
      <View style={styles.containerCommentInput}>
        <TextInput
          ref={refInput}
          style={styles.commentInput}
          placeholder={
            userIsBeingReplied
              ? `Replying ${userIsBeingReplied}`
              : "Add a comment"
          }
          onChangeText={(value) => setCommentValue(value)}
        />
        <Pressable
          disabled={!Boolean(commentValue)}
          onPress={() => onComment(commentValue, replyId)}
          style={{
            ...styles.buttonComment,
            opacity: !Boolean(commentValue) ? 0.5 : 1,
          }}
        >
          <Feather name="arrow-up" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};
