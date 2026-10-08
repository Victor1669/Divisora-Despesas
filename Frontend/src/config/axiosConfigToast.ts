import axios from "axios";
import { toast } from "react-toastify";
import { getToken, limparSessao } from "./sessao";

declare module "axios" {
  export interface AxiosRequestConfig {
    showToast?: boolean;
  }
}

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.showToast !== false && response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  async (error) => {
    if (error.config?.showToast !== false) {
      const data = error.response?.data;
      toast.error(data?.message ?? data?.error);
    }

    if (error.response?.status === 401 && getToken()) {
      limparSessao();
      window.location.assign("/login");
    }

    return Promise.reject(error);
  },
);

export { api };
