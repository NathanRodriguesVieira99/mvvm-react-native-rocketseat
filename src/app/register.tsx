import { HttpClient } from '@api/http-client';
import { RegisterView } from '../presentation/view-models/register/register.view';
import { useRegisterModel } from '../presentation/view-models/register/useRegister.model';
import { RegisterService } from '@services/register.service';

export default function Register() {
  const http = HttpClient.create();

  const registerService = new RegisterService(http);

  const methods = useRegisterModel({ registerService });

  return <RegisterView {...methods} />;
}
