import {
  USER_WS_CONNECTION_CLOSED,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_GET_MESSAGE
} from "../actions/wsUser";

const initialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case USER_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case USER_WS_CONNECTION_CLOSED:
      return {
        ...state,
        state: initialState
      };

    case USER_WS_GET_MESSAGE:
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
