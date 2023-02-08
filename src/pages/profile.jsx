import styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import ProfileTab from "../components/profile-tab/profile-tab";
import { Input, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser } from '../services/actions/auth';
import { getCookie } from '../utils/cookies';

export const ProfilePage = () => {

  const refreshToken = getCookie("refreshToken");

  const dispatch = useDispatch();

  const submitLogout = (e) => {
    e.preventDefault();

    dispatch(logoutUser(refreshToken));
  }


  const description = "В этом разделе вы можете изменить свои персональные данные";

  return (
    <div className={`${styles.container}`}>
      <ProfileTab description={description} onLogout={submitLogout}/>
      <form className={styles.form}>
        <Input
          type="text"
          placeholder="Имя"
          //onChange={onChange}
          value=""
          name="name"
          icon="EditIcon"
          extraClass="mb-6"
        />
        <EmailInput
          placeholder="Логин"
          //onChange={onChange}
          //value={values.email}
          name="email"
          icon="EditIcon"
          extraClass="mb-6"
        />
        <PasswordInput
          type="password"
          placeholder="Пароль"
          //onChange={onChange}
          //value={values.password}
          name="password"
          icon="EditIcon"
        />
      </form>
    </div>
  )
}
