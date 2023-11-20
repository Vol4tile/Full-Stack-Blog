import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainPage from "../pages/MainPage/MainPage";
import { ThemeProvider } from "../context/ThemeContext";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
const todoResponse = rest.get(
  "http://localhost:5000/post/LatestPosts",
  (req, res, ctx) => {
    return res(
      ctx.json([
        {
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
        },
      ])
    );
  }
);

const server = setupServer(todoResponse);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test("MainPage Test", async () => {
  // Render the MainPage component within the ThemeProvider
  await act(async () => {
    render(
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    );
  });

  const postElement = await screen.findByTestId("post-element");
  expect(postElement).toBeInTheDocument();
});
