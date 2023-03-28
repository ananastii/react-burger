import { Url } from "./constants";
import { TIngredientInfo, TOrderCheckout } from "../services/types/data";
import {
  TUserRequest,
  TUserResponce,
  TTokens,
  TPasswordResetRequest,
  TDefaultResponce
} from "../services/types/auth";

import { getCookie } from "./cookies";

type TResponse<T> = {
  success: boolean;
} & T;

const checkResponse = <T>(res: Response) => {
  return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(`Ошибка: ${res.status}`);
};

const getIngredientsRequest = () => {
  return fetch(Url.Ingredients, {
    method: 'GET',
    headers: {
      authorization: '',
      'Content-Type': 'application/json'
    }
  })
  .then(res => checkResponse<{data: TIngredientInfo[]}>(res))
}

const placeOrderRequest = (ingredients: TOrderCheckout) => {
  const accessToken = getCookie("accessToken");
  return fetch(Url.Order, {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients})
  })
};

const registerRequest = ({name, email, password}: TUserRequest) => {
  return fetch(Url.Register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then(res => checkResponse<TUserResponce>(res))
};

const loginRequest = ({email, password}:  Omit<TUserRequest, 'name'>) => {
  return fetch(Url.Login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(res => checkResponse<TUserResponce>(res))
};

const logoutRequest = (refreshToken: string) => {
  return fetch(Url.Logout, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })
  .then(res => checkResponse<TDefaultResponce>(res));
};

const getUserRequest = () => {
  const accessToken = getCookie("accessToken");
  return fetch(Url.User, {
    method: "GET",
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    }
  })
};

const updateUserRequest = ({ name, email, password }: TUserRequest) => {
  const accessToken = getCookie("accessToken");
  return fetch(Url.User, {
    method: "PATCH",
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
};

const pwdResetRequest = ({ email }: Pick<TUserRequest, 'email'>) => {
  return fetch(Url.PwdReset, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  .then(res => checkResponse<TDefaultResponce>(res));
};

const pwdSubmitRequest = ({ password, token }: TPasswordResetRequest) => {;
  return fetch(Url.PwdSubmit, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  })
  .then(res => checkResponse<TDefaultResponce>(res));
};

const updateTokenRequest = (refreshToken: string) => {
  return fetch(Url.Token, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })
  .then(res => checkResponse<TTokens>(res));

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
