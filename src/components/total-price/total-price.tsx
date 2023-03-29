import styles from './total-price.module.css';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { useNavigate, useLocation } from "react-router-dom";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { checkoutOrder } from '../../services/actions/order';
import { getConstructor, getUser } from '../../utils/state';
import { getCookie } from '../../utils/cookies';

type TTotalPrice = {
  price: number,
}

const TotalPrice: FC<TTotalPrice> = ({price}) => {

  const { fillings, bun } = useSelector(getConstructor);
  const user = useSelector(getUser);
  const { pathname } = useLocation();
  const refreshToken = getCookie("refreshToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderClick = () => {
    const orderIngredients = [
      bun?.info._id,
      ...fillings?.map(item => item.info._id),
      bun?.info._id,
    ]
    user || refreshToken ? dispatch(checkoutOrder(orderIngredients))
      : navigate("/login", {state: {prev: pathname}});
    ;
  };


  return (
    <div className={`${styles.container} pt-10 pb-3`}>
      <div className={`${styles.price} mr-10`} >
        {<span className='mr-2 text text_type_digits-medium'>{price}</span>}
        <span className={styles.price__icon}><CurrencyIcon type="primary"/></span>
      </div>
      <Button type="primary" size="large" htmlType="button" onClick={handleOrderClick} disabled={!price}>Оформить заказ</Button>
    </div>
  )
};

export default TotalPrice;
