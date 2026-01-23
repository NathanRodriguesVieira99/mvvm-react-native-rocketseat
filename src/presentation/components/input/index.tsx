import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from 'react-native';
import { inputVariants, type InputVariantsProps } from './variants';
import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { useInputModel } from './useInput.model';

export interface InputProps extends TextInputProps, InputVariantsProps {
  label?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  containerClassName?: string;
  mask?: (value: string) => string | void;
  error?: string;
}

export const Input: FC<InputProps> = ({
  label,
  leftIcon,
  rightIcon,
  containerClassName,
  className,
  mask,
  value,
  isError,
  isDisabled,
  secureTextEntry = false,
  onFocus,
  onBlur,
  onChangeText,
  error,
  ...props
}) => {
  const {
    showPassword,
    handlePasswordToggle,
    handleWrapperPress,
    handleTextChange,
    getIconColor,
    handleFocus,
    handleBlur,
    isFocused,
  } = useInputModel({
    onBlur,
    onFocus,
    onChangeText,
    isError: !!error,
    mask,
    isDisabled,
    value,
    secureTextEntry,
  });

  const styles = inputVariants({
    isFocused,
    isDisabled,
    isError: !!error,
  });

  return (
    <View className={styles.container({ className: containerClassName })}>
      <Text className={styles.label()}>{label}</Text>
      <Pressable className={styles.wrapper()}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={22}
            color={getIconColor()}
            className="mr-3"
          />
        )}
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={handleTextChange}
          value={value}
          secureTextEntry={showPassword}
          className={styles.input()}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity activeOpacity={0.7} onPress={handlePasswordToggle}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={22}
            />
          </TouchableOpacity>
        )}
      </Pressable>
      {error && (
        <Text className={styles.error()}>
          <Ionicons name="alert-circle-outline" /> {error}
        </Text>
      )}
    </View>
  );
};
