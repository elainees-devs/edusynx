import axios from "axios";
import Swal from "sweetalert2";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    JSON.parse(localStorage.getItem("savedUser") || "{}").token ||
    JSON.parse(localStorage.getItem("savedSuperAdmin") || "{}").token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("savedUser");
        localStorage.removeItem("savedSuperAdmin");
        localStorage.removeItem("token");
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please sign in again.",
        }).then(() => {
          window.location.reload();
        });
      } else if (error.response?.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You do not have permission to perform this action.",
        });
      } else if (error.response?.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
