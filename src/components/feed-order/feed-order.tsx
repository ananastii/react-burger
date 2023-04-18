import styles from './feed-order.module.css';
import { useMemo, FC } from 'react';
import { useSelector } from '../../hooks'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getAllIngredients } from '../../utils/state';
import Price from '../common/price/price';
import Preview from '../common/preview/preview';
import { useNavigate, useLocation } from 'react-router-dom';
import { styleStatus } from '../../utils/components';
import { TOrderData } from '../../services/types/data';

type TFeedOrder = {
  order: TOrderData,
  showStatus: boolean
}

const FeedOrder: FC<TFeedOrder> = ({order, showStatus}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const allIngredients = useSelector(getAllIngredients).ingredients;

  const ingredientsInfo = allIngredients
    .filter((item) => order.ingredients.includes(item.info._id))
    .map((item) => item.info);

  const ingredientsQty = useMemo(
    () => order?.ingredients?.reduce((total: {[key: string] : number}, cur: string) => {
      total[cur] = (total[cur] || 0) + 1;
      return total
      }, {}),
    [order]
  );

  const totalPrice = useMemo(() =>
    ingredientsInfo.reduce((price, item) => price + item.price*ingredientsQty[item._id], 0)
  , [ingredientsInfo, ingredientsQty]);

  const statusDecoration = useMemo(
    () => styleStatus(order?.status)
      ||  {class: '', text: ''},
    [order]
  );

  const handleOrderClick = () => {
    navigate(`${location.pathname}/${order._id}`, {
      state: {
        order: order,
        totalPrice: totalPrice,
        ingredientsInfo: ingredientsInfo,
        ingredientsQty: ingredientsQty,
        background: location
      }
    });
  }

  return (
    <li className={`${styles.order} p-6 mr-2`} onClick={handleOrderClick}>
      <div className={`${styles.meta} pb-6`}>
        <p className={`text text_type_digits-default`}>{`#${order.number}`}</p>
        <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive"/>
      </div>
      <h3 className={`text text_type_main-medium`}>{order.name}</h3>
      { showStatus && (
        <p className={`${statusDecoration.class} text text_type_main-default mt-2`}>{statusDecoration.text}</p>
      )}
      <div className={`${styles.ingredients} mt-6`}>
        <ul className={`${styles.row}`}>
          { ingredientsInfo.slice(0, 6).map((item, index) => (
            <li className={`${styles.preview}`} key={item._id}>
              <Preview image={item.image} residue={index===5 ? (ingredientsInfo.length - 5) : 0}/>
            </li>
            ))
          }
        </ul>
        <Price price={totalPrice}/>
      </div>
    </li>
  )
};

export default FeedOrder;
