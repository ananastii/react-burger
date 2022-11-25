import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../utils/data.json';

const App = () => (
  <>
    <AppHeader />
    <main className={styles.main}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
    </main>
  </>
);

export default App;