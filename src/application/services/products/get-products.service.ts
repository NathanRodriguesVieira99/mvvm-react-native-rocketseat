import { HttpMethod, type IHttpClient } from '@api/http-client.types';
import type { GetProductsRequest } from '@shared/interfaces/http/product-request';
import type { PaginationResponse } from '@shared/interfaces/pagination-response';
import type { Product } from '@shared/interfaces/product';

interface GetProductsServiceContract {
  exec: (data: GetProductsRequest) => Promise<PaginationResponse<Product>>;
}

export class GetProductsService implements GetProductsServiceContract {
  constructor(private readonly httpClient: IHttpClient) {}

  async exec(body: GetProductsRequest) {
    const getProductsResponse = await this.httpClient.request<
      PaginationResponse<Product>
    >({
      endpoint: '/products',
      method: HttpMethod.POST,
      body,
    });

    return getProductsResponse;
  }
}
