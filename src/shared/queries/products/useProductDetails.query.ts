import { QUERY_KEYS } from '@shared/constants';
import { useQuery } from '@tanstack/react-query';
import type { GetProductDetailsService } from '@services/products/get-products-details.service';

export const useProductDetails = (
  getProductDetailsService: GetProductDetailsService,
  productId: number,
) => {
  const {
    data: productDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_DETAILS, productId],
    queryFn: () => getProductDetailsService.exec(productId),
  });

  return {
    productDetails,
    isLoading,
    error,
  };
};
