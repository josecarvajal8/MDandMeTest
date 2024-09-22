import { LayoutGradient } from "@/components/layout";
import { Post } from "@/components/post/";
import { Colors } from "@/constants/Colors";
import { useToggle } from "@/hooks/useToggle";
import { Post as IPost } from "@/models/post";
import { getPosts } from "@/services/posts";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { state: isLoading, handlers } = useToggle(false);
  const getPostsData = async () => {
    if (nextPage) {
      handlers.on();
      const data = await getPosts(nextPage);
      setNextPage(data.nextPage);
      setPosts([...posts, ...data.posts]);
      handlers.off();
    }
  };
  useEffect(() => {
    getPostsData();
  }, []);
  const separator = () => <View style={{ height: 16 }} />;
  return (
    <LayoutGradient>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={({ item }) => <Post data={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={separator}
        onEndReached={getPostsData}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator color={Colors.dark_purple} size={"small"} />
          ) : null
        }
      />
    </LayoutGradient>
  );
}
