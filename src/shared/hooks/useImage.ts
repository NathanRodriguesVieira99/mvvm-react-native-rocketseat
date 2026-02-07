import type { ImagePickerOptions } from 'expo-image-picker';
import { useCamera } from './useCamera';
import { useGallery } from './useGallery';
import { useModal } from './useModal';
import { useModalStore } from '@shared/store/modal.store';

interface useImageParams extends ImagePickerOptions {
  callback: (uri: string | null) => void;
}

export const useImage = ({
  callback,
  ...imagePickerOptions
}: useImageParams) => {
  const { openCamera, isLoading: isCameraLoading } =
    useCamera(imagePickerOptions);

  const { openGallery, isLoading: isGalleryLoading } =
    useGallery(imagePickerOptions);

  const modals = useModal();
  const close = useModalStore((s) => s.close);

  const handleCallback = (uri: string | null) => {
    close();
    callback(uri);
  };

  const isCameraOrGalleryLoading = Boolean(isCameraLoading || isGalleryLoading);

  const handleSelectImage = () => {
    modals.showSelection({
      title: 'Selecionar foto',
      message: 'Escolha uma opção:',
      options: [
        {
          text: 'Galeria',
          icon: 'images',
          variant: 'primary',
          onPress: async () => {
            const imageUri = await openGallery();
            handleCallback(imageUri);
          },
        },
        {
          text: 'Câmera',
          icon: 'camera',
          variant: 'primary',
          onPress: async () => {
            const imageUri = await openCamera();
            handleCallback(imageUri);
          },
        },
      ],
    });
  };
  return {
    handleSelectImage,
    isCameraOrGalleryLoading,
  };
};
