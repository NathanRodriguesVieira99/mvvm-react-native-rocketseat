import { GetProductsCategoriesService } from '@services/products/get-products-categories.service';
import {
  PRODUCTS_CATEGORIES_QUERY_STALE_TIME,
  QUERY_KEYS,
} from '@shared/constants';
import { useQuery } from '@tanstack/react-query';

export const useProductsCategoriesQuery = (
  getProductsCategoriesService: GetProductsCategoriesService,
) => {
  const {
    data: productsCategories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS_CATEGORIES,
    queryFn: () => getProductsCategoriesService.exec(),
    staleTime: PRODUCTS_CATEGORIES_QUERY_STALE_TIME,
  });

  return { productsCategories, isLoading, error, refetch };
};
