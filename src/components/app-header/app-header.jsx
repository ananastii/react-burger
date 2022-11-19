import React from 'react';

import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.menu__item}`}>
            <BurgerIcon type="primary" className="mr-3"/>
            <span className="ml-2 text">Конструктор</span>
          </li>
          <li className={`pr-5 pl-5 ${styles.menu__item}`}>
            <ListIcon type="secondary" />
            <span className="ml-2 text">Лента заказов</span>
          </li>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu__item}`}>
            <Logo />
          </li>
          <li className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu__item}`}>
          <ProfileIcon type="primary" />
            <span className="ml-2 text">Лента заказов</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
