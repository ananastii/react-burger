import styles from './profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ProfileTab from "../components/profile-tab/profile-tab";
import { Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser } from '../services/actions/auth';
import { getCookie } from '../utils/cookies';
import { getUser } from '../utils/store';
import { updateUserInfo } from '../services/actions/auth';

export const ProfilePage = () => {

  const description = "В этом разделе вы можете изменить свои персональные данные";

  /*
  const { name, email } = useSelector(getUser);

  const formInit = {
    name: name,
    email: email,
    password: "******"
  };
  */

  const userInfo = useSelector(getUser);

  const formInit = {
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: "******"
  };

  const [form, setForm] = useState(formInit);
  const [isChanged, setIsChanged] = useState(false);

  const refreshToken = getCookie("refreshToken");

  const dispatch = useDispatch();

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const handleCancel = () => {
    setForm(formInit);
    setIsChanged(false);
  };

  const handleSubmit = () => {
    dispatch(updateUserInfo(form))
    setIsChanged(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser(refreshToken));
  }

  return (
    <div className={`${styles.container}`}>
      <ProfileTab description={description} onLogout={handleLogout}/>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={onChange}
          value={form.name}
          name="name"
          icon="EditIcon"
          extraClass={`mb-6 ${styles.input}`}
        />
        <EmailInput
          placeholder="Логин"
          onChange={onChange}
          value={form.email}
          name="email"
          icon="EditIcon"
          extraClass={`mb-6 ${styles.input}`}
        />
        <PasswordInput
          placeholder="Пароль"
          onChange={onChange}
          value={form.password}
          name="password"
          icon="EditIcon"
          extraClass={styles.input}
        />
        { isChanged && <div className={`mt-6 mr-4 ${styles.handlers}`}>
          <Button size="medium" htmlType="button" type="secondary" onClick={handleCancel}>
            Отмена
          </Button>
          <Button htmlType="submit" size="medium">
            Сохранить
          </Button>
        </div>}
      </form>
    </div>
  )
}
