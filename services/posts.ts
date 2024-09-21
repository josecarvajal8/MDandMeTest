import { Post } from "@/models/post";
import { fetchData } from "@/utils/fetcher";

const BASE_URL = "http://localhost:3001";

export const getPosts = async () => {
  return await fetchData<Post[]>({
    url: `${BASE_URL}/posts`,
    method: "GET",
  });
};
