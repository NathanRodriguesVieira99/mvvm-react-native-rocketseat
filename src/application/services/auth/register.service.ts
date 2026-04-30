import { HttpMethod, type IHttpClient } from '@api/http-client.types';

import type { AuthResponse } from '@interfaces/http/auth-response';
import type { RegisterHttpParams } from '@interfaces/http/register';

export type RegisterServiceContract = {
  exec: (data: RegisterHttpParams) => Promise<AuthResponse>;
};

export class RegisterService implements RegisterServiceContract {
  constructor(private readonly http: IHttpClient) {}

  async exec(body: RegisterHttpParams) {
    const registerServiceResponse = await this.http.request<AuthResponse>({
      method: HttpMethod.POST,
      endpoint: '/auth/register',
      body,
    });

    return registerServiceResponse;
  }
}
