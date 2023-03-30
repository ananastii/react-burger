import styles from './form.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from '../hooks';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updatePassword } from '../services/actions/auth';
import { useForm } from '../hooks/useForm';
import { SyntheticEvent } from 'react';
import { TForgotFormState } from '../services/types/data';

export const ForgotPasswordPage = () => {

  const initialFormState: TForgotFormState = {
    email: '',
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {values, handleChange} = useForm<TForgotFormState>(initialFormState);

  const handlePasswordUpdate = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(updatePassword(values));
    navigate("/reset-password");
  }

  return (
    <>
      <form onSubmit={handlePasswordUpdate} className={styles.form} >
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <EmailInput
          value={values.email}
          name="email"
          onChange={handleChange}
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
