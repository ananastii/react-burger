import {
  register,
  login,
  logout,
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

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const UPDATE_PWD_REQUEST = 'UPDATE_PWD_REQUEST';
export const UPDATE_PWD_SUCCESS = 'UPDATE_PWD_SUCCESS';
export const UPDATE_PWD_FAILED = 'UPDATE_PWD_FAILED';

export const SUBMIT_PWD_REQUEST = 'SUBMIT_PWD_REQUEST';
export const SUBMIT_PWD_SUCCESS = 'SUBMIT_PWD_SUCCESS';
export const SUBMIT_PWD_FAILED = 'SUBMIT_PWD_FAILED';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const SET_PASSWORD = 'SET_PASSWORD';

export const registerUser = ({name, email, password}) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    register(name, email, password)
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

export const logoutUser = (refreshToken) => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logout(refreshToken)
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
  return function(dispatch) {
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
        dispatch({
          type: GET_USER_FAILED
        });
        const refreshToken = getCookie("refreshToken");
        updateTokenRequest(refreshToken)
          .then(res => {
            if (res && res.success) {
              setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
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

export const updateUserInfo = ({ name, email, password }) => {
  return function(dispatch) {
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
        dispatch({
          type: UPDATE_USER_FAILED
        });
        const refreshToken = getCookie("refreshToken");
        updateTokenRequest(refreshToken)
          .then(res => {
            if (res && res.success) {
              setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
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

export const updatePassword = ({ email }) => {
  return function(dispatch) {
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

export const submitPassword = ({ password }) => {
  return function(dispatch) {
    dispatch({
      type: SUBMIT_PWD_REQUEST
    });
    pwdSubmitRequest({ password })
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

export const updateToken = () => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    });
    const refreshToken = getCookie("refreshToken");
    updateTokenRequest(refreshToken)
      .then(res => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
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
  };
}
