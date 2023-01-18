import styles from './total-price.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { urlOrder } from '../../utils/constants';
import { checkoutOrder } from '../../services/actions/order';

const TotalPrice = ({price}) => {

  const { fillings, bun } = useSelector(store => store.burgerConstructor);
  const dispatch = useDispatch();

  const handleOrderClick = () => {
    const orderIngredients = [
      bun.info._id,
      ...fillings?.map(item => item.info._id),
      bun.info._id,
    ]
    dispatch(checkoutOrder(urlOrder, orderIngredients));
  };


  return (
    <div className={`${styles.container} pt-10 pb-3`}>
      <div className={`${styles.price} mr-10`} >
        {<span className='mr-2 text text_type_digits-medium'>{price}</span>}
        <span className={styles.price__icon}><CurrencyIcon type="primary"/></span>
      </div>
      <Button type="primary" size="large" htmlType="button" onClick={handleOrderClick}>Оформить заказ</Button>
    </div>
  )
};

TotalPrice.propTypes = {
  price: PropTypes.number.isRequired
};

export default TotalPrice;
