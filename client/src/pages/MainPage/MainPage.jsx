import React, { useState } from "react";
import { HTTP } from "../../services/api";
import styles from "./Main.module.css";
import changeMetaTags from "../../utils/changeMetaTags";
import hljs from "highlight.js";
import "../../../node_modules/highlight.js/styles/github.css";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import Post from "../../components/Post/Post";
const MainPage = () => {
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
      <section data-testid="main-page">
        <h1
          style={{
            padding: "50px 50px 0px 50px",
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--secondFont)",
          }}
        >
          En Yeniler
        </h1>
        {posts.map((post) => {
          return <Post  post={post} key={post._id} />;
        })}
      </section>
    </>
  );
};

export default MainPage;
