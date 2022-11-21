import React from 'react';

import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.menu}>
        <div className={styles.menu_section_left}>
          <a href="#" className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.header__item}`}>
            <BurgerIcon type="primary"/>
            <span className="ml-2 text text_type_main-default">Конструктор</span>
          </a>
          <a href="#" className={`pt-4 pr-5 pb-4 pl-5 ${styles.header__item}`}>
            <ListIcon type="secondary" />
            <span className="ml-2 text text_type_main-default">Лента заказов</span>
          </a>
        </div>
        <div className={`${styles.header__logo}`}>
          <Logo />
        </div>
        <a href="#" className={`pt-4 pr-5 pb-4 pl-5 ${styles.header__item} ${styles.menu_section_right}`}>
          <ProfileIcon type="primary" />
          <span className="ml-2 text text_type_main-default">Личный кабинет</span>
        </a>
      </nav>
    </header>
  )
}

export default AppHeader;
