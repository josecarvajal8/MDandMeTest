import { LayoutGradient } from "@/components/layout";
import { Post } from "@/components/post/";
import { Colors } from "@/constants/Colors";
import { useToggle } from "@/hooks/useToggle";
import { Post as IPost } from "@/models/post";
import { getPostById, getPosts } from "@/services/posts";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { state: isLoading, handlers } = useToggle(false);

  const updatePost = async (postId: string) => {
    const data = await getPostById(postId);
    setPosts((prev) => prev.map((post) => (post.id === postId ? data : post)));
  };

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
        renderItem={({ item }) => (
          <Post data={item} updatePostCallback={updatePost} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
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
