import type { GetProductsCategoriesService } from '@services/products/get-products-categories.service';
import { useProductsCategoriesQuery } from '@shared/queries/products/useProductsCategories.query';
import { useBottomSheetStore } from '@shared/store/bottom-sheet.store';
import { useFilterStore } from '@shared/store/filter.store';

interface useFilterModelProps {
  getProductsCategoriesService: GetProductsCategoriesService;
}

export const useFilterModel = ({
  getProductsCategoriesService,
}: useFilterModelProps) => {
  const { productsCategories, isLoading, error, refetch } =
    useProductsCategoriesQuery(getProductsCategoriesService);

  const updateFilter = useFilterStore((s) => s.updateFilter);
  const filterState = useFilterStore((s) => s.filterState);
  const applyFilters = useFilterStore((s) => s.applyFilters);
  const resetFilters = useFilterStore((s) => s.resetFilters);

  const close = useBottomSheetStore((s) => s.close);

  const handleValueMaxChange = (value: number) => {
    updateFilter({ key: 'valueMax', value });
  };

  const handleValueMinChange = (value: number) => {
    updateFilter({ key: 'valueMin', value });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const categoryAlreadyInArray =
      filterState.selectedCategories.includes(categoryId);

    if (categoryAlreadyInArray) {
      updateFilter({
        key: 'selectedCategories',
        value: filterState.selectedCategories.filter((id) => id !== categoryId),
      });
    } else {
      updateFilter({
        key: 'selectedCategories',
        value: [...filterState.selectedCategories, categoryId],
      });
    }
  };

  const handleApplyFilters = () => {
    applyFilters();
    close();
  };

  const handleResetFilters = () => {
    resetFilters();
    close();
  };

  return {
    productsCategories,
    selectedCategories: filterState.selectedCategories,
    isLoading,
    handleValueMinChange,
    handleValueMaxChange,
    handleCategoryToggle,
    handleApplyFilters,
    handleResetFilters,
  };
};
