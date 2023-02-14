import { Outlet, Navigate, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../utils/store';
import { getUserInfo } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';

const ProtectedRouteElement = ({isUserAllowed}) => {

  const user = useSelector(getUser);
  const { state, pathname} = useLocation();
  const refreshToken = getCookie("refreshToken");

  const dispatch = useDispatch();


  useEffect(() => {
    if (!user && refreshToken) {
      dispatch(getUserInfo());
    }
  }, [refreshToken, user, dispatch]);

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
