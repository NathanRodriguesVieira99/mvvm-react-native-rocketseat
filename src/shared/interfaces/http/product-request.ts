interface Pagination {
  page: number;
  perPage: number;
}

interface Filters {
  from: Date;
  to: Date;
  categoryIds: number[];
  searchText: string;
  minValue: number;
  maxValue: number;
}

export interface GetProductsRequest {
  pagination: Pagination;
  filters?: Filters;
  sort?: {
    averageRating: string;
  };
}
