import styles from './feed.module.css';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TwoColumns from '../components/two-columns/two-columns';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../services/actions/ws';
import FeedOrder from '../components/feed-order/feed-order';
import { getFeed, getTotal, getTotalToday } from '../utils/state';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const FeedPage = () => {

  const dispatch = useDispatch();

  const feed = useSelector(getFeed);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () =>
      dispatch({ type: WS_CONNECTION_CLOSED });
  }, [dispatch]);

  const ordersStatus = useMemo(() => feed.reduce((list, order) => {
    order.status === "done" ?
      list.doneOrders.push(order.number) :
      (order.status === "pending" && list.pendingOrders.push(order.number));
    return list
    }, {doneOrders: [], pendingOrders: []}
  ), [feed]);

  return (
    <TwoColumns>
      <section className={`${styles.list} pl-5`}>
      <h1 className={`pt-10 text text_type_main-large`}>Лента заказов</h1>
      <ul className={`${styles.list__scroll} ${styles.feed} custom-scroll mt-5`}>
        {feed.map(order => (
            <FeedOrder order={order} key={order._id} showStatus={false}/>
          )
        )}
      </ul>
    </section>
    <section className={`${styles.info} pl-15 pr-5 mt-25`}>
      <div className={`${styles.done} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>Готовы:</h3>
        <ul className={`${styles.col}`}>
          { ordersStatus.doneOrders.length > 0 ?
              ordersStatus.doneOrders.slice(0,20).map((id, index) =>
                <li className={`text text_type_digits-default text_color_success`} key={index}>
                  {id}
                </li>) :
            <p className={`${styles.placeholder} text text_type_main-default text_color_inactive`}><BurgerIcon type="secondary"/> скоро будут</p>
          }
        </ul>
      </div>
      <div className={`${styles.pending} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>В работе:</h3>
          <ul className={`${styles.col}`}>
          { ordersStatus.pendingOrders.length > 0 ?
            ordersStatus.pendingOrders.slice(0,20).map((id, index) =>
              <li className={`text text_type_digits-default text_color_default`} key={index}>
                {id}
              </li>) :
            <p className={`${styles.placeholder} text text_type_main-default text_color_inactive`}><BurgerIcon type="secondary"/> ждём заказы</p>
          }
        </ul>
      </div>
      <div className={`${styles.overall} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>Выполнено за все время:</h3>
        <p  className={`${styles.number} text text_type_digits-large`}>{total}</p>
      </div>
      <div className={`${styles.today} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>Выполнено за сегодня:</h3>
        <p  className={`${styles.number} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  </TwoColumns>
  )
}
