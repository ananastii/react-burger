import { getCookie } from '../../utils/cookies';
import { Outlet, Navigate, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../utils/store';
import { updateToken, getUserInfo } from '../../services/actions/auth';

const ProtectedRouteElement = ({isUserAllowed}) => {

  let accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const { state, pathname} = useLocation();

  useEffect(() => {
    if (refreshToken && !accessToken) {
      dispatch(updateToken());
    }
    if (!user && refreshToken) {
      dispatch(getUserInfo());
    }
  }, [refreshToken, accessToken, user, dispatch]);

  if (!user && isUserAllowed) {
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
}

export default ProtectedRouteElement;
