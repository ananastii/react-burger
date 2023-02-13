import { Outlet, Navigate, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../utils/store';

const ProtectedRouteElement = ({isUserAllowed}) => {

  const user = useSelector(getUser);
  const { state, pathname} = useLocation();


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
