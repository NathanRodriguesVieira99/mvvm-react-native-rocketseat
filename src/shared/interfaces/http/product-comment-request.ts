import type { Pagination } from './product-request';

export interface ProductCommentRequest {
  productId: number;
  pagination: Pagination;
}
