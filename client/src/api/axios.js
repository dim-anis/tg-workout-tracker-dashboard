import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://tg-workout-tracker-dashboard.herokuapp.com"
    : "http://192.168.31.38:5000";

export default axios.create({
  baseURL: URL,
});

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
