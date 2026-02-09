import type { GetProductsCategoriesService } from '@services/products/get-products-categories.service';
import { useProductsCategoriesQuery } from '@shared/queries/products/useProductsCategories.query';

interface useFilterModelProps {
  getProductsCategoriesService: GetProductsCategoriesService;
}

export const useFilterModel = ({
  getProductsCategoriesService,
}: useFilterModelProps) => {
  const { productsCategories, isLoading, error, refetch } =
    useProductsCategoriesQuery(getProductsCategoriesService);

  return { productsCategories, isLoading };
};
