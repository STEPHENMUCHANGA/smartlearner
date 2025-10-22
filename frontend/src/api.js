import axios from "axios";

// Dynamically pick the right base URL
const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_PROD;

console.log("📡 Using API base URL:", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
