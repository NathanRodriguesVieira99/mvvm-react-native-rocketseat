import { HttpMethod, type IHttpClient } from '@api/http-client.types';

import type { GetProductsRequest } from '@interfaces/http/product-request';
import type { PaginationResponse } from '@interfaces/pagination-response';
import type { Product } from '@interfaces/product';

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
