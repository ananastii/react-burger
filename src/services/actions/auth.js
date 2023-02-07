import {
  register,
  login
} from '../../utils/api';

import {
  getCookie,
  setCookie
} from '../../utils/cookies';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'REGISTER_REQUEST';
export const LOGIN_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_FAILED = 'REGISTER_FAILED';

export const registerUser = ({name, email, password}) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    console.log(name);
    register(name, email, password)
      .then(res => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user
          });
      } else {
        dispatch({
          type: REGISTER_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: REGISTER_FAILED
      });
      console.log(`Ошибка при регистрации пользователя: ${e}`);
    });
  };
}

export const loginUser = ({email, password}) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    login(email, password)
      .then(res => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user
          });
      } else {
        dispatch({
          type: LOGIN_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: LOGIN_FAILED
      });
      console.log(`Ошибка при попытке входа: ${e}`);
    });
  };
}
