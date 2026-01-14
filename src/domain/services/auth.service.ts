import { HttpMethod, type IHttpClient } from "@api/http-client.types";
import type {
  RegisterHttpParams,
  RegisterHttpResponse,
} from "@shared/interfaces/http/register";

export type RegisterServiceProps = {
  exec: (data: RegisterHttpParams) => Promise<RegisterHttpResponse>;
};

export class RegisterService implements RegisterServiceProps {
  constructor(private readonly http: IHttpClient) {}

  async exec(body: RegisterHttpParams) {
    const registerServiceResponse =
      await this.http.request<RegisterHttpResponse>({
        method: HttpMethod.POST,
        endpoint: "/auth/register",
        body,
      });

    return registerServiceResponse;
  }
}
