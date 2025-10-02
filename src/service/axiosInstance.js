import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // your backend
headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true, // if you use cookie-based auth
});

export default axiosInstance;