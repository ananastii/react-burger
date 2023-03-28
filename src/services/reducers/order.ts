import {
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
  ORDER_CHECKOUT_FAILED,
  CLOSE_ORDER
} from '../constants/order';
import { TOrderActions } from '../actions/order';
import { TOrderState } from '../types/state';

const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderId: null,
  openModal: false
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case ORDER_CHECKOUT_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        openModal: true
      }
    }
    case ORDER_CHECKOUT_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderId: action.id,
      }
    }
    case ORDER_CHECKOUT_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    case CLOSE_ORDER: {
      return {
        state: initialState
      }
    }
    default: {
      return state;
    }
  }
};
