import type { FC } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { useProductModel } from './useProduct.model';
import { ListHeader } from './_components/list-header';
import { CommentItem } from './_components/comment-item';
import { ListFooter } from './_components/list-footer';
import { EmptyList } from './_components/empty-list';
import { Loading } from './_components/loading';
import { Error } from './_components/error';
import { AddToCart } from './_components/add-to-cart.index';

export const ProductView: FC<ReturnType<typeof useProductModel>> = ({
  productDetails,
  isProductDetailsLoading,
  productDetailsError,
  comments,
  isProductCommentsLoading,
  productCommentsError,
  handleLoadMore,
  handleRefetch,
  handleEndReached,
  isRefetching,
  isFetchingNextPage,
}) => {
  if (productDetailsError) return <Error />;
  if (isProductDetailsLoading || !productDetails) return <Loading />;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListHeaderComponent={<ListHeader productDetails={productDetails} />}
        className="px-6"
        onEndReached={handleEndReached}
        onRefresh={handleRefetch}
        refreshing={isRefetching}
        ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
        ListEmptyComponent={
          <EmptyList isLoadingComments={isProductCommentsLoading} />
        }
        contentContainerClassName="pb-6"
      />
      <AddToCart product={productDetails} />
    </SafeAreaView>
  );
};
