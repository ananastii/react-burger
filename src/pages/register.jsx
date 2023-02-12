import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../services/actions/auth';

export const RegisterPage = () => {

  const [form, setValue] = useState({});

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const submitRegistration = (e) => {
    e.preventDefault();

    dispatch(registerUser(form));
  }

  return (
    <form className={styles.form} onSubmit={submitRegistration}>
      <h1 className="text text_type_main-medium text_color_primary mb-6">
        Регистрация
      </h1>
      <Input
        value={form?.name || ''}
        name="name"
        placeholder="Имя"
        type="text"
        onChange={onChange}
        extraClass="mb-6"
      />
      <EmailInput
        value={form?.email || ''}
        name="email"
        onChange={onChange}
        extraClass="mb-6"
      />
      <PasswordInput
        value={form?.password || ''}
        name="password"
        onChange={onChange}
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
