import styles from './profile.module.css';
import { useSelector, useDispatch } from '../hooks';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import ProfileTab from "../components/profile-tab/profile-tab";
import { Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../utils/state';
import { updateUserInfo } from '../services/actions/auth';
import { useEffect } from 'react';
import { getPassword } from '../utils/state';
import { useForm } from '../hooks/useForm';
import { TUserFormState } from '../services/types/data';

export const ProfilePage = () => {

  const description = "В этом разделе вы можете изменить свои персональные данные";

  const userInfo = useSelector(getUser);
  const password = useSelector(getPassword);

  const initialFormState: TUserFormState = {
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: password || '******'
  };

  const {values, handleChange, setValues} = useForm<TUserFormState>(initialFormState);

  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && password) {
      setValues({name: userInfo.name, email: userInfo.email, password: password});
    } else if (userInfo) {
      setValues({name: userInfo.name, email: userInfo.email, password: "******"});
    } else
      setValues(initialFormState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // TODO missing dependency to avoid rerender cycle
  }, [userInfo, password]);

  const handleChangeProfile = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setIsChanged(true);
  }

  const handleCancel = () => {
    setValues(initialFormState);
    setIsChanged(false);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    console.log(typeof values.name);
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
        <Input
          type="email"
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
