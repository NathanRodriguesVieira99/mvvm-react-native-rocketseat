import { Ionicons } from '@expo/vector-icons';
import { clsx } from 'clsx';
import type {
  SelectionOptions,
  SelectionVariants,
} from '@shared/hooks/useModal';
import type { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../styles/colors';

export interface SelectionModalProps {
  title: string;
  message?: string;
  options: SelectionOptions[];
}

export const SelectionModal: FC<SelectionModalProps> = ({
  title,
  message,
  options,
}) => {
  const getButtonClass = (variant: SelectionVariants) =>
    clsx(
      'w-full justify-center items-center px-4 py-3 rounded-lg flex-row mb-2',
      {
        'bg-danger': variant === 'danger',
        'bg-blue-dark': variant === 'secondary',
        'bg-purple-base': variant === 'primary',
      },
    );

  return (
    <View className="mx-auto w-[85%] max-w-sm rounded-xl bg-white p-6 shadow-2xl">
      <View className="items-center">
        <Text className="mb-3 text-lg font-bold text-gray-900">{title}</Text>
        {message && (
          <Text className="mb-6 text-base leading-6 text-gray-600">
            {message}
          </Text>
        )}
      </View>

      <View className="gap-3">
        {options.map((option, index) => (
          <TouchableOpacity
            key={`selected-item-${index}`}
            onPress={option.onPress}
            className={getButtonClass(option.variant ?? 'primary')}
          >
            {option.icon && (
              <Ionicons
                name={option.icon}
                color={colors.white}
                size={20}
                className="mr-2"
              />
            )}
            <Text className="font-semibold text-white">{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
