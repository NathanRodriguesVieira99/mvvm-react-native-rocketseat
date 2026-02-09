import { HttpClient } from '@api/http-client';
import { RegisterView } from '@presentation/view-models/register/register.view';
import { useRegisterModel } from '@presentation/view-models/register/useRegister.model';
import { RegisterService } from '@services/auth/register.service';
import { UploadAvatarService } from '@services/auth/uploadAvatar.service';

export default function RegisterPage() {
  const http = HttpClient.create();

  const registerService = new RegisterService(http);
  const uploadAvatarService = new UploadAvatarService(http);

  const methods = useRegisterModel({ registerService, uploadAvatarService });

  return <RegisterView {...methods} />;
}
