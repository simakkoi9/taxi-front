import axios from "axios";
import { ENDPOINTS } from "../store";
const API_URL = "http://localhost:8050/api/v1";
const { AUTH_ENDPOINT } = ENDPOINTS;
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const excludedEndpoints = [
    "/auth/login",
    "/auth/driver/register",
    "/auth/passenger/register",
    "/auth/refresh",
  ];

  const isExcluded = excludedEndpoints.some((endpoint) =>
    config.url?.includes(endpoint),
  );

  if (token && !isExcluded) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Попытка обновить токен
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const { data } = await api.post(`${AUTH_ENDPOINT}/refresh`, {
          refreshToken,
        });
        localStorage.setItem("accessToken", data.access_token);
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
