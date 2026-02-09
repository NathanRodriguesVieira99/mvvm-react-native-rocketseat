import type { UploadAvatarService } from '@services/auth/uploadAvatar.service';
import { useMutation } from '@tanstack/react-query';
import { Toast } from 'toastify-react-native';

interface useUploadAvatarMutationParams {
  uploadAvatarService: UploadAvatarService;
}

export const useUploadAvatarMutation = ({
  uploadAvatarService,
}: useUploadAvatarMutationParams) => {
  return useMutation({
    mutationFn: (avatarUri: string) => uploadAvatarService.exec(avatarUri),
    onSuccess: (response) => {},
    onError: (err) => {
      console.error(err);
      Toast.error('Erro ao fazer upload da imagem de perfil', 'top');
    },
  });
};
