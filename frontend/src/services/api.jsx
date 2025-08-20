import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const response = await axios.post(`${API_URL}/token/refresh/`, {
    refresh,
  });

  const newAccess = response.data.access;
  localStorage.setItem("access", newAccess);
  return newAccess;
};
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
