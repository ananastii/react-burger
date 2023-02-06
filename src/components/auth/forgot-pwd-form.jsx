import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPwdForm = () => {

  return (
    <>
      <form onSubmit=''>
        <EmailInput
          value = ''
          type = 'email'
          onchange=''
          extraClass='mb-6'
        />
        <Button size = 'medium' extraClass={styles.btn}>
          Восстановить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вспомнили пароль?
        <Link to='/login' className="text text_type_main-default text_color_accent pl-2">
          Войти
        </Link>
      </p>
    </>
  )
};

export default ForgotPwdForm;
