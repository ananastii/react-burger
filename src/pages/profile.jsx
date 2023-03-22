import styles from './profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ProfileTab from "../components/profile-tab/profile-tab";
import { Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../utils/state';
import { updateUserInfo } from '../services/actions/auth';
import { useEffect } from 'react';
import { getPassword } from '../utils/state';
import { useForm } from '../hooks/useForm';

export const ProfilePage = () => {

  const description = "В этом разделе вы можете изменить свои персональные данные";

  const userInfo = useSelector(getUser);
  const password = useSelector(getPassword);

  const formInit = {
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: password || '******'
  };

  const {values, handleChange, setValues} = useForm(formInit);

  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    if (userInfo && password) {
      setValues({name: userInfo.name, email: userInfo.email, password: password});
    } else if (userInfo) {
      setValues({name: userInfo.name, email: userInfo.email, password: "******"});
    } else
      setValues(formInit);
  }, [userInfo, password]);

  const handleChangeProfile = e => {
    handleChange(e);
    setIsChanged(true);
  }

  const handleCancel = () => {
    setValues(formInit);
    setIsChanged(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(values))
    setIsChanged(false);
  };

  return (
    <div className={`${styles.container}`}>
      <ProfileTab description={description} extraClass={`pt-30`}/>
      {userInfo && (<form onSubmit={handleSubmit} className={`${styles.form} pt-30`}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleChangeProfile}
          value={values.name}
          name="name"
          icon="EditIcon"
          extraClass={`mb-6 ${styles.input}`}
        />
        <EmailInput
          placeholder="Логин"
          onChange={handleChangeProfile}
          value={values.email}
          name="email"
          icon="EditIcon"
          extraClass={`mb-6 ${styles.input}`}
        />
        <PasswordInput
          placeholder="Пароль"
          onChange={handleChangeProfile}
          value={values.password}
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
      </form>)}
    </div>
  )
}
