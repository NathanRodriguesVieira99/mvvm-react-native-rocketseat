import axios, { type AxiosInstance } from "axios";
import { Platform } from "react-native";
import { ANDROID_API_BASE_URL, IOS_API_BASE_URL } from "@shared/constants";

const getBaseUrl = () => {
  return Platform.select({
    ios: IOS_API_BASE_URL,
    android: ANDROID_API_BASE_URL,
  });
};

export class MarketPlaceApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;

  constructor() {
    this.instance = axios.create({
      baseURL: getBaseUrl(),
    });
  }

  getInstance() {
    return this.instance;
  }
}

export const marketPlaceApiClient = new MarketPlaceApiClient().getInstance();
