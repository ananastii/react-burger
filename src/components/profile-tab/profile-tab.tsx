import styles from './profile-tab.module.css';
import { NavLink } from "react-router-dom";
import { useDispatch } from '../../services/hooks';
import { logoutUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';
import { FC, SyntheticEvent } from 'react';

type TProfileTab = {
  description: string,
  extraClass?: string
}

const ProfileTab: FC<TProfileTab> = ({description, extraClass}) => {

  const dispatch = useDispatch();

  const commonClassName = `${styles.link} text text_type_main-medium pt-4 pb-4 `;
  const activeClassName = "text_color_primary";
  const inactiveClassName = "text_color_inactive";

  const refreshToken = getCookie("refreshToken");

  const handleLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logoutUser(refreshToken));
  }

  return (
    <div className={`${styles.container} ml-5 mr-15 ${extraClass}`}>
      <nav className={`${styles.nav}`}>
        <NavLink
          to="/profile"
          end
          className = {({ isActive }) =>
            (commonClassName +
              (isActive ? activeClassName : inactiveClassName))
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className = {({ isActive }) =>
            (commonClassName +
              (isActive ? activeClassName : inactiveClassName))
          }
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          onClick={handleLogout}
          className = {({ isActive }) =>
            (commonClassName +
              (isActive ? activeClassName : inactiveClassName))
          }
        >
          Выход
        </NavLink>
      </nav>
      <p className="text text_type_main-default text_color_inactive pt-20">
        {description}
      </p>
    </div>
  );
}

export default ProfileTab;
