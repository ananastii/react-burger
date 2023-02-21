import styles from './ingredient.module.css';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from "react-router-dom";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';

const Ingredient = ({data}) => {

  const getIngredientsCount = (store) => store.ingredients.ingredients.find(item => item.info._id === data._id).qty;

  const count = useSelector(getIngredientsCount);

  const navigate = useNavigate();
  const location = useLocation();

  const handleIngredientClick = (ingredient) => {
    navigate(`/ingredients/${data._id}`, {
      state: { ingredient: ingredient, background: location},
    });
  }

  const [{opacity}, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...data },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });

  return (
    <li className={styles.item} ref={dragRef} style={{ ...styles, opacity}} onClick={() => handleIngredientClick(data)}>
      {count > 0 && <Counter className="counter-card" count={count} size="default" />}
      <img className={`${styles.img} ml-4 mr-4 mb-1`} src={data.image} alt={data.name}></img>
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
