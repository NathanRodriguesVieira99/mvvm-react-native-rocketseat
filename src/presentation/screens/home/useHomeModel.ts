import type { GetProductsService } from '@services/products/get-products.service';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useProductsInfinityQuery } from '@shared/queries/products/useProducts.infinity-query';
import { useFilterStore } from '@shared/store/filter.store';
import { useState } from 'react';

interface useHomeModelProps {
  getProductsService: GetProductsService;
}

export const useHomeModel = ({ getProductsService }: useHomeModelProps) => {
  const [searchInputText, setSearchInputText] = useState('');

  const currentSearchInputText = useDebounce(searchInputText);

  const appliedFilterState = useFilterStore((s) => s.appliedFiltersState);

  const {
    products,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useProductsInfinityQuery({
    getProductsService,
    filters: { ...appliedFilterState, searchText: currentSearchInputText },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) fetchNextPage();
  };

  const handleRefetch = async () => {
    await refetch();
  };

  const handleEndReached = () => {
    handleLoadMore();
  };

  return {
    handleLoadMore,
    handleRefetch,
    handleEndReached,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    products,
    searchInputText,
    setSearchInputText,
  };
};
