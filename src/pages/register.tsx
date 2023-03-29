import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../services/actions/auth';
import { useForm } from '../hooks/useForm';
import { SyntheticEvent } from 'react';

export const RegisterPage = () => {

  const {values, handleChange} = useForm({});

  const dispatch = useDispatch();

  const submitRegistration = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUser(values));
  }

  return (
    <form className={styles.form} onSubmit={submitRegistration}>
      <h1 className="text text_type_main-medium text_color_primary mb-6">
        Регистрация
      </h1>
      <Input
        value={values?.name || ''}
        name="name"
        placeholder="Имя"
        type="text"
        onChange={handleChange}
        extraClass="mb-6"
      />
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
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link to="/login" className="text text_type_main-default text_color_accent pl-2">
          Войти
        </Link>
      </p>
    </form>
  )
}
