import styles from './order-details.module.css';
import PropTypes from 'prop-types';

function OrderDetails ({orderData}) {

  return (

    <div className={`${styles.order} pt-30 pr-25 pb-30 pl-25`}>
      {orderData.hasError && (
        <>
          <p className={`text text_type_main-large mb-8`}>Ошибка</p>
          <p className={`text text text_type_main-default text_color_inactive`}>Cвяжитесь с командным центром</p>
        </>
      )}
      {!orderData.hasError && (
      <>
        <p className={`${styles.id} text text_type_digits-large mb-8`}>{orderData.data.order.number}</p>
        <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
        <div className={`${styles.img} mb-15`}></div>
        <p className={`text text_type_main-default mb-2`}>ваш заказ начали готовить</p>
        <p className={`text text text_type_main-default text_color_inactive`}>дождитесь готовности на орбитальной станции</p>
        </>)}
    </div>
  )
}

OrderDetails.propTypes = {
  orderData: PropTypes.shape({
    order: PropTypes.shape({
      number: PropTypes.number.isRequired
    })
  })
};

export default OrderDetails;
