import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from './constructor.module.css';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { getIngredients} from '../services/actions/ingredients';
import { urlIngredients } from '../utils/constants';
import { getAllIngredients } from '../utils/store';

export const ConstructorPage = () => {

  const dispatch = useDispatch();

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(getAllIngredients);

  useEffect(() => {
    dispatch(getIngredients(urlIngredients));
  }, [dispatch]);


  return (
    <>
      {ingredientsFailed && (
        <>
          <h1>Хьюстон, у нас ошибка!</h1>
          <h2>Попробуйте обновить страницу или зайдите позднее</h2>
        </>)}
      {!ingredientsRequest &&
        !ingredientsFailed &&
        ingredients.length &&
        (
          <div className={styles.layout}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </div>
        )}
    </>

  )
}
