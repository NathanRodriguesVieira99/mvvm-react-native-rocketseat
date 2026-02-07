import type { ImagePickerOptions } from 'expo-image-picker';
import { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'toastify-react-native';
import { Alert, Linking } from 'react-native';

interface InitialStates {
  isLoading: boolean;
}

const initialStates: InitialStates = {
  isLoading: false,
};

export const useGallery = (imagePickerOptions: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(initialStates.isLoading);

  const requestGalleryPermission = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      const currentStatus = status === 'granted';

      if (!currentStatus) {
        Alert.alert(
          'Permissão negada!',
          'Precisamos da sua permissão para acessar a galeria',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Abrir configurações',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }

      return currentStatus;
    } catch (err) {
      Toast.error('Erro ao solicitar permissões para acessar suas fotos');
      return false;
    }
  }, []);

  const openGallery = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);

    try {
      const hasPermission = await requestGalleryPermission();

      if (!hasPermission) return null;

      const result =
        await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success('Foto selecionada com sucesso!', 'top');
        return result.assets[0].uri;
      }

      return null;
    } catch (err) {
      Toast.error('Erro ao acessar suas fotos', 'top');
      return null;
    } finally {
      setIsLoading(initialStates.isLoading);
    }
  }, []);

  return {
    requestGalleryPermission,
    openGallery,
    isLoading,
  };
};
