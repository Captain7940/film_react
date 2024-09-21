import { message as AntdMessage } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Router from "next/router";

interface AxiosInstanceType extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

export const CreateAxiosInstance = (
  config?: AxiosRequestConfig
): AxiosInstanceType => {
  const instance = axios.create({
    timeout: 20000,
    ...config,
  });

  instance.interceptors.request.use(
    function (config) {
      const userStorage = localStorage.getItem('user')
      const token = userStorage ? JSON.parse(userStorage).token : "";
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      // Check login or not
      const { status, data, message } = response as any;
      if (status === 200) {
        return data;
      } else if (status === 401) {
        // Not login
        return Router.push("/login");
      } else {
        // Other error
        AntdMessage.error(message || "Server Error");
      }
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        return Router.push("/login");
      }
      AntdMessage.error(error?.response?.data?.message || "Server Error");
      return Promise.reject(error);
    }
  );

  return instance;
};

export default CreateAxiosInstance({});
