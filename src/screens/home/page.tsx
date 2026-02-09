import { HttpClient } from '@api/http-client';
import { HomeView } from '@presentation/view-models/home/home.view';
import { useHomeModel } from '@presentation/view-models/home/useHomeModel';
import { GetProductsService } from '@services/products/get-products.service';

export default function Home() {
  const http = HttpClient.create();

  const getProductsService = new GetProductsService(http);

  const model = useHomeModel({ getProductsService });

  return <HomeView {...model} />;
}
