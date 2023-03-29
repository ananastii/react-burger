import { useSelector } from '../hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TwoColumns from '../components/two-columns/two-columns';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { getAllIngredients } from '../utils/state';

export const ConstructorPage = () => {

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(getAllIngredients);

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
