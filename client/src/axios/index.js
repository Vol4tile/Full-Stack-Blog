import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const Kayit = async (formData) =>
  await HTTP.post("/user/register", formData);
export const getPosts = async (offset) =>
  await HTTP.get("/post/posts/" + offset);
export const getSelectedPost = async (postId) =>
  await HTTP.get("/post/selectedPost/" + postId);
