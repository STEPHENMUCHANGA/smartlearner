import axios from "axios";

// Dynamically choose backend depending on environment
const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_PROD;

const api = axios.create({
  baseURL,
  withCredentials: true, // allows cookies for auth
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
