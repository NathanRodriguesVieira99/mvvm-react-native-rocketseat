import { HttpMethod, type IHttpClient } from '@api/http-client.types';
import type { AuthResponse } from '@shared/interfaces/http/auth-response';
import type { LoginHttpParams } from '@shared/interfaces/http/login';

export type LoginServiceContract = {
  exec: (data: LoginHttpParams) => Promise<AuthResponse>;
};

export class LoginService implements LoginServiceContract {
  constructor(private readonly http: IHttpClient) {}

  async exec(body: LoginHttpParams) {
    const loginServiceResponse = await this.http.request<AuthResponse>({
      method: HttpMethod.POST,
      endpoint: '/auth/login',
      body,
    });

    return loginServiceResponse;
  }
}
