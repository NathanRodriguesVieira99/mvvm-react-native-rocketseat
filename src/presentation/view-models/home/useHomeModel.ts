import type { GetProductsService } from '@services/products/get-products.service';
import { useProductsInfinityQuery } from '@shared/queries/products/useProducts.infinity-query';

interface useHomeModelProps {
  getProductsService: GetProductsService;
}

export const useHomeModel = ({ getProductsService }: useHomeModelProps) => {
  const {
    products,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useProductsInfinityQuery(getProductsService);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) fetchNextPage();
  };

  const handleRefetch = async () => {
    await refetch();
  };

  const handleEndReached = () => {
    handleLoadMore();
  };

  console.log(JSON.stringify(products, null, 2));
  return {
    handleLoadMore,
    handleRefetch,
    handleEndReached,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    products,
  };
};
