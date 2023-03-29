import { placeOrderRequest, updateTokenRequest } from '../../utils/api';
import { getCookie, setCookie } from '../../utils/cookies';
import { TOrderCheckout } from '../types/data';

import {
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
  ORDER_CHECKOUT_FAILED,
  CLOSE_ORDER
} from '../constants/order';
import { AppDispatch } from '../types';

export interface IGetOrderRequest {
  readonly type: typeof ORDER_CHECKOUT_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof ORDER_CHECKOUT_SUCCESS;
  readonly id: number;
}

export interface IGetOrderFailed {
  readonly type: typeof ORDER_CHECKOUT_FAILED;
}

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export type TOrderActions =
| IGetOrderRequest
| IGetOrderSuccess
| IGetOrderFailed
| ICloseOrder;

export const checkoutOrder = (ingredients: TOrderCheckout) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: ORDER_CHECKOUT_REQUEST
    });
    placeOrderRequest(ingredients)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        dispatch({
          type: ORDER_CHECKOUT_SUCCESS,
          id: res.order.number
        });
      } else {
        const refreshToken = getCookie("refreshToken");
        updateTokenRequest(refreshToken!)
          .then(res => {
            if (res && res.success) {
              setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
              setCookie("refreshToken", res.refreshToken);
              dispatch({
                type: ORDER_CHECKOUT_REQUEST
              });
              placeOrderRequest(ingredients)
              .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
              .then(res => {
                if (res && res.success) {
                  dispatch({
                    type: ORDER_CHECKOUT_SUCCESS,
                    id: res.order.number
                  });
                } else {
                  dispatch({
                    type: ORDER_CHECKOUT_FAILED
                  });
                }
              })
              .catch(e => {
                dispatch({
                  type: ORDER_CHECKOUT_FAILED
                });
                console.log(`Ошибка при оформлении заказа: ${e}`);
              });
            } else {
              dispatch({
                type: ORDER_CHECKOUT_FAILED
              });
            }
          })
          .catch(e => {
            dispatch({
              type: ORDER_CHECKOUT_FAILED
            });
            console.log(`Ошибка при обновлении токена: ${e}`);
          });
      }
    })
  .catch(e => {
    dispatch({
      type: ORDER_CHECKOUT_FAILED
    });
    console.log(`Ошибка при загрузке данных: ${e}`);
  });
  };
}

export const resetOrderId = () => ({
  type: CLOSE_ORDER
});
