import { placeOrderRequest, updateTokenRequest } from '../../utils/api';
import { getCookie, setCookie } from '../../utils/cookies';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const checkoutOrder = (ingredients) => {
  return function(dispatch) {
    dispatch({
      type: ORDER_CHECKOUT_REQUEST
    });
    placeOrderRequest(ingredients)
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        console.log(res);
        dispatch({
          type: ORDER_CHECKOUT_SUCCESS,
          id: res.order
        });
      } else {
        dispatch({
          type: ORDER_CHECKOUT_FAILED
        });
        const refreshToken = getCookie("refreshToken");
        updateTokenRequest(refreshToken)
          .then(res => {
            if (res && res.success) {
              setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
              dispatch({
                type: ORDER_CHECKOUT_REQUEST
              });
              placeOrderRequest(ingredients)
              .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
              .then(res => {
                if (res && res.success) {
                  dispatch({
                    type: ORDER_CHECKOUT_SUCCESS,
                    id: res.order
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
