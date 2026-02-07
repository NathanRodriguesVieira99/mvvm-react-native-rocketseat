import { BASE_URL } from '@api/http-client';
import { HttpMethod, type IHttpClient } from '@api/http-client.types';
import type { UploadAvatarResponse } from '@shared/interfaces/http/upload-avatar';

type UploadAvatarServiceContract = {
  exec: (avatarUri: string) => Promise<UploadAvatarResponse>;
};

export class UploadAvatarService implements UploadAvatarServiceContract {
  constructor(private readonly http: IHttpClient) {}

  // assim que se cria funções dentro de classes com POO em TS
  private uploadAvatar = (avatarUri: string) => {
    const formData = new FormData();

    formData.append('avatar', {
      uri: avatarUri,
      type: 'image/jpeg',
      name: 'avatar.jpeg',
    } as unknown as Blob);

    return formData;
  };

  async exec(avatarUri: string) {
    const body = this.uploadAvatar(avatarUri);

    const uploadAvatarServiceResponse =
      await this.http.request<UploadAvatarResponse>({
        method: HttpMethod.POST,
        endpoint: '/user/avatar',
        body,
        headers: {
          /*
            Não conhecia esse tipo de Header, IA me ajudou pois sem adicionar isso estava dando erro 500 ao registrar,
           (no curso não acontece isso pelo fato do adapter do axios dele ser mais "simples" que o meu aparentemente)
            */
          'Content-Type': 'multipart/form-data',
        },
      });

    uploadAvatarServiceResponse.url = `${BASE_URL}${uploadAvatarServiceResponse.url}`;

    return uploadAvatarServiceResponse;
  }
}
