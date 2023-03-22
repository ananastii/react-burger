import styles from './form.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { submitPassword } from '../services/actions/auth';
import { getPwdResetRequested, getPwdSubmitSuccess } from '../utils/state';
import { useForm } from '../hooks/useForm';

export const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange} = useForm({});
  const pwdResetRequested = useSelector(getPwdResetRequested);
  const pwdSubmitSuccess = useSelector(getPwdSubmitSuccess);

  useEffect(()=> {
    if (!pwdResetRequested) {
      navigate("/forgot-password");
    }

  }, [navigate, pwdResetRequested]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(submitPassword(values));
  }

  useEffect(() => {
    if (pwdSubmitSuccess) {
      navigate("/login");
    }
  }, [navigate, pwdSubmitSuccess])

  return (
    <form onSubmit={handlePasswordSubmit} className={styles.form}>
      <h1 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h1>
      <PasswordInput
        value={values?.password || ''}
        name="password"
        placeholder="Введите новый пароль"
        onChange={handleChange}
        extraClass="mb-6"
      />
      <Input
        value={values?.token || ''}
        type="text"
        name="token"
        placeholder="Введите код из письма"
        onChange={handleChange}
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
  )
};

