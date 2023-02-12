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

const checkResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

const getIngredientsRequest = () => {
  return fetch(urlIngredients, {
    method: 'GET',
    headers: {
      authorization: '',
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
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

const registerRequest = (name, email, password) => {
  return fetch(urlRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then(checkResponse)
};

const loginRequest = (email, password) => {
  return fetch(urlLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

const logoutRequest = (refreshToken) => {
  return fetch(urlLogout, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })
  .then(checkResponse);
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
  .then(checkResponse);
};

const pwdSubmitRequest = ({ password, token }) => {;
  return fetch(urlPwdSubmit, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  })
  .then(checkResponse);
};

const updateTokenRequest = (refreshToken) => {
  return fetch(urlToken, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })
  .then(checkResponse);

};

export {
  getIngredientsRequest,
  placeOrderRequest,
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  pwdResetRequest,
  pwdSubmitRequest,
  updateTokenRequest
};
