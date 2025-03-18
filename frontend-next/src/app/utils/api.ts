import axios from "axios";

const URL_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/api";


const api = axios.create({
  baseURL: URL_BACKEND,
  withCredentials: true,
});


api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Sem token de refresh");

        const response = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
          refresh: refreshToken,
        });

        localStorage.setItem("access_token", response.data.access);
        error.config.headers.Authorization = `Bearer ${response.data.access}`;

        return api(error.config);
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
