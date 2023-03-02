import {
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
  ORDER_CHECKOUT_FAILED,
  CLOSE_ORDER
} from '../actions/order';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderId: null,
  openModal: false
};

export const orderReducer = (state = initialState, action) => {
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
        orderId: action.id.number,
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
