import { GetProductsService } from '@services/products/get-products.service';
import {
  PRODUCTS_INFINITY_QUERY_STALE_TIME,
  QUERY_KEYS,
} from '@shared/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BuildImageUrl } from '@helpers/build-image-url';

export const useProductsInfinityQuery = (
  getProductsService: GetProductsService,
) => {
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
    queryKey: [QUERY_KEYS.PRODUCTS],
    staleTime: PRODUCTS_INFINITY_QUERY_STALE_TIME,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await getProductsService.exec({
          pagination: {
            page: pageParam,
            perPage: 10,
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
