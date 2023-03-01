import styles from './orders.module.css';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  USER_WS_CONNECTION_START,
  USER_WS_CONNECTION_CLOSED,
} from '../services/actions/wsUser';
import ProfileTab from '../components/profile-tab/profile-tab';
import FeedOrder from '../components/feed-order/feed-order';
import { getOrdersUser } from '../utils/state';

export const OrdersPage = () => {

  const dispatch = useDispatch();

  const description = "В этом разделе вы можете просмотреть свою историю заказов";
  const feed = useSelector(getOrdersUser);


  useEffect(() => {
    dispatch({ type: USER_WS_CONNECTION_START });
    return () =>
      dispatch({ type: USER_WS_CONNECTION_CLOSED });
  }, [dispatch]);

  const orders = useMemo(() => feed?.reverse(),
    [feed]
  )

  return (
    <>
      <div className={`${styles.container}`}>
        <ProfileTab description={description} extraClass={`pt-30`}/>
        {orders && (<section className={`${styles.list} pt-10`}>
          <ul className={`${styles.list__scroll} ${styles.feed} custom-scroll mt-5`}>
            {orders.map(order => (
                <FeedOrder order={order} key={order._id} showStatus={true}/>
              )
            )}
          </ul>
        </section>)}
      </div>
  </>
  )
}
