import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const LoginForm = () => {

  return (
    <>
      <form onSubmit=''>
        <EmailInput
          value = ''
          type = 'email'
          onchange=''
          extraClass='mb-6'
        />
        <PasswordInput
          value = ''
          type = 'password'
          //onchange=''
          extraClass='mb-6'
        />
        <Button size = 'medium' extraClass={styles.btn}>
          Зарегистрирвоаться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вы — новый пользователь?
        <Link to='/register' className="text text_type_main-default text_color_accent pl-2">
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль?
        <Link to='/forgot-password' className="text text_type_main-default text_color_accent pl-2">
          Восстановить пароль
        </Link>
      </p>
    </>
  )
};

export default LoginForm;
