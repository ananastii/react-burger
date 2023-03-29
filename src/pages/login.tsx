import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from '../services/actions/auth';
import { useForm } from '../hooks/useForm';
import { SyntheticEvent } from 'react';

export const LoginPage = () => {

  const {values, handleChange} = useForm({});

  const dispatch = useDispatch();

  const submitLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser(values));
  }

  return (
    <form onSubmit={submitLogin} className={styles.form}>
      <h1 className="text text_type_main-medium text_color_primary mb-6">
        Вход
      </h1>
      <EmailInput
        value={values?.email || ''}
        name="email"
        onChange={handleChange}
        extraClass="mb-6"
      />
      <PasswordInput
        value={values?.password || ''}
        name="password"
        onChange={handleChange}
        extraClass="mb-6"
      />
      <Button htmlType="submit" size="medium" extraClass={styles.btn}>
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link to="/register" className="text text_type_main-default text_color_accent pl-2">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link to="/forgot-password" className="text text_type_main-default text_color_accent pl-2">
          Восстановить пароль
        </Link>
      </p>
    </form>
  )
}
