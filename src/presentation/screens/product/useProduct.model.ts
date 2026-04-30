import type { GetProductCommentsService } from '@services/products/get-product-comments.service';
import type { GetProductDetailsService } from '@services/products/get-products-details.service';
import { useProductCommentsInfinityQuery } from '@shared/queries/products/useProductComments.infinity-query';
import { useProductDetails } from '@shared/queries/products/useProductDetails.query';
import { useCartStore } from '@shared/store/cart.store';

interface useProductModelProps {
  productId: number;
  getProductDetailsService: GetProductDetailsService;
  getProductCommentsService: GetProductCommentsService;
}

export const useProductModel = ({
  productId,
  getProductDetailsService,
  getProductCommentsService,
}: useProductModelProps) => {
  const {
    productDetails,
    isLoading: isProductDetailsLoading,
    error: productDetailsError,
  } = useProductDetails(getProductDetailsService, productId);

  const {
    comments,
    isLoading: isProductCommentsLoading,
    hasNextPage,
    refetch,
    error: productCommentsError,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useProductCommentsInfinityQuery({
    getProductCommentsService,
    productId,
  });

  const addProduct = useCartStore((s) => s.addProduct);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const handleRefetch = () => {
    if (!isRefetching) refetch();
  };

  const handleEndReached = () => handleLoadMore();

  const handleAddToCart = () => {
    if (!productDetails) return;
    addProduct({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.value,
      image: productDetails.photo,
    });
  };

  return {
    productDetails,
    isProductDetailsLoading,
    isFetchingNextPage,
    isRefetching,
    productDetailsError,
    comments,
    isProductCommentsLoading,
    productCommentsError,
    handleLoadMore,
    handleRefetch,
    handleEndReached,
    handleAddToCart,
  };
};
