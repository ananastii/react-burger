import styles from './profile-tab.module.css';
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileTab = ({description, onLogout}) => {

  const commonClassName = `${styles.link} text text_type_main-medium pt-4 pb-4 `;
  const activeClassName = "text_color_primary";
  const inactiveClassName = "text_color_inactive"

  return (
    <div className={`${styles.container} ml-5 mr-15`}>
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
          onClick={onLogout}
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

ProfileTab.propTypes = {
  description: PropTypes.string.isRequired,
};


export default ProfileTab;
