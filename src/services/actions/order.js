import { placeOrder } from '../../utils/api';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const checkoutOrder = (url) => {
  return function(dispatch) {
    dispatch({
      type: ORDER_CHECKOUT_REQUEST
    });
    checkoutOrder(url).
      then(res => {
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
      console.log(`Ошибка при загрузке данных: ${e}`);
    });
  };
}

export const resetOrder = () => ({
  type: CLOSE_ORDER
});
