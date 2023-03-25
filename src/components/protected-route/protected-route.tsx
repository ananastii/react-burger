import { Outlet, Navigate, useLocation} from 'react-router-dom';
import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { getUser } from '../../utils/state';
import { getUserInfo } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';
import PropTypes from 'prop-types';

type TProtectedRouteElement = {
  isUserAllowed: Boolean,
}

const ProtectedRouteElement: FC<TProtectedRouteElement> = ({isUserAllowed}) => {

  const user = useSelector(getUser);
  const { state, pathname} = useLocation();
  const refreshToken = getCookie("refreshToken");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && refreshToken) {
      dispatch(getUserInfo());
    }
  }, [refreshToken, user, dispatch]);

  if (!user && !refreshToken && isUserAllowed) {
    return (
      <Navigate to="/login" state={{prev : pathname}}/>
    )
  }

  if (user && !isUserAllowed) {
    return (
      <Navigate to={state?.prev ? state.prev : '/'}/>
    )
  }

  return (
    <Outlet/>
  )
};

ProtectedRouteElement.propTypes = {
  isUserAllowed: PropTypes.bool.isRequired
};

export default ProtectedRouteElement;
