import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Toast } from 'toastify-react-native';
import type { ImagePickerOptions } from 'expo-image-picker';

interface InitialState {
  isLoading: boolean;
}

const initialStates: InitialState = {
  isLoading: false,
};

export const useCamera = (imagePickerOptions: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(initialStates.isLoading);

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      const currentStatus = status === 'granted';

      if (!currentStatus) {
        Toast.error('Precisamos de sua autorização para acessar a camera');
      }

      return currentStatus;
    } catch (err) {
      Toast.error('Erro ao solicitar permissões da camera');
      return false;
    }
  }, []);

  const openCamera = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);

    try {
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync(imagePickerOptions);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success('Foto capturada com sucesso!', 'top');
        return result.assets[0].uri;
      }

      return null;
    } catch (err) {
      Toast.error('Erro ao abrir camera', 'top');
      return null;
    } finally {
      setIsLoading(initialStates.isLoading);
    }
  }, []);

  return {
    requestCameraPermission,
    openCamera,
    isLoading,
  };
};
