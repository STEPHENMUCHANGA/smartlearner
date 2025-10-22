
// import axios from 'axios';
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
// });
// export default api;

import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true, // allow sending cookies for authentication
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
