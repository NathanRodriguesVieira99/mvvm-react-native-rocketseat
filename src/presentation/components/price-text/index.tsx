import type { FC } from 'react';
import { PriceTextView } from './price-text.view';
import { usePriceTextModel } from './usePriceText.model';

interface PriceTextProps {
  classNameCurrency?: string;
  classNameValue?: string;
  value: number;
}

export const PriceText: FC<PriceTextProps> = ({
  classNameCurrency,
  classNameValue,
  value,
}) => {
  const model = usePriceTextModel(value);

  return (
    <PriceTextView
      {...model}
      classNameCurrency={classNameCurrency}
      classNameValue={classNameValue}
    />
  );
};
