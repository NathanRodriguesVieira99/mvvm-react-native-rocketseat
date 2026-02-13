import { DEBOUNCE_DELAY_IN_MILLISECONDS } from '@shared/constants';
import { useEffect, useState } from 'react';

/**
  useDebounce -> gerencia o estado dos valores digitados no input a cada meio segundo.
  Após os 500ms atualiza o estado do React Query, refazendo a requisição HTTP.
 */
export const useDebounce = <T>(
  value: T,
  delay: number = DEBOUNCE_DELAY_IN_MILLISECONDS,
) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setInterval(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
