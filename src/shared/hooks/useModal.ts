import { Ionicons } from '@expo/vector-icons';
import { useModalStore } from '@shared/store/modal.store';
import { createElement } from 'react';
import {
  SelectionModal,
  type SelectionModalProps,
} from '../../presentation/components/selection-modal';

export type SelectionVariants = 'primary' | 'secondary' | 'danger';

export interface SelectionOptions {
  text: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: SelectionVariants;
}

export const useModal = () => {
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const showSelection = ({
    title,
    message,
    options,
  }: {
    title: string;
    message?: string;
    options: SelectionOptions[];
  }) => {
    open(
      createElement(SelectionModal, {
        title,
        message,
        options,
      } as SelectionModalProps),
    );
  };

  return { showSelection };
};
