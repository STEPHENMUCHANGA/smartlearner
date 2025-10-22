import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : import.meta.env.VITE_API_BASE_URL || "https://smartlearner-8tgb.onrender.com/api",
  withCredentials: true,
});

export default api;
