import { RegisterView } from "../presentation/view-models/register/register.view";
import { useRegisterModel } from "../presentation/view-models/register/useRegister.model";

export default function Register() {
  const methods = useRegisterModel();

  return <RegisterView {...methods} />;
}
