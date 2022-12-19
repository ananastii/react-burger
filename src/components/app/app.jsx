import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getIngredientsData} from '../../utils/api';
import {url} from '../../utils/constants';

const App = () => {

  const [state, setState] = useState({
    hasError: false,
    data: []
  });

  useEffect(() => {
    getIngredientsData(url, state, setState);
  }, []);

  return (
    <>
      <AppHeader />
      {state.hasError && (
        <>
          <h1>Хьюстон, у нас ошибка!</h1>
          <h2>Попробуйте обновить страницу или зайдите позднее</h2>
        </>)}
      {!state.hasError &&
        state.data.length && (
        <main className={styles.main}>
          <BurgerIngredients data={state.data}/>
          <BurgerConstructor data={state.data}/>
        </main>
      )}
    </>
  )

};

export default App;
