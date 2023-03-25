import styles from './ingredient.module.css';
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from "react-router-dom";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../common/price/price';
import { TIngredientData, TIngredientInfo } from '../../services/types/data';
import { FC } from 'react';

type TIngredient = {
  data: TIngredientData,
}

const Ingredient: FC<TIngredient> = ({data}) => {

  const {info, qty} = data;

  const navigate = useNavigate();
  const location = useLocation();

  const handleIngredientClick = (ingredient: TIngredientInfo) => {
    navigate(`/ingredients/${info._id}`, {
      state: { ingredient: ingredient, background: location},
    });
  }

  const [{opacity}, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...info },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });

  return (
    <li className={styles.item} ref={dragRef} style={{ ...styles, opacity}} onClick={() => handleIngredientClick(info)}>
      {qty > 0 && <Counter count={qty} size="default" />}
      <img className={`${styles.img} ml-4 mr-4 mb-1`} src={info.image} alt={info.name}></img>
      <Price price={info.price}/>
      <p className={`${styles.name} text text_type_main-default`}>
        {info.name}
      </p>
    </li>
  );
}

export default Ingredient;
