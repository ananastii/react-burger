import styles from './form.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updatePassword } from '../services/actions/auth';

export const ForgotPasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({});
  const { pathname } = useLocation();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    dispatch(updatePassword(form));
    navigate("/reset-password", {state: {prev : pathname}});
  }

  return (
    <>
      <form onSubmit={handlePasswordUpdate} className={styles.form} >
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <EmailInput
          value={form?.email || ''}
          name="email"
          onChange={onChange}
          extraClass="mb-6"
        />
        <Button htmlType="submit" size="medium" extraClass={styles.btn}>
          Восстановить
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
