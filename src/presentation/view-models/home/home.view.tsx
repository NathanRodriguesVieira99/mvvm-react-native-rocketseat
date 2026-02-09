import type { FC } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@styles/colors';
import { HomeHeader } from './_components/header';
import { SearchInput } from './_components/search-input';
import { ProductCard } from './_components/product-card';
import { Footer } from './_components/footer';
import type { useHomeModel } from './useHomeModel';

export const HomeView: FC<ReturnType<typeof useHomeModel>> = ({
  products,
  handleEndReached,
  handleRefetch,
  isFetchingNextPage,
  isLoading,
  isRefetching,
  hasNextPage,
}) => {
  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={({ id }) => `product-${id}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerClassName="px-4 pb-[120px]"
        ListHeaderComponent={() => (
          <>
            <HomeHeader />
            <SearchInput />
          </>
        )}
        ListFooterComponent={
          <Footer
            // Boolean() -> garante que o tipo dos dados serão sempre booleanos
            isLoading={hasNextPage && Boolean(isLoading || isFetchingNextPage)}
          />
        }
        onEndReached={handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefetch}
            colors={[colors['purple-base']]}
            tintColor={colors['purple-base']}
          />
        }
      />
    </SafeAreaView>
  );
};
