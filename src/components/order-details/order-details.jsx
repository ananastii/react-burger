import styles from './order-details.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFeed } from '../../utils/state';
import Preview from '../common/preview/preview';
import Price from '../common/price/price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { styleStatus } from '../../utils/components';

const OrderDetails = () => {

  const location = useLocation();

  const order = location.state?.order;
  const ingredientsInfo = location.state?.ingredientsInfo;
 // const totalPrice = location.state?.totalPrice;
  const { orders } = useSelector(getFeed);
  const { id } = useParams();
  const [orderData, setOrderData] = useState(order);
  const [ingredientsData, setIngredientsData] = useState(ingredientsInfo);
  const [totalPrice, setTotalPrice] = useState(location.state?.totalPrice);
  const [ingredientsQty, setIngredientsQty] = useState([]);
  const [statusDecoration, setStatusDecoration] = useState();

  useEffect(() => {
    if (!order) {
      setOrderData(orders.find(item => item?._id === id))
    }; // todo else отправляем запрос на сервер
    // if (ingredientsInfo) {
    //   setIngredientsData(ingredientsInfo);
    // }

  }, [id, ingredientsInfo, order, orders]);

  useEffect(() => {
    setIngredientsQty(
      order.ingredients.reduce((total, cur) => {
        total[cur] = (total[cur] || 0) + 1;
        return total
      }, {})
    );
    setStatusDecoration(styleStatus(order.status));
  }, [order])

  return (
    orderData && statusDecoration &&
    (<div className={`${styles.container} p-10`}>
      <p className={`${styles.id} text text_type_digits-default mb-10`}>{`#${order.number}`}</p>
      <h1 className={`text text_type_main-medium pb-2`}>{order.name}</h1>
      <p className={`${statusDecoration.class} text text_type_main-default pb-15`}>{statusDecoration.text}</p>
      <h2 className={`text text_type_main-medium pb-7`}>Состав: </h2>
      <ul className={`${styles.scroll} ${styles.feed} custom-scroll`}>
        {ingredientsData.map((item) =>
          (<li className={`${styles.ingredient} mb-4 mr-6`} key={item._id}>
            <Preview image={item.image}/>
            <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
            <div className={`${styles.price} text text_type_digits-default`}>
              <Price price={item.price} count={ingredientsQty[item._id]}/>
            </div>
          </li>))}
      </ul>
      <div className={`${styles.info} pt-10`}>
        <FormattedDate date={new Date(orderData.createdAt)} className="text text_type_main-default text_color_inactive"/>
        <Price price={totalPrice}/>
      </div>
    </div>)
  )
};

export default OrderDetails;
