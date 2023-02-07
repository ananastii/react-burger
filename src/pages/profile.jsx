import styles from './profile.module.css';
import ProfileTab from "../components/profile-tab/profile-tab";
import { Input, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

export const ProfilePage = () => {

  const description = "В этом разделе вы можете изменить свои персональные данные";

  return (
    <div className={`${styles.container}`}>
      <ProfileTab description={description}/>
      <form className={styles.form}>
        <Input
          type="text"
          placeholder="Имя"
          //onChange={onChange}
          //value={values.name}
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
