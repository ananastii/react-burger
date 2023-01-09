import { getIngredientsData } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';

export function getIngredients(url) {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    getIngredientsData(url)
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
}
