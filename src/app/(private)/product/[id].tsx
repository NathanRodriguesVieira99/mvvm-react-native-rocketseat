import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ProductView } from '@presentation/view-models/product/product.view';
import { useProductModel } from '@presentation/view-models/product/useProduct.model';
import { HttpClient } from '@api/http-client';
import { GetProductDetailsService } from '@services/products/get-products-details.service';
import { GetProductCommentsService } from '@services/products/get-product-comments.service';

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = Number(id);

  const http = HttpClient.create();
  const getProductDetailsService = new GetProductDetailsService(http);
  const getProductCommentsService = new GetProductCommentsService(http);
  const model = useProductModel({
    getProductDetailsService,
    getProductCommentsService,
    productId: numericId,
  });

  return <ProductView {...model} />;
}
