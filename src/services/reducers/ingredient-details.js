import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS
} from '../actions/ingredient-details';

const initialState = {
  ingredient: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredient: action.data
      }
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ingredient: null
      }
    }
    default: {
      return state;
    }
  }
};
