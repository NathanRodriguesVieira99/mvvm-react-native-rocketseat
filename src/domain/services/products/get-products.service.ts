import type { HttpClient } from '@api/http-client';
import { HttpMethod, type IHttpClient } from '@api/http-client.types';
import type { GetProductsRequest } from '@shared/interfaces/http/product-request';
import type { GetProductResponse } from '@shared/interfaces/http/product-response';

interface GetProductsServiceContract {
  exec: (data: GetProductsRequest) => Promise<GetProductResponse>;
}

export class GetProductsService implements GetProductsServiceContract {
  constructor(private readonly httpClient: IHttpClient) {}

  async exec(body: GetProductsRequest) {
    const getProductsResponse =
      await this.httpClient.request<GetProductResponse>({
        endpoint: '/products',
        method: HttpMethod.POST,
        body,
      });

    return getProductsResponse;
  }
}
