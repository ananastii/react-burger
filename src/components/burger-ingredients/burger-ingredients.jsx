import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import IngredientsTab from '../ingredients-tab/ingredients-tab';
import Modal from '../modal/modal';
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { closeIngredientDetails } from '../../services/actions/ingredient-details';

const BurgerIngredients = () => {

  const { ingredients } = useSelector(store => store.ingredients);
  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const fillings = ingredients.filter((item) => item.type === 'main');

  const [currentTab, setCurrentTab] = useState('buns');

  const clickOnTab = (id) => {
    setCurrentTab(id);
    document.querySelector(`#${id}`).scrollIntoView({behavior: 'smooth'});
  }

  const dispatch = useDispatch();
  const { ingredient } = useSelector(store => store.ingredient);

  const closeModal = () => {
    dispatch(closeIngredientDetails());
  };

  return (
    <>
    <section className={`${styles.list} pl-5 pr-5`}>
      <h1 className={`pt-10 text text_type_main-large`}>Соберите бургер</h1>
      <IngredientsTab setCurrent={clickOnTab} currentTab={currentTab}/>
      <div className={`${styles.list__scroll} custom-scroll`}>
        <IngredientsList title={'Булки'} data={buns} id={'buns'}/>
        <IngredientsList title={'Соусы'} data={sauces} id={'sauces'}/>
        <IngredientsList title={'Начинки'} data={fillings} id={'fillings'}/>
      </div>
    </section>
    {ingredient &&
      <Modal onClose={closeModal}>
        <IngredientDetails ingredientData={ingredient}/>
      </Modal>
    }
    </>
  )
}

export default BurgerIngredients;
