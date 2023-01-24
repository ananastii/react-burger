import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_COUNT,
  DECREASE_COUNT,
  SET_COUNT
} from '../actions/ingredients';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.data.map(item => ({info: item , qty: 0}))
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item =>
          item.info._id === action.id ? { ...item, qty: item.qty + action.count } : item)
      }
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item =>
          item.info._id === action.id ? { ...item, qty: item.qty - action.count } : item)
      }
    }
    case SET_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item =>
          item.info._id === action.id ? { ...item, qty: action.count } : item)
      }
    }
    default: {
      return state;
    }
  }
};
