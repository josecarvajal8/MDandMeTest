import { Post, PostResponse } from "@/models/post";
import { fetchData } from "@/utils/fetcher";

const BASE_URL = "http://localhost:3001";

export const getPosts = async (page: number) => {
  const params = new URLSearchParams({
    _page: page.toString(),
    per_page: "10",
  });
  const res = await fetchData<PostResponse>({
    url: `${BASE_URL}/posts?${params.toString()}`,
    method: "GET",
  });
  return {
    posts: res.data,
    numPages: res.pages,
    nextPage: res.next,
  };
};

export const getPostById = async (postId: string) => {
  const res = await fetchData<Post>({
    url: `${BASE_URL}/posts/${postId}`,
    method: "GET",
  });
  return res;
}

export const updatePost = async (postId: string, data: Record<string, any>) => {
  const res = await fetchData({
    url: `${BASE_URL}/posts/${postId}`,
    method: "PATCH",
    body: data,
  });
  return res;
};
