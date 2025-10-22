import axios from "axios";

// Dynamically choose backend URL depending on environment
const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL // Local
    : import.meta.env.VITE_API_URL_PROD; // Production

console.log("🌍 Using API base URL:", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
