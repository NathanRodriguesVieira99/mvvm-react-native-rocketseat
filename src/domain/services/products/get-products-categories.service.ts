import { HttpMethod, type IHttpClient } from '@api/http-client.types';
import type { ProductCategory } from '@shared/interfaces/product';

interface GetProductsCategoryServiceContract {
  exec: () => Promise<ProductCategory[]>;
}

export class GetProductsCategoriesService implements GetProductsCategoryServiceContract {
  constructor(private readonly httpClient: IHttpClient) {}

  async exec() {
    const getProductsCategoryResponse = await this.httpClient.request<
      ProductCategory[]
    >({
      endpoint: '/products/categories',
      method: HttpMethod.GET,
    });

    return getProductsCategoryResponse;
  }
}
