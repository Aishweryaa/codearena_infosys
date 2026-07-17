import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("codearena_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    if (
      status === 401 &&
      !url.includes("/auth/login") &&
      !url.includes("/auth/register") &&
      !url.includes("/auth/google")
    ) {
      localStorage.removeItem("codearena_token");
      localStorage.removeItem("codearena_user");
      window.dispatchEvent(new Event("codearena:session-expired"));
    }

    return Promise.reject(error);
  }
);

export function getErrorMessage(error, fallback = "Something went wrong") {
  const data = error.response?.data;

  if (data?.validationErrors) {
    const firstValidationError = Object.values(data.validationErrors)[0];
    if (firstValidationError) {
      return firstValidationError;
    }
  }

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  return data?.message || data?.detail || data?.error || error.message || fallback;
}

export default http;
