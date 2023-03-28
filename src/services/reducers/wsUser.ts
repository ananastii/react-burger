import {
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE
} from "../constants/wsUser";
import { TWsUserActions } from '../actions/wsUser';
import { TWsState } from "../types/state";

const initialState: TWsState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsUserReducer = (state = initialState, action: TWsUserActions) => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        state: initialState
      };

    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
