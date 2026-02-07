import type { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalConfig {
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  statusBarTranslucent?: boolean;
}

interface ModalStates {
  isOpen: boolean;
  content: ReactNode | null;
  config: ModalConfig;
}

interface ModalActions {
  open: (content: ReactNode, config?: ModalConfig) => void;
  close: () => void;
}

type ModalStore = ModalStates & ModalActions;

export const useModalStore = create<ModalStore>((set, get) => ({
  isOpen: false,
  content: null,
  config: {
    animationType: 'fade',
    transparent: true,
    statusBarTranslucent: false,
  },

  open: (content: ReactNode, config?: ModalConfig) =>
    set({
      isOpen: true,
      content,
      config: {
        ...get().config,
        ...config,
      },
    }),

  close: () =>
    set({
      isOpen: false,
      content: null,
    }),
}));
