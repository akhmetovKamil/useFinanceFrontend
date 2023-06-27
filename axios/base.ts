import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { Errors } from "@/types/constants";
import { authApi } from "@/axios/auth";

export const base = axios.create({ baseURL: "https://finance-service.xyz/api" });

base.interceptors.request.use(
  async (config): Promise<InternalAxiosRequestConfig<any>> => {
    const access_token = await localStorage.getItem("access_token");
    console.log("request: ", config.url);
    if (
      config.url == "/auth/register" ||
      config.url == "/auth/refresh" ||
      config.url == "/auth/login"
    ) {
      return config;
    }
    const headers: AxiosHeaders = new AxiosHeaders({
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    });
    return {
      ...config,
      headers,
    };
  }
);

base.interceptors.response.use(
  (response) => {
    console.log("response success");
    return response;
  },
  async (error) => {
    console.log("response error: ", error);
    if (error.code == "ERR_NETWORK")
      return Promise.reject(Errors.CONNECTION_ERROR);
    if (!error.response) return Promise.reject(Errors.UNEXPECTED_ERROR);
    switch (error.response.status) {
      case 401:
        if (error.config.url == "/auth/login")
          return Promise.reject(Errors.USER_NOT_FOUND);
        if (error.config.url != "/auth/refresh") {
          const access_token = await authApi.refresh();
          await localStorage.setItem("access_token", access_token);
          if (access_token != undefined)
            return axios.request({
              ...error.config,
              headers: {
                ...error.config.headers,
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            });
        }
        return Promise.reject(Errors.NOT_AUTHORIZED);
      case 400:
        return Promise.reject(Errors.ALREADY_REGISTERED);
      case 404:
        return Promise.reject(Errors.SERVER_ERROR);
      default:
        return Promise.reject(Errors.UNEXPECTED_ERROR);
    }
    //Login errors
    //Not auth errors
  }
);
