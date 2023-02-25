import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from '../layout/layout';
import ProtectedRouteElement from "../protected-route/protected-route";
import { getIngredients } from '../../services/actions/ingredients';

import Modal from "../modal/modal";
import {
  ConstructorPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  NotFound404,
  ProfilePage,
  IngredientPage,
  OrdersPage,
  FeedPage,
} from '../../pages'
import IngredientDetails from "../ingredient-details/ingredient-details";

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
        <Route element={<Layout/>}>
          <Route path="/" element={<ConstructorPage />}/>
          <Route path="/feed" element={<FeedPage />}/>
          <Route element={<ProtectedRouteElement isUserAllowed={true}/>}>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/profile/orders" element={<OrdersPage />}/>
          </Route>
          <Route element={<ProtectedRouteElement isUserAllowed={false}/>}>
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFound404 />}/>
        </Route>
      </Routes>
      <Routes>
          { background && (
          <Route path="/ingredients/:id" element={
            <Modal onClose={() => { navigate(-1)}}>
              <IngredientDetails />
            </Modal>
          }/>
          )}
      </Routes>
    </>
  )
};

export default App;
