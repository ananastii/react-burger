import styles from './profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ProfileTab from "../components/profile-tab/profile-tab";
import { Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../utils/state';
import { updateUserInfo } from '../services/actions/auth';
import { useEffect } from 'react';
import { getPassword } from '../utils/state';

export const ProfilePage = () => {

  const description = "В этом разделе вы можете изменить свои персональные данные";

  const userInfo = useSelector(getUser);
  const password = useSelector(getPassword);

  const formInit = {
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: password || '******'
  };

  const [form, setForm] = useState(formInit);
  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    if (userInfo && password) {
      setForm({name: userInfo.name, email: userInfo.email, password: password});
    } else if (userInfo) {
      setForm({name: userInfo.name, email: userInfo.email, password: "******"});
    } else
      setForm(formInit);
  }, [userInfo, password]);

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const handleCancel = () => {
    setForm(formInit);
    setIsChanged(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(form))
    setIsChanged(false);
  };

  return (
    <div className={`${styles.container}`}>
      <ProfileTab description={description} extraClass={`pt-30`}/>
      {userInfo && (<form onSubmit={handleSubmit} className={`${styles.form} pt-30`}>
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
      </form>)}
    </div>
  )
}
