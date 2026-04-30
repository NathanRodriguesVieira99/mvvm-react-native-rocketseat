import { create } from 'zustand';

export interface FilterStates {
  valueMin: number | null;
  valueMax: number | null;
  selectedCategories: number[];
  searchText: string;
}

interface FilterStoreStates {
  appliedFiltersState: FilterStates;
  filterState: FilterStates;
}

interface FilterStoreActions {
  updateFilter: (props: {
    key: keyof FilterStates;
    value: string | number | number[];
  }) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

type FilterStore = FilterStoreStates & FilterStoreActions;

const initialStates: FilterStates = {
  valueMin: null,
  valueMax: null,
  selectedCategories: [],
  searchText: '',
};

export const useFilterStore = create<FilterStore>((set) => ({
  appliedFiltersState: initialStates,
  filterState: initialStates,

  updateFilter: ({ key, value }) => {
    set((state) => ({
      filterState: { ...state.filterState, [key]: value },
    }));
  },

  applyFilters: () =>
    set((state) => ({
      appliedFiltersState: state.filterState,
    })),

  resetFilters: () =>
    set({
      appliedFiltersState: initialStates,
      filterState: initialStates,
    }),
}));
