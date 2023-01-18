import React from 'react';
import styles from './ingredients-tab.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function IngredientsTab({currentTab, setCurrent}) {

  return (
    <div className={`${styles.tabs} mt-5 text_type_main-default`}>
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

IngredientsTab.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired
};

export default IngredientsTab;
