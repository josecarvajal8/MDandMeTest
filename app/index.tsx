import { LayoutGradient } from "@/components/layout";
import { TypoBase } from "@/components/typography";
import { getPosts } from "@/services/posts";
import React, { useEffect } from "react";

export default function HomeScreen() {
  const getPostsData = async () => {
    const data = await getPosts();
    console.log(data.length);
  };
  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <LayoutGradient>
      <TypoBase size="headline" fontStyle="bold">
        {"Hello"}
      </TypoBase>
    </LayoutGradient>
  );
}
