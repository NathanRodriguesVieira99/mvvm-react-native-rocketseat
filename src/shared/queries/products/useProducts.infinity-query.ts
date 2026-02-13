import { GetProductsService } from '@services/products/get-products.service';
import {
  DEFAULT_PER_PAGE_VALUE,
  PRODUCTS_INFINITY_QUERY_STALE_TIME,
  QUERY_KEYS,
} from '@shared/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BuildImageUrl } from '@helpers/build-image-url';
import type { FilterStates } from '@shared/store/filter.store';

interface ProductsInfinityQueryParams {
  getProductsService: GetProductsService;
  filters?: FilterStates;
}

export const useProductsInfinityQuery = ({
  getProductsService,
  filters,
}: ProductsInfinityQueryParams) => {
  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, filters],
    staleTime: PRODUCTS_INFINITY_QUERY_STALE_TIME,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await getProductsService.exec({
          pagination: {
            page: pageParam,
            perPage: DEFAULT_PER_PAGE_VALUE,
          },
          filters: {
            categoryIds: filters?.selectedCategories ?? [],
            maxValue: filters?.valueMax ?? undefined,
            minValue: filters?.valueMin ?? undefined,
            searchText: filters?.searchText ?? undefined,
          },
        });
        return response;
      } catch (err) {
        throw err;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  const products = data?.pages
    .flatMap((page) => page.data)
    .map((product) => ({
      ...product,
      photo: BuildImageUrl(product.photo),
    }));

  return {
    products,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  };
};
