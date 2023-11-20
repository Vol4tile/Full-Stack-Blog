import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Post from "../components/Post/Post";
import { ThemeProvider } from "../context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom"; // BrowserRouter ekledik
import { act } from "react-dom/test-utils";
import styles from "../components/Post/Post.module.css"

test("Post Component Test", async () => {
  const data = {
    _id: "123456789",
    baslik: "test",
    yazi: "hello world",
    postedBy: {
      _id: "6556db528eb9daad799b0451",
      username: "test",
      fullname: "test",
      profilePhoto: "test.jpeg",
    },
    createDate: "2023-00-0T00:00:00.000Z",
    __v: 0,
  };
  
  await act(async () => {
    render(
      <ThemeProvider>
        <Router>
          <Post post={data} />
        </Router>
      </ThemeProvider>
    );
  });

  // Verilen test içeriğinin post içinde görüntülenip görüntülenmediğini kontrol et
  const postElement = screen.getByTestId("post-content");
  screen.debug()
  expect(postElement).toBeInTheDocument();
  expect(postElement).toHaveTextContent("hello world");
});