import styles from './app-header.module.css';
import { NavLink, useLocation } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

  const { pathname } = useLocation();

  const commonTextClassName = `ml-2 text text_type_main-default `;
  const commonLinkClassName = `pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.header__item} `;
  const activeClassName = "text_color_primary";
  const inactiveClassName = "text_color_inactive";

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.menu}>
        <div className={styles.menu_section_left}>
          <NavLink
            to="/"
            className={({ isActive }) => (commonLinkClassName +
              (isActive ? activeClassName : inactiveClassName))}
          >
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <span className = {commonTextClassName}>
              Конструктор
            </span>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => (commonLinkClassName +
              (isActive ? activeClassName : inactiveClassName))}
          >
            <ListIcon type={pathname === "/orders" ? "primary" : "secondary"} />
            <span className = {commonTextClassName}>
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div className={`${styles.header__logo}`}>
          <Logo />
        </div>
        <NavLink
          to="/profile"
          className={({ isActive }) => (commonLinkClassName + `${styles.menu_section_right} ` +
            (isActive ? activeClassName : inactiveClassName))}
        >
          <ProfileIcon type={pathname === "/profile" || pathname === "/profile/orders" ? "primary" : "secondary"} />
          <span className = {commonTextClassName}>
            Личный кабинет
          </span>
        </NavLink>
      </nav>
    </header>
  )
};

export default AppHeader;
