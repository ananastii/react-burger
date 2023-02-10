import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '../layout/layout';
import ProtectedRouteElement from "../protected-route/protected-route";

import {
  ConstructorPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  NotFound404,
  ProfilePage,
} from '../../pages'

const App = () => {

  return (
    <>

      <main>
        <BrowserRouter>
          <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<ConstructorPage />} />
            <Route element={<ProtectedRouteElement isUserAllowed={true}/>}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<ProtectedRouteElement isUserAllowed={false}/>}>
              <Route path="/login"  element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            <Route path="*" element={<NotFound404 />}/>
          </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
};

export default App;
