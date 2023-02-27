import styles from './order-details.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeed, getWsConnected, getAllIngredients } from '../../utils/state';
import Preview from '../common/preview/preview';
import Price from '../common/price/price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { styleStatus } from '../../utils/components';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/actions/ws';

const OrderDetails = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  const isConnected = useSelector(getWsConnected);
  const { id } = useParams();

  const feed  = useSelector(getFeed);

  const isDataSet = location.state ? true : false;

  const allIngredients = useSelector(getAllIngredients).ingredients;

  const [order, setOrder] = useState(location.state?.order || null);
  const [ingredientsInfo, setIngredientsInfo] = useState(location.state?.ingredientsInfo)
  const [totalPrice, setTotalPrice] = useState(location.state?.totalPrice);
  const [ingredientsQty, setIngredientsQty] = useState([]);
  const [statusDecoration, setStatusDecoration] = useState();
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!isDataSet && !isConnected) {
      dispatch({ type: WS_CONNECTION_START });
    };
    if(!isDataSet && isConnected) {
      return () =>
      dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch, isDataSet, isConnected]);

  useEffect(() => {
    if (!isDataSet) {
      setOrder((feed?.find((item) => item._id === id) || null));
    };
  }, [id, feed]);

  useEffect(() => {
    if (!isDataSet) {
      setIngredientsInfo(allIngredients?.filter(
          (item) => order?.ingredients.includes(item.info._id))
        .map((item) => item.info))
    };

  }, [allIngredients, order]);

  useEffect(() => {
    if (!isDataSet) {
      setTotalPrice(ingredientsInfo?.reduce((price, item) => price + item.price, 0));
    };

  }, [ingredientsInfo]);

  useEffect(() => {
    setIngredientsQty(
      order?.ingredients.reduce((total, cur) => {
        total[cur] = (total[cur] || 0) + 1;
        return total
      }, {})
    );
    setStatusDecoration(styleStatus(order?.status));
  }, [order]);

  return (
    <div className={`${styles.container} p-10`}>
      {order && ingredientsInfo && statusDecoration && totalPrice &&
        (<>
          <h2 className={`${styles.id} text text_type_digits-default mb-10`}>{`#${order.number}`}</h2>
          <h3 className={`text text_type_main-medium pb-2`}>{order.name}</h3>
          <p className={`${statusDecoration.class} text text_type_main-default pb-15`}>{statusDecoration.text}</p>
          <p className={`text text_type_main-medium pb-7`}>Состав: </p>
          <ul className={`${styles.scroll} ${styles.feed} custom-scroll`}>
            {ingredientsInfo.map((item) =>
              (<li className={`${styles.ingredient} mb-4 mr-6`} key={item._id}>
                <Preview image={item.image}/>
                <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
                <div className={`${styles.price} text text_type_digits-default`}>
                  <Price price={item.price} count={ingredientsQty[item._id]}/>
                </div>
              </li>))}
          </ul>
          <div className={`${styles.info} pt-10`}>
            <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive"/>
            <Price price={totalPrice}/>
          </div>
        </>)}
      {isExpired &&
        (<p className={`${styles.error} text text_type_main-large text_color_inactive mb-6`}>
          Информация о заказе находится вне бургерной галактики
        </p>)
      }
      </div>
  )
};

export default OrderDetails;
