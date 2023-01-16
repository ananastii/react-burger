import styles from './ingredient.module.css';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';
import { openIngredientDetails } from '../../services/actions/ingredient-details';

const Ingredient = ({data}) => {

  const dispatch = useDispatch();

  const openModal = (ingredient) => {
    dispatch(openIngredientDetails(ingredient));
  };

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...data },
    // collect: monitor => ({
    //   opacity: monitor.isDragging() ? 0.5 : 1
    // })
  });

  return (
    <li className={styles.item} ref={dragRef}>
      <Counter className="counter-card" count={1} size="default" />
      <img className={`${styles.img} ml-4 mr-4 mb-1`} src={data.image} alt={data.name} onClick={() => openModal(data)}></img>
      <div className={`${styles.price} mb-1 text text_type_main-default`}>
        <span className="mr-2 text text_type_digits-default">{data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {data.name}
      </p>
    </li>
  );
}

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default Ingredient;
