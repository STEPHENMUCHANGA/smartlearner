import axios from "axios";

// Decide automatically based on environment
const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL_PROD;

const api = axios.create({
  baseURL,
  withCredentials: true, // allow cookies / CORS tokens
});

export default api;
