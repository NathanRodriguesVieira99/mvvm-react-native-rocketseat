import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input, type InputProps } from "../input";

interface InputControllerProps<T extends FieldValues> extends Omit<
  InputProps,
  "value" | "onChangeText" | "error"
> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
}

export const InputController = <T extends FieldValues>({
  name,
  control,
  errors,
  ...rest
}: InputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <Input
          onChangeText={onChange}
          value={value}
          onBlur={onBlur}
          error={error?.message}
          isDisabled={isSubmitting || rest.isDisabled}
          {...rest}
        />
      )}
    />
  );
};
