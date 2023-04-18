import { FC, Ref } from 'react';
import styles from './ingredients-tab.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientTab = {
  currentTab: string,
  setCurrent: (value: string) => void,
  refTab: Ref<HTMLDivElement>
}

const IngredientsTab: FC<TIngredientTab> = ({currentTab, setCurrent, refTab})  => {

  return (
    <div className={`${styles.tabs} mt-5 text_type_main-default`} ref={refTab}>
      <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
};

export default IngredientsTab;
