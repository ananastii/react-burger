import { getIngredientsRequest } from '../../utils/api';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_COUNT,
  DECREASE_COUNT,
  SET_COUNT
} from '../constants/ingredients';
import { TIngredientInfo } from "../types/data";
import { AppDispatch } from '../types';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredientInfo>;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIncreaseCount {
  readonly type: typeof INCREASE_COUNT;
  readonly id: string;
  readonly count: number;
}

export interface IDecreaseCount {
  readonly type: typeof DECREASE_COUNT;
  readonly id: string;
  readonly count: number;
}

export interface ISetCount {
  readonly type: typeof SET_COUNT;
  readonly id: string;
  readonly count: number;
}

export type TIngredientsActions =
| IGetIngredientsRequest
| IGetIngredientsSuccess
| IGetIngredientsFailed
| IIncreaseCount
| IDecreaseCount
| ISetCount;

export const getIngredients = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest()
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

export const increaseCount = (id: string, count: number): IIncreaseCount => ({
  type: INCREASE_COUNT,
  id: id,
  count: count
});

export const decreaseCount = (id: string, count: number): IDecreaseCount => ({
  type: DECREASE_COUNT,
  id: id,
  count: count
});

export const setCount = (id: string, count: number): ISetCount => ({
  type: SET_COUNT,
  id: id,
  count: count
});
