import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const RegisterPage = () => {
  return (
    <form className={styles.form}>
      <h1 className="text text_type_main-medium text_color_primary mb-6">
        Регистрация
      </h1>
      <Input
        value = ""
        placeholder="Имя"
        type = "text"
        onchange=""
        extraClass="mb-6"
      />
      <EmailInput
        value = ""
        type = "email"
        onchange=""
        extraClass="mb-6"
      />
      <PasswordInput
        value = ""
        type = "password"
        //onchange=""
        extraClass="mb-6"
      />
      <Button size = "medium" extraClass={styles.btn}>
        Войти
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
