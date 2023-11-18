import React, { useState } from "react";
import { HTTP } from "../../services/api";
import styles from "./Main.module.css";
import changeMetaTags from "../../utils/changeMetaTags";
import hljs from "highlight.js";
import "../../../node_modules/highlight.js/styles/github.css";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import Post from "../../components/Post/Post";
import { useTheme } from "../../context/ThemeContext";
const MainPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    HTTP.get("post/LatestPosts")
      .then((res) => {
        let postsArray = [];

        const newArray = res.data.map((str) => {
          str.yazi = str.yazi.replaceAll(
            /<img\s+/g,
            '<img crossorigin="anonymous" '
          );
          str.yazi = DOMPurify.sanitize(str.yazi, {
            USE_PROFILES: { html: true },
          });
          postsArray.push(str);
        });
        setPosts(postsArray);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    changeMetaTags({ title: "Anasayfa" });
  }, []);
  useEffect(() => {
    hljs.highlightAll();
  }, [posts]);

  return (
    <>
      <section>
        <h1 className={isDarkMode ? styles.dark : styles.light}>En Yeniler</h1>
        {posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </section>
    </>
  );
};

export default MainPage;
