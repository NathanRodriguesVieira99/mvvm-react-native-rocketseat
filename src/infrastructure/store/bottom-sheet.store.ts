import type { ReactNode } from 'react';
import { create } from 'zustand';

interface BottomSheetConfig {
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
}

interface BottomSheetStates {
  isOpen: boolean;
  content: ReactNode | null;
  config: BottomSheetConfig;
}

interface BottomSheetActions {
  open: (content: { content: ReactNode; config?: BottomSheetConfig }) => void;
  close: () => void;
}

type BottomSheetStore = BottomSheetStates & BottomSheetActions;

const defaultBottomSheetConfig: BottomSheetConfig = {
  snapPoints: ['80%', '90%'],
  enablePanDownToClose: true,
};

const initialStates: BottomSheetStates = {
  isOpen: false,
  content: null,
  config: defaultBottomSheetConfig,
};

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  ...initialStates,

  open: ({ config, content }) =>
    set({
      isOpen: true,
      config: { ...defaultBottomSheetConfig, ...config },
      content,
    }),

  close: () =>
    set({
      ...initialStates,
    }),
}));
