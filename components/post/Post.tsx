import {
  Pressable,
  View,
  Animated,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
} from "react-native";
import { TypoBase } from "../typography";
import { Post as IPost } from "@/models/post";
import React, { FC, useRef, useState } from "react";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { useToggle } from "@/hooks/useToggle";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { TrayModal } from "../modal";
import { CommentsList } from "./commentList/CommentList";
import { updatePost } from "@/services/posts";
import { getRandomName } from "@/utils/utilities";

interface PostProps {
  data: IPost;
  updatePostCallback: (postId: string) => void;
}

const CollapsableContent: FC<{
  children: React.ReactNode;
  initialHeight?: number;
}> = ({ children, initialHeight = 100 }) => {
  const animationHeight = useRef(new Animated.Value(initialHeight)).current;
  const { state: isExpanded, handlers } = useToggle(false);
  const [contentHeight, setContentHeight] = useState(0);
  const onExpand = () => {
    const finalHeight = isExpanded ? 100 : contentHeight;

    Animated.timing(animationHeight, {
      toValue: finalHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();

    handlers.toggle();
  };
  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };
  return (
    <TouchableWithoutFeedback onPress={onExpand}>
      <Animated.View style={{ height: animationHeight, overflow: "hidden" }}>
        <View
          onLayout={onContentLayout}
          style={{ position: "absolute", gap: 8 }}
        >
          {children}
        </View>
        {!isExpanded && (
          <LinearGradient
            colors={["rgba(255, 255, 255,0.5)", Colors.common.white]}
            style={styles.fadeGradient}
          />
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const Post: FC<PostProps> = ({ data, updatePostCallback }) => {
  const { title, patient_description, num_hugs, comments, assessment, id } =
    data;
  const commentsKeys = Object.keys(comments);
  const numOfComments = Object.values(comments).filter(
    (comment) => !comment.parent_id
  ).length;

  const { state: showComments, handlers } = useToggle(false);
  const onCommentPost = async (comment: string, commentId?: number | null) => {
    const lastCommentKey = commentsKeys.length
      ? parseInt(commentsKeys[commentsKeys.length - 1])
      : 0;
    const commentPayload = {
      comments: {
        [`${lastCommentKey + 1}`]: {
          display_name: getRandomName(),
          parent_id: commentId ? commentId : null,
          text: comment,
          id: lastCommentKey + 1,
          created_at: new Date().toISOString(),
        },
        ...comments,
      },
    };
    await updatePost(id, commentPayload);
    await updatePostCallback(id);
    handlers.off();
  };

  const onAddHug = async () => {
    const hugPayload = {
      num_hugs: num_hugs + 1,
    };
    await updatePost(id, hugPayload);
    await updatePostCallback(id);
  };

  return (
    <View style={styles.container}>
      <TrayModal
        isVisible={showComments}
        onDismiss={handlers.off}
        title={"Comments"}
      >
        <CommentsList comments={comments} onComment={onCommentPost} />
      </TrayModal>
      <TypoBase fontStyle="bold" size="title" style={{ textAlign: "justify" }}>
        {title}
      </TypoBase>
      <CollapsableContent>
        <TypoBase fontStyle="semibold">{"Patient description"}</TypoBase>
        <TypoBase style={{ textAlign: "justify" }}>
          {patient_description}
        </TypoBase>
      </CollapsableContent>
      <CollapsableContent initialHeight={150}>
        <TypoBase fontStyle="semibold">{"Assessment"}</TypoBase>
        <TypoBase style={{ textAlign: "justify" }}>{assessment}</TypoBase>
      </CollapsableContent>
      <View style={styles.containerInteractions}>
        <Pressable onPress={onAddHug} style={styles.buttonReactions}>
          <Feather name="heart" size={24} color={Colors.dark_purple} />
          <TypoBase>
            {num_hugs !== 1 ? `${num_hugs} Hugs` : `${num_hugs} Hug`}
          </TypoBase>
        </Pressable>
        <Pressable style={styles.buttonReactions} onPress={handlers.on}>
          <Feather name="message-circle" size={24} color="black" />
          <TypoBase>
            {numOfComments !== 1
              ? `${numOfComments} Comments`
              : `${numOfComments} Comment`}
          </TypoBase>
        </Pressable>
      </View>
    </View>
  );
};
