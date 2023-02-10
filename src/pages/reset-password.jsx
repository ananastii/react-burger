import styles from './form.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { submitPassword } from '../services/actions/auth';

export const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({ });
  const { state } = useLocation();

  useEffect(()=> {
    if (state.prev !== "/forgot-password") {
      navigate("/forgot-password");
    }

  }, [state]);


  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(submitPassword(form));
    navigate("/login");
  }

  return (
    <>
      <form onSubmit={handlePasswordSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <PasswordInput
          value={form?.password || ''}
          type="password"
          name="password"
          placeholder="Введите новый пароль"
          onChange={onChange}
          extraClass="mb-6"
        />
        <Input
          value={form?.token || ''}
          type="text"
          name="token"
          placeholder="Введите код из письма"
          onChange={onChange}
          extraClass="mb-6"
        />
        <Button htmlType="submit" size="medium" extraClass={styles.btn}>
          Сохранить
        </Button>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?
          <Link to="/login" className="text text_type_main-default text_color_accent pl-2">
            Войти
          </Link>
        </p>
      </form>
    </>
  )
};

