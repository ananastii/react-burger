import {
  urlIngredients,
  urlOrder,
  urlRegister,
  urlLogin,
  urlLogout,
  urlUser,
  urlPwdReset,
  urlPwdSubmit,
  urlToken,
} from "./constants";

import { getCookie } from "./cookies";

const checkResponce = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const getIngredientsData = () => {
  return fetch(urlIngredients, {
    method: 'GET',
    headers: {
      authorization: '',
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponce)
}

const placeOrderRequest = (ingredients) => {
  const accessToken = getCookie("accessToken");
  return fetch(urlOrder, {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients})
  })
};

const register = (name, email, password) => {
  return fetch(urlRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then(checkResponce)
};

const login = (email, password) => {
  return fetch(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponce)
};

const logout = (refreshToken) => {
  return fetch(urlLogout, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })
  .then(checkResponce);
};

const getUserRequest = () => {
  const accessToken = getCookie("accessToken");
  return fetch(urlUser, {
    method: "GET",
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    }
  })
};

const updateUserRequest = ({ name, email, password }) => {
  const accessToken = getCookie("accessToken");
  return fetch(urlUser, {
    method: "PATCH",
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
};

const pwdResetRequest = ({ email }) => {
  return fetch(urlPwdReset, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  .then(checkResponce);
};

const pwdSubmitRequest = ({ password }) => {
  const accessToken = getCookie("accessToken");
  return fetch(urlPwdSubmit, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, accessToken }),
  })
  .then(checkResponce);
};

const updateTokenRequest = (refreshToken) => {
  return fetch(urlToken, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })
  .then(checkResponce);

};

export {
  getIngredientsData,
  placeOrderRequest,
  register,
  login,
  logout,
  getUserRequest,
  updateUserRequest,
  pwdResetRequest,
  pwdSubmitRequest,
  updateTokenRequest
};
