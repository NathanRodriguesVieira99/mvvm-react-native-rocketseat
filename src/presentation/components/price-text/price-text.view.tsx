import type { FC } from 'react';
import type { usePriceTextModel } from './usePriceText.model';
import { Text, View } from 'react-native';

export const PriceTextView: FC<
  ReturnType<typeof usePriceTextModel> & {
    classNameCurrency?: string;
    classNameValue?: string;
  }
> = ({
  classNameCurrency,
  classNameValue,
  currencySymbol,
  formatPrice,
  value,
  valueText,
}) => {
  return (
    <View className="flex-row items-center gap-1">
      <Text
        className={classNameCurrency ?? 'text-xs font-semibold text-gray-900'}
      >
        {currencySymbol}
      </Text>
      <Text className={classNameValue ?? 'text-2xl text-gray-900'}>
        {valueText}
      </Text>
    </View>
  );
};
