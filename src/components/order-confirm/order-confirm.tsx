import styles from './order-confirm.module.css';
import { useSelector } from '../../services/hooks';
import { getOrder } from '../../utils/state';

function OrderConfirm () {

  const { orderId, orderFailed } = useSelector(getOrder);

  return (

    <div className={`${styles.order} pt-30 pr-25 pb-30 pl-25`}>
      {!orderFailed && !orderId &&
        (<>
          <p className={`text text_type_main-large mb-8`}>Заказ оформляется</p>
          <p className={`text text text_type_main-default text_color_inactive`}>Ждите подтверждение</p>
        </>)
      }
      { orderId &&
        (<>
            <p className={`${styles.id} text text_type_digits-large mb-8`}>{orderId}</p>
            <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
            <div className={`${styles.img} mb-15`}></div>
            <p className={`text text_type_main-default mb-2`}>ваш заказ начали готовить</p>
            <p className={`text text text_type_main-default text_color_inactive`}>дождитесь готовности на орбитальной станции</p>
        </>)
      }
      { orderFailed &&
        (<>
          <p className={`text text_type_main-large mb-8`}>Ошибка</p>
          <p className={`text text text_type_main-default text_color_inactive`}>Cвяжитесь с командным центром</p>
        </>)
      }
    </div>
  )
}

export default OrderConfirm;
