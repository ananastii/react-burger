import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  pwdResetRequest,
  pwdSubmitRequest,
  updateTokenRequest
} from '../../utils/api';

import {
  setCookie,
  deleteCookie,
  getCookie
} from '../../utils/cookies';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_PWD_REQUEST,
  UPDATE_PWD_SUCCESS,
  UPDATE_PWD_FAILED,
  SUBMIT_PWD_REQUEST,
  SUBMIT_PWD_SUCCESS,
  SUBMIT_PWD_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  SET_PASSWORD
} from '../constants/auth';

import { TUserRequest, TPasswordResetRequest } from '../types/auth';
import { AppDispatch } from '../types';
import { TUser } from '../types/data';

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: TUser
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser
}

export interface IGetUserUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser
}

export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IUpdatePasswordRequest {
  readonly type: typeof UPDATE_PWD_REQUEST;
}

export interface IUpdatePasswordSuccess {
  readonly type: typeof UPDATE_PWD_SUCCESS;
}

export interface IUpdatePasswordFailed {
  readonly type: typeof UPDATE_PWD_FAILED;
}

export interface ISubmitPasswordRequest {
  readonly type: typeof SUBMIT_PWD_REQUEST;
}

export interface ISubmitPasswordSuccess {
  readonly type: typeof SUBMIT_PWD_SUCCESS;
}

export interface ISubmitPasswordFailed {
  readonly type: typeof SUBMIT_PWD_FAILED;
}

export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export interface ISetPassword {
  readonly type: typeof SET_PASSWORD;
  readonly password: string;
}

export type TAuthActions =
| IRegisterRequest
| IRegisterSuccess
| IRegisterFailed
| ILoginRequest
| ILoginSuccess
| ILoginFailed
| ILogoutRequest
| ILogoutSuccess
| ILogoutFailed
| IGetUserRequest
| IGetUserSuccess
| IGetUserUserFailed
| IUpdateUserRequest
| IUpdateUserSuccess
| IUpdateUserFailed
| IUpdatePasswordRequest
| IUpdatePasswordSuccess
| IUpdatePasswordFailed
| ISubmitPasswordRequest
| ISubmitPasswordSuccess
| ISubmitPasswordFailed
| IUpdateTokenRequest
| IUpdateTokenSuccess
| IUpdateTokenFailed
| ISetPassword;

export const registerUser = ({name, email, password}: TUserRequest) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    registerRequest({name, email, password})
      .then(res => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user
          });
          dispatch({
            type: SET_PASSWORD,
            password: password
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

export const loginUser = ({email, password}: Omit<TUserRequest, 'name'>) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    loginRequest({email, password})
      .then(res => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user
          });
          dispatch({
            type: SET_PASSWORD,
            password: password
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

export const logoutUser = (refreshToken: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logoutRequest(refreshToken)
      .then(res => {
        if (res && res.success) {
          deleteCookie("refreshToken");
          deleteCookie("accessToken");
          dispatch({
            type: LOGOUT_SUCCESS
          });
      } else {
        dispatch({
          type: LOGOUT_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: LOGOUT_FAILED
      });
      console.log(`Ошибка при попытке выхода: ${e}`);
    });
  };
}

export const getUserInfo = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    getUserRequest()
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user
        });
      } else {
        const refreshToken = getCookie("refreshToken")!;
        updateTokenRequest(refreshToken)
          .then(res => {
            if (res && res.success) {
              setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
              setCookie("refreshToken", res.refreshToken);
              dispatch({
                type: GET_USER_REQUEST
              });
              getUserRequest()
              .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
              .then(res => {
                if (res && res.success) {
                  dispatch({
                    type: GET_USER_SUCCESS,
                    user: res.user
                  });
                } else {
                  dispatch({
                    type: GET_USER_FAILED
                  });
                }
              })
              .catch(e => {
                dispatch({
                  type: GET_USER_FAILED
                });
                console.log(`Ошибка при получении информации о пользователе: ${e}`);
              });
            } else {
              dispatch({
                type: GET_USER_FAILED
              });
            }
          })
          .catch(e => {
            dispatch({
              type: GET_USER_FAILED
            });
            console.log(`Ошибка при обновлении токена: ${e}`);
          });
      }
    })
    .catch(e => {
      dispatch({
        type: GET_USER_FAILED
      });
      console.log(`Ошибка при получении информации о пользователе: ${e}`);
    });
  };
}

export const updateUserInfo = ({ name, email, password }: TUserRequest) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    updateUserRequest({ name, email, password })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user
        });
        dispatch({
          type: SET_PASSWORD,
          password: password
        });
      } else {
        const refreshToken = getCookie("refreshToken")!;
        updateTokenRequest(refreshToken)
          .then(res => {
            if (res && res.success) {
              setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
              setCookie("refreshToken", res.refreshToken);
              dispatch({
                type: UPDATE_USER_REQUEST
              });
              updateUserRequest({ name, email, password })
              .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
              .then(res => {
                if (res && res.success) {
                  dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: res.user
                  });
                  dispatch({
                    type: SET_PASSWORD,
                    password: password
                  });
                } else {
                  dispatch({
                    type: UPDATE_USER_FAILED
                  });
                }
              })
              .catch(e => {
                dispatch({
                  type: UPDATE_USER_FAILED
                });
                console.log(`Ошибка при обновлении информации о пользователе: ${e}`);
              });
            } else {
              dispatch({
                type: UPDATE_USER_FAILED
              });
            }
          })
          .catch(e => {
            dispatch({
              type: UPDATE_USER_FAILED
            });
            console.log(`Ошибка при обновлении токена: ${e}`);
          });
      }
    })
    .catch(e => {
      dispatch({
        type: UPDATE_USER_FAILED
      });
      console.log(`Ошибка при обновлении информации о пользователе: ${e}`);
    });
  };
}

export const updatePassword = ({ email }: Pick<TUserRequest, 'email'>) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_PWD_REQUEST
    });
    pwdResetRequest({ email })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_PWD_SUCCESS,
          });

      } else {
        dispatch({
          type: UPDATE_PWD_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: UPDATE_PWD_FAILED
      });
      console.log(`Ошибка при обновлении пароля: ${e}`);
    });
  };
}

export const submitPassword = ({ password, token }: TPasswordResetRequest) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: SUBMIT_PWD_REQUEST
    });
    pwdSubmitRequest({ password, token })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: SUBMIT_PWD_SUCCESS,
          });

      } else {
        dispatch({
          type: SUBMIT_PWD_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: SUBMIT_PWD_FAILED
      });
      console.log(`Ошибка при обновлении пароля: ${e}`);
    });
  };
}

export async function updateToken(dispatch: AppDispatch) {
  dispatch({
    type: UPDATE_TOKEN_REQUEST
  });
  const refreshToken = getCookie("refreshToken")!;
  await updateTokenRequest(refreshToken)
    .then(res => {
      console.log(res);
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
        });

      } else {
        dispatch({
          type: UPDATE_TOKEN_FAILED
        });
      }
    })
  .catch(e => {
    dispatch({
      type: UPDATE_TOKEN_FAILED
    });
    console.log(`Ошибка при обновлении accessToken: ${e}`);
  });
}
