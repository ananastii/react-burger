import styles from './burger-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = ({data}) => {

  const {_id, name, price, image } = data.info;

  return (
    <li className={`${styles.item} pl-4 pr-4`}>
      <DragIcon type="primary"/>
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        index={_id}
        thumbnail={image}
      />
    </li>
  )
}

export default BurgerIngredient;
