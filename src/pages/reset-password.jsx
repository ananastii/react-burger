import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export const ResetPasswordPage = () => {
  const [form, setValue] = useState({ email: ''});

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <PasswordInput
          value = ""
          type = "password"
          placeholder = "Введите новый пароль"
          //onchange=""
          extraClass="mb-6"
        />
        <Input
          value = ""
          placeholder = "Введите код из письма"
          type = "text"
          onchange = ""
          extraClass = "mb-6"
        />
        <Button size="medium" extraClass={styles.btn} htmlType="button">
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

