import { getIngredientsData } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const SET_COUNT = 'SET_COUNT';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsData()
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
      console.log(`Ошибка при загрузке данных: ${e}`);
    });
  }
};

export const increaseCount = (id, count) => ({
  type: INCREASE_COUNT,
  id: id,
  count: count
});

export const decreaseCount = (id, count) => ({
  type: DECREASE_COUNT,
  id: id,
  count: count
});

export const setCount = (id, count) => ({
  type: SET_COUNT,
  id: id,
  count: count
});
