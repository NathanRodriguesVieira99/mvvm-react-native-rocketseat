import { HttpClient } from '@api/http-client';
import { LoginView } from '@presentation/screens/login/login.view';
import { useLoginModel } from '@presentation/screens/login/useLogin.model';
import { LoginService } from '@services/auth/login.service';

export default function LoginPage() {
  const http = HttpClient.create();

  const loginService = new LoginService(http);

  const props = useLoginModel({ loginService });

  return <LoginView {...props} />;
}
