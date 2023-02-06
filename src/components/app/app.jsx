import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppHeader from '../app-header/app-header';

import { ConstructorPage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, NotFound404 } from '../../pages'

const App = () => {

  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFound404 />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
