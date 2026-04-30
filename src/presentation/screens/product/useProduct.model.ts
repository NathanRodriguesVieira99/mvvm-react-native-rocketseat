import { createElement } from 'react';
import { router } from 'expo-router';

import { AddToCartModal } from './_components/add-to-cart-modal';

import { useProductCommentsInfinityQuery } from '@queries/products/useProductComments.infinity-query';
import { useProductDetails } from '@queries/products/useProductDetails.query';
import { useCartStore } from '@stores/cart.store';
import { useModalStore } from '@stores/modal.store';

import type { GetProductCommentsService } from '@services/products/get-product-comments.service';
import type { GetProductDetailsService } from '@services/products/get-products-details.service';

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
  const addProduct = useCartStore((s) => s.addProduct);

  const openModal = useModalStore((s) => s.open);
  const closeModal = useModalStore((s) => s.close);

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

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const handleRefetch = () => {
    if (!isRefetching) refetch();
  };

  const handleEndReached = () => handleLoadMore();

  const onGoToCart = () => {
    router.push('/(private)/(tabs)/cart');
    closeModal();
  };

  const onContinueShopping = () => {
    router.push('/(private)/(tabs)/home');
    closeModal();
  };

  const handleAddToCart = () => {
    if (!productDetails) return;
    addProduct({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.value,
      image: productDetails.photo,
    });

    openModal(
      createElement(AddToCartModal, {
        productName: productDetails.name,
        onGoToCart,
        onClose: closeModal,
        onContinueShopping,
      }),
    );
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
    onGoToCart,
    onContinueShopping,
  };
};
