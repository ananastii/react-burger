import styles from './order-details.module.css';
import { useLocation, useParams, matchPath } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import Preview from '../common/preview/preview';
import Price from '../common/price/price';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { styleStatus } from '../../utils/components';
import {
  getOrdersFeed,
  getWsFeedConnected,
  getOrdersUser,
  getWsOrdersConnected,
  getAllIngredients
} from '../../utils/state';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/actions/ws';
import {
  USER_WS_CONNECTION_START,
  USER_WS_CONNECTION_CLOSED,
} from '../../services/actions/wsUser';
import { TIngredientData, TIngredientInfo, TOrderData } from '../../services/types/data';

const OrderDetails = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  const { id } = useParams();

  const isUserOrder = matchPath({ path: "/profile/orders/:id" }, location.pathname);

  const isFeedConnected = useSelector(getWsFeedConnected);
  const isOrdersConnected = useSelector(getWsOrdersConnected);

  const ordersAll = useSelector(getOrdersFeed);
  const ordersUser = useSelector(getOrdersUser);

  const feed = isUserOrder ? ordersUser : ordersAll;

  const allIngredients = useSelector(getAllIngredients).ingredients;

  const isDataSet = location.state ? true : false;

  useEffect(() => {
    if ( isUserOrder) {
      if (!isDataSet && !isFeedConnected) {
        dispatch({ type: USER_WS_CONNECTION_START });
      };
      if(!isDataSet && isFeedConnected) {
        return () => {
          dispatch({ type: USER_WS_CONNECTION_CLOSED });
        }
      }
    } else {
      if (!isDataSet && !isOrdersConnected) {
        dispatch({ type: WS_CONNECTION_START });
      };
      if(!isDataSet && isOrdersConnected) {
        return () => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        }
      }
    }
  }, [dispatch, isFeedConnected, isOrdersConnected]);


  const order = useMemo(
    () => {
      if (feed.length) {
        return location.state?.order ||
          feed.find((order: TOrderData) => order._id === id)
          || "not found"
      }
    },
    [feed, id]
  );

  const ingredientsInfo = useMemo(
    () => allIngredients?.filter(
      (item: TIngredientData) => order?.ingredients?.includes(item.info._id))
    .map((item: TIngredientData) => item.info)
    || null,
    [allIngredients, order?.ingredients]
  );

  const ingredientsQty = useMemo(
    () => location.state?.ingredientsQty ||
      order?.ingredients?.reduce((total: {[key: string] : number}, cur: string) => {
        total[cur] = (total[cur] || 0) + 1;
        return total
      }, {})
      || null,
    [order]
  );

  const totalPrice = useMemo(
    () => location.state?.totalPrice ||
      ingredientsInfo?.reduce((price: number, item: TIngredientInfo) => price + item.price*ingredientsQty[item._id], 0)
      || 0,
    [ingredientsInfo, ingredientsQty]
  );

  const statusDecoration = useMemo(
    () => styleStatus(order?.status)
      ||  {class: '', text: ''},
    [order]
  );

  return (
    <div className={`${styles.container} p-10`}>
      {order && order !== "not found" && ingredientsInfo && totalPrice && ingredientsInfo &&
        (<>
          <h2 className={`${styles.id} text text_type_digits-default mb-10`}>{`#${order.number}`}</h2>
          <h3 className={`text text_type_main-medium pb-2`}>{order.name}</h3>
          <p className={`${statusDecoration.class} text text_type_main-default pb-15`}>{statusDecoration.text}</p>
          <p className={`text text_type_main-medium pb-7`}>Состав: </p>
          <ul className={`${styles.scroll} ${styles.feed} custom-scroll`}>
            {ingredientsInfo.map((item: TIngredientInfo) =>
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
      { order === "not found" &&
        (<p className={`${styles.error} text text_type_main-large text_color_inactive mb-6`}>
          Информация о заказе находится вне бургерной галактики
        </p>)
      }
      </div>
  )
};

export default OrderDetails;
