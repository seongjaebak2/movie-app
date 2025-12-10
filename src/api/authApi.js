import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8080", // 백엔드
});

// JWT 자동 포함
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authApi;
