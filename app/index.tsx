import { LayoutGradient } from "@/components/layout";
import { Post } from "@/components/post/Post";
import { Post as IPost } from "@/models/post";
import { getPosts } from "@/services/posts";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function HomeScreen() {
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPostsData = async () => {
    if (nextPage) {
      const data = await getPosts(nextPage);
      setPosts([...posts, ...data.posts]);
    }
  };
  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <LayoutGradient>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post data={item} />}
      />
    </LayoutGradient>
  );
}
