import { HttpMethod, type IHttpClient } from '@api/http-client.types';
import type { AuthResponse } from '@shared/interfaces/http/auth-response';
import type { RegisterHttpParams } from '@shared/interfaces/http/register';

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
