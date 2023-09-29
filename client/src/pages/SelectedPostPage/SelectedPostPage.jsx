import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SelectedPost.module.css";
import {GetSelectedPost} from "../../services/postService"
import parse from "html-react-parser";
import dateToString from "../../utils/dateToSring";
import { motion } from "framer-motion";
const SelectedPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    GetSelectedPost(postId)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  }, [postId]);

  return (
    <div className={styles.container}>
      <motion.article
        className={styles.article}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <h1>{post?.baslik}</h1>

        <div className={styles.yazi}>
          {" "}
          {post?.yazi !== undefined && parse(post?.yazi)}
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.writer}>
              <div className={styles.writerInfo}>
                {post?.postedBy?.profilePhoto !== undefined && (
                  <img
                    src={`http://127.0.0.1:5000/${post?.postedBy?.profilePhoto}`}
                    alt="userProfilePhoto"
                    crossOrigin="use-credentials"
                    height={40}
                    width={40}
                  />
                )}

                <div className={styles.writerName}>
                  {post?.postedBy && post.postedBy.username}
                </div>
              </div>
            </div>
            <div className={styles.date}>
              {post?.createDate && dateToString(post.createDate)}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default SelectedPostPage;
