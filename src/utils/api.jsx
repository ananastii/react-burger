import {
  urlIngredients,
  urlOrder,
  urlRegister,
  urlLogin
} from "./constants";

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

const placeOrder = (ingredients) => {
  return fetch(urlOrder, {
    method: 'POST',
    headers: {
      authorization: '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients})
  })
  .then(checkResponce)
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

export {
  getIngredientsData,
  placeOrder,
  register,
  login,
};
