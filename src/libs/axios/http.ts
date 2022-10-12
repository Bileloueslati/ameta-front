import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

export const API_END_POINT = import.meta.env.VITE_API_END_POINT;

const config: AxiosRequestConfig = {
  baseURL: API_END_POINT,
};

export const isHttpError = (
  error: any
): error is AxiosError<{ message: string }> => axios.isAxiosError(error);

export type HttpError = AxiosError;

export const http: AxiosInstance = axios.create(config);

let jwt = useAuth.getState().token;

useAuth.subscribe((state) => {
  jwt = state.token;
});

http.interceptors.request.use((config) => {
  if (jwt) {
    config.headers = {
      Authorization: `Bearer ${jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  return config;
});

/**
 * Expired JWT and disabled user case
 */

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      error.response?.data?.message === "User is disabled"
    ) {
      useAuth.setState({ token: null });

      toast.error("Your account is disabled !");
    } else {
      return Promise.reject(error);
    }
  }
);
