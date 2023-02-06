import styles from './auth.module.css';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const RegisterForm = () => {

  return (
    <>
      <form onSubmit=''>
      <Input
          value = ''
          placeholder='Имя'
          type = 'email'
          onchange=''
          extraClass='mb-6'
        />
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
          Войти
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Уже зарегистрированы?
        <Link to='/login' className="text text_type_main-default text_color_accent pl-2">
          Войти
        </Link>
      </p>
    </>
  )
};

export default RegisterForm;
