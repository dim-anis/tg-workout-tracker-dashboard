import axios from "axios";

//const URL = "http://192.168.31.38:5000";
const URL = "https://tg-workout-tracker-dashboard.herokuapp.com";

export default axios.create({
  baseURL: URL,
});

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
