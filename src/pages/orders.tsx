import styles from './orders.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import {
  wsUserConnect,
  wsUserClose,
} from '../services/actions/wsUser';
import ProfileTab from '../components/profile-tab/profile-tab';
import FeedOrder from '../components/feed-order/feed-order';
import { getOrdersUser } from '../utils/state';

export const OrdersPage = () => {

  const dispatch = useDispatch();

  const description = "В этом разделе вы можете просмотреть свою историю заказов";
  const orders = useSelector(getOrdersUser);


  useEffect(() => {
    dispatch(wsUserConnect());
    return () =>
      dispatch(wsUserClose());
  }, [dispatch]);

  return (
    <>
      <div className={`${styles.container}`}>
        <ProfileTab description={description} extraClass={`pt-30`}/>
        <section className={`${styles.list} pt-10`}>
        { orders?.length > 0 ? (
          <ul className={`${styles.list__scroll} ${styles.feed} custom-scroll mt-5`}>
            {[...orders].reverse().map(order => (
                <FeedOrder order={order} key={order._id} showStatus={true}/>
              )
            )}
          </ul>
        ) : (
          <p className={`text text_type_main-medium text_color_inactive pt-20`}>У вас пока нет заказов</p>
        )}
        </section>
      </div>
  </>
  )
}
