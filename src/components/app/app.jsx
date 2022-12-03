import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
//import data from '../../utils/data.json';
import {url} from '../../utils/constants';

const App = () => {

  const [state, setState] = useState({
    success: false,
    data: []
  });

  useEffect(() => {
    const getIngredientsData = () => {
      fetch(url, {
        method: 'GET',
        headers: {
          authorization: '',
          'Content-Type': 'application/json'
        }
      })
      .then(dataFromServer => dataFromServer.json())
      .then(dataFromServer => setState({ data: dataFromServer.data, success: dataFromServer.success}))
        .catch(e => {
          console.log(`Ошибка при загрузке данных: ${e}`);
        });
      }

    getIngredientsData(url);
  }, []) //если вписать state, то вызывает постоянную перерисовку

  return (
    <>
      <AppHeader />
      {!state.success ? (
        <>
          <h1>Хьюстон, у нас ошибка!</h1>
          <h2>Попробуйте обновить страницу или зайдите позднее</h2>
        </>) : (
        <main className={styles.main}>
          <BurgerIngredients data={state.data}/>
          <BurgerConstructor data={state.data}/>
        </main>
      )}
    </>
  )

};

export default App;
