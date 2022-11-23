import styles from './burger-ingredients.module.css';
import TypesTab from '../ingredients-tab/ingredients-tab';
import IngredientsList from '../ingredients-list/ingredients-list';
import { } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({data}) => {

  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const fillings = data.filter((item) => item.type === 'main');

  return (
    <section className={`${styles.list} pl-5 pr-5`}>
      <h1 className={`pt-10 text text_type_main-large`}>Соберите бургер</h1>
      <TypesTab />
      <div className={`${styles.list__scroll} custom-scroll`}>
        <IngredientsList title={'Булки'} data={buns}/>
        <IngredientsList title={'Соусы'} data={sauces}/>
        <IngredientsList title={'Начинки'} data={fillings}/>
      </div>
    </section>
  )
}

export default BurgerIngredients;
