import type {
  RegisterHttpParams,
  RegisterHttpResponse,
} from "../../shared/interfaces/http/register";
import { marketPlaceApiClient } from "@api/market-place";

export const register = async (body: RegisterHttpParams) => {
  const { data } = await marketPlaceApiClient.post<RegisterHttpResponse>(
    "/auth/register",
    body
  );

  return data;
};
