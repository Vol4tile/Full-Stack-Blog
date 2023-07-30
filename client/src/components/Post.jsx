import React from "react";
import { motion } from "framer-motion";
import styles from "../css/Post.module.css";
import { Link } from "react-router-dom";
import dateToString from "../utils/dateToSring";
import parse from "html-react-parser";
const Post = ({ post }) => {
  return (
    <>
      <motion.article
        className={styles.article}
        key={post._id}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <h1>{post.baslik}</h1>

        <div className={styles.yazi}> {parse(post.yazi)}</div>
        <div className={styles.bottomContainer}>
          <Link to={"/Post/" + post._id}>Devamını gör</Link>
          <div className={styles.bottomContent}>
            <div className={styles.writer}>
              <div className={styles.writerInfo}>
                <img
                  src={`http://127.0.0.1:5000/${post.postedBy.profilePhoto}`}
                  alt="userProfilePhoto"
                  crossOrigin="use-credentials"
                  height={40}
                  width={40}
                />

                <div className={styles.writerName}>
                  {post.postedBy.username}
                </div>
              </div>
              <div className={styles.date}>{dateToString(post.createDate)}</div>
            </div>
          </div>
        </div>
      </motion.article>
    </>
  );
};

export default Post;
