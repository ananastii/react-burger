import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';

const Ingredient = ({data, onImgClick}) => (

  <li className={styles.item}>
    <Counter className="counter-card" count={1} size="default" />
    <img className={`ml-4 mr-4 mb-1`} src={data.image} alt={data.name} onClick={() => onImgClick(data)}></img>
    <div className={`${styles.price} mb-1 text text_type_main-default`}>
      <span className="mr-2 text text_type_digits-default">{data.price}</span>
      <CurrencyIcon type="primary" />
    </div>
    <p className={`${styles.name} text text_type_main-default`}>
      {data.name}
    </p>
  </li>
);

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired
};

export default Ingredient;
