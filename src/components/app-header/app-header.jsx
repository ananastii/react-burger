import styles from './app-header.module.css';
import { Link, useLocation } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {

  const { pathname } = useLocation();

  const commonClassName = `ml-2 text text_type_main-default `;
  const activeClassName = "text_color_primary";
  const inactiveClassName = "text_color_inactive"

  return (
    <header className={`pt-4 pb-4 ${styles.header}`}>
      <nav className={styles.menu}>
        <div className={styles.menu_section_left}>
          <Link
            to="/"
            className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.header__item}`}
          >
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <span className = {commonClassName + (pathname === "/" ? activeClassName : inactiveClassName) }>
              Конструктор
            </span>
          </Link>
          <Link
            to="/orders"
            className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.header__item}`}
          >
            <ListIcon type={pathname === "/orders" ? "primary" : "secondary"} />
            <span className = {commonClassName + (pathname === "/orders" ? activeClassName : inactiveClassName) }>
              Лента заказов
            </span>
          </Link>
        </div>
        <div className={`${styles.header__logo}`}>
          <Logo />
        </div>
        <Link
          to="/profile"
          className={`pt-4 pr-5 pb-4 pl-5 mr-2 ${styles.header__item} ${styles.menu_section_right}`}
        >
          <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"} />
          <span className = {commonClassName + (pathname === "/profile" ? activeClassName : inactiveClassName) }>
            Личный кабинет
          </span>
        </Link>
      </nav>
    </header>
  )
};

export default AppHeader;
