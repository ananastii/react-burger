import Form from '../../components/form/form';
import ForgotPwdForm from '../../components/auth/forgot-pwd-form';

export const ForgotPasswordPage = () => {
  return (
    <Form title='Восстановление пароля'>
      <ForgotPwdForm />
    </Form>
  )
}
