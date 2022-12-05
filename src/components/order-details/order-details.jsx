import styles from './order-details.module.css';
import { Icon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails ({orderData}) {

  return (
    <div className={`${styles.order} pt-30 pr-25 pb-30 pl-25`}>
        <p className={`${styles.id} text text_type_digits-large mb-8`}>{orderData.id}</p>
        <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <div className={`${styles.img} mb-15`}></div>
        <p className={`text text_type_main-default mb-2`}>ваш заказ начали готовить</p>
        <p className={`text text text_type_main-default text_color_inactive`}>дождитесь готовности на орбитальной станции</p>

    </div>
  )
}

export default OrderDetails;
