import styles from './feed-order.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getAllIngredients } from '../../utils/state';
import Price from '../common/price/price';
import Preview from '../common/preview/preview';

const FeedOrder = ({order, showStatus}) => {

  const allIngredients = useSelector(getAllIngredients).ingredients;

  const ingredientsInfo = allIngredients
    .filter((item) => order.ingredients.includes(item.info._id));

  const totalPrice = useMemo(() =>
    ingredientsInfo.reduce((price, item) => price + item.info.price, 0)
  , [ingredientsInfo]);

  return (
    <li className={`${styles.order} p-6 mr-2`}>
      <div className={`${styles.meta} pb-6`}>
        <p className={`text text_type_digits-default`}>{`#${order.number}`}</p>
        <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive"/>
      </div>
      <h3 className={`${styles.title} text text_type_main-medium pb-6`}>{order.name}</h3>
      { showStatus && (
        <p></p>
      )}
      <div className={`${styles.ingredients} mt-6`}>
        <ul className={`${styles.row}`}>
          { ingredientsInfo.slice(0, 6).map((item, index) => (
            <Preview image={item.info.image} key={item.info._id} residue={(index===5)*(ingredientsInfo.length - 5)}/>
            ))
          }
        </ul>
        <Price price={totalPrice}/>
      </div>
    </li>
  )
};

export default FeedOrder;
