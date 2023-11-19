import React, { useEffect, useState } from "react";
import styles from "./Account.module.css";
import { useSelector } from "react-redux";
import dateToString from "../../utils/dateToSring";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useTheme} from "../../context/ThemeContext"
const AccountPage = () => {
  
  const user = useSelector((state) => state.users);
  const { isDarkMode, toggleTheme } = useTheme();
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.errorHandler) {
      navigate("/");
    }
  }, [user]);
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    useGetPosts();
  }, []);
  const useGetPosts = async () => {
    const response = await AxiosPrivate.get("/post/myPosts/" + offset);

    if (response.status === 200) {
      const datas = response.data;

      datas.map((data) => {
        setPosts((oldArray) => [...oldArray, data]);
      });

      setOffset((offset) => offset + 10);
    }
  };

  let handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      useGetPosts();
    }
  };
  return (
    <div className={`${styles.container} ${isDarkMode? styles.dark :''}`} onScroll={handleScroll}>
      {user.succes && (
        <div className={styles.profile}>
          <div>
            <img
              src={`http://127.0.0.1:5000/${user.user?.foundUser?.profilePhoto}`}
              crossOrigin="anonymous"
              alt="profilePhoto"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
            />
          </div>
          <div>
            <h1>{user.user?.foundUser?.fullname}</h1>
            <h5>{user.user?.foundUser?.username}</h5>
            <h5>{user.user?.foundUser?.email}</h5>
            <h6>{dateToString(user.user?.foundUser?.createDate)}</h6>
          </div>
        </div>
      )}
      <div className={styles.posts}>
        {user.succes &&
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default AccountPage;
