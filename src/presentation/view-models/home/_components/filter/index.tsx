import { HttpClient } from '@api/http-client';
import { FilterView } from './filter.view';
import { useFilterModel } from './useFilter.model';
import { GetProductsCategoriesService } from '@services/products/get-products-categories.service';

export const Filter = () => {
  const http = HttpClient.create();

  const getProductsCategoriesService = new GetProductsCategoriesService(http);

  const model = useFilterModel({ getProductsCategoriesService });

  return <FilterView {...model} />;
};
