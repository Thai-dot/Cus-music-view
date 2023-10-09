import axios from "axios";
import Cookies from "js-cookie";
import { getSession } from "next-auth/react";

const axiosAuthInstance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuthInstance.interceptors.request.use(
  async (config: any) => {
    const session = await getSession()
    const token =session?.user.access_token;
    if (token) {
      const newConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      return newConfig;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;

export const createAxiosInstance = (token: string) => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_BASE_URL,
    timeout: 5000,
    headers: { authorization: `Bearer ${token}` },
  });

  return instance;
};
