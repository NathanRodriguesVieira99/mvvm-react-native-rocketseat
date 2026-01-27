import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import { buttonVariants, type ButtonVariantsProps } from './variants';
import type { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/colors';

interface ButtonProps extends TouchableOpacityProps, ButtonVariantsProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  children: string;
}

export const Button: FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  children,
  isLoading,
  isDisabled,
  variant = 'filled',
  className,
  ...rest
}) => {
  const styles = buttonVariants({
    hasIcon: !!leftIcon || !!rightIcon,
    isDisabled,
    isLoading,
    variant,
  });

  const contentColor =
    variant === 'filled' ? colors.white : colors['purple-base'];

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size={'small'} color={contentColor} />;
    }

    return (
      <>
        {leftIcon && (
          <Ionicons name={leftIcon} color={contentColor} size={20} />
        )}{' '}
        <Text className={styles.text()}>{children}</Text>
        {rightIcon && (
          <Ionicons name={rightIcon} color={contentColor} size={20} />
        )}{' '}
      </>
    );
  };

  return (
    <TouchableOpacity className={styles.base({ className })} {...rest}>
      {renderContent()}
    </TouchableOpacity>
  );
};
