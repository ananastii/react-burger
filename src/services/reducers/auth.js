import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/auth';

const initialState = {
  user: [],
  authRequest: false,
  authFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        user: action.user
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        user: action.user
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      }
    }
    default: {
      return state;
    }
  }
};
