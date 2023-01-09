import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import IngredientsTab from '../ingredients-tab/ingredients-tab';
import Modal from '../modal/modal';
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from "../../utils/context";
import { getIngredients } from '../../services/actions/ingredients';
import { isConditionalExpression } from 'typescript';

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

  const [ingredientModal, setIngredientModal] = useState(null);

  const closeModal = () => {
    setIngredientModal(null);
  };

  return (
    <>
    <section className={`${styles.list} pl-5 pr-5`}>
      <h1 className={`pt-10 text text_type_main-large`}>Соберите бургер</h1>
      <IngredientsTab setCurrent={clickOnTab} currentTab={currentTab}/>
      <div className={`${styles.list__scroll} custom-scroll`}>
        <IngredientsList title={'Булки'} data={buns} onImgClick={setIngredientModal} id={'buns'}/>
        <IngredientsList title={'Соусы'} data={sauces} onImgClick={setIngredientModal} id={'sauces'}/>
        <IngredientsList title={'Начинки'} data={fillings} onImgClick={setIngredientModal} id={'fillings'}/>
      </div>
    </section>
    {ingredientModal &&
      <Modal onClose={closeModal}>
        <IngredientDetails ingredientData={ingredientModal}/>
      </Modal>
    }
    </>
  )
}

export default BurgerIngredients;
