import { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients} from '../../services/actions/ingredients';
import { urlIngredients } from '../../utils/constants';
import { IngredientsContext, TotalPriceContext } from "../../utils/context";

const App = () => {

  const dispatch = useDispatch();

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients(urlIngredients));
  }, [dispatch]);

  const initialPrice = { price: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return { ...state, price: state.price + action.price };
      case 'reset':
        return { ...state, price: 0 };
      default:
        return state;
    }
  }

  const [totalPrice, totalPriceDispatcher] = useReducer(reducer, initialPrice, undefined);

  return (
    <>
      <AppHeader />
        {ingredientsFailed && (
          <>
            <h1>Хьюстон, у нас ошибка!</h1>
            <h2>Попробуйте обновить страницу или зайдите позднее</h2>
          </>)}
        {!ingredientsRequest &&
          !ingredientsFailed &&
          ingredients.length &&
          (
          <main className={styles.main}>
            <BurgerIngredients/>
            {/* <TotalPriceContext.Provider value={{totalPrice, totalPriceDispatcher}}>
              <BurgerConstructor/>
            </TotalPriceContext.Provider> */}
          </main>
        )}
    </>
  )
};

export default App;
