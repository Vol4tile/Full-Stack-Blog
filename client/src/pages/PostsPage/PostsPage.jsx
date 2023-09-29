import React from "react";
import { useEffect, useState } from "react";
import { GetPosts } from "../../services/postService";
import Post from "../../components/Post/Post";
import styles from "./Posts.module.css";
const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    useGetPosts();
  }, []);
  const useGetPosts = () => {
    GetPosts(offset).then((res) => {
      if (res.status == 200) {
        if (res.data.length > 0) {
          res.data.map((data) => {
            setPosts((posts) => [...posts, data]);
          });

          setOffset(offset + 10);
        }
      }
    });
  };
  let handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      useGetPosts();
    }
  };
  return (
    <div className={styles.container} onScroll={handleScroll}>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostsPage;
