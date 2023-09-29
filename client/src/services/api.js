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