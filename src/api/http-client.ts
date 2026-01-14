import axios, { type AxiosError, type AxiosInstance } from "axios";
import { Platform } from "react-native";
import {
  ANDROID_API_BASE_URL,
  INTERNAL_SERVER_ERROR,
  IOS_API_BASE_URL,
} from "@shared/constants";
import type { HttpRequest, IHttpClient } from "./http-client.types";

const getBaseUrl = () => {
  return Platform.select({
    ios: IOS_API_BASE_URL,
    android: ANDROID_API_BASE_URL,
  });
};

const BASE_URL = getBaseUrl();

export class HttpClient implements IHttpClient {
  private constructor(private readonly api: AxiosInstance = axios) {}

  static create() {
    return new HttpClient();
  }

  async request<TResponse, TBody>(props: HttpRequest<TBody>) {
    const { endpoint, method, body, headers } = props;

    try {
      const { data } = await this.api.request<TResponse>({
        url: `${BASE_URL}${endpoint}`,
        method,
        headers,
        data: body,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      const status = error.response?.status || INTERNAL_SERVER_ERROR;
      const message = error.response?.data || error.message;
      throw new Error(`Request failed with status ${status}: ${message}`);
    }
  }
}
