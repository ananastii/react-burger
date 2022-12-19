import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredientsData } from '../../utils/api';
import { url } from '../../utils/constants';
import { BurgerConstructorContext } from "../../utils/context";

const App = () => {

  const [ingredients, setIngredients] = useState({
    hasError: false,
    data: []
  });

  useEffect(() => {
    getIngredientsData(url, ingredients, setIngredients);
  }, []);

  return (
    <>
      <AppHeader />
      <BurgerConstructorContext.Provider value={{ingredients}}>
        {ingredients.hasError && (
          <>
            <h1>Хьюстон, у нас ошибка!</h1>
            <h2>Попробуйте обновить страницу или зайдите позднее</h2>
          </>)}
        {!ingredients.hasError &&
          ingredients.data.length && (
          <main className={styles.main}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </main>
        )}
      </BurgerConstructorContext.Provider>
    </>
  )

};

export default App;
