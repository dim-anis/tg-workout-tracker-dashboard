import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://tg-workout-tracker-dashboard.herokuapp.com"
    : "http://localhost:5000";

export default axios.create({
  baseURL: URL,
});

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
