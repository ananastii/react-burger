import styles from './feed-order.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getAllIngredients } from '../../utils/state';
import Price from '../common/price/price';
import Preview from '../common/preview/preview';
import { useNavigate, useLocation } from 'react-router-dom';
import { styleStatus } from '../../utils/components';
import PropTypes from 'prop-types';
import { orderPropTypes } from '../../utils/types';

const FeedOrder = ({order, showStatus}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const allIngredients = useSelector(getAllIngredients).ingredients;

  const ingredientsInfo = allIngredients
    .filter((item) => order.ingredients.includes(item.info._id))
    .map((item) => item.info);

  const totalPrice = useMemo(() =>
    ingredientsInfo.reduce((price, item) => price + item.price, 0)
  , [ingredientsInfo]);

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
              <Preview image={item.image} residue={(index===5)*(ingredientsInfo.length - 5)}/>
            </li>
            ))
          }
        </ul>
        <Price price={totalPrice}/>
      </div>
    </li>
  )
};

FeedOrder.propTypes = {
  order: orderPropTypes.isRequired,
  showStatus: PropTypes.bool
};

export default FeedOrder;
