import { Comment } from "@/components/comment";
import { TypoBase } from "@/components/typography";
import { Colors } from "@/constants/Colors";
import { Post } from "@/models/post";
import { Feather } from "@expo/vector-icons";
import React, { FC, useMemo, useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { styles } from "./styles";

export const CommentsList: FC<{
  comments: Post["comments"];
  onComment: (commentValue: string, commentId?: string) => void;
}> = ({ comments, onComment }) => {
  const commentsValues = Object.values(comments);
  const commentsArray = useMemo(() => {
    const mainComments = commentsValues.filter((comment)=> !comment.parent_id)
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

  return (
    <View style={styles.containerComments}>
      {commentsArray.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separator}
          data={commentsArray}
          renderItem={({ item }) => <Comment data={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      ) : (
        <TypoBase fontStyle="bold" style={{ color: Colors.common.white }}>
          {"No comments yet"}
        </TypoBase>
      )}
      <View style={styles.containerCommentInput}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment"
          onChangeText={(value) => setCommentValue(value)}
        />
        <Pressable
          disabled={!Boolean(commentValue)}
          onPress={() => onComment(commentValue)}
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
