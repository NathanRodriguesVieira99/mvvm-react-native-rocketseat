import { HttpMethod, IHttpClient } from '@api/http-client.types';
import type { Product } from '@shared/interfaces/product';

interface GetProductDetailsContract {
  exec: (id: number) => Promise<Product>;
}

export class GetProductDetailsService implements GetProductDetailsContract {
  constructor(private readonly httpClient: IHttpClient) {}

  async exec(id: number) {
    const getProductsDetailsResponse = await this.httpClient.request<Product>({
      endpoint: `/products/${id}`,
      method: HttpMethod.GET,
    });

    return getProductsDetailsResponse;
  }
}
