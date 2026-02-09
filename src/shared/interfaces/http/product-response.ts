import type { Product } from '../product';

export interface GetProductResponse {
  data: Product[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
