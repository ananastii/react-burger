import React from 'react';
import styles from './ingredients-tab.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function TypesTab() {
  const [current, setCurrent] = React.useState('bun');

  return (
    <div className={`${styles.tabs} mt-5 text_type_main-default`}>
      <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

export default TypesTab;
