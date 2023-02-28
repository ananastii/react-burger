import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  USER_WS_CONNECTION_CLOSED,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_GET_MESSAGE
} from "../actions/ws";

const initialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
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
          wsConnected: false,
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
