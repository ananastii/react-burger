import styles from './not-found-404.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router';

export const NotFound404 = () => {

  const navigate= useNavigate();

  return (
    <div className={`${styles.container}`}>
      <p className={`${styles.code} text text_type_digits-large pt-30 mb-6`}>404</p>
      <p className={`${styles.text} text text_type_main-medium text_color_inactive mb-6`}>Вы попали в неизведанную галактику</p>
      <p className={`${styles.text} text text_type_main-medium text_color_inactive mb-8`}>Пожалуйста, вернитесь на орбитальную станцию</p>
      <Button htmlType="button" type="primary" size="large"
        onClick={() => { console.log(1);navigate(-1)}}>
          Вернуться
        </Button>
    </div>
  )
}
