import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useBottomSheetStore } from '@shared/store/bottom-sheet.store';
import { colors } from '@styles/colors';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export const BottomSheetTemplate = () => {
  /* 
  useRef() -> Refs são objetos que permitem acessar diretamente um elemento da DOM sem states ou props.
  Retorna um objeto mutável -> current (geralmente com valor inicial 'null', mas pode ser 'number','string' etc).
  Armazena valores sem causar re-render ao serem alterados.
  */
  const BottomSheetRef = useRef<BottomSheet>(null);

  const content = useBottomSheetStore((s) => s.content);
  const config = useBottomSheetStore((s) => s.config);
  const isOpen = useBottomSheetStore((s) => s.isOpen);
  const close = useBottomSheetStore((s) => s.close);

  const snapPoints = useMemo(
    () => config?.snapPoints || ['80%', '90%'],
    [config?.snapPoints],
  );

  useEffect(() => {
    if (isOpen && content) {
      BottomSheetRef.current?.snapToIndex(0);
    } else {
      BottomSheetRef.current?.close();
    }
  }, [isOpen, content]);

  /* 
  useCallback() -> memoriza em cache uma função -> evita que funções sejam recriadas a cada render
  */
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) close();
    },
    [close],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
        pressBehavior={'close'}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={BottomSheetRef}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: colors.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      enablePanDownToClose={config.enablePanDownToClose ?? true}
      index={-1}
      animateOnMount
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView>{content}</BottomSheetScrollView>
    </BottomSheet>
  );
};
