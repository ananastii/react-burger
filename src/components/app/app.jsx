import { useState, useEffect, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredientsData } from '../../utils/api';
import { urlIngredients } from '../../utils/constants';
import { IngredientsContext, TotalPriceContext } from "../../utils/context";

const App = () => {

  const [ingredients, setIngredients] = useState({
    hasError: false,
    data: []
  });

  useEffect(() => {
    getIngredientsData(urlIngredients, ingredients, setIngredients);
  }, []);

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
      <IngredientsContext.Provider value={{ingredients}}>
        {ingredients.hasError && (
          <>
            <h1>Хьюстон, у нас ошибка!</h1>
            <h2>Попробуйте обновить страницу или зайдите позднее</h2>
          </>)}
        {!ingredients.hasError &&
          ingredients.data.length && (
          <main className={styles.main}>
            <BurgerIngredients/>
            <TotalPriceContext.Provider value={{totalPrice, totalPriceDispatcher}}>
              <BurgerConstructor/>
            </TotalPriceContext.Provider>
          </main>
        )}
      </IngredientsContext.Provider>
    </>
  )
};

export default App;
