import { HTTP } from "./api";

export const GetPosts = async (offset) => await HTTP.get("/post/posts/" + offset);

export const GetSelectedPost = async (postId) =>
  await HTTP.get("/post/selectedPost/" + postId);

  export const fetchPosts = async () => {
    // Gerçek fetch işlemi yerine sahte verileri döndürün
    return [
      { _id: 1, baslik: "Post 1", content: "Content 1" },
      { _id: 2, baslik: "Post 2", content: "Content 2" },
      { _id: 3, baslik: "Post 3", content: "Content 3" },
    ];
  };
