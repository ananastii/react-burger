import { useDispatch } from 'react-redux';
import styles from './burger-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../services/actions/burger-constructor';
import { decreaseCount } from '../../services/actions/ingredients';

const BurgerIngredient = ({data}) => {

  const {_id, name, price, image } = data.info;

  const dispatch = useDispatch();

  const handleDelete = (constructorId, ingredientId) => {
    dispatch(deleteIngredient(constructorId));
    dispatch(decreaseCount(ingredientId, 1));
  }

  return (
    <li className={`${styles.item} pl-4 pr-4`}>
      <DragIcon type="primary"/>
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        index={_id}
        thumbnail={image}
        handleClose={() => handleDelete(data.id, _id)}
      />
    </li>
  )
}

export default BurgerIngredient;
