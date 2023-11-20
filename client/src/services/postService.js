import { HTTP } from "./api";

export const GetPosts = async (offset) =>
  await HTTP.get("/post/posts/" + offset);

export const GetSelectedPost = async (postId) =>
  await HTTP.get("/post/selectedPost/" + postId);
