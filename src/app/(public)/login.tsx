import { HttpClient } from '@api/http-client';
import { LoginView } from '../../presentation/view-models/login/login.view';
import { useLoginModel } from '../../presentation/view-models/login/useLogin.model';
import { LoginService } from '@services/login.service';

export default function Login() {
  const http = HttpClient.create();

  const loginService = new LoginService(http);

  const props = useLoginModel({ loginService });

  return <LoginView {...props} />;
}
