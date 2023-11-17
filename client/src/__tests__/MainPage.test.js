import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainPage from "../pages/MainPage/MainPage";
import server from "../mocks";

beforeAll(() => server.listen());
afterAll(() => server.close());

test("MainPage Test", async () => {
  // Reset the server handlers before each test
  server.resetHandlers();

  // Render the MainPage component
  render(<MainPage />);

  // Wait for the mock API response to be resolved
  await screen.findByText("En Yeniler");

  // Check if the data is rendered in the component
});
