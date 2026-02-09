import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from './register.schema';
import type { RegisterService } from '@services/auth/register.service';
import { useRegisterMutation } from '@shared/mutations/auth/useRegister.mutation';
import { useUserStore } from '@shared/store/user.store';
import { useImage } from '@shared/hooks/useImage';
import { useState } from 'react';
import { CameraType } from 'expo-image-picker';
import { useUploadAvatarMutation } from '@shared/mutations/auth/useUploadAvatar.mutation';
import type { UploadAvatarService } from '@services/auth/uploadAvatar.service';

type useRegisterModelProps = {
  registerService: RegisterService;
  uploadAvatarService: UploadAvatarService;
};

interface InitialStates {
  avatarUri: string | null;
}

const initialStates: InitialStates = {
  avatarUri: null,
};

export const useRegisterModel = ({
  registerService,
  uploadAvatarService,
}: useRegisterModelProps) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const [avatarUri, setAvatarUri] = useState<string | null>(
    initialStates.avatarUri,
  );

  const { handleSelectImage } = useImage({
    callback: setAvatarUri,
    cameraType: CameraType.front,
  });

  const handleSelectAvatar = async () => {
    await handleSelectImage();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    },
  });

  const { mutateAsync: uploadAvatarMutation } = useUploadAvatarMutation({
    uploadAvatarService,
  });

  const { mutateAsync: userRegisterMutation } = useRegisterMutation({
    registerService,
    onSuccess: async () => {
      if (avatarUri) {
        const { url } = await uploadAvatarMutation(avatarUri);
        updateUser({ avatarUrl: url });
        reset(); // limpa o formulário após cadastro
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { confirm_password, ...registerData } = data;

    await userRegisterMutation(registerData);
  });

  return {
    register,
    control,
    errors,
    onSubmit,
    handleSelectAvatar,
    avatarUri,
  };
};
