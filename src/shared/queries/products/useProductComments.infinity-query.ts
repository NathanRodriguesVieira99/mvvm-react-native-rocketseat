import { BuildImageUrl } from '@helpers/build-image-url';
import type { GetProductCommentsService } from '@services/products/get-product-comments.service';
import { COMMENTS_PER_PAGE, QUERY_KEYS } from '@shared/constants';
import type { ProductComment } from '@shared/interfaces/product-comment';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ProductCommentsInfinityQueryParams {
  getProductCommentsService: GetProductCommentsService;
  productId: number;
}

export const useProductCommentsInfinityQuery = ({
  getProductCommentsService,
  productId,
}: ProductCommentsInfinityQueryParams) => {
  const {
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCT_COMMENTS, productId],
    queryFn: ({ pageParam = 1 }) =>
      getProductCommentsService.exec({
        productId,
        pagination: {
          page: pageParam,
          perPage: COMMENTS_PER_PAGE,
        },
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const comments =
    (data?.pages
      .flatMap((page) => page.data)
      .map((comment) => ({
        ...comment,
        user: {
          ...comment.user,
          avatar: { url: BuildImageUrl(comment.user.avatar.url) },
        },
      })) as ProductComment[]) ?? [];

  return {
    comments,
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    refetch,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    error,
  };
};
