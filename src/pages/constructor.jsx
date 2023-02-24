import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TwoColumns from '../components/two-columns/two-columns';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { getIngredients} from '../services/actions/ingredients';
import { getAllIngredients } from '../utils/store';

export const ConstructorPage = () => {

  const dispatch = useDispatch();

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(getAllIngredients);

  useEffect(() => {
    dispatch(getIngredients());
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
          <TwoColumns>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </TwoColumns>
        )}
    </>

  )
}
