import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_PROD;

console.log("🌍 SmartLearner API Base URL:", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
