import { useModalStore } from '@shared/store/modal.store';
import {
  Modal as ModalComponent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const config = useModalStore((state) => state.config);
  const content = useModalStore((state) => state.content);
  const close = useModalStore((state) => state.close);

  if (!isOpen || !content) return null;

  return (
    <ModalComponent
      visible={isOpen}
      animationType={config.animationType}
      transparent={config.transparent}
      statusBarTranslucent={config.statusBarTranslucent}
      onRequestClose={close}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <TouchableWithoutFeedback onPress={() => {}}>
            {content}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </ModalComponent>
  );
};
