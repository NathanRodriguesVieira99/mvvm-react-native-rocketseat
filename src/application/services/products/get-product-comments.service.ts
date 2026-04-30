import { HttpMethod, type IHttpClient } from '@api/http-client.types';

import type { ProductCommentRequest } from '@interfaces/http/product-comment-request';
import type { PaginationResponse } from '@interfaces/pagination-response';
import type { ProductComment } from '@interfaces/product-comment';

interface GetProductsCommentsServiceContract {
  exec: (
    data: ProductCommentRequest,
  ) => Promise<PaginationResponse<ProductComment>>;
}

export class GetProductCommentsService implements GetProductsCommentsServiceContract {
  constructor(private readonly httpClient: IHttpClient) {}

  async exec(
    body: ProductCommentRequest,
  ): Promise<PaginationResponse<ProductComment>> {
    const productCommentsResponse = await this.httpClient.request<
      PaginationResponse<ProductComment>
    >({
      endpoint: '/products/comments',
      method: HttpMethod.POST,
      body,
    });
    return productCommentsResponse;
  }
}
