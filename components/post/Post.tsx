import { View } from "react-native";
import { TypoBase } from "../typography";
import { Post as IPost } from "@/models/post";
import { FC } from "react";

interface PostProps {
    data: IPost;
}

export const Post: FC<PostProps> = ({data}) => {
    const {title, assessment} = data;
  return (
    <View>
        <TypoBase >{title}</TypoBase>
        <TypoBase>{assessment}</TypoBase>
    </View>
  );
}