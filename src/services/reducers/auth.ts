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
import { TAuthActions } from '../actions/auth';
import { TAuthState } from '../types/state';

const initialState: TAuthState = {
  user: null,
  password: '',
  authRequest: false,
  authFailed: false,
  pwdResetRequested: false,
  pwdSubmitSuccess: false,
};

export const authReducer = (state = initialState, action: TAuthActions) => {
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
    case LOGOUT_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        user: null
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        user: action.user
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        user: action.user
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      }
    }
    case UPDATE_PWD_REQUEST: {
      return {
        ...state,
        authRequest: true,
        pwdResetRequested: true
      }
    }
    case UPDATE_PWD_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
      }
    }
    case UPDATE_PWD_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      }
    }
    case SUBMIT_PWD_REQUEST: {
      return {
        ...state,
        authRequest: true,
        pwdSubmitSuccess: false
      }
    }
    case SUBMIT_PWD_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false,
        pwdSubmitSuccess: true,
      }
    }
    case SUBMIT_PWD_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
        pwdSubmitSuccess: false
      }
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        authRequest: true
      }
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authFailed: false
      }
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      }
    }
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    default: {
      return state;
    }
  }
};
