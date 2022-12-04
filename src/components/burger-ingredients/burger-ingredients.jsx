import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import TypesTab from '../ingredients-tab/ingredients-tab';
import Modal from '../modal/modal';
import IngredientsList from '../ingredients-list/ingredients-list';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
// import { } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerIngredients = ({data}) => {

  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const fillings = data.filter((item) => item.type === 'main');

  const [ingredientModal, setIngredientModal] = useState(null);

  const closeModal = () => {
    setIngredientModal(null);
  }

  return (
    <>
    <section className={`${styles.list} pl-5 pr-5`}>
      <h1 className={`pt-10 text text_type_main-large`}>Соберите бургер</h1>
      <TypesTab />
      <div className={`${styles.list__scroll} custom-scroll`}>
        <IngredientsList title={'Булки'} data={buns} onImgClick={setIngredientModal} />
        <IngredientsList title={'Соусы'} data={sauces} onImgClick={setIngredientModal} />
        <IngredientsList title={'Начинки'} data={fillings} onImgClick={setIngredientModal} />
      </div>
    </section>
    {ingredientModal &&
      <Modal onOverlayClick={closeModal}>
        <IngredientDetail ingredientData={ingredientModal}/>
      </Modal>
    }
    </>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerIngredients;
